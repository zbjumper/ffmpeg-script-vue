FROM node:24-alpine3.21 AS builder

LABEL maintainer="Bill Zhang <zbjumper@gmail.com>"

# 默认编码为 UTF-8
ENV LANG C.UTF-8

ENV TIME_ZONE Asia/Shanghai

RUN echo 'http://mirrors.ustc.edu.cn/alpine/v3.21/main' > /etc/apk/repositories \
    && echo 'http://mirrors.ustc.edu.cn/alpine/v3.21/community' >>/etc/apk/repositories \
    && apk update && apk add tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

WORKDIR /code

COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && apk del .build-deps

COPY . .

RUN pnpm build

FROM nginx:1.28-alpine AS production

COPY --from=builder /code/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]