import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer_name: string = '';
  customer_id!: number;
  customer_geographic_location: string = '';
  customer_type: string = '';
  customer:any;
  data:any;
  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.data=this.customerService.getData();
    this.customer_name=this.data.customer_name;
    this.customer_id=this.data.customer_id;
    this.customer_geographic_location=this.data.customer_geographic_location;
    this.customer_type=this.data.customer_type;
  }
  isFormValid=true;
  editUser(form:any){
    if(!form.valid){
      this.isFormValid=false;
      return;
    }
    this.customer = new Customer();
    this.customer.customer_geographic_location=this.customer_geographic_location;
    this.customer.customer_id= this.customer_id;
    this.customer.customer_name = this.customer_name;
    this.customer.customer_type = this.customer_type;
    this.customerService.updateCustomer(this.customer,this.data._id).subscribe((data)=>{
      console.log("Edited Successfully");
    },
    (error)=>{console.log(error)}
    );
    this.router.navigate(['']);
  }
  


}
