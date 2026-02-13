/**
 * Mantarraia Sistemas - Landing Page - Main JavaScript
 * Funcionalidades: Catálogo de produtos, filtro, smooth scroll, navbar, animações
 */

// ========================================
// Lista de Produtos (Escalável)
// ========================================
const produtos = [
    {
        id: 1,
        nome: "RaiaDoc",
        categoria: "Gestão Municipal",
        descricao: "Sistema completo de gestão de documentação e contabilidade municipal, desenvolvido para atender prefeituras e órgãos públicos com eficiência e transparência.",
        descricaoDetalhada: "O RaiaDoc é um sistema de gestão de documentação e contabilidade municipal desenvolvido especialmente para atender às necessidades de prefeituras e órgãos públicos. A plataforma centraliza todo o processo de gestão financeira, desde o registro de empenhos até o controle de pagamentos, oferecendo uma solução integrada que simplifica o trabalho da administração pública.",
        url: "https://raiadoc.com.br",
        icone: "bi-building",
        imagem: "img/raiadoc_painel-600px.png",
        funcionalidades: [
            "Gestão de Empenhos",
            "Liquidações e Aprovações",
            "Controle de Pagamentos",
            "Anexação de Documentos",
            "Importação Automática de Dados",
            "Pesquisa Avançada",
            "Multi-usuário com níveis de acesso"
        ],
        status: "ativo"
    },
    {
        id: 2,
        nome: "RaiaAgenda",
        categoria: "Gestão de Agendamentos",
        descricao: "Plataforma inteligente para agendamento e reserva de horários, ideal para escolas, laboratórios e espaços compartilhados.",
        descricaoDetalhada: "O RaiaAgenda é uma plataforma de agendamento e reserva de horários desenvolvida para facilitar a organização de espaços compartilhados. Ideal para escolas que precisam gerenciar salas de tecnologia, laboratórios e outros ambientes, o sistema permite que os usuários realizem reservas de forma prática e organizada, evitando conflitos de horário e otimizando o uso dos recursos.",
        url: "https://raiaagenda.com.br",
        icone: "bi-calendar-check",
        imagem: "img/raiaagenda_painel-600px.png",
        funcionalidades: [
            "Agendamento de salas e espaços",
            "Reserva de horários",
            "Visualização de disponibilidade",
            "Gerenciamento de recursos",
            "Controle de conflitos de horário",
            "Interface intuitiva e responsiva"
        ],
        status: "ativo"
    }
    // Novos produtos podem ser adicionados aqui seguindo o mesmo padrão:
    // {
    //     id: 3,
    //     nome: "NovoProduto",
    //     categoria: "Categoria",
    //     descricao: "Descrição curta...",
    //     descricaoDetalhada: "Descrição completa...",
    //     url: "https://novoproduto.com.br",
    //     icone: "bi-icon-name",
    //     imagem: null,
    //     funcionalidades: ["Feature 1", "Feature 2"],
    //     status: "ativo" // ou "em_breve"
    // }
];

// ========================================
// Filtro de Produtos (Página produtos.html)
// ========================================
function initProductFilter() {
    const searchInput = document.getElementById('searchProduto');
    const productsList = document.getElementById('produtosList');
    const noResults = document.getElementById('noResults');

    if (!searchInput || !productsList) return;

    // Renderiza a lista inicial
    renderProducts(produtos);

    // Adiciona evento de busca
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderProducts(produtos);
            return;
        }

        const filtered = produtos.filter(prod => {
            return prod.nome.toLowerCase().includes(searchTerm) ||
                   prod.categoria.toLowerCase().includes(searchTerm) ||
                   prod.descricao.toLowerCase().includes(searchTerm);
        });

        renderProducts(filtered);
    });
}

// ========================================
// Renderizar Produtos (Página produtos.html)
// ========================================
function renderProducts(list) {
    const productsList = document.getElementById('produtosList');
    const noResults = document.getElementById('noResults');

    if (!productsList) return;

    if (list.length === 0) {
        productsList.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
        return;
    }

    if (noResults) {
        noResults.style.display = 'none';
    }

    productsList.innerHTML = list.map(prod => `
        <div class="col-lg-6 mb-4">
            <div class="product-detail-card">
                <div class="product-detail-image">
                    ${prod.imagem 
                        ? `<img src="${prod.imagem}" alt="${prod.nome}">`
                        : `<i class="bi ${prod.icone}"></i>`
                    }
                </div>
                <div class="product-detail-body">
                    <div class="product-detail-header">
                        <h3 class="product-detail-name">${prod.nome}</h3>
                        <span class="product-badge ${prod.status === 'ativo' ? 'badge-ativo' : 'badge-soon'}">
                            ${prod.status === 'ativo' ? 'Ativo' : 'Em Breve'}
                        </span>
                    </div>
                    <p class="product-detail-category">${prod.categoria}</p>
                    <p class="product-detail-description">${prod.descricaoDetalhada}</p>
                    <h6 class="mb-2 fw-bold">Principais funcionalidades:</h6>
                    <ul class="product-features">
                        ${prod.funcionalidades.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    ${prod.status === 'ativo' 
                        ? `<a href="${prod.url}" class="btn btn-product">
                               <i class="bi bi-box-arrow-up-right me-2"></i>Acessar Site
                           </a>`
                        : `<span class="btn btn-product-outline" style="cursor: default; opacity: 0.7;">
                               <i class="bi bi-clock me-2"></i>Em Desenvolvimento
                           </span>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-raia');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar-raia')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animation (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (!navbarToggler || !navbarCollapse) return;

    // Fecha o menu ao clicar em um link
    navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ========================================
// Year Update for Footer
// ========================================
function initYearUpdate() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Initialize All Functions
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initYearUpdate();
    initBackToTop();
    initCounterAnimation();
    initProductFilter();
});

// ========================================
// Export Functions (for external use)
// ========================================
if (typeof window !== 'undefined') {
    window.Mantarraia = {
        produtos,
        renderProducts,
        initProductFilter
    };
}
