import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Customer } from "./customer";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerData:any=[]
  constructor(private http:HttpClient){
        
  }
  addData(data:any){
    this.customerData = data;
  }
  getData(){
      return this.customerData;
  }
  getCustomers():Observable<Customer[]>{
      return this.http.get<Customer[]>('http://localhost:3000/api/customers');
  }

  addCustomer(newCustomer: any){
      var headers = new HttpHeaders();
      headers.append('content-type','application/json');
      return this.http.post('http://localhost:3000/api/customer',newCustomer,{headers:headers});
  }

  deleteCustomer(id: any){
      return this.http.delete('http://localhost:3000/api/customer/'+id);
  }
  updateCustomer(data:Customer,id:any){
      var headers = new HttpHeaders();
      headers.append('content-type','application/json');
      return this.http.put(('http://localhost:3000/api/customer/'+id),data,{headers:headers});
  }
}
