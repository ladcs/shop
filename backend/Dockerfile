FROM node:alpine

WORKDIR /backend

EXPOSE 3001

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY ./ ./

CMD ["npm","start"]