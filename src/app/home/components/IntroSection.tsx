import Image from "next/image";

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
						<h1 className="text-4xl font-bold mb-4 text-foreground">
							Hello everyone!
						</h1>
						<h2 className="text-2xl font-medium mb-4 text-foreground">
							I am Yong Cheng or YC for short.
						</h2>
						<h2 className="text-2xl font-medium text-foreground">
							I am a Web Software Engineer at{" "}
							<a
								href="https://glints.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
							>
								Glints
							</a>
							, part-time teacher at{" "}
							<a
								href="https://www.lewagon.com/singapore"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
							>
								Le Wagon
							</a>{" "}
							and a Sports Enthusiast.
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
