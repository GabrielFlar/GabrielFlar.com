// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Efecto de escritura en el título principal
const texts = ["Desarrollador Full Stack", "Creador de Experiencias", "Solucionador de Problemas"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeWriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Iniciar efecto de escritura
document.addEventListener('DOMContentLoaded', function() {
  typeWriter();
});

// Crear partículas flotantes
function createParticle() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  particle.style.animationDelay = Math.random() * 2 + 's';
  
  particlesContainer.appendChild(particle);
  
  // Remover partícula después de la animación
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, 5000);
}

// Generar partículas cada 300ms
setInterval(createParticle, 300);

// Cambiar fondo de navegación al hacer scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
  }
});

// Intersection Observer para animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0.2s';
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observar todas las secciones
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

// Validación de formulario y integración con WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  const contactButton = document.querySelector('.contact-form button');
  if (contactButton) {
    contactButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const nameInput = document.querySelector('input[placeholder="Tu nombre"]');
      const emailInput = document.querySelector('input[placeholder="Tu correo electrónico"]');
      const messageInput = document.querySelector('textarea[placeholder="Tu mensaje"]');
      
      if (!nameInput || !emailInput || !messageInput) {
        console.error('No se encontraron los campos del formulario');
        return;
      }
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      // Validaciones
      if (!name) {
        showNotification('Por favor ingresa tu nombre', 'error');
        nameInput.focus();
        return;
      }
      
      if (!email) {
        showNotification('Por favor ingresa tu correo electrónico', 'error');
        emailInput.focus();
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Por favor ingresa un correo electrónico válido', 'error');
        emailInput.focus();
        return;
      }
      
      if (!message) {
        showNotification('Por favor ingresa tu mensaje', 'error');
        messageInput.focus();
        return;
      }
      
      // Crear mensaje para WhatsApp
      const whatsappMessage = `Hola Gabriel! 👋\n\nSoy ${name}.\n\n${message}\n\nMi email es: ${email}`;
      const whatsappURL = `https://wa.me/+524272257172?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Abrir WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Limpiar formulario
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      
      showNotification('¡Mensaje enviado! Se abrirá WhatsApp en una nueva ventana.', 'success');
    });
  }
});

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6366f1'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  `;
  document.body.appendChild(notification);

  // Remover notificación después de 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}