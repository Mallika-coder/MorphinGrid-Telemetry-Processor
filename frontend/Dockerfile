FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# === FIX: Change working directory to the src folder for Next.js ===
WORKDIR /app/src 
# ===================================================================
COPY . . 
EXPOSE 3000
CMD ["npm", "run", "dev"]