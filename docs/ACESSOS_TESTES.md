# 🔐 Guia de Acessos e Testes — ReactJS Avançado (DIO)

Este documento reúne todas as informações de acesso, credenciais de demonstração e roteiros práticos para testar o portal interativo **ReactJS Avançado** e seus 10 módulos de arquitetura.

---

## 🌐 1. URLs de Acesso Rápido

| Serviço | Ambiente Local | Ambiente Docker | Descrição |
| :--- | :--- | :--- | :--- |
| **Aplicação Web (Portal React)** | [http://localhost:3000](http://localhost:3000) | [http://localhost:8080](http://localhost:8080) | Portal interativo com Login e os 10 módulos |
| **Healthcheck (Nginx / API)** | — | [http://localhost:8080/api/health](http://localhost:8080/api/health) | Verificação de disponibilidade do container |
| **phpMyAdmin** | [http://localhost/phpmyadmin](http://localhost/phpmyadmin) | [http://localhost:8085](http://localhost:8085) | Gerenciador visual do banco de dados MySQL |
| **MySQL (Conexão Externa)** | `127.0.0.1:3307` | `127.0.0.1:3308` | Porta para clientes SQL (DBeaver, HeidiSQL, etc.) |

---

## 👤 2. Credenciais de Acesso (Perfis de Demonstração)

A tela de login possui **botões de preenchimento automático em 1 clique**, além de aceitar autenticação manual com as credenciais abaixo:

| Perfil / Papel | Nome de Exibição | E-mail / Login | Senha | Permissões e Escopo |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador** | Administrador DIO | `admin@reactjs.com` | `Password@123` | Acesso total aos 10 laboratórios, telemetria e console de ciclo de vida |
| **Instrutor** | Bruno Carneiro (Instrutor) | `instrutor@reactjs.com` | `Password@123` | Modo aula, inspeção de propriedades, Context API e Error Boundaries |
| **Aluno** | Gabriel Martins (Aluno) | `aluno@reactjs.com` | `Password@123` | Execução prática dos exercícios das Aulas 1, 2 e 3 |

---

## 🗄️ 3. Credenciais de Banco de Dados e Infraestrutura

| Parâmetro | Ambiente Local (Laragon) | Ambiente Docker (`docker-compose`) |
| :--- | :--- | :--- |
| **Host Interno** | `127.0.0.1` | `mysql` |
| **Porta** | `3307` | `3306` (interna) / `3308` (host externo) |
| **Banco de Dados** | `reactjs_avancado` | `reactjs_avancado` |
| **Usuário** | `root` | `root` |
| **Senha** | *(vazio)* | `root` |

---

## 🧪 4. Roteiro Passo a Passo de Testes Funcionais

### 4.1. Fluxo de Autenticação e Sessão
1. Acesse a URL principal do sistema (`http://localhost:3000` localmente ou `http://localhost:8080` via Docker).
2. Na tela de login, clique em um dos botões de **Acesso Rápido (1 Clique)** — por exemplo, **Administrador** (`admin@reactjs.com`) — ou preencha o e-mail e a senha `Password@123` manualmente e clique em **Entrar na Plataforma**.
3. Verifique no topo da página se o nome do usuário e o perfil aparecem corretamente no badge de sessão.
4. Recarregue a página (`F5`) para confirmar que a sessão permanece ativa via `localStorage`.
5. Clique no botão **Tema: Escuro / Claro** no cabeçalho para validar a troca instantânea de tema via `ThemeContext`.
6. Clique no botão vermelho **Sair** para encerrar a sessão e confirmar o retorno imediato à tela de login.

### 4.2. Validação dos 10 Módulos Avançados (Aulas 1, 2 e 3)
1. **1. Ciclo de Vida (`./life-cycle`)**: Clique em *Alternar Loading* e *Remover Componente (Unmount)* e observe os registros gerados no **Console de Telemetria e Ciclo de Vida**.
2. **2. React Hooks & Memo (`./hooks`)**: Clique em *Atualizar Tweet (Re-render)* e em *Inverter prop loading* para validar o comportamento de `useState`, `useEffect` e `React.memo`.
3. **3. Context API (`./context-api`)**: Clique em *Revogar Token do Contexto* para visualizar o bloqueio condicional do formulário (`É necessário realizar o login!`) e clique em *Gerar Token no Contexto* para restaurar o formulário autenticado.
4. **4. Fragments (`./fragments`)**: Inspecione a tabela renderizada com `<Fragment>` sem elementos `<div>` inválidos entre `<tbody>` e `<tr>`.
5. **5. Error Boundaries (`./error-boundaries`)**: Clique em *Disparar Erro no Componente Filho* para acionar `componentDidCatch` e exibir a UI de Fallback sem derrubar a aplicação; em seguida, clique em *Restaurar Componente*.
6. **6. Render Props (`./render-props`)**: Utilize os botões *Adicionar 1*, *Remover 1* e *Zerar* injetados dinamicamente pela prop `render` do componente `Counter`.
7. **7. Type Checking (`./type-checking`)**: Altere os campos de cães, gatos, nome do cliente e status (`Completed` / `Disabled`) e clique em *Iniciar Banho*.
8. **8. Refs & DOM (`./refs-dom`)**: Clique em *Focar Input* para acionar `inputRef.current.focus()` e em *Somar +100 ao Ref* para testar mutação de `useRef`.
9. **9. Dumb & Smart Components (`./dumb-components` & `./smart-components`)**: Digite valores numéricos na calculadora desacoplada e remova itens da `PhotosGallery`.
10. **10. Structure Project (`./structure-project`)**: Digite textos com espaços e caracteres especiais para validar ao vivo as funções `sanitizeString` e `removeSpace`.

### 4.3. Execução de Testes Automatizados (Jest + Testing Library)
```bash
# Na raiz do projeto
npm test -- --watchAll=false
```
