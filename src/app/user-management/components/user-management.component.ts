import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { Table } from 'primeng/table';

import { UmServiceService } from '@um/services/um-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [TitleCasePipe, UmServiceService]
})
export class UserManagementComponent implements OnInit {
  @ViewChild('projectsTable') table: Table;
  userList:any[]=[];
  filterValue: string = "";
  selectAllRows:boolean = false;
  displayStatusManagement: boolean = false;
  selectedUsers:any[] = [];
  showSelectedUsers:boolean = false;
  filterActive:string="Active";
  startDate:Date=null;
  endDate: Date = null;

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
    private umServiceService: UmServiceService,
    private titleCasePipe: TitleCasePipe
    ) {
   }

  ngOnInit() {
    this.userList = this.umServiceService.getUsers();
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
