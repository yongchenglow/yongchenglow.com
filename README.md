# Yong Cheng Low's Website

Visit the website at [https://www.yongchenglow.com](https://www.yongchenglow.com)

## Table of Contents

1. [Running the application](#running-the-application)
2. [Application Commands](#application-commands)
3. [Git Conventions](#git-conventions)
   1. [Branching](#branching)
   2. [Commits](#commits)
   3. [Staging](#staging)
4. [VSCode Setup](#vscode-setup)
5. [License](#license)

## Running the application

In order to run the application please clone or download the repository

### For Development

1. yarn
2. yarn prepare (Only for development setup)
3. yarn dev

### For Production

1. yarn
2. yarn build
3. yarn start

### Using Docker

```bash
# Build and tag the image in the current directory
# docker build -t [tag_name] [path]
docker build -t example .

# Run the Docker image
# docker run -d -p [exposed_port]:[container_port] [tag_name]
sudo docker run -d -p 3000:3000 --restart unless-stopped yongchenglow

# Used only if you want to save the image to a file
# docker save [tag_name] [file_name].tar
docker save example -o file.tar

# Used only if you want to load the image into docker
# docker load -i [file_name].tar
docker load -i file.tar

```

## Application Commands

```bash
yarn dev              # For development
yarn build            # To build the application
yarn start            # To run the built application
yarn lint             # To check eslint
yarn analyze          # To analyze the packages
yarn prettier:fix     # To automatically fix prettier issues
yarn prettier:check   # To check for prettier issues
yarn storybook        # To run the storybook environment
yarn build:storybook  # To build the storybook
yarn prepare          # To prepare the application
```

## Git Conventions

### Branching

feature/<branch_name>

hotfix/<branch_name>

### Commits

Refer to [commitlint.config.js](./commitlint.config.js) for prefixes. We will be using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Staging

Files that are staged will automatically go through eslint and prettier fix. Theses type of files are defined in lint-staged.config.js

## VSCode Setup

Install the recommended extensions inside the .vscode folder.
Adjust your VS Code settings `code > preferences > settings`, add a `,` at the end of the file and paste the following code

```json
"editor.bracketPairColorization.enabled": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll": true
},
```

If there is a yellow squiggly line in your settings.json, most likely the code is repeated. Try to combine them.

## License

[GNU GENERAL PUBLIC LICENSE](./LICENSE)
