import { TestBed } from '@angular/core/testing';

import { MovieDataApisService } from './movie-data-apis.service';

describe('MovieDataApisService', () => {
  let service: MovieDataApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDataApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
