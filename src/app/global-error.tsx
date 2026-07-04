"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<div
					style={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "1rem",
						padding: "2rem",
						fontFamily: "system-ui, sans-serif",
						textAlign: "center",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", margin: 0 }}>Something broke</h1>
					<p style={{ color: "#666", margin: 0 }}>
						The application failed to load. Please try again.
					</p>
					{error.digest && (
						<p
							style={{
								fontSize: "0.75rem",
								color: "#999",
								fontFamily: "monospace",
							}}
						>
							ref: {error.digest}
						</p>
					)}
					<button
						type="button"
						onClick={reset}
						style={{
							padding: "0.5rem 1rem",
							borderRadius: "0.375rem",
							border: "1px solid #ccc",
							background: "#fff",
							cursor: "pointer",
						}}
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
};

export default GlobalError;
