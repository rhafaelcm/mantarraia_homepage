# CLAUDE.md - Mantarraia Sistemas Landing Page

## Visão Geral

Este diretório contém o site institucional da Mantarraia Sistemas, acessível em `https://mantarraia.com.br`. É um site estático (HTML, CSS, JavaScript) que serve como vitrine institucional da softhouse, apresentando a empresa e seus produtos de software (RaiaDoc, RaiaAgenda, entre outros).

## Arquitetura

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilos personalizados com variáveis CSS
- **JavaScript (ES6+)**: Funcionalidades interativas
- **Bootstrap 5.3.0**: Framework CSS (via CDN)
- **Bootstrap Icons 1.11.0**: Biblioteca de ícones (via CDN)
- **Google Fonts (Roboto)**: Tipografia (via CDN)

### Estrutura de Arquivos

```
mantarraia_homepage/
├── index.html          # Landing page institucional
├── contato.html        # Página de contato
├── produtos.html       # Catálogo detalhado de produtos
├── css/
│   └── styles.css      # Estilos customizados (~700+ linhas)
├── js/
│   └── main.js         # Scripts JavaScript (~280+ linhas)
├── img/
│   ├── Mantarraia.png              # Logo principal colorida
│   ├── Mantarraia_Branca.png       # Logo branca (fundos escuros)
│   ├── Mantarraia_favicon.png      # Favicon
│   ├── Mantarraia_Branca_favicon.png
│   ├── Mantarraia Logo.svg         # Logo vetorial
│   └── oops-404.svg               # Imagem de erro 404
├── README.md           # Documentação de uso
└── CLAUDE.md           # Esta documentação técnica
```

## CSS (styles.css)

### Variáveis CSS (Root)
```css
:root {
  --primary-color: #667eea;   /* Roxo/azul principal */
  --secondary-color: #764ba2; /* Roxo escuro */
  --tertiary-color: #6b4699;  /* Roxo médio */
  --base-color: #6e65c7;      /* Roxo base */
  --gradient-bg: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}
```

### Principais Classes CSS

| Classe | Descrição |
|--------|-----------|
| `.navbar-raia` | Navbar com gradiente roxo |
| `.hero-section` | Seção hero com background gradiente |
| `.section` | Seção padrão com padding |
| `.section-light` | Fundo branco |
| `.section-gray` | Fundo cinza claro |
| `.section-gradient` | Fundo com gradiente |
| `.feature-card` | Card de funcionalidade (fundo branco) |
| `.product-card` | Card de produto no portfolio (com imagem) |
| `.product-image-placeholder` | Placeholder para screenshot de produto |
| `.product-badge` | Badge de status (Ativo / Em Breve) |
| `.product-detail-card` | Card expandido de produto (página produtos.html) |
| `.product-features` | Lista de funcionalidades dentro do card de produto |
| `.btn-product` | Botão "Acessar Site" com gradiente |
| `.btn-product-outline` | Botão outline para produtos |
| `.btn-produtos` | Botão destaque na navbar |
| `.advantage-card` | Card de vantagem (fundo transparente) |
| `.contact-card` | Card de contato centralizado |
| `.search-input` | Input de busca estilizado |
| `.page-header` | Header de páginas internas |
| `.footer-raia` | Footer com fundo roxo |

### Responsividade

Breakpoints seguem o padrão Bootstrap:
- `@media (max-width: 991.98px)`: Tablet
- `@media (max-width: 767.98px)`: Mobile
- `@media (max-width: 575.98px)`: Mobile pequeno

## JavaScript (main.js)

### Estrutura de Dados - Produtos

```javascript
const produtos = [
  {
    id: 1,
    nome: "RaiaDoc",
    categoria: "Gestão Municipal",
    descricao: "Descrição curta...",
    descricaoDetalhada: "Descrição completa...",
    url: "https://raiadoc.com.br",
    icone: "bi-building",
    imagem: null, // caminho da screenshot ou null para placeholder
    funcionalidades: ["Feature 1", "Feature 2", ...],
    status: "ativo" // "ativo" ou "em_breve"
  }
  // Adicionar novos produtos aqui
];
```

**Campos:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | Identificador único |
| `nome` | string | Nome do produto |
| `categoria` | string | Categoria do produto |
| `descricao` | string | Descrição curta (para cards compactos) |
| `descricaoDetalhada` | string | Descrição completa (para página de produtos) |
| `url` | string | URL do site do produto |
| `icone` | string | Classe Bootstrap Icons para o ícone |
| `imagem` | string/null | Caminho da imagem/screenshot ou null |
| `funcionalidades` | array | Lista de funcionalidades principais |
| `status` | string | "ativo" ou "em_breve" |

### Funções Principais

| Função | Descrição |
|--------|-----------|
| `initProductFilter()` | Inicializa filtro de busca de produtos |
| `renderProducts(list)` | Renderiza lista detalhada de produtos no DOM |
| `initNavbarScroll()` | Adiciona efeito de scroll na navbar |
| `initSmoothScroll()` | Scroll suave para links âncora |
| `initScrollAnimations()` | Animações ao scroll (Intersection Observer) |
| `initMobileMenu()` | Controle do menu mobile |
| `initYearUpdate()` | Atualiza ano no footer |
| `initBackToTop()` | Botão "voltar ao topo" |
| `initCounterAnimation()` | Animação de contadores |

