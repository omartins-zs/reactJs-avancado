# 💻 Como Executar Localmente — ReactJS Avançado (DIO)

Este guia descreve o passo a passo completo para configurar e executar o projeto **ReactJS Avançado** diretamente na sua máquina local, bem como executar qualquer um dos 10 subprojetos individuais.

---

## 🛠️ 1. Ambiente de Referência

O projeto foi validado e padronizado utilizando as seguintes ferramentas e versões de referência:

| Ferramenta | Versão de Referência | Observação |
| :--- | :--- | :--- |
| **Laragon** | `6.0.0` | Ambiente de desenvolvimento local (MySQL na porta `3307`) |
| **PHP** | `8.4.6` | Runtime de apoio no ecossistema Laragon |
| **Composer** | `2.8.12` | Gerenciador de pacotes do ecossistema local |
| **Laravel** | `13.15.0` | Referência de stack da suíte local |
| **Node.js** | `22.14.0` (ou `18+` / `20+`) | Requer `NODE_OPTIONS=--openssl-legacy-provider` para `react-scripts` 4.x |
| **NPM** | `11.4.2` (ou `9+` / `10+`) | Gerenciador de pacotes JavaScript |

---

## 📦 2. Passo a Passo — Portal Unificado (Raiz do Projeto)

### 2.1. Configurar o arquivo `.env`
Na raiz do repositório (`C:\Projetos\reactJs-avancado`), crie o arquivo `.env` a partir do `.env.example`:

```bash
cp .env.example .env
```

Certifique-se de que o bloco **`# --- LOCAL ---`** esteja descomentado (ativo por padrão) e o bloco **`# --- DOCKER ---`** esteja comentado:

```env
# --- LOCAL (Padrão: Laragon / Execução Direta) ---
APP_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:3000
PORT=3000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=reactjs_avancado
DB_USERNAME=root
DB_PASSWORD=
```

### 2.2. Instalar as dependências
```bash
npm install --legacy-peer-deps
```

### 2.3. Iniciar o servidor de desenvolvimento
> **Nota para Node.js 18 / 20 / 22+:** Como o projeto utiliza `react-scripts@4.0.3` (Webpack 4), defina a variável `NODE_OPTIONS=--openssl-legacy-provider` caso sua versão do Node.js seja superior à 16.

**No PowerShell (Windows):**
```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

**No Bash / Linux / macOS:**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

A aplicação será aberta automaticamente em:
- **URL Local:** [http://localhost:3000](http://localhost:3000)

---

## 🧩 3. Executando Módulos Individuais (Opcional)

Além do portal unificado na raiz, cada aula possui diretórios independentes que também podem ser executados separadamente:

| Aula | Diretório do Módulo | Comando para Executar |
| :--- | :--- | :--- |
| **Aula 1** | `life-cycle/` | `cd life-cycle && npm install --legacy-peer-deps && npm start` |
| **Aula 1** | `hooks/` | `cd hooks && npm install --legacy-peer-deps && npm start` |
| **Aula 1** | `context-api/` | `cd context-api && npm install --legacy-peer-deps && npm start` |
| **Aula 2** | `fragments/` | `cd fragments && npm install --legacy-peer-deps && npm start` |
| **Aula 2** | `error-boundaries/` | `cd error-boundaries && npm install --legacy-peer-deps && npm start` |
| **Aula 2** | `render-props/` | `cd render-props && npm install --legacy-peer-deps && npm start` |
| **Aula 2** | `type-checking/` | `cd type-checking && npm install --legacy-peer-deps && npm start` |
| **Aula 2** | `refs-dom/` | `cd refs-dom && npm install --legacy-peer-deps && npm start` |
| **Aula 3** | `dumb-components/` | `cd dumb-components && npm install --legacy-peer-deps && npm start` |
| **Aula 3** | `smart-components/` | `cd smart-components && npm install --legacy-peer-deps && npm start` |
| **Aula 3** | `structure-project/` | `cd structure-project && npm install --legacy-peer-deps && npm start` |

---

## 🧪 4. Testes e Build de Produção Local

```powershell
# Executar testes automatizados
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm test -- --watchAll=false

# Gerar build otimizado na pasta build/
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```

Para credenciais de login e roteiros de validação, consulte [📄 ACESSOS_TESTES.md](./ACESSOS_TESTES.md).
