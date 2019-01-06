FROM node

WORKDIR /app

ADD . /app

RUN yarn install
RUN yarn build

CMD [ "yarn", "docker" ]

EXPOSE 3000