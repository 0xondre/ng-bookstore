import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Review } from '../../model/review';
import { ReviewsService } from '../../services/reviews.service';

type ReviewForm = FormGroup<{
  author: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
  rate: FormControl<number>;
}>;

@Component({
  selector: 'bs-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  @Input({ required: true }) bookId!: number;
  @Output() readonly reviewSaved = new EventEmitter<Review>();

  readonly form: ReviewForm = new FormGroup({
    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    rate: new FormControl(5, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(5)]
    })
  });

  isSaving = false;

  constructor(private readonly reviewsService: ReviewsService) { }

  get author(): AbstractControl<string, string> | null {
    return this.form.get('author');
  }

  get title(): AbstractControl<string, string> | null {
    return this.form.get('title');
  }

  get description(): AbstractControl<string, string> | null {
    return this.form.get('description');
  }

  get rate(): AbstractControl<number, number> | null {
    return this.form.get('rate');
  }

  isInvalid(controlName: keyof ReviewForm['controls']): boolean {
    const control = this.form.controls[controlName];

    return control.invalid && (control.dirty || control.touched);
  }

  save(): void {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    this.reviewsService.saveReview({
      ...this.form.getRawValue(),
      forBook: this.bookId
    })
      .pipe(finalize(() => this.isSaving = false))
      .subscribe((review) => {
        this.reviewSaved.emit(review);
        this.form.reset({
          author: '',
          title: '',
          description: '',
          rate: 5
        });
      });
  }
}
