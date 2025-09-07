"use client";

import Image from "next/image";
import Link from "next/link";
import GoogleAds from "@/src/components/atoms/googleAds";
import StandardLayout from "@/src/layouts/StandardLayout";

export default function HomePage() {
	return (
		<StandardLayout>
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

			<div className="py-12 text-center">
				<div className="mb-8">
					<h2 className="text-4xl font-bold text-foreground">
						Latest Tech Articles
					</h2>
				</div>
				<div className="flex justify-center">
					<div className="bg-card rounded-lg shadow-lg max-w-sm mx-4 overflow-hidden border border-border">
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4 text-card-foreground">
								Setting up your Project
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								What is the proper way to setup a group project? How do we make
								the best our of our IDE to increase code quality and
								productivity?
							</p>
						</div>
						<div className="px-6 pb-6 flex justify-center">
							<Link
								href="/blog/6"
								className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 border-none cursor-pointer inline-block text-center"
							>
								Read Now
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="py-12 text-center">
				<div className="mb-8">
					<h2 className="text-4xl font-bold text-foreground">
						Project highlights
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
					<div className="bg-card rounded-lg shadow-lg max-w-sm overflow-hidden border border-border">
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4 text-card-foreground">
								NUS Students&apos; Sports Club
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								I developed a company website for the club. This was my first
								project using react.
							</p>
						</div>
						<div className="px-6 pb-6 flex justify-center space-x-3">
							<a
								href="https://www.nussportsclub.org"
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline"
							>
								<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
									Website
								</span>
							</a>
							<a
								href="https://github.com/yongchenglow/nus-students-sports-club"
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline"
							>
								<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
									Code
								</span>
							</a>
						</div>
					</div>
					<div className="bg-card rounded-lg shadow-lg max-w-sm overflow-hidden border border-border">
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4 text-card-foreground">
								My Personal Website
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Coded using NextJS and deployed through my own personal
								webserver on a RaspberryPi3.
							</p>
						</div>
						<div className="px-6 pb-6 flex justify-center">
							<a
								href="https://github.com/yongchenglow/yongchenglow.com"
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline"
							>
								<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
									Code
								</span>
							</a>
						</div>
					</div>
					<div className="bg-card rounded-lg shadow-lg max-w-sm overflow-hidden border border-border">
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4 text-card-foreground">
								AirBnB Clone
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								This is a project done using Ruby on Rails, mainly for students
								in Le Wagon students to see my twist on it.
							</p>
						</div>
						<div className="px-6 pb-6 flex justify-center space-x-3">
							<a
								href="https://airbnb-yc.herokuapp.com"
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline"
							>
								<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
									Website
								</span>
							</a>
							<a
								href="https://github.com/yongchenglow/airbnb-clone"
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline"
							>
								<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
									Code
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<GoogleAds slotId="5500217699" />

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
									<a
										href="https://www.scis-china.org"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
									>
										Shanghai Community International School
									</a>
									,{" "}
									<a
										href="https://shanghai-pudong.dulwich.org"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
									>
										Dulwich College Shanghai
									</a>{" "}
									and{" "}
									<a
										href="https://shatincollege.edu.hk"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
									>
										Sha Tin College Hong Kong
									</a>
									.
								</p>
								<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
									During my free time, I will write Tech Articles to share my
									learning experience as a web software engineer. I hope that
									these articles will help my students and others transition
									into the Software Engineering careers. These articles are
									mainly targeted at junior web software engineers. If you are a
									mid or senior level, feel free to take a peek at them if you
									are free.
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

			<GoogleAds slotId="8155985403" />
		</StandardLayout>
	);
}
