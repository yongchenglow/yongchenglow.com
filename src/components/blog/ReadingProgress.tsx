"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ReadingProgressProps {
	pageTitle: string;
}

// Progress thresholds for status updates
const PROGRESS_THRESHOLDS = {
	START: 0,
	READING: 25,
	DIGESTING: 50,
	ALMOST_DONE: 80,
	COMPLETE: 100,
} as const;

// Scroll offset from bottom to consider as 100% complete (pixels)
const SCROLL_OFFSET_THRESHOLD = 200;

// Status messages organized by progress sector
const STATUS_MESSAGES = {
	start: ["📖 Start Reading"],
	reading: [
		"📖 Reading...",
		"🧠 Absorbing...",
		"⚙️ Processing...",
		"📚 Learning...",
		"🔍 Exploring...",
	],
	digesting: [
		"💭 Digesting...",
		"💡 Understanding...",
		"🔗 Connecting...",
		"🤔 Reflecting...",
		"🌱 Integrating...",
	],
	almostDone: [
		"🏁 Almost There!",
		"📝 Finishing Up...",
		"📦 Wrapping Up...",
		"🎯 Near The End!",
		"⚡ So Close!",
	],
	complete: [
		"🎉 All Done!",
		"🏆 Victory!",
		"✨ You Did It!",
		"🎊 Finished!",
		"🙌 Nailed It!",
	],
} as const;

type StatusSector =
	| "start"
	| "reading"
	| "digesting"
	| "almostDone"
	| "complete";

const getSectorForProgress = (progress: number): StatusSector => {
	if (progress >= PROGRESS_THRESHOLDS.COMPLETE) return "complete";
	if (progress >= PROGRESS_THRESHOLDS.ALMOST_DONE) return "almostDone";
	if (progress >= PROGRESS_THRESHOLDS.DIGESTING) return "digesting";
	if (progress >= PROGRESS_THRESHOLDS.READING) return "reading";
	if (progress > PROGRESS_THRESHOLDS.START) return "start";
	return "start";
};

const getRandomStatus = (
	sector: StatusSector,
): { emoji: string; text: string } => {
	const messages = STATUS_MESSAGES[sector];
	const word = messages[Math.floor(Math.random() * messages.length)];

	// Split emoji and text for separate styling
	const match = word.match(/^(\S+)\s+(.+)$/);
	if (match) {
		return { emoji: match[1], text: match[2] };
	}
	return { emoji: "", text: word };
};

// Color transition thresholds
const COLOR_THRESHOLDS = {
	MIDPOINT: 50,
	NEAR_END: 80,
} as const;

// Progress bar colors
const COLORS = {
	BLUE: "#1d4ed8",
	PURPLE: "#7c3aed",
	GREEN: "#15803d",
} as const;

const getGradientColor = (percentage: number) => {
	if (percentage < COLOR_THRESHOLDS.MIDPOINT) {
		const ratio = percentage / COLOR_THRESHOLDS.MIDPOINT;
		return `color-mix(in srgb, ${COLORS.BLUE} ${Math.round((1 - ratio) * 100)}%, ${COLORS.PURPLE} ${Math.round(ratio * 100)}%)`;
	}
	if (percentage < COLOR_THRESHOLDS.NEAR_END) {
		const ratio =
			(percentage - COLOR_THRESHOLDS.MIDPOINT) /
			(COLOR_THRESHOLDS.NEAR_END - COLOR_THRESHOLDS.MIDPOINT);
		return `color-mix(in srgb, ${COLORS.PURPLE} ${Math.round((1 - ratio) * 100)}%, ${COLORS.GREEN} ${Math.round(ratio * 100)}%)`;
	}
	return COLORS.GREEN;
};

export const ReadingProgress = ({ pageTitle }: ReadingProgressProps) => {
	const [maxProgress, setMaxProgress] = useState(0);
	const [currentEmoji, setCurrentEmoji] = useState("");
	const [currentText, setCurrentText] = useState("");
	const lastSectorRef = useRef<StatusSector>("start");
	const maxProgressRef = useRef(0);

	// Keep ref in sync with state
	useEffect(() => {
		maxProgressRef.current = maxProgress;
	}, [maxProgress]);

	const updateTitle = useCallback(
		(newProgress: number) => {
			document.title = `${Math.round(newProgress)}% • ${pageTitle}`;
		},
		[pageTitle],
	);

	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;

			// Consider 100% when within threshold of the end
			const adjustedDocHeight = docHeight - SCROLL_OFFSET_THRESHOLD;
			const scrollPercent =
				adjustedDocHeight > 0
					? Math.min(100, (scrollTop / adjustedDocHeight) * 100)
					: 100;

			// Track maximum progress reached (never decreases)
			if (scrollPercent > maxProgressRef.current) {
				setMaxProgress(scrollPercent);

				const newSector = getSectorForProgress(scrollPercent);

				// Only update status when entering a new sector (not same sector)
				if (newSector !== lastSectorRef.current) {
					lastSectorRef.current = newSector;
					const status = getRandomStatus(newSector);
					setCurrentEmoji(status.emoji);
					setCurrentText(status.text);
				}
			}

			// Update title on scroll
			if (scrollTop > 0) {
				updateTitle(Math.max(maxProgressRef.current, scrollPercent));
			}
		};

		updateProgress();

		window.addEventListener("scroll", updateProgress);
		return () => {
			window.removeEventListener("scroll", updateProgress);
			document.title = `YC | ${pageTitle}`;
		};
	}, [pageTitle, updateTitle]);

	const progressColor = getGradientColor(maxProgress);

	return (
		<div
			className="fixed top-[60px] left-0 w-full h-3 z-[49]"
			data-testid="progress-bar"
		>
			<div
				className="h-full transition-all duration-150 ease-out relative flex items-center justify-center"
				style={{
					width: `${maxProgress}%`,
					backgroundColor: progressColor,
					boxShadow: `0 2px 8px ${progressColor}60`,
				}}
				data-testid="progress-bar-fill"
			>
				{currentEmoji && currentText && maxProgress > 0 && (
					<span className="text-[10px] text-white whitespace-nowrap drop-shadow-md">
						<span className="text-[8px] mb-[2px] inline-block">
							{currentEmoji}
						</span>{" "}
						{currentText}
					</span>
				)}
			</div>
		</div>
	);
};
