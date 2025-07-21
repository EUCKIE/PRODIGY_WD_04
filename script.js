document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) {
        card.querySelector('.project-overlay').style.opacity = '0';
      }
    });
  });

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
  });

  document.querySelectorAll('.project-card, .contact-card, .section-title, .section-subtitle').forEach(el => {
    observer.observe(el);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}