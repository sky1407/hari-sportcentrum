FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

RUN mkdir -p /data
ENV NODE_ENV=production

EXPOSE 5001

CMD ["node", "src/server.js"]
