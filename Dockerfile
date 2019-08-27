FROM node:10.15

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
