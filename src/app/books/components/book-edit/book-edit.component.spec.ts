import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookEditComponent } from './book-edit.component';
import { BooksService } from '../../services/books.service';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                book: {
                  id: 1,
                  title: 'Solaris',
                  author: 'Stanislaw Lem',
                  description: 'Description',
                  year: 1961
                }
              }
            }
          }
        },
        {
          provide: BooksService,
          useValue: {
            saveBook: () => of({
              id: 1,
              title: 'Solaris',
              author: 'Stanislaw Lem',
              description: 'Description',
              year: 1961
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
