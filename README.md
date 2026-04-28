# Felipe Cabral de Aquino — Portfólio

Portfólio pessoal desenvolvido com React, Vite e TailwindCSS. Apresenta projetos, habilidades e informações de contato com foco em estética minimalista dark, animações de scroll e uma animação interativa de rede neural no hero.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | UI e gerenciamento de estado |
| Vite | 8 | Bundler e dev server |
| TailwindCSS | 4 | Estilização utilitária |
| React Router DOM | 7 | Roteamento SPA |
| react-syntax-highlighter | 16 | Exibição de código com syntax highlight |

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── Navbar.jsx            # Barra de navegação fixa com blur no scroll
│   ├── Hero.jsx              # Seção inicial com animação de neurônios
│   ├── NeuralBackground.jsx  # Canvas com rede neural interativa
│   ├── About.jsx             # Seção sobre mim — foto, bio e skills
│   ├── Projects.jsx          # Grid de projetos com visualizador inline
│   ├── CodeView.jsx          # Visualizador de código com syntax highlight
│   ├── DemoView.jsx          # Visualizador de demo via iframe
│   ├── ProjectModal.jsx      # Modal auxiliar de projetos
│   ├── Contact.jsx           # Links de contato
│   └── Footer.jsx            # Rodapé
├── hooks/
│   └── useScrollAnimation.js # Hook de animação por IntersectionObserver
├── pages/
│   └── Home.jsx              # Página principal — compõe todas as seções
└── App.jsx                   # Roteador raiz
```

---

## Funcionalidades

### Animação de Rede Neural
A seção Hero exibe um canvas com nós em movimento constante conectados por linhas, formando uma rede neural. Ao mover o mouse sobre a área, os nós próximos recebem um impulso na direção do movimento — sem seguir literalmente o cursor.

### Animações de Scroll
Todos os elementos utilizam `IntersectionObserver` via `useScrollAnimation`. Os elementos aparecem com fade-in ao entrar no viewport e desaparecem com fade-out ao sair, criando uma experiência fluida de rolagem.

### Visualizador de Projetos
Cada card de projeto pode ter dois tipos de conteúdo:
- **Demo** — abre um `DemoView` inline abaixo dos cards com iframe do site em produção
- **Código** — abre um `CodeView` inline com trechos de código em syntax highlight, suportando múltiplos arquivos com abas

Ambos os visualizadores abrem diretamente na seção de projetos, sem navegação para outra página, com transição de fade-in/out.

---

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar build
npm run preview
```

---

## Como Personalizar

### Informações pessoais
Edite os textos em `Hero.jsx` e `About.jsx` diretamente nos componentes.

### Foto de perfil
Coloque os arquivos na pasta `public/` e referencie via caminho absoluto:
```jsx
<img src="/sua-foto.jpg" alt="Foto" className="w-34 h-34 rounded-full object-cover" />
```

### Adicionar projetos
Em `Projects.jsx`, adicione um objeto ao array `projects`:
```js
{
  title: 'Nome do Projeto',
  description: 'Descrição curta do que o projeto faz.',
  tags: ['React', 'Node.js'],
  href: 'https://seu-deploy.vercel.app',  // null se não houver demo pública
  codeSnippets: [
    {
      filename: 'index.js',
      language: 'javascript',
      code: `// seu código aqui`,
    },
  ],
}
```

### Links de contato
Edite o array `contacts` em `Contact.jsx` com seus dados reais.

### Skills
Edite o array `skills` em `About.jsx`.

---

## Deploy

O projeto pode ser publicado em qualquer plataforma que suporte aplicações estáticas:

```bash
npm run build
# A pasta dist/ contém os arquivos prontos para deploy

