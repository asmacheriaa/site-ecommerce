import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupMobileMenu();
      this.setupScrollHeaderEffect();
      this.setupSmoothScrolling();
      this.setupTabs();
      this.setupFormSubmission();
      this.createParticles();
      this.setupScrollAnimations();
    }
  }
  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ?
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });
    }
  }
  setupScrollHeaderEffect() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      const logoImg = document.querySelector('.logo img') as HTMLImageElement;
      if (header && logoImg) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
          logoImg.style.height = '50px';
        } else {
          header.classList.remove('scrolled');
          logoImg.style.height = '60px';
        }
      }
    });
  }
  setupSmoothScrolling() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }
  setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
    });
  }
  setupFormSubmission() {
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous contacterons bientôt.');
        contactForm.reset();
      });
    }
  }
  createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    if (particlesContainer) {
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
      }
    }
  }
  setupScrollAnimations() {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .milestone, .client-logo, .job-card, .blog-card, .solution-card');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    };
    if (isPlatformBrowser(this.platformId)) {
      // Initial state
      document.querySelectorAll('.service-card, .milestone, .client-logo, .job-card, .blog-card, .solution-card').forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(30px)';
        (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      });
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Trigger once on load
    }
  }
}
