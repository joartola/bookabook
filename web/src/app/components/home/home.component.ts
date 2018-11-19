import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public books: Book[];
  public topBooks: Book[];
  public imagesUrl;

  @ViewChild('modal') modal;

  constructor(private bookService: BookService, private config: AppConfig) { }

  ngOnInit() {
    this.bookService.getAll()
      .subscribe(books => {
        this.books = books;
        this.processBooks(this.books);
      });

    this.bookService.getAll()
      .subscribe(books => {
        this.topBooks = books.sort((a, b) => a.title < b.title ? -1 : 1);
        this.processBooks(this.topBooks);
      });

    this.modal.type = true;
  }

  processBooks(books): Book[] {
    return books
      .filter((book: Book) => {
        if (book.hasOwnProperty('lendTo') && book.lendTo) {
          return false;
        }
        const userId = localStorage.getItem('userId');
        if (userId && book.owner == userId) {
          return false;
        }
        return true;
      })
      .map((book: Book) => {
        book.picture = book.picture ? book.picture.replace('public', `${this.config.apiUrl}`) : book.picture;
        return book;
      });
  }

  getTopBooks() {
    if (!this.topBooks) return undefined;
    this.topBooks.sort((a, b) => a.title < b.title ? -1 : 1);
    return this.topBooks;
  }

  openModal(book: Book) {
    this.modal.book = book;
    this.modal.open();
  }

  refreshBooks() {
    this.bookService.getAll()
      .subscribe(books => {
        this.books = this.processBooks(books);
      });

    this.bookService.getAll()
      .subscribe(topBooks => {
        topBooks = topBooks.sort((a, b) => a.title < b.title ? -1 : 1);
        this.topBooks = this.processBooks(topBooks);
      });
  }
}
