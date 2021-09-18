FROM node:16-alpine3.11 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run bundle

FROM nginx:alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html