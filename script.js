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
const texts = ["Desarrollador de aplicaciones de monitoreo, health life y mucho más", "Creador de Experiencias", "Solucionador de Problemas"];
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
document.addEventListener('DOMContentLoaded', function () {
  typeWriter();
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
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

// Validación de formulario y integración con WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  const contactButton = document.querySelector('.contact-form button');
  if (contactButton) {
    contactButton.addEventListener('click', function (e) {
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

(function () {
  const PARTICLE_CONFIG = {
    white: [
      "rgba(255,255,255,0.85)",
      "rgba(255,255,255,0.75)",
      "rgba(255,255,255,0.65)",
      "rgba(255,255,255,0.55)"
    ],
    color: [
      "rgba(168,85,247,0.85)", 
      "rgba(236,72,153,0.75)", 
      "rgba(59,130,246,0.70)", 
      "rgba(168,85,247,0.65)",
      "rgba(236,72,153,0.60)"
    ]
  };

  // Para cada .particles-bg, genera partículas
  document.querySelectorAll('.particles-bg').forEach(bg => {
    const variant = bg.dataset.variant || 'color';
    const colors = PARTICLE_CONFIG[variant] || PARTICLE_CONFIG.color;
    const numParticles = 32;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-anim';
      const size = Math.random() * 20 + 16;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.top = `${Math.random() * 95}%`;
      particle.style.left = `${Math.random() * 98}%`;
      particle.style.animationDelay = `${Math.random() * 3.5}s`;
      particle.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
      bg.appendChild(particle);
    }
  });
})();