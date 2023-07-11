import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaColaboradorComponent } from './pantalla-colaborador.component';

describe('PantallaColaboradorComponent', () => {
  let component: PantallaColaboradorComponent;
  let fixture: ComponentFixture<PantallaColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
