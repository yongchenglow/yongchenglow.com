import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import {
	IMAGE_DIR,
	IMAGE_QUALITY,
	MAX_IMAGE_BYTES,
	MAX_IMAGE_DIMENSION,
} from "@/src/config/images";

const IMG_DIR = path.join(process.cwd(), IMAGE_DIR);

// Only files over budget are rewritten, so repeated runs leave the tree unchanged.
async function optimizeImage(file: string) {
	const inputPath = path.join(IMG_DIR, file);
	const input = fs.readFileSync(inputPath);
	const { width = 0, height = 0, format } = await sharp(input).metadata();
	const tooLarge = Math.max(width, height) > MAX_IMAGE_DIMENSION;
	const tooHeavy = input.length > MAX_IMAGE_BYTES;

	if (!tooLarge && !tooHeavy) return;

	const pipeline = sharp(input).rotate().resize({
		width: MAX_IMAGE_DIMENSION,
		height: MAX_IMAGE_DIMENSION,
		fit: "inside",
		withoutEnlargement: true,
	});

	let output: Buffer;
	if (format === "jpeg") {
		output = await pipeline
			.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true, progressive: true })
			.toBuffer();
	} else if (format === "png") {
		// Palette quantisation keeps text and flat colour crisp while cutting size.
		output = await pipeline
			.png({ palette: true, quality: IMAGE_QUALITY, compressionLevel: 9 })
			.toBuffer();
	} else if (format === "webp") {
		output = await pipeline.webp({ quality: IMAGE_QUALITY }).toBuffer();
	} else {
		console.warn(`- ${file}: unsupported format ${format}, skipped`);
		return;
	}

	if (!tooLarge && output.length >= input.length) {
		console.log(`- ${file}: re-encoding does not shrink it, skipped`);
		return;
	}

	fs.writeFileSync(inputPath, output);
	const { width: newWidth, height: newHeight } = await sharp(output).metadata();
	console.log(
		`✓ ${file}: ${width}x${height} ${Math.round(input.length / 1024)} KB -> ${newWidth}x${newHeight} ${Math.round(output.length / 1024)} KB`,
	);
}

async function optimizeImages() {
	const files = fs
		.readdirSync(IMG_DIR)
		.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

	for (const file of files) {
		try {
			await optimizeImage(file);
		} catch (error) {
			console.error(`✗ ${file}: ${(error as Error).message}`);
			process.exitCode = 1;
		}
	}
}

optimizeImages();
