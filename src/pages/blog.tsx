import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import GoogleAds from "@/src/components/atoms/googleAds";
import StandardLayout from "@/src/pages/layouts/standard";

const About = () => {
	const theme = useTheme();
	return (
		<StandardLayout>
			<Box py={3} textAlign="center">
				<Box mb={1}>
					<Typography variant="h4">Blog</Typography>
				</Box>
				<Box maxWidth={theme.spacing(80)} mx="auto" mb={7}>
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something!
				</Box>
				<Typography variant="h5" style={{ fontWeight: 450 }}>
					New Articles
				</Typography>
				<Box display="flex" justifyContent="center" mt={3} mb={7}>
					<Card sx={{ maxWidth: 350, marginX: 1 }}>
						<CardContent>
							<Typography variant="h6" mb={1}>
								Setting up your Project
							</Typography>
							<Typography variant="body1">
								What is the proper way to setup a group project? How do we make
								the best our of our IDE to increase code quality and
								productivity?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/6" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Card>
				</Box>
				<Typography variant="h5" style={{ fontWeight: 450 }}>
					Previous Articles
				</Typography>
				<Grid container spacing={2} justifyContent="center">
					<Grid
						component={Card}
						size={{ sm: 12, md: 4, lg: 3 }}
						sx={{ maxWidth: 350 }}
					>
						<CardContent>
							<Typography variant="h6" mb={1}>
								Journey to the Web
							</Typography>
							<Typography variant="body1">
								I have just finished my coding bootcamp, got my computer science
								degree or build my first full stack web application, what&apos;s
								next for me and where do I go from here?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/1" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Grid>
					<Grid
						component={Card}
						size={{ sm: 12, md: 4, lg: 3 }}
						sx={{ maxWidth: 350 }}
					>
						<CardContent>
							<Typography variant="h6" mb={1}>
								Join the Scrum!
							</Typography>
							<Typography variant="body1">
								How does a software engineering team typically operate and what
								are the different rituals that they do in a typical sprint? Who
								should a team consist of?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/2" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Grid>
					<Grid
						component={Card}
						size={{ sm: 12, md: 4, lg: 3 }}
						sx={{ maxWidth: 350 }}
					>
						<CardContent>
							<Typography variant="h6" mb={1}>
								It&apos;s Story Time
							</Typography>
							<Typography variant="body1">
								Now that we have learned about Scrum, what actually goes on
								during the Sprint Planning session? How do we organize our
								tasks? How do we allocate them?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/3" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Grid>
					<Grid
						component={Card}
						size={{ sm: 12, md: 4, lg: 3 }}
						sx={{ maxWidth: 350 }}
					>
						<CardContent>
							<Typography variant="h6" mb={1}>
								Single Source of Truth
							</Typography>
							<Typography variant="body1">
								The database is every web application&apos;s single source of
								truth. So how to we design a database that is reliable and error
								free?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/4" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Grid>
					<Grid
						component={Card}
						size={{ sm: 12, md: 4, lg: 3 }}
						sx={{ maxWidth: 350 }}
					>
						<CardContent>
							<Typography variant="h6" mb={1}>
								Designing the Interface
							</Typography>
							<Typography variant="body1">
								The User Interface of every web application is what causes the
								customer to stay and use the site. How do designers come up with
								the design? What is a good design?
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
							<Link href="/blog/5" style={{ textDecoration: "none" }}>
								<Button size="small">Read Now</Button>
							</Link>
						</CardActions>
					</Grid>
				</Grid>
				<GoogleAds slotId="9667543473" />
			</Box>
		</StandardLayout>
	);
};

export default About;
