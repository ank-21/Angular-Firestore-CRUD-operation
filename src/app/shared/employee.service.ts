import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee;

  constructor(private firestore:AngularFirestore) { }   //as we want to read from db

  getEmployees(){
    return this.firestore.collection('employees').snapshotChanges();
    //it will return an observables
    //snapshot chnages instead of value changes as it will return id too.
  }
}
