import Image from "next/image";
import ExternalLink from "@/src/components/atoms/ExternalLink";

export default function IntroSection() {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-4 max-w-4xl my-12 items-center">
				<div className="sm:col-span-5 col-span-1 flex justify-center">
					<Image
						alt="Low Yong Cheng"
						src="/img/yong-cheng-badminton.jpg"
						width={400}
						height={400}
						className="w-full h-auto rounded-lg shadow-md max-w-sm"
						priority
					/>
				</div>
				<div className="sm:col-span-7 col-span-1 mt-8 sm:mt-0 flex items-center">
					<div className="text-center sm:text-left mx-8">
						<p className="text-4xl font-bold mb-6">Hello everyone!</p>
						<h1 className="text-2xl font-medium mb-6">
							I am Yong Cheng or YC for short.
						</h1>
						<p className="text-2xl font-medium">
							I am a Senior Software Engineer at{" "}
							<ExternalLink href="https://glints.com">Glints</ExternalLink>,
							part-time teacher at{" "}
							<ExternalLink href="https://www.lewagon.com/singapore">
								Le Wagon
							</ExternalLink>{" "}
							and a Sports Enthusiast.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