### API Global

```javascript
window.Mantarraia = {
  produtos,          // Array de produtos
  renderProducts,    // Função de renderização
  initProductFilter  // Função de inicialização do filtro
};
```

## Páginas

### index.html - Landing Page Institucional

**Seções:**
1. **Navbar** - Fixa no topo, links de navegação, botão "Nossos Produtos"
2. **Hero Section** - Apresentação da Mantarraia como softhouse
3. **Sobre** (`#sobre`) - Quem é a Mantarraia
4. **Produtos** (`#produtos`) - Cards dos produtos (RaiaDoc, RaiaAgenda, Em Breve)
5. **Diferenciais** (`#diferenciais`) - Por que escolher a Mantarraia
6. **Nossos Números** - Estatísticas e diferenciais
7. **CTA Section** - Chamada para ação
8. **Footer** - Links e informações de contato

**SEO:**
- Meta description e keywords configurados
- Open Graph tags para compartilhamento
- Títulos semânticos (h1, h2, h3)

### contato.html - Contato

**Elementos:**
- Card central com e-mail de contato
- Três finalidades: Sugestões, Reportar Problemas, Contato Geral
- Cards informativos (tempo de resposta, suporte)
- Dicas para atendimento rápido

**E-mail:** `mantarraia.sistemas@gmail.com`

### produtos.html - Catálogo de Produtos

**Funcionalidades:**
- Campo de busca com filtro em tempo real
- Busca por nome, categoria ou descrição
- Cards detalhados com imagem, descrição, funcionalidades e link
- Badge de status (Ativo / Em Breve)
- Mensagem "Nenhum produto encontrado"
- Card informativo "Precisa de uma solução personalizada?"

## Produtos Atuais

| Produto | URL | Descrição |
|---------|-----|-----------|
| RaiaDoc | https://raiadoc.com.br | Gestão de documentação e contabilidade municipal |
| RaiaAgenda | https://raiaagenda.com.br | Gestão de agendamentos e reservas de horários |

## Deploy

### Opções de Hospedagem

1. **Servidor Web Estático**
   - Nginx, Apache, ou qualquer servidor HTTP
   - Configurar domínio `mantarraia.com.br` apontando para este diretório

2. **Serviços de Hospedagem**
   - Netlify, Vercel, GitHub Pages
   - CloudFlare Pages, AWS S3 + CloudFront

### Configuração Nginx Exemplo

```nginx
server {
  listen 80;
  listen 443 ssl;
  server_name mantarraia.com.br www.mantarraia.com.br;
  
  root /var/www/mantarraia_homepage;
  index index.html;
  
  # SSL configuration
  ssl_certificate /etc/letsencrypt/live/mantarraia.com.br/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mantarraia.com.br/privkey.pem;
  
  location / {
    try_files $uri $uri/ =404;
  }
  
  # Cache static assets
  location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
```

## Manutenção

### Adicionar Novo Produto
1. Edite `js/main.js`
2. Adicione objeto no array `produtos` com todos os campos
3. Os cards são renderizados automaticamente na página `produtos.html`
4. Para exibir na `index.html`, adicione manualmente um card na seção `#produtos`

### Adicionar Screenshot de Produto
1. Salve a imagem em `img/` (ex: `img/screenshot_raiadoc.png`)
2. Atualize o campo `imagem` do produto em `js/main.js`
3. Na `index.html`, substitua o placeholder pelo `<img>` na seção de produtos

### Atualizar Cores
1. Edite variáveis em `css/styles.css` (seção `:root`)
2. Mantenha consistência com os sites dos produtos

### Atualizar Conteúdo
- Textos institucionais em `index.html`
- Informações de contato em `contato.html` e footer de todas as páginas
- Dados de produtos em `js/main.js`

## Checklist de Qualidade

- [x] Responsivo em todos os dispositivos
- [x] Links funcionando corretamente
- [x] Imagens otimizadas
- [x] SEO básico configurado
- [x] Cores consistentes entre páginas
- [x] Catálogo de produtos funcional
- [x] Footer com ano dinâmico
- [x] Navegação clara entre páginas
- [x] Cards de produtos com placeholders para screenshots

## Histórico de Versões

### v2.0.0 (2026-02)
- Reformulação completa: de landing page RaiaDoc para site institucional Mantarraia
- Nova estrutura de páginas: index (institucional), produtos (catálogo), contato
- Sistema de catálogo de produtos com filtro
- Cards de produto com placeholders para screenshots
- Badges de status (Ativo / Em Breve)
- Branding atualizado para Mantarraia Sistemas

### v1.0.0 (2025-01)
- Criação inicial da landing page (RaiaDoc)
- Três páginas: index, contato, prefeituras
- Sistema de filtro de prefeituras
- Design responsivo com Bootstrap 5
- Documentação completa
