import { TestBed } from '@angular/core/testing';

import { LoginListenerService } from './login-listener.service';

describe('LoginListenerService', () => {
  let service: LoginListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
