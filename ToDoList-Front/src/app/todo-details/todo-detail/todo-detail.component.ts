import { Component, OnInit } from '@angular/core';
import { TodoDetail } from 'src/app/shared/todo-detail.model';
import { Priorities } from '../../shared/todo-detail.model';
import { TodoDetailService } from 'src/app/shared/todo-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styles: []
})
export class TodoDetailComponent implements OnInit {

  constructor(public service:TodoDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  options = ['Critical','High','Medium','Low'];

  resetForm(form?: NgForm){
    if (form !=null)
      form.form.reset();
    this.service.formData = {
      Id:0,
      TaskText:'',
      TimeOfCreation:'',
      IsComplete:false,
      Priority:null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.Id==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postTodoDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'ToDO list register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putTodoDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'ToDO list register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }


  translateEnum(x:string) :string {
    return Priorities[x];
  }

}
