import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDesPieces } from './vente-des-pieces';

describe('VenteDesPieces', () => {
  let component: VenteDesPieces;
  let fixture: ComponentFixture<VenteDesPieces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteDesPieces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteDesPieces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
