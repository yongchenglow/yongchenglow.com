# Base Image
FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn","start"]

# docker build -t <tag_name> <path>
# docker build -t example ./

# docker images

# docker run -p <exposed_port>:<container_port> <image_name>
# docker run -p 3000:3000 example
