FROM node:16 as build

WORKDIR /build

# pnpm
RUN npm i -g pnpm

# npm
COPY package.json pnpm-lock.yaml ./

RUN pnpm i

# build
COPY . .

RUN pnpm run build

# run
FROM nginx:stable-alpine

# copy dist files
COPY --from=build /build/dist/website-chris /usr/share/nginx/html
