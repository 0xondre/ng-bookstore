import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../model/book';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';

@Component({
    selector: 'bs-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, AsyncPipe]
})
export class BookListComponent {
  readonly allBooks: Book[];
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly books$: Observable<Book[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly booksService: BooksService,
  ) {
    this.allBooks = this.activatedRoute.snapshot.data['books'];
    this.books$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.getRawValue()),
      map((query) => query.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length < 2) {
          return of(this.allBooks);
        }

        return this.booksService.searchBooks(query);
      })
    );
  }
}
