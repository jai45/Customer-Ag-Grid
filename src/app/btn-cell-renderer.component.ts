import { Component, OnDestroy } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { CustomerService } from "./customer.service";
import { CustomerComponent } from "./customer/customer.component";

@Component({
  selector: "btn-cell-renderer",
  template: `
    <span class="btn btn-primary btn-xs" (click)="btnClickedHandler()" routerLink='/editcustomer'><span class="glyphicon glyphicon-pencil"></span></span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-danger btn-xs" (click)="deleteRow()"> <span class="glyphicon glyphicon-trash"></span></span>
  `
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
      throw new Error("Method not implemented.");
  }
  private params: any;
  constructor(private customerService:CustomerService,private customerComponent:CustomerComponent){}
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.customerService.addData(this.params.node.data);
  }
  deleteRow(){
    this.customerComponent.deleteRowOnClick(this.params.node);
  }

  ngOnDestroy() {
  }
}
