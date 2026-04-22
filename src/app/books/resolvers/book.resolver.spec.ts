import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../model/book';
import { bookResolver } from './book.resolver';
import { BooksService } from '../services/books.service';

describe('bookResolver', () => {
  const executeResolver: ResolveFn<Book> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => bookResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BooksService,
          useValue: {
            findBookById: () => of({
              id: 1,
              title: 'Solaris',
              author: 'Stanislaw Lem',
              description: 'Description',
              year: 1961
            })
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
