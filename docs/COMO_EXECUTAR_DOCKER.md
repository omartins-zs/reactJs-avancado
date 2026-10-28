# 🐳 Como Executar via Docker — ReactJS Avançado (DIO)

Este guia detalha a execução completa do projeto **ReactJS Avançado** utilizando **Docker** e **Docker Compose**, com build multi-stage otimizado e infraestrutura completa (`app`, `nginx`, `mysql` e `phpmyadmin`).

---

## 🏗️ 1. Arquitetura dos Containers e Portas Padronizadas

| Serviço (`docker-compose.yml`) | Container Name | Imagem Base | Porta Externa → Interna | Função |
| :--- | :--- | :--- | :--- | :--- |
| **`app`** | `reactjs-avancado-app` | `node:20-alpine` (Multi-stage) | `3000` (rede interna) | Compila e serve o bundle de produção do React |
| **`nginx`** | `reactjs-avancado-nginx` | `nginx:1.27-alpine` | **`8080:80`** | Reverse proxy com compressão Gzip e rota `/api/health` |
| **`mysql`** | `reactjs-avancado-mysql` | `mysql:8.0` | **`3308:3306`** | Banco de dados MySQL com volume persistente `mysql_data` |
| **`phpmyadmin`** | `reactjs-avancado-phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | **`8085:80`** | Interface gráfica web conectada ao serviço `mysql:3306` |

---

## ⚙️ 2. Configuração do `.env` para Docker

1. Na raiz do projeto, copie o arquivo `.env.example` para `.env` (caso ainda não exista):
   ```bash
   cp .env.example .env
   ```
2. No arquivo `.env`, **comente** o bloco `# --- LOCAL ---` e **descomente** o bloco `# --- DOCKER ---`:
   ```env
   # --- DOCKER (Descomente para usar no Docker e comente o bloco LOCAL acima) ---
   APP_URL=http://localhost:8080
   REACT_APP_API_URL=http://localhost:8080
   PORT=3000
   DB_CONNECTION=mysql
   DB_HOST=mysql
   DB_PORT=3306
   DB_DATABASE=reactjs_avancado
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

---

## 🚀 3. Subindo os Containers

Execute o comando abaixo na raiz do projeto (`C:\Projetos\reactJs-avancado`):

```bash
docker compose up -d --build
```

Para verificar se todos os serviços estão saudáveis e em execução:

```bash
docker compose ps
```

---

## 🌐 4. Acessando os Serviços

Após o término do build e inicialização dos containers:

- **Aplicação Web (Via Nginx):** [http://localhost:8080](http://localhost:8080)
- **Healthcheck da Infraestrutura:** [http://localhost:8080/api/health](http://localhost:8080/api/health)
- **phpMyAdmin:** [http://localhost:8085](http://localhost:8085)
  - **Servidor:** `mysql`
  - **Usuário:** `root`
  - **Senha:** `root`
- **MySQL (via cliente externo como DBeaver/HeidiSQL):**
  - **Host:** `127.0.0.1`
  - **Porta:** `3308`
  - **Database:** `reactjs_avancado`
  - **Usuário / Senha:** `root` / `root`

---

## 🛠️ 5. Comandos Úteis de Manutenção Docker

```bash
# Visualizar logs em tempo real da aplicação e do Nginx
docker compose logs -f app nginx

# Reiniciar apenas o container da aplicação
docker compose restart app

# Parar os containers mantendo os dados do MySQL
docker compose down

# Parar os containers e remover volumes (reset completo)
docker compose down -v
```

Para credenciais dos 3 perfis de demonstração na tela de login, consulte [📄 ACESSOS_TESTES.md](./ACESSOS_TESTES.md).
