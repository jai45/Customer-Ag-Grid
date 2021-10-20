import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  
  customer_name: string = '';
  customer_id!: number;
  customer_geographic_location: string = '';
  customer_type: string = '';
  customer:any;
  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
  }
  
  isFormValid=true;
  addUser(form:any){
    if(!form.valid){
      this.isFormValid=false;
      return;
    }
    this.customer = new Customer();
    this.customer.customer_geographic_location=this.customer_geographic_location;
    this.customer.customer_id= this.customer_id;
    this.customer.customer_name = this.customer_name;
    this.customer.customer_type = this.customer_type;
    this.customerService.addCustomer(this.customer).subscribe((data)=>{
      console.log(data);
    },
    (error)=>{console.log(error)}
    );
    this.router.navigate(['']);
   
  }
  
  


}
