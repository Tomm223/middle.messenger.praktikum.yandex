FROM node

WORKDIR /myApp

COPY . .
# COPY package.json .
# COPY package-lock.json .
# RUN npm ci --only=production
RUN npm install
RUN npm run build



EXPOSE 3000

CMD [ "node", "server.js" ]