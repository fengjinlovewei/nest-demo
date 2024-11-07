
# 设置源变量
ARG base_node=node:18-alpine

FROM $base_node AS build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM $base_node AS production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/docker /app/docker
COPY --from=build-stage /app/config.prod.yaml /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 8020

CMD ["node", "/app/main.js"]
# CMD /bin/bash ./docker/entrypoint.sh

# docker build . -f docker/Dockerfile -t fengjin/nest-demo

# docker run -it --name nextdemo -p 8020:8020 -d fengjin/nest-demo
