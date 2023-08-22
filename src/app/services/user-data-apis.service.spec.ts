import { TestBed } from '@angular/core/testing';

import { UserDataApisService } from './user-data-apis.service';

describe('UserDataApisService', () => {
  let service: UserDataApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
