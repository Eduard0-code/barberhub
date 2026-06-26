# Guia de Deploy do Backend BarberHub

O backend é uma API Spring Boot que precisa ser publicada em uma plataforma de cloud para funcionar em produção com o frontend na Vercel.

## Opções de Deploy

### 1. **Railway** (Recomendado - Melhor custo/benefício)

Passos rápidos:
1. Acesse [Railway.app](https://railway.app) e crie uma conta
2. Conecte seu repositório GitHub
3. Na raiz do projeto, selecione a pasta `backend/` como root directory
4. Defina variáveis de ambiente:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://seu-servidor-mysql:3306/db_barbearia`
   - `SPRING_DATASOURCE_USERNAME`: seu usuário MySQL
   - `SPRING_DATASOURCE_PASSWORD`: sua senha MySQL
5. Railway faz deploy automático a cada push

### 2. **Heroku** (Descontinuado - Considere alternativas)

Se ainda quiser usar:
1. Instale [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Crie um `Procfile` na raiz do backend:
   ```
   web: java -Dserver.port=$PORT -jar target/barberhub-*.jar
   ```
3. Rode `heroku create` e `git push heroku main`

### 3. **Google Cloud Run** (Sem servidor - Pay-as-you-go)

1. Crie um `Dockerfile` no `backend/`:
   ```dockerfile
   FROM maven:3.8-openjdk-17 AS build
   WORKDIR /app
   COPY pom.xml .
   COPY src ./src
   RUN mvn clean package -DskipTests

   FROM openjdk:17-slim
   COPY --from=build /app/target/*.jar app.jar
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```
2. Publique via [Google Cloud Console](https://console.cloud.google.com)

## Banco de Dados em Produção

Você também precisa de um MySQL em produção:

- **PlanetScale** (MySQL serverless): https://planetscale.com
- **AWS RDS**: https://aws.amazon.com/rds/
- **DigitalOcean Managed Databases**: https://www.digitalocean.com/products/managed-databases

## Configuração na Vercel

Após publicar o backend, configure a URL no Vercel:

1. Acesse seu projeto na Vercel
2. Vá para **Settings > Environment Variables**
3. Adicione: `VITE_API_URL` = `https://seu-backend-url.com/api`
4. Redeploy o frontend

## Teste de Conectividade

Depois de publicar, valide a conexão:

```bash
# Terminal local
curl https://seu-backend-url.com/api/kpi/resumo
```

Deve retornar um JSON com dados do dashboard. Se falhar, verifique:
- A URL está acessível publicamente
- CORS está habilitado no Spring Boot (veja `backend/src/main/java/com/barberhub/config/CorsConfig.java`)
- O banco está configurado corretamente
