import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscojerColaboradorComponent } from './escojer-colaborador.component';

describe('EscojerColaboradorComponent', () => {
  let component: EscojerColaboradorComponent;
  let fixture: ComponentFixture<EscojerColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscojerColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscojerColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
