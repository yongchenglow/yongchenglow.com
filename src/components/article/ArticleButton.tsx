import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/src/components/shared/ui/button";

interface ArticleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export default function ArticleButton({
	children,
	className = "",
	...props
}: ArticleButtonProps) {
	return (
		<Button
			variant="outline"
			className={`cursor-pointer ${className}`}
			{...props}
		>
			{children}
		</Button>
	);
}
