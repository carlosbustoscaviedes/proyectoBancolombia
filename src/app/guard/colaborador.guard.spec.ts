import { TestBed } from '@angular/core/testing';

import { ColaboradorGuard } from './colaborador.guard';

describe('ColaboradorGuard', () => {
  let guard: ColaboradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ColaboradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
