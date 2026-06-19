FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5174

# ⚡ Direct binary invocation with explicit interface binding to prevent argument drops
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5174"]
