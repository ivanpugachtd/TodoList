import { Injectable } from '@angular/core';
import { TodoDetail } from './todo-detail.model';
import { Priorities } from './todo-detail.model';
import { Page } from './todo-detail.model';
import { NgModel } from '@angular/forms';
import { TodoDetailComponent } from '../todo-details/todo-detail/todo-detail.component';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoDetailService {
  formData:TodoDetail;
  readonly rootURL = 'http://localhost:5000/api/';
  list : TodoDetail[];
  taskList: TodoDetail[];
  page: Page;
  totalCount: number;
  currentPage: number;
  currentFilter: string;


  constructor(private http:HttpClient) { }


  postTodoDetail(){
    this.formData.Priority = parseInt(this.formData.Priority.toString(),10)
    return this.http.post(this.rootURL + "TodoTasks", this.formData)
  }

  putTodoDetail(){
    this.formData.Priority = parseInt(this.formData.Priority.toString(),10)
    return this.http.put(this.rootURL + "TodoTasks/" + this.formData.Id, this.formData)
  }

  deleteTodoDetail(id){
    return this.http.delete(this.rootURL + "TodoTasks/" + id);
  }
  
  async refreshList(): Promise<any> {
    await this.filterTodos(this.currentFilter, this.currentPage);
  }

  async getPage(n:number) : Promise<any> {
    const res = await this.http.get<Page>(this.rootURL + "TodoTasks/page/" + n).toPromise();
    this.page = res as Page;
    this.taskList = res.tasksPage as TodoDetail[];
    this.totalCount = res.countTasks;
  }
  

  getPriorites(x:number) :string {
    return Priorities[x];
  }

  async filterTodos(filter:string, pageNum:number): Promise<any>{

    this.currentFilter = filter;
    this.currentPage = pageNum;

      if (filter=='All') {
        await this.getPage(pageNum);
      }
      else {

        await this.refreshList();

        if (filter=='Active') {
          this.list=this.list.filter(x=>x.IsComplete==false);
        }
        if (filter=='Completed') {
          this.list=this.list.filter(x=>x.IsComplete);
        }
      
        this.page.countTasks = this.list.length;

        this.taskList = this.list.slice((pageNum - 1)*5, pageNum*5);
        console.dir(this.taskList);
      }
    }
}


