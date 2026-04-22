import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewItemComponent } from './review-item.component';

describe('ReviewItemComponent', () => {
  let component: ReviewItemComponent;
  let fixture: ComponentFixture<ReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewItemComponent);
    component = fixture.componentInstance;
    component.review = {
      id: 1,
      forBook: 1,
      title: 'Very good',
      description: 'Indeed...',
      rate: 5,
      author: 'Reader'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
