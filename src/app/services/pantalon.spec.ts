import { TestBed } from '@angular/core/testing';
import { Pantalon } from './pantalon';

describe('Pantalon', () => {
  let service: Pantalon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pantalon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
