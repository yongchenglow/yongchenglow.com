# Yong Cheng Low's Website

Visit the website at [https://www.yongchenglow.com](https://www.yongchenglow.com)

## Table of Contents

1. [Running the application](#running-the-application)
2. [Application Commands](#application-commands)
3. [Git Conventions](#git-conventions)
   1. [Branching](#branching)
   2. [Commits](#commits)
4. [VSCode Setup](#vscode-setup)
5. [License](#license)

## Running the application

In order to run the application please clone or download the repository

### For Development

1. npm install
2. npm run prepare (Only for development setup)
3. npm run dev

### For Production

1. npm install
2. npm run build
3. npm start

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
npm run dev       # For development
npm run build     # To build the application
npm start         # To run the built application
npm run lint      # To check Biome linting
npm run format    # To format code with Biome
npm run check     # To run Biome linting and formatting with auto-fix
npm test          # To run tests
npm run analyze   # To analyze the packages
npm run prepare   # To prepare the application (husky setup)
```

## Git Conventions

### Branching

feature/<branch_name>

hotfix/<branch_name>

### Commits

Refer to [commitlint.config.ts](./commitlint.config.ts) for prefixes. We will be using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## VSCode Setup

Install the recommended extensions inside the .vscode folder.
Adjust your VS Code settings `code > preferences > settings`, add a `,` at the end of the file and paste the following code

```json
"editor.bracketPairColorization.enabled": true,
"editor.defaultFormatter": "biomejs.biome",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll": "explicit"
},
```

If there is a yellow squiggly line in your settings.json, most likely the code is repeated. Try to combine them.

## License

[GNU GENERAL PUBLIC LICENSE](./LICENSE)
