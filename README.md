# 🗺️ Around — EUA Afora (React)

**Around (EUA Afora)** é uma aplicação web interativa de compartilhamento de fotos,
desenvolvida com **`React`** e **`Vite`**, que oferece operações completas de **`CRUD`**
para cartões, gerenciamento de perfil e avatar do usuário, além de **integração com
`API REST`**.

Este projeto representa a versão em `React` da aplicação original _Around - EUA Afora_,
desenvolvida durante as **Sprints 13 e 14** do **bootcamp de Desenvolvimento Web da**
**TripleTen**, com foco em **arquitetura baseada em componentes**, **gerenciamento de**
**estado** e **padrões declarativos de interface**.

> 📘 **Documentação técnica**
>
> Este repositório também conta com um **README técnico** contendo explicações
> aprofundadas sobre decisões arquiteturais, gerenciamento de estado, uso de hooks e
> detalhes de implementação. Você pode acessá-lo
> [aqui.](https://github.com/VanessaYuriAB/web_project_around_react/blob/main/README.technical.md)

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-acesse_aqui-blue)](https://vanessayuriab.github.io/web_project_around_react/)

---

## 📌 Escopo do projeto

Este repositório contém a **versão `React`** do projeto **Around**, implementando:

- Interface responsiva baseada em layouts do `Figma`
- Arquitetura de componentes modular e reutilizável
- Gerenciamento de estado com `React Hooks`
- Compartilhamento de estado global via `Context API`
- Integração completa com `API REST` (`CRUD`)
- Renderização declarativa e controle de efeitos colaterais

---

## 📈 Evolução técnica (Sprints 13–14)

### 🔹 Sprint 13 — Introdução ao React.js

- Configuração do projeto com **Vite + React**
- Portabilidade do HTML para **JSX**
- Separação em componentes (`App`, `Header`, `Main`, `Footer`, `Card`, `Popup`)
- Arquitetura reutilizável de popups usando composição (`children`)
- Controle de estado da interface com `useState`
- Renderização declarativa com `.map()` e renderização condicional em `JSX`

### 🔸 Sprint 14 — Roteamento React e Gerenciamento de Estado

- Camada de API centralizada (`utils/api.js`)
- Estado global do usuário via **Context API**
- Elevação de estado para o componente raiz (`App`)
- Integração completa de **CRUD**:
  - Busca dos dados de usuário e cartões
  - Adição, curtida/descurtida e exclusão de cartões
  - Edição de perfil e avatar
- Otimização do carregamento inicial com `Promise.all`
- Efeitos colaterais controlados com `useEffect`
- Atualizações de estado seguras e imutáveis

---

## 🧠 Principais conceitos aplicados

- Componentes funcionais no **React**
- Hooks (`useState`, `useEffect`, `useContext`, `useRef`)
- Interface declarativa e renderização condicional
- Elevação de estado e controle de **prop drilling**
- `Context API` para estado global compartilhado
- Consumo de **API REST** com `async/await`
- Arquitetura modular e separação de responsabilidades
- Design responsivo com **CSS** + **BEM Flat**

---

## 🛠️ Tecnologias

- React
- Vite
- JavaScript (ES6+)
- API REST
- CSS (Flexbox, Grid, Media Queries)
- BEM / BEM Flat
- ESLint & Prettier
- PostCSS

---

## 🎥 Demonstração

Para assistir ao vídeo no Loom, clique [aqui.](https://www.loom.com/share/8b5c133948d34391a54148bd0d6b48ad?sid=99d89ceb-3b42-4295-a79e-c55e1536585f)

---

## 🌐 Projeto online

🔗 GitHub Pages: https://vanessayuriab.github.io/web_project_around_react/

---

## 🚀 Melhorias futuras

- Centralização do gerenciamento de popups com `useReducer`
- Estados globais de carregamento e tratamento de erros
- Componentes de feedback visual (`spinners`)
- Padronização de mensagens de erro retornadas pela `API`
- Melhorias de acessibilidade
