import { TestBed } from '@angular/core/testing';

import { WelcomeScreenApis } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: WelcomeScreenApis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeScreenApis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
