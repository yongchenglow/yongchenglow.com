import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/src/components/shared/ui/button";

interface PostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export default function PostButton({
	children,
	className = "",
	...props
}: PostButtonProps) {
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
