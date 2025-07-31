import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vente-des-pieces',
  standalone: true,
  imports: [CommonModule], // 👈 ici
  templateUrl: './vente-des-pieces.html',
  styleUrls: ['./vente-des-pieces.css']
})
export class VenteDesPieces {
  @ViewChild('autreModal') autreModal!: ElementRef;
  @ViewChild('autreInput') autreInput!: ElementRef;

  selectedType: 'category' | 'brand' | null = null;
  modalTitle: string = '';

  // Champs pour affichage des inputs "Autre" directement
  showCategoryInput: boolean = false;
  showBrandInput: boolean = false;

  // Méthode appelée si tu gardes la MODALE (tu peux la supprimer si tu ne veux plus)
  openAutreModal(type: 'category' | 'brand') {
    this.selectedType = type;
    this.modalTitle = `✍️ Veuillez saisir l'autre ${type === 'category' ? 'catégorie' : 'marque'} souhaitée :`;
    this.autreModal.nativeElement.style.display = 'flex';
    setTimeout(() => this.autreInput.nativeElement.focus(), 0);
  }

  closeModal() {
    this.autreModal.nativeElement.style.display = 'none';
    this.autreInput.nativeElement.value = '';
    this.selectedType = null;
  }

  validateAutre() {
    const inputValue = this.autreInput.nativeElement.value.trim();
    if (!inputValue) {
      alert('Veuillez entrer une valeur.');
      this.autreInput.nativeElement.focus();
      return;
    }

    let selectElement: HTMLSelectElement | null = null;

    if (this.selectedType === 'category') {
      selectElement = document.getElementById('category') as HTMLSelectElement;
    } else if (this.selectedType === 'brand') {
      selectElement = document.getElementById('brand') as HTMLSelectElement;
    }

    if (selectElement) {
      let customOption = Array.from(selectElement.options).find(opt => opt.value === inputValue);
      if (!customOption) {
        customOption = document.createElement('option');
        customOption.value = inputValue;
        customOption.text = inputValue;
        selectElement.appendChild(customOption);
      }
      customOption.selected = true;
    }

    this.closeModal();
  }

  closeOnOutside(event: MouseEvent) {
    if (event.target === this.autreModal.nativeElement) {
      this.closeModal();
    }
  }

  // ✅ Méthodes pour afficher l'input quand on sélectionne "Autre"
  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.showCategoryInput = value === 'Autre';
  }

  onBrandChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.showBrandInput = value === 'Autre';
  }
}
