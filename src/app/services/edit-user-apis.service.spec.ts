import { TestBed } from '@angular/core/testing';

import { EditUserApisService } from './edit-user-apis.service';

describe('EditUserApisService', () => {
  let service: EditUserApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
