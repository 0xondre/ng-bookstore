import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReviewFormComponent } from './review-form.component';
import { ReviewsService } from '../../services/reviews.service';

describe('ReviewFormComponent', () => {
  let component: ReviewFormComponent;
  let fixture: ComponentFixture<ReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewFormComponent],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            saveReview: () => of({
              id: 10,
              forBook: 1,
              author: 'Reader',
              title: 'Great',
              description: 'Nice read',
              rate: 5
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewFormComponent);
    component = fixture.componentInstance;
    component.bookId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
