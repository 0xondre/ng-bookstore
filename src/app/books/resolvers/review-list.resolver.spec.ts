import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Review } from '../model/review';
import { ReviewsService } from '../services/reviews.service';
import { reviewListResolver } from './review-list.resolver';

describe('reviewListResolver', () => {
  const executeResolver: ResolveFn<Review[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => reviewListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            findReviewsByBookId: () => of([])
          }
        }
      ]
    });
  });

  it('should be created', () => {
    const route = {
      paramMap: convertToParamMap({ bookId: '1' })
    } as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;

    expect(executeResolver(route, state)).toBeTruthy();
  });
});
