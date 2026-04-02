"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
	src: string;
	alt: string;
	source?: string;
	className?: string;
}

export default function ImageModal({
	src,
	alt,
	source,
	className,
}: ImageModalProps) {
	const [open, setOpen] = useState(false);
	const [parentSource, setParentSource] = useState<string | undefined>(source);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!source && buttonRef.current) {
			const parentDiv = buttonRef.current.closest("[data-image-source]");
			if (parentDiv) {
				const dataSrc = parentDiv.getAttribute("data-image-source");
				if (dataSrc) {
					setParentSource(dataSrc);
				}
			}
		}
	}, [source]);

	const rawSource = source || parentSource;
	// Only show external URLs as credits — filter out local paths
	const imageSource =
		rawSource?.startsWith("http://") || rawSource?.startsWith("https://")
			? rawSource
			: undefined;

	return (
		<DialogPrimitive.Root open={open} onOpenChange={setOpen}>
			<DialogPrimitive.Trigger asChild>
				<button
					ref={buttonRef}
					type="button"
					aria-label={`Open image: ${alt}`}
					className={cn(
						"cursor-zoom-in hover:opacity-90 transition-opacity inline-block p-0 m-0 border-0 bg-transparent",
						className,
					)}
				>
					<Image
						src={src}
						alt={alt}
						width={800}
						height={600}
						className="w-full h-auto"
						unoptimized={!src.startsWith("/")}
					/>
				</button>
			</DialogPrimitive.Trigger>

			<DialogPrimitive.Portal>
				{/* Backdrop */}
				<DialogPrimitive.Overlay
					className={cn(
						"fixed inset-0 z-50 bg-black/85 backdrop-blur-sm",
						"data-[state=open]:animate-in data-[state=closed]:animate-out",
						"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
						"duration-200",
					)}
				/>

				{/* Modal content */}
				<DialogPrimitive.Content
					className={cn(
						"fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
						"flex flex-col items-center",
						"w-[95vw] max-w-5xl",
						"focus:outline-none",
						"data-[state=open]:animate-in data-[state=closed]:animate-out",
						"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
						"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
						"duration-200",
					)}
				>
					<DialogPrimitive.Title className="sr-only">
						{alt}
					</DialogPrimitive.Title>

					{/* Close button */}
					<DialogPrimitive.Close
						className={cn(
							"absolute -top-12 right-0 z-10",
							"flex items-center gap-2",
							"px-3 py-1.5 rounded-full",
							"bg-white/10 hover:bg-white/20",
							"text-white text-sm font-medium",
							"border border-white/20 hover:border-white/40",
							"transition-all duration-150",
							"focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
							"cursor-pointer",
						)}
						aria-label="Close image"
					>
						<X className="h-3.5 w-3.5" strokeWidth={2.5} />
						<span>Close</span>
					</DialogPrimitive.Close>

					{/* Image container */}
					<div className="relative w-full">
						<Image
							src={src}
							alt={alt}
							width={1200}
							height={900}
							className="max-h-[80vh] w-auto mx-auto object-contain rounded-sm"
							unoptimized={!src.startsWith("/")}
						/>
					</div>

					{/* Alt text / caption */}
					{(alt || imageSource) && (
						<div className="mt-3 w-full px-1 space-y-1">
							{alt && (
								<p className="text-white/60 text-sm text-center leading-snug">
									{alt}
								</p>
							)}
							{imageSource && (
								<p className="text-white/40 text-xs text-center">
									Image credit:{" "}
									<a
										href={imageSource}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-white underline underline-offset-2 transition-colors break-all"
									>
										{imageSource}
									</a>
								</p>
							)}
						</div>
					)}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
