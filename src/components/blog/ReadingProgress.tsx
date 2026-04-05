"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setProgress(scrollPercent);
		};

		window.addEventListener("scroll", updateProgress);
		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-muted z-[49]">
			<div
				className="h-full bg-primary transition-all duration-150"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
