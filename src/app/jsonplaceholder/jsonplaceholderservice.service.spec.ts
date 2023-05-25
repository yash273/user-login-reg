import { TestBed } from '@angular/core/testing';

import { JSONplaceholderserviceService } from './jsonplaceholderservice.service';

describe('JSONplaceholderserviceService', () => {
  let service: JSONplaceholderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONplaceholderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
