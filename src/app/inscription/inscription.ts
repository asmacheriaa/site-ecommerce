import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css'],
  imports: [RouterModule, HttpClientModule]
})
export class InscriptionComponent implements AfterViewInit {
  // Injection correcte du HttpClient
  constructor(private http: HttpClient) {}

  @ViewChild('countryCode') countryCodeSelect?: ElementRef<HTMLSelectElement>;
  @ViewChild('password') passwordInput?: ElementRef<HTMLInputElement>;
  @ViewChild('togglePassword') togglePassword?: ElementRef<HTMLElement>;
  @ViewChild('confirmPassword') confirmPasswordInput?: ElementRef<HTMLInputElement>;
  @ViewChild('passwordStrength') passwordStrength?: ElementRef<HTMLElement>;
  @ViewChild('email') emailInput?: ElementRef<HTMLInputElement>;
  @ViewChild('emailValidation') emailValidation?: ElementRef<HTMLElement>;
  @ViewChild('roleInput') roleInput?: ElementRef<HTMLInputElement>;
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  @ViewChild('nom') nomInput?: ElementRef<HTMLInputElement>;
  @ViewChild('prenom') prenomInput?: ElementRef<HTMLInputElement>;
  @ViewChild('adresse') adresseInput?: ElementRef<HTMLInputElement>;
  @ViewChild('telephone') telephoneInput?: ElementRef<HTMLInputElement>;

  choisirRole(role: string): void {
    alert(`Tu as choisi ${role}`);
  }

  ngAfterViewInit(): void {
    if (this.passwordInput && this.togglePassword) this.initPasswordToggle();
    if (this.passwordInput && this.passwordStrength) this.initPasswordStrength();
    if (this.passwordInput && this.confirmPasswordInput) this.initConfirmPassword();
    if (this.emailInput && this.emailValidation) this.initEmailValidation();
    if (this.form) this.initFormValidation();
  }

  initPasswordToggle(): void {
    const toggle = this.togglePassword!.nativeElement;
    toggle.addEventListener('click', () => {
      const input = this.passwordInput!.nativeElement;
      const icon = toggle.querySelector('i')!;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !isPassword);
      icon.classList.toggle('fa-eye-slash', isPassword);
    });
  }

  initPasswordStrength(): void {
    this.passwordInput!.nativeElement.addEventListener('input', () => {
      const pwd = this.passwordInput!.nativeElement.value;
      let strength = 0;
      if (pwd.length >= 4) strength += 25;
      if (pwd.length >= 6) strength += 25;
      if (/[A-Za-z]/.test(pwd)) strength += 25;
      if (/\d/.test(pwd)) strength += 25;
      const bar = this.passwordStrength!.nativeElement;
      bar.style.width = `${strength}%`;
      bar.style.backgroundColor = strength < 50 ? '#ff4757' : strength < 75 ? '#ffa502' : '#2ed573';
    });
  }

  initConfirmPassword(): void {
    this.confirmPasswordInput!.nativeElement.addEventListener('input', () => {
      const match = this.passwordInput!.nativeElement.value === this.confirmPasswordInput!.nativeElement.value;
      this.confirmPasswordInput!.nativeElement.style.borderColor = match ? '#e2e8f0' : '#ff4757';
    });
  }

  initEmailValidation(): void {
    this.emailInput!.nativeElement.addEventListener('input', () => {
      const email = this.emailInput!.nativeElement.value;
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      this.emailValidation!.nativeElement.innerHTML = valid
        ? `<i class="fas fa-check-circle valid"></i> <span>Adresse email valide</span>`
        : `<i class="fas fa-exclamation-circle invalid"></i> <span>Veuillez entrer une adresse email valide</span>`;
    });
  }

  initFormValidation(): void {
    this.form!.nativeElement.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.passwordInput!.nativeElement.value !== this.confirmPasswordInput!.nativeElement.value) {
        alert('Les mots de passe ne correspondent pas !');
        return;
      }

      // Préparer l’objet User à envoyer au backend
      const user = {
        username: this.nomInput?.nativeElement.value || '',
        motPasse: this.passwordInput?.nativeElement.value || '',
        email: this.emailInput?.nativeElement.value || '',
        role: this.roleInput?.nativeElement.value || 'client',
        prenom: this.prenomInput?.nativeElement.value || '',
        adresse: this.adresseInput?.nativeElement.value || '',
        telephone: this.telephoneInput?.nativeElement.value || '',
        // ajoute d’autres champs si nécessaire
      };

      // Envoyer la requête POST vers le backend
      this.http.post('http://localhost:8083/register', user).subscribe({
        next: () => {
          alert('Inscription réussie !');
          this.form!.nativeElement.reset();
          if (this.passwordStrength) {
            this.passwordStrength.nativeElement.style.width = '0%';
          }
          // Remettre l’état par défaut du rôle
          const roleOptions = Array.from(document.querySelectorAll('.role-option'));
          roleOptions.forEach(opt => opt.classList.remove('active'));
          roleOptions[0]?.classList.add('active'); // Client par défaut
          if (this.roleInput) {
            this.roleInput.nativeElement.value = 'client';
          }
        },
        error: (err) => {
          if (err.status === 400) {
            alert('Nom d’utilisateur déjà utilisé.');
          } else {
            alert('Erreur lors de l’inscription.');
          }
        }
      });
    });
  }
}
