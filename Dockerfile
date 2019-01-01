FROM node

# 設定工作目錄為 /app
WORKDIR /app

# 複製目前目錄下的內容，放進 Docker 容器中的 /app
ADD . /app

# 架設基本環境
RUN yarn
RUN yarn build

CMD [ "yarn", "docker" ]

EXPOSE 3000