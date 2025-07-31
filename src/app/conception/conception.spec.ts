import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conception } from './conception';

describe('Conception', () => {
  let component: Conception;
  let fixture: ComponentFixture<Conception>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conception]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conception);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
