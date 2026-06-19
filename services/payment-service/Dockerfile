FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .
RUN if [ -f package.json ]; then npm install; fi
EXPOSE 5000
CMD ["sh", "-c", "if [ -f server.js ]; then node server.js; else node src/server.js; fi"]
