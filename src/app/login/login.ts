import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements AfterViewInit {

  isBrowser: boolean = false;
  loginForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      motPasse: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.animateElements();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const username = this.loginForm.value.username;
    const motPasse = this.loginForm.value.motPasse;

    if (!username || !motPasse) {
      alert('Identifiants incorrects.');
      return;
    }


    this.router.navigate(['/dashboard']);
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
}
