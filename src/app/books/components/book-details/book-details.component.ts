import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../model/book';
import { Review } from '../../model/review';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [RouterLink, ReviewItemComponent, ReviewFormComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  readonly book: Book;
  reviews: Review[];

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.reviews = this.activatedRoute.snapshot.data['reviews'] ?? [];
  }

  onReviewSaved(review: Review): void {
    this.reviews = [...this.reviews, review];
  }
}
