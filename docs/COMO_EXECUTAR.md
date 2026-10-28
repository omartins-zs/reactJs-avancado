# 🚀 Como Executar o Projeto — ReactJS Avançado (DIO)

Este projeto conta com suporte completo para execução em **Ambiente Local** (Node.js / Laragon) e em **Ambiente Docker** (containers isolados com Nginx, Node.js, MySQL e phpMyAdmin).

---

## 📋 Escolha o seu Modo de Execução

| Modo de Execução | Guia Detalhado | Porta Principal | Quando Utilizar |
| :--- | :--- | :--- | :--- |
| 💻 **Execução Local** | [📄 COMO_EXECUTAR_LOCAL.md](./COMO_EXECUTAR_LOCAL.md) | `http://localhost:3000` | Desenvolvimento diário com Hot Reload no host local |
| 🐳 **Execução via Docker** | [📄 COMO_EXECUTAR_DOCKER.md](./COMO_EXECUTAR_DOCKER.md) | `http://localhost:8080` | Ambiente padronizado de produção/homologação sem instalar dependências no host |
| 🔐 **Acessos e Testes** | [📄 ACESSOS_TESTES.md](./ACESSOS_TESTES.md) | — | Credenciais de login (1 clique), perfis de teste e roteiro de validação |

---

## ⚙️ Alternância Rápida no Arquivo `.env`

O arquivo `.env` na raiz do projeto já possui os dois blocos pré-configurados (`# LOCAL` e `# DOCKER`):

1. **Para rodar Localmente** (padrão ativo):
   - Mantenha o bloco `# --- LOCAL ---` descomentado (`APP_URL=http://localhost:3000`, `DB_HOST=127.0.0.1`, `DB_PORT=3307`).
   - Mantenha o bloco `# --- DOCKER ---` comentado.
2. **Para rodar no Docker**:
   - Comente o bloco `# --- LOCAL ---`.
   - Descomente o bloco `# --- DOCKER ---` (`APP_URL=http://localhost:8080`, `DB_HOST=mysql`, `DB_PORT=3306`).

---

## ⚡ Resumo Rápido de Comandos

### Opção A — Rodar Localmente
```bash
cp .env.example .env
npm install --legacy-peer-deps
npm start
```
Acesse: **[http://localhost:3000](http://localhost:3000)**

### Opção B — Rodar com Docker
```bash
cp .env.example .env
docker compose up -d --build
```
Acesse: **[http://localhost:8080](http://localhost:8080)** (Aplicação) e **[http://localhost:8085](http://localhost:8085)** (phpMyAdmin)
