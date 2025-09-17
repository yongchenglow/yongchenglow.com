import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
	return (
		<footer className="mt-auto">
			<div className="bg-gray-600 text-white p-4 pt-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4">
						<div className="flex justify-center space-x-4">
							<a
								href="https://www.linkedin.com/in/yong-cheng-low/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-300 transition-colors duration-200"
								aria-label="LinkedIn"
							>
								<Linkedin size={24} />
							</a>
							<a
								href="https://github.com/yongchenglow"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-300 transition-colors duration-200"
								aria-label="GitHub"
							>
								<Github size={24} />
							</a>
							<a
								href="https://www.instagram.com/yclow88/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-300 transition-colors duration-200"
								aria-label="Instagram"
							>
								<Instagram size={24} />
							</a>
						</div>
						<div className="flex items-center justify-center">
							© {new Date().getFullYear()} Yong Cheng Low
						</div>
						<div className="flex items-center justify-center">
							<a
								href="mailto:lowyongcheng@hotmail.com"
								className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
							>
								<Mail size={20} />
								lowyongcheng@hotmail.com
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
