FROM node:lts-alpine
RUN npm install -g http-server

WORKDIR /site
COPY ./dist ./

EXPOSE 8081
CMD http-server /site --proxy "http://localhost:8081?" -c-1 -p 8081