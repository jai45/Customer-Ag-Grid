import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { BtnCellRenderer } from '../btn-cell-renderer.component';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { CellValidationEditorComponent } from './cell-editor.component';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  getRowNodeId:any;

  constructor(private http: HttpClient,private customerService:CustomerService) { 
  }
 

  ngOnInit(): void {
    this.showCustomers();
  }
  private gridApi:any;
  private columnApi:any;
  columnDefs = [
    { headerName:"Name", field:"customer_name" ,singleClickEdit: true,rowDrag:true,cellEditorFramework: CellValidationEditorComponent ,editable: true,sortable:true, floatingFilter:true,width:200, filter:true,checkboxSelection: true
  },
    { headerName:"ID", field:"customer_id",singleClickEdit: true,editable: true,cellEditorFramework: CellValidationEditorComponent, sortable:true,floatingFilter:true,  filter:true,width:200
  },
    { headerName:"Location", field:"customer_geographic_location" ,sortable:true ,floatingFilter:true,
      filter:true ,editable: true,singleClickEdit: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {
        values: ["US West", "US East","US North","US Pacific"]
      }},
    { headerName:"Type", field:"customer_type" ,sortable:true,editable: true ,floatingFilter:true, filter:true
    ,singleClickEdit: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {
      values: ["Small Utility", "Steel","Wood"]
    }
  },
  {
    field: "Edit / Delete",
    cellRenderer: "btnCellRenderer",
    cellRendererParams: {},
    minWidth: 150
  }
  ];
  frameworkComponents:any = {
    btnCellRenderer: BtnCellRenderer
  };

  rowData:any = [];
  onCellValueChanged(params:any){
    if(params.oldValue!=params.newValue && params.newValue!="" && params.oldValue!="" ){
      this.customerService.updateCustomer(params.data,params.data._id).subscribe((data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
      )
    }
  }
  

  onGridReady(params:any){
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    
  }
  deleteCustomer(id:any){
    this.customerService.deleteCustomer(id).subscribe((data)=>{
      console.log("Items Deleted")
    })
  }
  deleteRowOnClick(node:any){
    this.deleteCustomer(node.data._id);
    let data:any;
    for(let i=0;i<this.rowData.length;i++)
    {
      if(this.rowData[i]._id==node.data._id){
        data = this.rowData[i];
        break;
      }
    }
    
    this.rowData = this.rowData.filter((row: any) => {
     return data._id!=row._id; 
    });
  }
  showCustomers(){
    this.customerService.getCustomers()
    .subscribe(customers =>
      this.rowData=customers);
  }
  delete(){
    let selectedNodes = this.gridApi.getSelectedNodes();
    if(selectedNodes.length == 0){
      this.displayAlert();
      return;
    }
    
    let selectedData = selectedNodes.map((node: { data: any; }) => node.data);
    for(var i=0;i<selectedData.length;i++)
    {
      this.deleteCustomer(selectedData[i]._id);
    }
    const selectedRows = this.gridApi.getSelectedRows();
      this.rowData = this.rowData.filter((row: any) => {
        return selectedRows.indexOf(row) == -1; 
      });
  }
  public isVisible: boolean = false;
  displayAlert() {
    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }

}
