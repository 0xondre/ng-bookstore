import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewsService,
        { provide: HttpClient, useValue: {} }
      ]
    });

    service = TestBed.inject(ReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
