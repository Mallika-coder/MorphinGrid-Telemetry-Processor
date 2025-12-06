FROM node:20-alpine

WORKDIR /app
# 1. Copy worker's package.json from the root context to /app
# Source: worker/package.json (relative to root project folder)
# Destination: /app/package.json (needed for npm install)
COPY package*.json ./
RUN npm install

# 2. Copy the shared fileParser utility
# Source: backend/src/utils/fileParser.js (relative to root project folder)
# Destination: /app/src/utils/ (where worker code expects it)

# 3. Copy the rest of the worker source code (from worker/src)
COPY src/ ./src/

CMD ["npm", "run", "dev"]
