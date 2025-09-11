import Image from "next/image";
import Link from "next/link";
import ExternalLink from "@/src/components/atoms/ExternalLink";

export default function AboutMeSection() {
	return (
		<div className="py-12 text-center">
			<div className="mb-4">
				<h2 className="text-4xl font-bold text-foreground">Who am I?</h2>
			</div>
			<div className="flex justify-center">
				<div className="grid grid-cols-1 sm:grid-cols-12 gap-4 max-w-4xl my-12 items-center">
					<div className="sm:col-span-5 col-span-1 flex justify-center mb-12 sm:mb-0">
						<Image
							alt="Low Yong Cheng"
							src="/img/yong-cheng-metasprint.jpeg"
							width={400}
							height={400}
							className="w-full h-auto rounded-lg shadow-md max-w-sm"
						/>
					</div>
					<div className="sm:col-span-7 col-span-1 flex items-center">
						<div className="text-left mx-8">
							<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
								I am Yong Cheng or YC, I grew up studying in various
								international schools in particular{" "}
								<ExternalLink href="https://www.scis-china.org">
									Shanghai Community International School
								</ExternalLink>
								,{" "}
								<ExternalLink href="https://shanghai-pudong.dulwich.org">
									Dulwich College Shanghai
								</ExternalLink>{" "}
								and{" "}
								<ExternalLink href="https://shatincollege.edu.hk">
									Sha Tin College Hong Kong
								</ExternalLink>
								.
							</p>
							<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
								During my free time, I will write Tech Articles to share my
								learning experience as a web software engineer. I hope that
								these articles will help my students and others transition into
								the Software Engineering careers. These articles are mainly
								targeted at junior web software engineers. If you are a mid or
								senior level, feel free to take a peek at them if you are free.
							</p>
							<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
								You can find out more about me in the{" "}
								<Link
									href="/about"
									className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
								>
									about
								</Link>{" "}
								section.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
