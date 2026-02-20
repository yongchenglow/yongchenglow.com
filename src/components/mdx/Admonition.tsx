import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/src/components/shared/ui/alert";

interface AdmonitionProps {
	type?: "note" | "tip" | "warning" | "danger";
	title?: string;
	children: React.ReactNode;
}

const admonitionConfig = {
	note: {
		icon: Info,
		className: "border-blue-500 bg-blue-50 dark:bg-blue-950",
	},
	tip: {
		icon: CheckCircle,
		className: "border-green-500 bg-green-50 dark:bg-green-950",
	},
	warning: {
		icon: AlertTriangle,
		className: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
	},
	danger: {
		icon: XCircle,
		className: "border-red-500 bg-red-50 dark:bg-red-950",
	},
};

export default function Admonition({
	type = "note",
	title,
	children,
}: AdmonitionProps) {
	const config = admonitionConfig[type];
	const Icon = config.icon;

	return (
		<Alert className={`my-4 ${config.className}`}>
			<Icon className="h-4 w-4" />
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
}
