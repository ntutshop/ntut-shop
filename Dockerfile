FROM node

ADD . /app

WORKDIR /app

RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]

EXPOSE 3000