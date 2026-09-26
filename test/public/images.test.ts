import { describe, expect, it } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import {
	IMAGE_DIR,
	MAX_IMAGE_BYTES,
	MAX_IMAGE_DIMENSION,
} from "@/src/config/images";

const imgDir = path.join(process.cwd(), IMAGE_DIR);
const files = fs
	.readdirSync(imgDir)
	.filter((f) => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(f));

describe(`${IMAGE_DIR} budget`, () => {
	it.each(files)(
		"%s is within the size budget (run `bun run images`)",
		async (file) => {
			const filePath = path.join(imgDir, file);
			const { width = 0, height = 0 } = await sharp(filePath).metadata();

			expect(Math.max(width, height)).toBeLessThanOrEqual(MAX_IMAGE_DIMENSION);
			expect(fs.statSync(filePath).size).toBeLessThanOrEqual(MAX_IMAGE_BYTES);
		},
	);
});
