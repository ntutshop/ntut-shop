FROM node

ENV HOST 0.0.0.0

WORKDIR /app

ADD . /app

RUN yarn install
RUN yarn build

CMD [ "yarn", "docker" ]

EXPOSE 3000