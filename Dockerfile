# Usar a imagem oficial do Node.js
FROM node:18-alpine

# Criar diretório de trabalho no container
WORKDIR /app

# Copiar arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

# Copiar o resto do código
COPY . .

# Expor a porta usada pelo app
EXPOSE 3000

# Rodar o servidor
CMD ["npm", "run", "dev"]
