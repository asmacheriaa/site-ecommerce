import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  standalone: true
})
export class Login implements AfterViewInit {

  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.animateElements();
      this.initEvents();
    }
  }

  animateElements(): void {
    const container = document.querySelector('.login-container') as HTMLElement;
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      container.style.transition = 'all 0.5s ease';

      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 300);
    }
  }

  initEvents(): void {
    if (!this.isBrowser) return;

    const togglePassword = document.getElementById('togglePasswordLogin');
    const passwordInput = document.getElementById('passwordLogin') as HTMLInputElement;
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    const emailInput = document.getElementById('emailLogin') as HTMLInputElement;
    const emailError = document.getElementById('emailError') as HTMLElement;
    const passwordError = document.getElementById('passwordError') as HTMLElement;
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const modal = document.getElementById('forgotPasswordModal') as HTMLElement;
    const closeModal = document.getElementById('closeModal');
    const emailForm = document.getElementById('emailForm') as HTMLFormElement;
    const resetEmail = document.getElementById('resetEmail') as HTMLInputElement;
    const resetEmailError = document.getElementById('resetEmailError') as HTMLElement;
    const googleLogin = document.getElementById('googleLogin');
    const facebookLogin = document.getElementById('facebookLogin');

    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = togglePassword.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-eye');
          icon.classList.toggle('fa-eye-slash');
        }
        togglePassword.classList.add('pulse-once');
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.validateForm(emailInput, emailError, passwordInput, passwordError)) {
          this.showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
          return;
        }

        const submitBtn = loginForm.querySelector('.btn-submit') as HTMLElement;
        submitBtn.innerHTML = '<div class="loader"></div>';
        (submitBtn as HTMLButtonElement).disabled = true;

        this.login(emailInput.value.trim(), passwordInput.value)
          .then(response => {
            if (response.success) {
              this.showNotification(`Connexion réussie! Bienvenue ${response.utilisateur.nom}`, 'success');
              submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> CONNEXION RÉUSSIE';
              submitBtn.setAttribute('style', 'background: linear-gradient(to right, #4caf50, #2e7d32)');

              setTimeout(() => {
                this.showNotification('Redirection vers votre tableau de bord...', 'info');
                window.location.href = '/dashboard';
              }, 1500);
            } else {
              this.showNotification(response.message || 'Email ou mot de passe incorrect', 'error');
              submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Connexion';
              (submitBtn as HTMLButtonElement).disabled = false;
            }
          })
          .catch(err => {
            console.error(err);
            this.showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Connexion';
            (submitBtn as HTMLButtonElement).disabled = false;
          });
      });
    }

    if (forgotPasswordLink && modal) {
      forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeModal && modal) {
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }

    if (emailForm && resetEmail) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetEmailError.textContent = '';
        resetEmail.classList.remove('invalid');

        if (!resetEmail.value.trim()) {
          resetEmailError.textContent = 'L\'email est requis';
          resetEmail.classList.add('invalid');
          return;
        } else if (!this.validateEmail(resetEmail.value)) {
          resetEmailError.textContent = 'Veuillez entrer un email valide';
          resetEmail.classList.add('invalid');
          return;
        }

        const submitBtn = emailForm.querySelector('.btn-submit') as HTMLElement;
        submitBtn.innerHTML = '<div class="loader"></div>';
        (submitBtn as HTMLButtonElement).disabled = true;

        setTimeout(() => {
          this.showNotification(`Un lien de réinitialisation a été envoyé à ${resetEmail.value}`, 'success');
          submitBtn.innerHTML = 'Envoyer le lien';
          (submitBtn as HTMLButtonElement).disabled = false;

          setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetEmail.value = '';
          }, 2000);
        }, 2000);
      });
    }

    if (googleLogin) {
      googleLogin.addEventListener('click', () => {
        this.showNotification('Connexion avec Google en cours...', 'info');
        googleLogin.classList.add('pulse-once');
        setTimeout(() => {
          this.showNotification('Connexion Google réussie!', 'success');
          googleLogin.classList.remove('pulse-once');
        }, 1500);
      });
    }

    if (facebookLogin) {
      facebookLogin.addEventListener('click', () => {
        this.showNotification('Connexion avec Facebook en cours...', 'info');
        facebookLogin.classList.add('pulse-once');
        setTimeout(() => {
          this.showNotification('Connexion Facebook réussie!', 'success');
          facebookLogin.classList.remove('pulse-once');
        }, 1500);
      });
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('validation-error')) {
          errorElement.textContent = '';
        }
      });
    });
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validateForm(emailInput: HTMLInputElement, emailError: HTMLElement, passwordInput: HTMLInputElement, passwordError: HTMLElement): boolean {
    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';
    emailInput.classList.remove('invalid');
    passwordInput.classList.remove('invalid');

    if (!emailInput.value.trim()) {
      emailError.textContent = 'L\'email est requis';
      emailInput.classList.add('invalid');
      isValid = false;
    } else if (!this.validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Veuillez entrer un email valide';
      emailInput.classList.add('invalid');
      isValid = false;
    }

    if (!passwordInput.value) {
      passwordError.textContent = 'Le mot de passe est requis';
      passwordInput.classList.add('invalid');
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      passwordError.textContent = 'Le mot de passe doit contenir au moins 8 caractères';
      passwordInput.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  showNotification(message: string, type: string): void {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
    }
  }
//login api
  login(email: string, password: string): Promise<any> {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (!res.ok) throw new Error('Erreur serveur');
      return res.json();
    });
  }
}
