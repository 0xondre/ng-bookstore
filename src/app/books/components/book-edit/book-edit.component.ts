import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Book } from '../../model/book';
import { BooksService } from '../../services/books.service';

type BookEditForm = FormGroup<{
  title: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<number>;
  description: FormControl<string>;
}>;

@Component({
  selector: 'bs-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent {
  readonly book: Book;
  readonly form: BookEditForm;
  isSaving = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly router: Router,
  ) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.form = new FormGroup({
      title: new FormControl(this.book.title, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      author: new FormControl(this.book.author, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      year: new FormControl(this.book.year, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1000), Validators.max(2023)]
      }),
      description: new FormControl(this.book.description ?? '', {
        nonNullable: true,
        validators: [Validators.maxLength(1000)]
      })
    });
  }

  get title(): AbstractControl<string, string> | null {
    return this.form.get('title');
  }

  get author(): AbstractControl<string, string> | null {
    return this.form.get('author');
  }

  get year(): AbstractControl<number, number> | null {
    return this.form.get('year');
  }

  get description(): AbstractControl<string, string> | null {
    return this.form.get('description');
  }

  isInvalid(controlName: keyof BookEditForm['controls']): boolean {
    const control = this.form.controls[controlName];

    return control.invalid && (control.dirty || control.touched);
  }

  save(): void {
    if (this.form.invalid || this.form.pristine || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const updatedBook: Book = {
      ...this.book,
      ...this.form.getRawValue()
    };

    this.booksService.saveBook(updatedBook)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(() => {
        void this.router.navigate(['/books']);
      });
  }
}
