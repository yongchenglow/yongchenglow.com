module.exports = {
	roots: ["<rootDir>"],
	moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
	testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
	transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"@swc/jest",
			{
				jsc: {
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
	},
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less)$": "identity-obj-proxy",
		"@/(.*)": "<rootDir>/$1",
	},
};
