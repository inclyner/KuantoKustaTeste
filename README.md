# 🛒 Backend Teste – API Gateway, Produtos e Carrinho

Repositório com a implementação de um sistema distribuído em **Node.js + TypeScript**, composto por:
- **API Gateway** (NestJS)  
- **Micro-serviço de Produtos** (NestJS + MongoDB/Mongoose)  
- **Micro-serviço de Carrinho** (NestJS +PostGres/TypeORM)  

O objetivo é demonstrar a estruturação de aplicações em micro-serviços, a comunicação entre serviços via HTTP e a disponibilização de documentação com Swagger.

---

## 📂 Estrutura

```
.
├── api-gateway/        # Gateway central (NestJS + http-proxy-middleware)
├── products-service/   # Serviço de Produtos
├── cart-service/       # Serviço de Carrinho
└── README.md
```

---

## 🚀 Execução do projeto

### 1. Clonagem do repositório
```bash
git clone https://github.com/inclyner/KuantoKustaTeste.git
cd KuantoKustaTeste
```

### 2. Instalação de dependências
Cada serviço possui dependências próprias:
```bash
cd api-gateway && npm install
cd ../products-service && npm install
cd ../cart-service && npm install
```

### 3. Variáveis de ambiente
Cada serviço tem um ficheiro `example.env`.

### 4. Execução dos serviços
```bash
docker-compose up --build
```

---

## 📖 Endpoints

### Gateway (`http://localhost:3000`)
- `GET /products` → devolve lista de produtos (proxy para Products Service)  
- `GET /cart` → devolve estado do carrinho (proxy para Cart Service)  
- `POST /cart/add` → adiciona produto ao carrinho  
- `DELETE /cart/remove/:id` → remove produto do carrinho  

### Documentação Swagger
Cada micro-serviço disponibiliza a sua própria documentação Swagger:
- **Products Service** → http://localhost:3001/products/docs  
- **Cart Service** → http://localhost:3002/cart/docs  

Via gateway:  
- http://localhost:3000/products/docs  
- http://localhost:3000/cart/docs  

---

## 🛠️ Tecnologias
- [Node.js](https://nodejs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [NestJS](https://nestjs.com/)  
- [MongoDB](https://www.mongodb.com/) (via Mongoose)  
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/) (via TypeORM) 
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)  

---

## 📌 Observações
- O **API Gateway** centraliza logs e encaminhamento.  
- Os micro-serviços são independentes e podem ser escalados de forma isolada.  
- A documentação foi configurada em `/cart/docs` e `/products/docs` para simplificar a integração no gateway.  
