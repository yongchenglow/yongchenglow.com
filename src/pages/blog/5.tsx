import {
  Box,
  useTheme,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink,
  TableContainer,
  Paper,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from './2';
import StandardLayout from '@/src/pages/layouts/standard';

type FacetsOfWebDesign = {
  word: string;
  description: string;
};

const facetsOfWebDesign: FacetsOfWebDesign[] = [
  {
    word: 'Effectiveness',
    description: 'Can the users achieve their goal?',
  },
  {
    word: 'Efficiency',
    description: 'How quickly can the users achieve their goal?',
  },
  {
    word: 'Learnability',
    description: 'Is it easy for the users to learn the first time?',
  },
  {
    word: 'Memorability',
    description: 'How easily can repeated users know how to use your site?',
  },
  {
    word: 'Handling',
    description: 'how well does the website allow users to recover from errors',
  },
  {
    word: 'Satisfaction',
    description:
      'how satisfied are the users and will they recommend it to others',
  },
];

const Blog5 = () => {
  const theme = useTheme();
  return (
    <StandardLayout>
      <Box py={3}>
        <Typography variant="h3" textAlign="center" marginBottom={1}>
          Designing the Interface
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          marginBottom={4}
        >
          What is Design?
        </Typography>
        <Box maxWidth="sm" mx="auto" mb={4}>
          <img
            style={{ width: '100%' }}
            src="/img/MaxPixel.net-Internet-The-Web-Website-Design-Web-Design-4875183.jpg"
            alt="database"
          />
        </Box>
        <Box maxWidth="md" mx="auto">
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            The user interface is one of the most important feature of any
            website. This is because it directly affects how our users use the
            application. How our website looks, feel and functions also plays a
            major factor in user retention.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            If you work at a big company, the role of designing the user
            interface is left to the product designers. If a company has
            multiple products, they will usually have a core design team that
            will create something called a{' '}
            <MuiLink
              href="https://www.nngroup.com/articles/design-systems-101/"
              target="_blank"
            >
              design system
            </MuiLink>{' '}
            to be used throughout the entire company. This ensures that the user
            experience remain similar across all the company&apos;s products. An
            example of this is{' '}
            <MuiLink href="https://developer.apple.com/design/" target="_blank">
              Apple
            </MuiLink>
            , the design system between the Mac, iPad, and iPhone share the same
            design language making their users feel comfortable as they switch
            between these products.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            In this article, we will cover more about how the web interface is
            designed and a basic matrix on how we can evaluate a user interface.
            This will help you understand the different terminologies, the
            process and the standards that is being used in the industry. This
            will allow engineers and designers to work together to create a
            better product. We will leave the creation of design system and
            other higher level items for another day.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            What is Design?
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <img
              style={{ width: '100%' }}
              src="/img/computer-g39398e915_1280.jpg"
              alt="constraints"
            />
          </Box>
          <Box my={3} maxWidth="sm" mx="auto">
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={2}
              sx={{ fontStyle: 'italic' }}
            >
              <b>Design</b> is solving problems given a set of constrains
            </Typography>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            The definition of design is very controversial as different sources
            will explain things a bit differently. However, in order for us to
            speak the same language, for this article, this is the definition
            which we will used that I learned from my time at{' '}
            <MuiLink href="https://www.nus.edu.sg" target="_blank">
              NUS
            </MuiLink>
            .
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            What this definition of design means is that a good design will take
            into considerations of not only the users, the but resources we
            have. This includes, time, cost, and technology etc. A designer that
            comes up with a super elegant and fancy user interface in 10 days
            and in return takes 5 senior engineers 3 months to create. However,
            according to our definition, this can be a bad design because a
            company might not have the resources to afford the designers 10 days
            to create it and pay 3 senior engineers for 3 months to create on
            feature. A good designer will take into considerations of the
            different constrains such as time, cost, manpower before creating
            the final design.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            Design thinking
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <MuiLink
              href="https://developerexperience.io/practices/design-thinking"
              target="_blank"
            >
              <img
                style={{ width: '100%' }}
                src="/img/design_thinking.png"
                alt="constraints"
              />
            </MuiLink>
          </Box>
          <Box my={3} maxWidth="sm" mx="auto">
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={2}
              sx={{ fontStyle: 'italic' }}
            >
              <MuiLink
                href="https://www.postgresql.org/docs/current/datatype.html"
                target="_blank"
              >
                <b>Design thinking </b>
              </MuiLink>{' '}
              is a human-centred, collaborative problem-solving approach that is
              creative, iterative and practical.
            </Typography>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            <MuiLink href="https://www.ideou.com" target="_blank">
              Ideo
            </MuiLink>{' '}
            is a design consulting firm famous for using this approach to help
            companies create wonderful products. Design thinking is a 5 step
            process as shown in the picture above.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            <b>Empathize</b> is about understand the user&apos;s needs and
            goals. This is the stage where the designer conducts user interviews
            to find out more about how the users feel and what are their
            frustrations or pain points.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            <b>Define</b> is identifying the problem base on the users&apos;
            needs and goals. Using the information gathered from the empathy
            phase, the designers then defines a problem statement. The designers
            can create something called a user journey map to help visualize the
            problem. Personas can also be created to understand the different
            user groups, interests and goals. If there are a lot of problems
            identified from the user interviews, the problems are ranked in
            terms of severity and the Product Owner would then choose one of the
            most severe one to work on.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            <b>Ideate</b> is to coming up with ideas to solve the problem.
            During this phase, it is important to note that there are no
            ridiculous or stupid ideas. Everything goes onto the brainstorming
            board. It is helpful during this phase to have the user journey map
            and the personas visible so that we stay focused on the problem.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            <b>Prototyping</b> is creating a mock-up of the product that can be
            tested by the users. We will talk more about the different kind of
            prototypes in the next section.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            <b>Test</b> the product with relevant users and gather feedback.
            Repeat this process if necessary. If the users don&apos;t like the
            prototype, or don&apos;t think that the proposed product will
            resolve the problem, don&apos;t waste the engineering effort to
            build the product, it would be a waste of time, resources and money.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            Prototyping
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            Prototyping is one of the most important phase of design thinking.
            After passing the user test, a prototype might need some touch ups
            before passing it onto the engineering team. In general there are 3
            kinds of prototypes:
            <ol>
              <li>Quick & Dirty</li>
              <li>Low Fidelity</li>
              <li>High Fidelity</li>
            </ol>
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <MuiLink
              href="https://www.informit.com/articles/article.aspx?p=1929849&seqNum=5"
              target="_blank"
            >
              <img
                style={{ width: '100%' }}
                src="/img/2_4_lo-fi_prototype.jpg"
                alt="constraints"
              />
            </MuiLink>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            A Quick & Dirty prototype is something that can be done really
            quickly, even by using a pen and paper. It gives you a basic
            visualization of what the user or client wants. It should include
            basic information, some of the page flow and different sections of
            the pages. This is usually done up quickly to have a visual
            understanding of what a product will look like.
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <MuiLink
              href="https://www.justinmind.com/blog/low-fidelity-vs-high-fidelity-prototypes/"
              target="_blank"
            >
              <img
                style={{ width: '100%' }}
                src="/img/low-fidelity-prototype-example-portfolio-app.png.webp"
                alt="constraints"
              />
            </MuiLink>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            A low fidelity prototype focuses on the layout and concepts. These
            are the big items or in web design, the different portions of the
            webpage. It is usually done using some kind of prototyping tool such
            as Figma, Invision or AdobeXD. The low fidelity prototype is usually
            sent to the client or users for review. For smaller features, a high
            fidelity prototype may be created without the user&apos;s or
            client&apos;s review.
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <MuiLink
              href="https://www.justinmind.com/blog/low-fidelity-vs-high-fidelity-prototypes/"
              target="_blank"
            >
              <img
                style={{ width: '100%' }}
                src="/img/high-fidelity-prototype-example-ecommerce-app-tablet-justinmind.png.webp"
                alt="constraints"
              />
            </MuiLink>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            A high fidelity prototype is almost like the final product, however
            it lacks backend functionality and full user interactions. This is
            what the frontend engineers usually reference when they try to
            create the website in code. It is almost like the final product
            except it done in a prototyping software&apos;s mentioned above.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            From a web development perspective, a high fidelity prototype should
            be confirmed during sprint planning phase. This will allow the
            developmental work to be completed smoothly. The more changes there
            is to the High Fidelity prototype during the sprint, the greater the
            risk of the team not being able to achieve the sprint goal.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            Facets of Web Design
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <MuiLink
              href="https://eu.landisgyr.com/better-tech/usability-is-a-key-element-of-user-experience"
              target="_blank"
            >
              <img
                style={{ width: '100%' }}
                src="/img/figure2.png"
                alt="constraints"
              />
            </MuiLink>
          </Box>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            While prototyping is important, what do designers take into
            considerations when creating a prototype for a feature? How do we
            judge if a product is good or user friendly? While there are more
            advance metrics such as nelson&apos;s heuristics, we will stick to
            these 6 principles to keep things simple.
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Facets</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facetsOfWebDesign.map((facet) => (
                  <StyledTableRow
                    key={facet.word}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {facet.word}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {facet.description}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            fontSize={theme.typography.h6.fontSize}
            marginTop={3}
            marginBottom={7}
          >
            These are the things that we can look out for when we conduct our
            user interviews. The unit of measurement is highly depended on the
            task. For example effectiveness can be either yes or no, or if it is
            broken down into smaller sub task then the scoring metrics will be a
            bit different. It is important to note that once a unit of
            measurement is chosen, it shall remain constant so that in the next
            iteration we can compare the results to see if the design had made
            any improvements. For example for efficiency, we can compare 2
            prototypes as see if there is a reduced number of clicks or a
            reduction in time for the user to complete a particular task.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            Conclusion
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            Overall, I have scraped the surface of designing a user interface,
            and for beginning who what just stepped into the web development
            this should be sufficient. This comes to the end of our content on
            the Sprint Planning session. In the next few articles it will be
            more code heavy and less content heavy. Together we will go through
            a basic repository setup process on GitHub that will impress your
            technical accessors.
          </Typography>
          <Box textAlign="center" my={5}>
            {' '}
            <Typography
              color="textSecondary"
              textAlign="center"
              marginBottom={3}
            >
              Next Article: Setting up a Project coming on 14/03/2022
            </Typography>
          </Box>
          <Typography
            fontSize={theme.typography.caption.fontSize}
            color="textSecondary"
            textAlign="right"
            marginBottom={3}
          >
            Last Updated: 09/03/2022
          </Typography>
        </Box>
      </Box>
    </StandardLayout>
  );
};

export default Blog5;
