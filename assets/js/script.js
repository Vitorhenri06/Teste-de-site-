// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Filtro de Portfólio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('[data-category]');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.animation = 'fadeInUp 0.5s ease-out';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Animação de entrada das seções
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll(
  '.about-content, .services-grid, .portfolio-grid, .service-card, ' +
  '.portfolio-item, .skill-card, .stat-card, .package-card, .case-study, ' +
  '.timeline-item, .faq-item, .process-step'
);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  observer.observe(el);
});

// Navegação ativa baseada na scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href.includes(current) && current !== '') {
      link.classList.add('active');
    }
  });
});

// Form Submission (Contato)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    if (formMessage) {
      formMessage.innerHTML = '<p style="color: #3b82f6;">Enviando sua mensagem...</p>';
      formMessage.style.display = 'block';
    }
  });
}

// Fechar menu com tecla Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  }
});

// Adicionar feedback visual ao clicar em cards
document.querySelectorAll('.service-card, .portfolio-item, .package-card, .skill-card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });
});

// Detectar se é dispositivo móvel
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Site carregado com sucesso!');
  
  const firstFilterBtn = document.querySelector('.filter-btn');
  if (firstFilterBtn) {
    firstFilterBtn.click();
  }

  if (isMobileDevice()) {
    console.log('📱 Dispositivo mobile detectado');
  };
});

// Animação de entrada para elementos específicos
const specificAnimateElements = document.querySelectorAll('.about-content, .services-grid, .portfolio-grid');
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(el);


// Header fixo com mudança de cor no scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.backgroundColor = 'white';
    header.style.backdropFilter = 'none';
  }
});

// Formulário de contato com Gmail API - removido, agora usa formsubmit.co diretamente
// const contactForm = document.getElementById('contact-form');
// const formMessage = document.getElementById('form-message');
// const submitBtn = document.getElementById('submit-btn');
// const btnText = document.getElementById('btn-text');
// const btnLoading = document.getElementById('btn-loading');

// if (contactForm) {
//   contactForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // Mostrar loading
//     submitBtn.disabled = true;
//     btnText.style.display = 'none';
//     btnLoading.style.display = 'inline';

//     // Limpar mensagens anteriores
//     formMessage.innerHTML = '';
//     formMessage.className = 'form-message';

//     // Coletar dados do formulário
//     const formData = new FormData(contactForm);
//     const data = Object.fromEntries(formData);

//     try {
//       // Enviar para o backend
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Sucesso
//         formMessage.className = 'form-message success';
//         formMessage.innerHTML = '<p>✅ ' + result.message + '</p>';
//         contactForm.reset();
//       } else {
//         // Erro
//         formMessage.className = 'form-message error';
//         formMessage.innerHTML = '<p>❌ ' + result.message + '</p>';
//       }
//     } catch (error) {
//       console.error('Erro:', error);
//       formMessage.className = 'form-message error';
//       formMessage.innerHTML = '<p>❌ Erro ao enviar mensagem. Tente novamente.</p>';
//     } finally {
//       // Esconder loading
//       submitBtn.disabled = false;
//       btnText.style.display = 'inline';
//       btnLoading.style.display = 'none';
//     }
//   });
// }