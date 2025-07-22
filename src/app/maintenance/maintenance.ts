import { Component, AfterViewInit, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  templateUrl: './maintenance.html',
  styleUrls: ['./maintenance.css']
})
export class Maintenance implements AfterViewInit {

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    // ✅ Vérifie si on est dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      const serviceBoxes = document.querySelectorAll<HTMLElement>('.service-box');

      serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
          box.style.transform = 'translateY(-10px)';
        });

        box.addEventListener('mouseleave', () => {
          box.style.transform = 'translateY(0)';
        });
      });

      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector<HTMLElement>('header');

        if (header) {
          header.style.boxShadow =
            scrollPosition > 50
              ? '0 4px 12px rgba(0, 0, 0, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
      });
    }
  }
}
