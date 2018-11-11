import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EditBookModalComponent } from './components/edit-book-modal/edit-book-modal.component';
import { NewBookModalComponent } from './components/new-book-modal/new-book-modal.component';
import { FormsModule } from '@angular/forms';

import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HomeComponent,
    MyBooksComponent,
    PublicLayoutComponent,
    UserLayoutComponent,
    LoginComponent,
    EditBookModalComponent,
    NewBookModalComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [
    AuthGuard,
    BookService,
    AppConfig
  ],
  bootstrap: [AppComponent],
  exports: [
    CategoryComponent,
    HomeComponent,
    MyBooksComponent,
    PublicLayoutComponent,
    UserLayoutComponent,
    LoginComponent,
  ],
})
export class AppModule { }
