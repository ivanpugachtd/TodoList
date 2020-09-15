import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoDetailComponent } from './todo-details/todo-detail/todo-detail.component';
import { TodoDetailListComponent } from './todo-details/todo-detail-list/todo-detail-list.component';
import { TodoDetailService } from './shared/todo-detail.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    AppComponent,
    TodoDetailsComponent,
    TodoDetailComponent,
    TodoDetailListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TodoDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
