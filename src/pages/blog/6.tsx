import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import theme from 'src/theme';
import React from 'react';
import Footer from '../components/footer';
import ResponsiveAppBar from '../components/appbar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

function About() {
  return (
    <Box height="100vh" paddingTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3}>
          <Typography variant="h3" textAlign="center" marginBottom={1}>
            Setting up your Project
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            textAlign="center"
            marginBottom={4}
          >
            (The Corret Way)
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <img
              style={{ width: '100%' }}
              src="/img/gaming-computer-gbe40f244a_1280.jpg"
              alt="database"
            />
          </Box>
          <Box maxWidth="md" mx="auto">
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Setting up a project may sound like a simple task to you. However,
              it is important that we get this step right. By doing so, it will
              not only impress your technical assessors for your job
              application, but it will also ensure that your project will remain{' '}
              <MuiLink
                href="https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29"
                target="_blank"
              >
                clean
              </MuiLink>{' '}
              in the long run.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              For a short-term project, it is fine just to go to GitHub, create
              a repository, and call it done. However, in the long run, as more
              people work on the project, things start to change. As coding
              style differs, the code becomes harder and harder to read. As a
              new members join, they might be new to the language, hence using
              an Integrated Development Environment (IDE) with suggestions will
              be really helpful to them.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              In this Article, I will take you through a very basic project
              setup using,{' '}
              <MuiLink href="https://github.com" target="_blank">
                GitHub
              </MuiLink>
              ,{' '}
              <MuiLink href="https://code.visualstudio.com" target="_blank">
                VS Code
              </MuiLink>
              ,{' '}
              <MuiLink href="https://rubyonrails.org" target="_blank">
                Ruby on Rails
              </MuiLink>{' '}
              and{' '}
              <MuiLink href="https://git-scm.com/downloads" target="_blank">
                Git
              </MuiLink>
              . You may be using a different stack but similar principles will
              apply. All you will need is
              <ol>
                <li>A remote origin</li>
                <li>An IDE</li>
                <li>A Code Skeleton in any language</li>
                <li>A version control system</li>
              </ol>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              In order to ensure that we keep things focused, the next few
              articles will only contain a single concept. This will make things
              easier for people to follow along, it won&apos;t be like the
              Sprint Planning Series where one article has many ideas for a
              particular phase.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Preparation
            </Typography>
            <Box maxWidth="sm" mx="auto" mb={4}>
              <img
                style={{ width: '100%' }}
                src="/img/studying-g69d74ed4b_1280.jpg"
                alt="constraints"
              />
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              If you want to follow along this project setup series, please
              setup your computer according to the following website. The setup
              instructions are courtesy of{' '}
              <MuiLink href="https://www.lewagon.com" target="_blank">
                Le Wagon
              </MuiLink>
              , I do teach there part time. If you are interested in their
              courses feel free to sign up. They have offices everywhere world
              wide.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              After that you can open your terminal and copy and paste the
              following. Replace &lt;YOUR_APP_NAME&gt; with your own application
              name. If you want you can call it myapp.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={7}
            >
              <SyntaxHighlighter
                language="bash"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
rails new \\
  --database postgresql \\
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \\
  <YOUR_APP_NAME>
cd <YOUR_APP_NAME>
gh repo create
git push origin main
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Setting up VS Code
            </Typography>
            <Box maxWidth="sm" mx="auto" mb={4}>
              <MuiLink
                href="https://developerexperience.io/practices/design-thinking"
                target="_blank"
              >
                <img
                  style={{ width: '100%' }}
                  src="/img/laptop-gf9883978d_1280.jpg"
                  alt="constraints"
                />
              </MuiLink>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Visual Studio Code is a widely used IDE for any language. Other
              IDE out there that companies commonly used include{' '}
              <MuiLink href="https://www.jetbrains.com/idea/" target="_blank">
                Intellij
              </MuiLink>{' '}
              and{' '}
              <MuiLink
                href="https://www.eclipse.org/downloads/packages/release/neon/2/eclipse-ide-java-developers"
                target="_blank"
              >
                Eclipse
              </MuiLink>{' '}
              . You can use any IDE you want or prefer, but the concepts remain
              the same. The first step is to ensure that your IDE is set up for
              the language that you are going to code. We want to ensure that
              the setup process is the same for every team member so that when
              we{' '}
              <MuiLink
                href="https://martinfowler.com/articles/on-pair-programming.html"
                target="_blank"
              >
                pair program
              </MuiLink>
              , things become a lot easier.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              For the case of VS Code, it is quite simple as VS Code allows us
              to add a folder to contain recommended extensions. We can also
              configure our VS Code really easily through a settings.json file.
              So long as everybody have the same JSON file, the IDE should
              remain consistent throughout all team members.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Because we will be using Ruby on Rails, the extensions that I will
              introduce will be specific to the project. However, if you are
              using something such as{' '}
              <MuiLink href="https://nextjs.org" target="_blank">
                NextJS
              </MuiLink>
              ,{' '}
              <MuiLink href="https://nodejs.org/en/" target="_blank">
                NodeJS
              </MuiLink>
              ,{' '}
              <MuiLink href="https://go.dev" target="_blank">
                GoLang
              </MuiLink>{' '}
              etc. a simple google search will allow you to find the recommended
              extension.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              For Ruby on Rails, there are many extensions that you project
              could include, however, for simplicity&apos;s sake I will
              introduce to you 5 types which most project will need:
              <ol>
                <li>Code Formatter (esbenp.prettier-vscode)</li>
                <li>Language Beautifier (aliariff.vscode-erb-beautify)</li>
                <li>Language Specific Suggestions (rayhanw.erb-helpers)</li>
                <li>Collaboration Tools (ms-vsliveshare.vsliveshare)</li>
                <li>Version Control Tools (eamodio.gitlens)</li>
              </ol>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              A <b>code formatter</b> is used to format our code. This ensures
              that or coding style remains consistent throughout the project.
              For example, how we indent the code? Where should the brackets be?
              Should we end the line with trailing commas? Through the code
              formatter standardisation, this makes the project look as if it
              was written by one person, which makes things easier to read,
              learn and write. It is also important that we turn on the format
              on save feature on, this ensures we don&apos;t have to waste time
              adjusting our coding style to match the required standard.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              A <b>language beautifier</b> allows the IDE to colorize the code
              correctly. Keywords such as const or let should be in a different
              colour when you type them in a js file. Reserved words should also
              be in a different colour to prevent weird variable naming errors.
              This ensure that the code is easy to read and reduce the chance of
              dirty code.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              A <b>language specific</b> suggester allows the IDE to give
              suggestions base on what the user is typing. To add on to this, a
              code generator can also be useful to install. For example when
              using Eclipse we can easily generate getters and setters when we
              code in Java. Plugins like these should be installed in every Java
              IDE to increase productivity.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              A <b>collaboration tool</b> allows us to easily collaborate with
              another user. This makes pair programming and debugging a lot
              easier.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              A <b>version control tool</b> such as gitlens will allow you to
              easily see who is the author of a particular line of code and when
              was it changed. This allow you to easily contact the person if
              there is a need for clarification or explanation.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              How to add VS Code Extensions
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              In the root of your project, you can run the following code to
              create a VS Code extensions file.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={7}
            >
              <SyntaxHighlighter
                language="bash"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
mkdir .vscode
cd .vscode
touch extensions.json
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              In the extensions.json file, you should add the extensions for
              your project. For those who are following along, you can copy the
              file information below
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="json"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
{
  "recommendations": [
    "rebornix.ruby",
    "kaiwood.endwise",
    "rayhanw.erb-helpers",
    "aki77.rails-db-schema",
    "aliariff.vscode-erb-beautify",
    "misogi.ruby-rubocop",
    "mikestead.dotenv",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "editorconfig.editorconfig",
    "ms-vsliveshare.vsliveshare"
  ],
  "unwantedRecommendations": []
}
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              After creating this file and adding the extensions, you may see VS
              Code prompting you to download and install some extensions if you
              haven&apos;t got it install. This means that the recommended
              extensions.json is working.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginTop={7}
              marginBottom={2}
            >
              Format on save
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Adjust your VS Code settings code &gt; preferences &gt; settings,
              add a , at the end of the file and paste the following code
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="json"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
{
  ...
  "editor.bracketPairColorization.enabled": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
}
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginTop={3}
              marginBottom={7}
            >
              If there is a yellow squigily line in your settings.json, most
              likely the code is repeated. Try to combine them or remove the
              duplicates.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginTop={7}
              marginBottom={2}
            >
              Conclusion
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              To conclude, setting up a project is easy, doing it correctly it
              is hard. It is also important that we maintain a document on how
              we should setup a project and its configurations to make the
              onboarding process easier. This document will change overtime as a
              project grows, new plugins are introduced or removed to increase
              the code quality or increase productivity.
            </Typography>
            <Box textAlign="center" my={5}>
              <Typography
                color="textSecondary"
                textAlign="center"
                marginBottom={3}
              >
                Next Article: The Git Workflow coming on 21/03/2022
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.caption.fontSize}
              color="textSecondary"
              textAlign="right"
              marginBottom={3}
            >
              Last Updated: 16/03/2022
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default About;
