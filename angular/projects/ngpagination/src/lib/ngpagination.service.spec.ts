import { TestBed } from '@angular/core/testing';

import { NgpaginationService } from './ngpagination.service';

describe('NgpaginationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgpaginationService = TestBed.get(NgpaginationService);
    expect(service).toBeTruthy();
  });
});
