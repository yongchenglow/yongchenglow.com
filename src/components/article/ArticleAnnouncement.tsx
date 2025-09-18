interface ArticleAnnouncementProps {
	children: React.ReactNode;
	className?: string;
}

export default function ArticleAnnouncement({
	children,
	className = "",
}: ArticleAnnouncementProps) {
	return (
		<div className={`text-center my-5 ${className}`.trim()}>
			<div className="text-gray-600 text-center mb-3">{children}</div>
		</div>
	);
}
