import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';

import { Table } from 'primeng/table';

import { UmService } from '@root/user-management/services/um.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DialogService, ConfirmationService } from 'primeng/api';
import { UserManagementOperations } from '../models/user-management-operations';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [TitleCasePipe, UmService,DialogService,
    ConfirmationService,DatePipe]
})
export class UserManagementComponent implements OnInit {
  @ViewChild('usersTable') table: Table;
  userList:any[]=[];
  protected serviceSubscription: Subscription;
  
  filterValue: string = "";
  selectAllRows:boolean = false;
  displayStatusManagement: boolean = false;
  selectedUsers:any[] = [];
  showSelectedUsers:boolean = false;
  filterActive:string="Active";
  startDate:Date=null;
  endDate: Date = null;
  exitReason:string="";

  selectedRows: any[]=[];

  es:any = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar'
  }

  constructor(
    private umService: UmService,
    private fBuilder: FormBuilder,
    private dialogService: DialogService,
    private datePipe: DatePipe
    ) {
    this.serviceSubscription = this.umService.message.subscribe(
      serviceResponse => {
        switch(serviceResponse.operation){
          case UserManagementOperations.GetInitialData:
            this.userList = serviceResponse.payload.allPeople;
            break;
        }
      });
   }

  ngOnInit() {
    this.umService.getInitialData();
  }

  // Filter
  globalFilter(value: any) {
    this.table.filterGlobal(value, 'contains');
  }

  resetGlobalFilter() {
    this.filterValue = "";
    this.table.reset();
  }

  // Row editing
  onRowEditInit(row: any) {
  }

  onRowEditSave(row: any, index: number) {
  }

  onRowEditCancel(row: any, index: number) {
  }

  showStatusManagement() {
    this.displayStatusManagement = true;
    let items = this.table.value;
    this.selectedUsers = items.filter(i=>i.Selected);
  }

  
}
