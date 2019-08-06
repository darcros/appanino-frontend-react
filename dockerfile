FROM node:10-alpine as build

WORKDIR /usr/src/app
ADD . ./
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
