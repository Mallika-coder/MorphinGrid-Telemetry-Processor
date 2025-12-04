FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# === FIX: Copying the needed fileParser from the backend source ===
COPY backend/src/utils/fileParser.js ./src/utils/

# =================================================================
COPY . .
CMD ["npm", "run", "dev"]