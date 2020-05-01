import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private firestore:AngularFirestore,//since we have to add in db
    private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      id : null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: '',
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null){
      this.firestore.collection('employees').add(data);
      this.toastr.success('Submitted Successfully...','EMP Register');
    }else{
      this.firestore.doc('employees/'+form.value.id).update(data);
      this.toastr.success('Updated Successfully...','EMP Register');
    }
    this.resetForm(form);
    
  }

}
