import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];

  constructor(private service:EmployeeService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray=>{
      this.list = actionArray.map(item=> {
        const data = item.payload.doc.data() as Employee;
        data.id = item.payload.doc.id;
        return data;
      })
    })
  }

  onEdit(emp:Employee){
    //this.service.formData = emp;   -- this line will make change in the list as well so we make a copy of emp and then assign it
    this.service.formData = Object.assign({},emp); //we will make the submit change in employee.component.ts as now the submit is there in employee area.
  }

  onDelete(id:String){
    this.firestore.doc('employees/'+id).delete();
    this.toastr.warning('Deleted Successfully','Emp. Register');
  }

}
