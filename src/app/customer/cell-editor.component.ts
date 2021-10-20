import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";


import { ICellEditorAngularComp } from "ag-grid-angular";
import { ICellEditorParams } from "ag-grid-community";

@Component({
    selector: 'numeric-cell',
    template: `<input #input style="width:200px" (click)="onKeyDown()" [(ngModel)]="value">`
})
export class CellValidationEditorComponent implements ICellEditorAngularComp {
    private params: any;
    public value: any;
    @ViewChild('input', {read: ViewContainerRef}) public input: any;
    getValue() {
        return this.value;
    }
    agInit(params: ICellEditorParams): void {
        this.params = params;
        this.value = this.params.value;
    }
    isCancelBeforeStart(): boolean {
        return false;
    }
    isCancelAfterEnd(): boolean {
        return this.value == "";
    };
    onKeyDown(): void {
           
    }

    
}