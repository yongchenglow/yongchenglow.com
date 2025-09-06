import Head from "next/head";

const AppHead = () => {
	return (
		<Head>
			<meta
				name="description"
				content="Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences"
			/>
			<meta
				name="keywords"
				content="Yong Cheng Low, YC, Glints, Le Wagon, NUS, Tech, Computing, Computer Enginering, Blog, NUS Students' Sports Club"
			/>
			<meta name="author" content="Yong Cheng Low" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<meta name="robots" content="index, follow" />

			<title>Yong Cheng Low</title>
			<link rel="icon" href="img/YongCheng.jpg" />

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://www.yongchenglow.com" />
			<meta property="og:image" content="img/yong-cheng-metasprint.jpeg" />
			<meta property="og:title" content="Yong Cheng Low" />
			<meta
				property="og:description"
				content="Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences"
			/>

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="Yong Cheng Low" />
			<meta
				name="twitter:description"
				content="Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences"
			/>
			<meta name="twitter:url" content="http://www.yongchenglow.com" />
			<meta name="twitter:image" content="img/yong-cheng-metasprint.jpeg" />
		</Head>
	);
};

export default AppHead;
