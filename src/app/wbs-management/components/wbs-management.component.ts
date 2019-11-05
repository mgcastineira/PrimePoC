import {
  Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { WBSManagementService } from '@wbsmanagement/services/wbs-management.service';
import { WBSManagementOperations } from '@wbsmanagement/models/wbs-management-operations.model';
import { IWBSManagement } from '@wbsmanagement/models/iwbs-management.model';

import { AddWbsComponent } from '@wbsmanagement/add-wbs/components/add-wbs.component';
import { WbsCommentComponent } from '@wbsmanagement/wbs-comment/components/wbs-comment.component';
import { ImportComponent } from '../import/components/import.component';

@Component({
  selector: 'app-wbs-management',
  templateUrl: './wbs-management.component.html',
  styleUrls: ['./wbs-management.component.scss'],
  providers: [
    DialogService,
    ConfirmationService
  ]
})
export class WbsManagementComponent implements OnInit {
  @ViewChild('wbsTable') table: Table;
  @ViewChildren(WbsCommentComponent) query: QueryList<WbsCommentComponent>
  protected serviceSubscription: Subscription;

  hiddenColumns: string[] = [
    "ID"
  ];

  wbsTableRecords: IWBSManagement[] = [];
  wbsTableRecordsBackup: IWBSManagement[] = [];
  clonedWBSTableRecords: { [s: string]: any; } = {};
  sortedPeopleList: any[] = [];
  allTeamsList: any[];
  sortedProjectsList: any[];
  autocompleteEnterpriseIdList: string[];
  autocompleteProjectNameList: string[];

  showDeleted: boolean = false;
  filterValue: string = "";
  filterEnterpriseId: string = "";
  filterProjectName: string = "";
  filterWBS: string = "";
  filterWorkLocation: string = "";

  constructor(
    private wbsManagementService: WBSManagementService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.serviceSubscription = this.wbsManagementService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case WBSManagementOperations.GetInitialData:
            this.processInitialData(serviceResponse.payload.datasource,
              serviceResponse.payload.allPeople,
              serviceResponse.payload.allProjects);

            this.allTeamsList = serviceResponse.payload.allTeamsList;
            this.table.reset();
            this.filterActive();
            break;
          case WBSManagementOperations.SaveComment:
            if (serviceResponse.ok) {
              let commentToUpdate = this.wbsTableRecords.find(wbs => wbs.ID == serviceResponse.payload.wbsId);
              if (commentToUpdate != undefined) {
                commentToUpdate.WBS_Comments = serviceResponse.payload.comment;
              }
            }
            break;
        }
      }
    );
  }

  ngOnInit() {
    this.wbsManagementService.getInitialData();
  }

  ngOnDestroy() {
    if (this.serviceSubscription != undefined)
      this.serviceSubscription.unsubscribe();
  }

  private processInitialData(datasource: any[],
    peopleList: any[],
    allProjectsList: any[]) {
    this.wbsTableRecords = datasource;
    datasource.forEach(element => {
      let clone = JSON.parse(JSON.stringify(element));
      this.wbsTableRecordsBackup.push(clone);
    });

    this.sortedPeopleList = peopleList.sort((s1, s2) => {
      if (s1.Name.toLowerCase() > s2.Name.toLowerCase()) { return 1; }
      if (s1.Name.toLowerCase() < s2.Name.toLowerCase()) { return -1; }
      return 0;
    });
    this.sortedProjectsList = allProjectsList.sort((s1, s2) => {
      if (s1.Project_Name != undefined
        && s1.Project_Name != undefined
        && (s1.Project_Name.toLowerCase() > s2.Project_Name.toLowerCase())) { return 1; }
      if (s1.Project_Name != undefined
        && s1.Project_Name != undefined
        && (s1.Project_Name.toLowerCase() < s2.Project_Name.toLowerCase())) { return -1; }
      return 0;
    });
  }

  showComment(componentId: number) {
    let comment = this.query.find(component => component.id == componentId);
    comment.show = !comment.show;
  }

  /* #region  table edition */
  onRowEditInit(wbsEntity: any) {
    console.log("onRowEditInit");
    this.clonedWBSTableRecords[wbsEntity.ID] = { ...wbsEntity };
  }

  private validateData(row: any): boolean {
    console.log("validateData");
    let result = true;

    return result;
  }

  onRowEditSave(row: any) {
    console.log("onRowEditSave");
    row.saving = true;
    if (this.validateData(row)) {
      delete this.clonedWBSTableRecords[row.ID];
      let recordToSave = this.wbsTableRecords.find(entity => entity.ID == row.ID);

      this.table.reset();
      this.filterActive();
    }
    else {

      this.onRowEditCancel(row);
    }
  }

  onRowEditCancel(wbsEntity: any) {
    console.log("onRowEditCancel");
    let clonedWBSEntity = this.clonedWBSTableRecords[wbsEntity.ID];
    let pToCancel = this.wbsTableRecordsBackup.find(wbs => wbs.ID == wbsEntity.ID);
    pToCancel.saving = false;
    let recordToCancel = this.wbsTableRecords.find(wbs => wbs.ID == wbsEntity.ID);
    let indexAux = this.wbsTableRecords.indexOf(recordToCancel);
    this.wbsTableRecords[indexAux] = JSON.parse(JSON.stringify(pToCancel));
    delete this.clonedWBSTableRecords[wbsEntity.ID];
    this.table.reset();
    this.filterActive();
  }

  removeRow(row: any, index: number) {
    console.log("removeRow");
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this item?",
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        row.saving = true;
        delete this.clonedWBSTableRecords[row.project_id];
        let pToSave = this.wbsTableRecords.find(wbs => wbs.ID == row.ID);

        this.table.reset();
        this.filterActive();
      },
      reject: () => {

      }
    });
  }

  restoreRow(row: any, index: number) {
    console.log("restoreRow");
    this.confirmationService.confirm({
      message: "Are you sure you want to restore this item?",
      header: 'Restore Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        row.saving = true;
        delete this.clonedWBSTableRecords[row.project_id];
        let pToSave = this.wbsTableRecords.find(wbs => wbs.ID == row.ID);

        this.table.reset();
        this.filterActive();
      },
      reject: () => {

      }
    });
  }
  /* #endregion */

  /* #region  filter table data */
  filterActive() {
    if (this.showDeleted) {
      this.table.filter([true, false], 'Active', 'in')
    } else {
      this.table.filter(true, 'Active', 'equals')

    }
  }

  globalFilter(value: any) {
    this.table.reset();
    this.table.filterGlobal(value, 'contains');
    this.filterActive();
  }

  resetGlobalFilter() {
    this.table.reset();
    this.filterValue = "";
    this.filterActive();
  }

  /* #endregion */

  /* #region  add new wbs with dialog */
  private showAddComponent() {
    let config = new DynamicDialogConfig();
    config.data = {
      sortedPeopleList: this.sortedPeopleList,
      wbsTableRecords: this.wbsTableRecords,
      allTeamsList: this.allTeamsList,
      allProjectsList: this.sortedProjectsList
    };
    config.showHeader = false;
    config.dismissableMask = true;
    config.closeOnEscape = true;
    config.transitionOptions = "400ms cubic-bezier(0.25, 0.8, 0.25, 1)";

    const ref = this.dialogService.open(AddWbsComponent, config);

    ref.onClose.subscribe((response: any) => {
      if (response) {
        this.ngOnInit();
      }
    });
  }

  public addNewWBS(): void {
    this.showAddComponent();
  }
  /* #endregion */

  /* #region  Autocomplete */
  private filterEnterpriseIdSingle(event: any, row: any) {
    let query = event.query;
    this.autocompleteEnterpriseIdList = this.getAutocompleteEnterpriseId(query, this.sortedPeopleList);
  }

  private getAutocompleteEnterpriseId(query, allSortedPeople: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < allSortedPeople.length; i++) {
      let people = allSortedPeople[i];
      if (people.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        let clone = JSON.parse(JSON.stringify(people));
        filtered.push(people.EnterpriseId);
      }
    }
    return filtered;
  }

  selectPeople(event: any, row: any) {
    let people = this.sortedPeopleList.find(p => p.Name.toLowerCase() == event);
    if (people != undefined) {
      row.UserEnterpriseId = people.ID;
    }

  }

  private filterProjectNameSingle(event: any, row: any) {
    let query = event.query;
    this.autocompleteProjectNameList = this.getAutocompleteProjectName(query, this.sortedProjectsList);
  }

  private getAutocompleteProjectName(query, allProjects: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < allProjects.length; i++) {
      let project = allProjects[i];
      if (project.ProjectName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        let clone = JSON.parse(JSON.stringify(project));
        filtered.push(project.ProjectName);
      }
    }
    return filtered;
  }

  selectProject(event: any, row: any) {
    let project = this.sortedProjectsList.find(p => p.Name.toLowerCase() == event);
    if (project != undefined) {
      row.EnterpriseId = project.Project_Name;
    }

  }
  /* #endregion */

  /* #region  show import */
  public showImport(): void {
    this.showImportComponent();
  }

  private showImportComponent() {
    let config = new DynamicDialogConfig();
    config.data = {
      sortedPeopleList: this.sortedPeopleList,
      wbsTableRecords: this.wbsTableRecords,
      allTeamsList: this.allTeamsList,
      allProjectsList: this.sortedProjectsList
    };
    config.width = "300px";
    config.height = "500px";
    config.showHeader = false;
    config.dismissableMask = true;
    config.closeOnEscape = true;
    config.transitionOptions = "400ms cubic-bezier(0.25, 0.8, 0.25, 1)";

    const ref = this.dialogService.open(ImportComponent, config);

    ref.onClose.subscribe((response: any) => {

    });
  }
  /* #endregion */
}
