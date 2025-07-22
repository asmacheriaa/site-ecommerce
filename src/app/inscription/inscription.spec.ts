import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionComponent], // Car standalone = true
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Pour ignorer les erreurs d'éléments externes
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });
});
