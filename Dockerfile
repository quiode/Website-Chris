FROM node:16 as build

WORKDIR /build

# npm
COPY package.json package-lock.json ./

RUN npm ci

# build
COPY . .

RUN npm run build

# run
FROM nginx:stable-alpine

# copy dist files
COPY --from=build /build/dist/website-chris /usr/share/nginx/html
