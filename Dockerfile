FROM node

ADD . /app

WORKDIR /app

RUN yarn install
RUN yarn build

CMD [ "yarn", "docker" ]

EXPOSE 3000