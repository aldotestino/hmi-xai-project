FROM node
WORKDIR /usr/src/frontend
COPY package*.json .
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "preview"]