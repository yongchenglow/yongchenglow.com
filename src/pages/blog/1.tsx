import {
  Box,
  Button,
  useTheme,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import StandardLayout from '@/src/pages/layouts/standard';
import GoogleAds from '@/src/components/atoms/googleAds';

const Blog1 = () => {
  const theme = useTheme();
  return (
    <StandardLayout>
      <Box py={3}>
        <Typography variant="h3" textAlign="center" marginBottom={1}>
          Journey to the Web
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          marginBottom={4}
        >
          The beginnings of a Software Engineer
        </Typography>
        <Box maxWidth="sm" mx="auto" mb={4}>
          <img
            style={{ width: '100%' }}
            src="/img/children-gb3ec399d2_1280.jpg"
            alt="children coding"
          />
        </Box>
        <Box maxWidth="md" mx="auto">
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            So, you have just finished your coding bootcamp, got your degree or
            built your very own web application and you think you’re ready to
            conquer the software engineering world. You go over to{' '}
            <MuiLink href="https://glints.com" target="_blank">
              Glints
            </MuiLink>
            , apply for a software engineering job and demand a 5k starting
            salary.
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            The interview process
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            If you pass the initial Resume screening, you may be sent a 1-hour{' '}
            <MuiLink href="https://www.hackerrank.com" target="_blank">
              HackerRank
            </MuiLink>{' '}
            test, but as soon as you open it, the only thing that comes out of
            your mouth is WTF. Pursuing a career in software engineering is
            never easy, although you can create a website, interviews tend to
            focus heavily on data structures and algorithms.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            Another scenario you might end up in, is that the employer gives you
            a{' '}
            <MuiLink
              href="https://github.com/topics/take-home-test"
              target="_blank"
            >
              take home assignment
            </MuiLink>
            , where you have to create a mini web application to demonstrate
            your skills. If you have the mindset that you should not create
            things for free, or if you think the company is going to use what
            you write, then software engineering is not for you. If the company
            ends up using what you write, you shouldn’t join that company.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            It is important to understand that after building your first web
            application, that you have only manage to scrape tip of the iceberg.
            Your learning journey have just begun and there is much, much more,
            for you to learn. That is why I am writing a blog to share my
            experience with those who are starting their software engineering
            careers.
          </Typography>
          <GoogleAds slotId="5881175853" />
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            What&apos;s next?
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            If you enjoy reading my content or just find the articles
            particularly interesting, feel free to continue reading, I will try
            to <strong>release an article every Monday</strong> for your
            entertainment. These articles will include various software
            engineering principles with examples so that when the interviewer
            talks about it, you can happily join the conversation.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
            The intended audience for these articles are{' '}
            <MuiLink
              href="https://medium.com/@anomikos/hack-the-ladder-scope-skills-responsibilities-for-modern-software-engineering-edc9a8163c4d"
              target="_blank"
            >
              junior to mid-level software engineers
            </MuiLink>
            , so don&apos;t expect examples to be super complex as the focus
            will mainly be on{' '}
            <MuiLink
              href="https://en.wikipedia.org/wiki/Monolithic_application"
              target="_blank"
            >
              monoliths
            </MuiLink>
            . In theory, you should be trying to master these concepts as junior
            developer before you can be classified as a mid-level developer.
            However, being an interviewer myself, I find that even some
            mid-level developers struggle to grasp these concepts. This is why I
            firmly believe that in your early career, salary is something that
            you should not be looking out for, it is more important to{' '}
            <strong>
              join a company that will mentor you and teach you the right way to
              code
            </strong>
            .
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            marginBottom={2}
          >
            What will the content be about?
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
            The articles that I will be writing will not be focused on how to
            pass{' '}
            <MuiLink href="https://www.hackerrank.com" target="_blank">
              HackerRank
            </MuiLink>
            . The only way to dominate these HackerRank test is to practice. Go
            to the website and try solving the different problems. In general,
            my advice to you is that in order to meet the{' '}
            <MuiLink
              href="https://medium.com/@StueyGK/algorithm-time-complexity-and-big-o-notation-51502e612b4d"
              target="_blank"
            >
              time complexity
            </MuiLink>{' '}
            requirements, your solutions must be O(n log n) and below. Anything
            that is above O(n<sup>2</sup>), you will not be obtaining full
            marks.
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize}>
            Instead, the articles that I will be writing will be{' '}
            <strong>
              focused on the different software engineering concepts with
              examples on how to apply them
            </strong>
            . These concepts will typically come in handy during your 1 on 1
            interviews or in your take home assignments where your code is doing
            the talking. To give you all a glimpse of what is to come, here are
            the upcoming articles that I will be releasing in the following
            weeks:
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize}>
            <ol>
              <li>Join the Scrum</li>
              <li>It&apos;s Story Time</li>
              <li>Single source of truth</li>
            </ol>
          </Typography>
          <Typography fontSize={theme.typography.h6.fontSize} marginBottom={5}>
            If you are my hard core fan, you can check out the following{' '}
            <MuiLink
              href="https://github.com/yongchenglow/airbnb-clone"
              target="_blank"
            >
              AirBnB repository
            </MuiLink>{' '}
            and{' '}
            <MuiLink
              href="https://github.com/yongchenglow/goal-setting-app"
              target="_blank"
            >
              Goal Setting repository
            </MuiLink>{' '}
            that I will be using as examples. These are by far a finished
            products. I will enhance it as and when the content asks for it.
            Pardon me as I have a full time job and a part time teaching job.
            Unfortunately, this is it for now. Hope to see you join the Scrum!
          </Typography>
          <GoogleAds slotId="8262074410" />
          <Box textAlign="center" my={5}>
            <Link href="/blog/2">
              <a style={{ textDecoration: 'none' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                >
                  Next Article: Join the Scrum
                </Button>
              </a>
            </Link>
          </Box>
          <Typography variant="caption">
            If you are wondering why I am not posting these articles on Medium,
            it is because these content are very general and specific for a
            certain audience. Also to cut a bit of slack for myself as I am not
            writing this to get paid but to share my own knowledge. Thank you
            for your understanding.
          </Typography>
          <Typography
            fontSize={theme.typography.caption.fontSize}
            color="textSecondary"
            textAlign="right"
            marginTop={5}
            marginBottom={3}
          >
            Last Updated: 14/02/2022
          </Typography>
        </Box>
      </Box>
    </StandardLayout>
  );
};

export default Blog1;
