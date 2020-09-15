import { Component, OnInit } from '@angular/core';
import { TodoDetail } from 'src/app/shared/todo-detail.model';
import { TodoDetailService } from 'src/app/shared/todo-detail.service';
import { ToastrService } from 'ngx-toastr';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-detail-list',
  templateUrl: './todo-detail-list.component.html',
  styles: []
})
export class TodoDetailListComponent implements OnInit {

  constructor(public service: TodoDetailService, private toastr: ToastrService) { }

  total = 0;
  pageNum = 1;
  limit = 5;
  loading = false;
  filter :string = "All"

  async ngOnInit(): Promise<any> {
    await this.service.filterTodos(this.filter, this.pageNum);
    this.total = this.service.totalCount;
  }

  populateForm(todoTask:TodoDetail){
    this.service.formData = Object.assign({},todoTask);
  }

  onDelete(Id){
    this.service.deleteTodoDetail(Id).subscribe(
      res => {
        this.service.filterTodos(this.filter, this.pageNum);
        this.toastr.warning("Deleted successfully","ToDO list register");
      },
      err=>{
        console.log(err);
      })
  }

  async goToPrevious(): Promise<any> {

    this.pageNum = this.pageNum <= 1 ? 1 : this.pageNum - 1;
    await this.service.filterTodos(this.filter, this.pageNum);
    this.total = this.service.page.countTasks;

  }
  async goToNext(): Promise<any> {
    this.pageNum = this.pageNum >= Math.ceil(this.total / this.limit) ? this.pageNum : this.pageNum + 1;
    await this.service.filterTodos(this.filter, this.pageNum);
    this.total = this.service.page.countTasks;
  }

  async goToPage(n: number): Promise<any> {
    this.pageNum = n;
    await this.service.filterTodos(this.filter, this.pageNum);
    this.total = this.service.page.countTasks;
  }

  async getFiltered(filter: string): Promise<any> {
    this.filter = filter;
    this.pageNum = 1;
    await this.service.filterTodos(filter, this.pageNum);
    this.total = this.service.page.countTasks;
  }
}
