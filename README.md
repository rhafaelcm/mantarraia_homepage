# Mantarraia Sistemas - Site Institucional

Site institucional da Mantarraia Sistemas, disponível em https://mantarraia.com.br

## Visão Geral

Este diretório contém as páginas estáticas do site institucional da Mantarraia Sistemas, uma softhouse brasileira especializada no desenvolvimento de soluções em software. O site serve como vitrine da empresa e seus produtos (RaiaDoc, RaiaAgenda, entre outros).

## Estrutura de Arquivos

```
mantarraia_homepage/
├── index.html          # Página principal (landing page institucional)
├── contato.html        # Página de contato
├── produtos.html       # Catálogo detalhado de produtos
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── main.js         # Scripts JavaScript
├── img/
│   ├── Mantarraia.png              # Logo colorida
│   ├── Mantarraia_Branca.png       # Logo branca (para fundos escuros)
│   ├── Mantarraia_favicon.png      # Favicon colorido
│   ├── Mantarraia_Branca_favicon.png # Favicon branco
│   ├── Mantarraia Logo.svg         # Logo vetorial
│   └── oops-404.svg               # Imagem de erro 404
├── README.md           # Esta documentação
└── CLAUDE.md           # Documentação técnica detalhada
```

## Páginas

### index.html - Página Principal
- Hero section com apresentação da Mantarraia Sistemas
- Seção "Quem é a Mantarraia?"
- Portfolio de produtos (RaiaDoc, RaiaAgenda, Em Breve)
- Diferenciais da empresa
- Nossos números (estatísticas)
- CTA (Call to Action) para contato
- Footer com links úteis

### contato.html - Página de Contato
- Informações de contato
- E-mail: mantarraia.sistemas@gmail.com
- Finalidades: sugestões, reportar problemas, contato geral
- Dicas para atendimento mais rápido

### produtos.html - Catálogo de Produtos
- Campo de busca com filtro em tempo real
- Cards detalhados de cada produto
- Descrição, funcionalidades e link de acesso
- Badge de status (Ativo / Em Breve)

## Como Rodar Localmente

### Opção 1: Servidor HTTP Simples (Python)
```bash
cd mantarraia_homepage
python -m http.server 8000
```
Acesse: http://localhost:8000

### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Nginx

Configuração completa do vhost para produção:

```nginx
# Redireciona www para domínio principal
server {
  listen 80;
  listen [::]:80;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  {{ssl_certificate_key}}
  {{ssl_certificate}}
  server_name www.mantarraia.com.br;
  return 301 https://mantarraia.com.br$request_uri;
}

# Servidor principal
server {
  listen 80;
  listen [::]:80;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  {{ssl_certificate_key}}
  {{ssl_certificate}}
  server_name mantarraia.com.br www1.mantarraia.com.br;
  {{root}}

  {{nginx_access_log}}
  {{nginx_error_log}}

  # Força HTTPS
  if ($scheme != "https") {
    rewrite ^ https://$host$uri permanent;
  }

  location ~ /.well-known {
    auth_basic off;
    allow all;
  }

  {{settings}}

  index index.html;

  # Cache para arquivos estáticos
  location ~* ^.+\.(css|js|jpg|jpeg|gif|png|ico|gz|svg|svgz|ttf|otf|woff|woff2|eot|mp4|ogg|ogv|webm|webp|zip|swf)$ {
    add_header Access-Control-Allow-Origin "*";
    expires max;
    access_log off;
  }

  # Redireciona páginas não encontradas para a página principal
  location / {
    try_files $uri $uri/ /index.html;
  }

  if (-f $request_filename) {
    break;
  }
}
```

**Observações:**
- As variáveis entre `{{}}` são substituídas pelo painel de hospedagem (ex: CloudPanel, Plesk)
- O `try_files` garante que URLs inexistentes sejam redirecionadas para `index.html`
- Arquivos estáticos são cacheados com `expires max` para melhor performance

## Adicionar Novo Produto

Para adicionar um novo produto ao catálogo, edite o arquivo `js/main.js`:

```javascript
const produtos = [
    // ... produtos existentes ...
    {
        id: 3,
        nome: "NovoProduto",
        categoria: "Categoria",
        descricao: "Descrição curta do produto...",
        descricaoDetalhada: "Descrição completa do produto...",
        url: "https://novoproduto.com.br",
        icone: "bi-icon-name",       // Ícone do Bootstrap Icons
        imagem: null,                 // Caminho da screenshot ou null
        funcionalidades: [
            "Funcionalidade 1",
            "Funcionalidade 2"
        ],
        status: "ativo"              // "ativo" ou "em_breve"
    }
];
```

### Sobre o campo `imagem`:
- Se o produto tiver uma screenshot, coloque o arquivo em `img/` e informe o caminho
- Se não houver imagem, use `null` - será exibido um ícone placeholder
- Formatos recomendados: PNG ou JPG (otimizados para web)

### Para exibir na página principal:
Adicione manualmente um card na seção `#produtos` do `index.html`, seguindo o padrão dos cards existentes.

## Dependências Externas (CDN)

- **Bootstrap 5.3.0**: Framework CSS
- **Bootstrap Icons 1.11.0**: Biblioteca de ícones
- **Google Fonts (Roboto)**: Tipografia

## Paleta de Cores

| Variável | Cor | Uso |
|----------|-----|-----|
| `--primary-color` | #667eea | Cor primária (roxo/azul) |
| `--secondary-color` | #764ba2 | Cor secundária (roxo escuro) |
| `--tertiary-color` | #6b4699 | Cor terciária |
| `--base-color` | #6e65c7 | Cor base principal |

## Produtos

| Produto | URL | Descrição |
|---------|-----|-----------|
| RaiaDoc | https://raiadoc.com.br | Gestão de documentação e contabilidade municipal |
| RaiaAgenda | https://raiaagenda.com.br | Gestão de agendamentos e reservas de horários |

## Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: >= 992px

## Manutenção

### Atualizar Ano do Footer
O ano é atualizado automaticamente via JavaScript (`main.js`).

### Alterar E-mail de Contato
Edite os arquivos `contato.html` e `index.html` (seção footer).

### Modificar Estilos
Todos os estilos personalizados estão em `css/styles.css`.

## Contribuição

Para contribuir com melhorias:
1. Mantenha a consistência visual entre as páginas
2. Teste em diferentes dispositivos e navegadores
3. Siga as cores e padrões definidos
4. Atualize a documentação quando necessário

## Licença

Este projeto utiliza uma **licença proprietária** (source-available). O código está disponível para visualização, mas seu uso, cópia, modificação ou distribuição requer autorização prévia.

Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

Para solicitar autorização de uso: mantarraia.sistemas@gmail.com

© 2025 Mantarraia Sistemas. Todos os direitos reservados.
