import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  protected serviceSubscription: Subscription;
  @ViewChild('table') table: Table;
  @Input() datasource: any[] = [];
  teamUsersList1: any[] = [];
  teamUsersList2: any[] = [];

  clonedUsersList: { [s: string]: any; } = {};

  filterValue: string = "";
  constructor() { }

  ngOnInit() {
    this.teamUsersList1 = this.datasource;
    this.teamUsersList2 = JSON.parse(JSON.stringify(this.teamUsersList1));
  }
  /* #region  PrimeNg table row editing */
  onRowEditInit(row: any) {
    this.clonedUsersList[row.ID] = { ...row };
  }

  onRowEditSave(row: any) {
    row.saving = true;
    // if (this.validateData(row)) {
    //   delete this.clonedSummaryList[row.project_id];
    //   let pToSave = this.summaryList1.find(p => p.project_id == row.project_id);


    //   // format record
    //   let record = {
    //     Title: null,
    //     MD: row.md_id,
    //     Responsible: row.responsible_id,
    //     SPOC: row.spoc_id,
    //     Project_Name: row.project_name,
    //     Contract: row.contract,
    //     AirbusDirectResponsible: row.airbus_directResponsible,
    //     AirbusResponsible: row.airbus_responsible
    //   };
    //   // Update peopleId for each name
    //   let newMd = this.peopleSortedList.find(u => u.Title.toLowerCase() == pToSave.md_name.toLowerCase());
    //   if (newMd != undefined)
    //     record.MD = newMd.ID;
    //   let newResponsible = this.peopleSortedList.find(u => u.Title.toLowerCase() == pToSave.responsible_name.toLowerCase());
    //   if (newResponsible != undefined)
    //     record.Responsible = newResponsible.ID;
    //   let newSpoc = this.peopleSortedList.find(u => u.Title.toLowerCase() == pToSave.spoc_name.toLowerCase());
    //   if (newSpoc != undefined)
    //     record.SPOC = newSpoc.ID;

    //   this.projectManagementService.updateProject(UserActions.ProjectManagementUpdateProject,
    //     record, row.project_id);
    //   this.table.reset();
    //   this.filterActive();
    // }
    // else {
    //   this.notificationService.timedWarn("Data for project " +
    //     row.project_name + "are not valid.", this.durationMS);
    //   this.onRowEditCancel(row);
    // }
  }

  onRowEditCancel(row: any) {
    let clonedProject = this.clonedUsersList[row.ID];
    let pToCancel = this.teamUsersList2.find(t => t.ID == row.ID);
    pToCancel.saving = false;
    let recordToCancel = this.teamUsersList1.find(t => t.ID == row.ID);
    let indexAux = this.teamUsersList1.indexOf(recordToCancel);
    this.teamUsersList1[indexAux] = JSON.parse(JSON.stringify(pToCancel));
    delete this.clonedUsersList[row.ID];
    this.table.reset();
  }

  environmentChangeEvent(row: any, property: string) {
    row = this.getEnvironmentValues(row, property);
  }

  private getEnvironmentValues(item: any, property: string): any {
    switch (property) {
      /* #region  Production */
      case "ProductionEnvWrite":
        if (item.environment.ProductionEnvWrite) {
          item.environment.ProductionEnvRead = true;
          item.environment.ProductionEnv = "2";
        } else {
          if (item.environment.ProductionEnvRead) {
            item.environment.ProductionEnv = "1";
          } else {
            item.environment.ProductionEnv = "0";
          }
        }
        break;
      case "ProductionEnvRead":
        if (item.environment.ProductionEnvRead) {
          item.environment.ProductionEnvWrite = false;
          item.environment.ProductionEnv = "1";
        } else {
          item.environment.ProductionEnv = "0";
          item.environment.ProductionEnvWrite = false;
        }
        break;
      /* #endregion */
      /* #region  Non-Production */
      case "NonProductionEnvsWrite":
        if (item.environment.NonProductionEnvsWrite) {
          item.environment.NonProductionEnvsRead = true;
          item.environment.NonProductionEnvs = "2";
        } else {
          if (item.environment.NonProductionEnvsRead) {
            item.environment.NonProductionEnvs = "1";
          } else {
            item.environment.NonProductionEnvs = "0";
          }
        }
        break;
      case "NonProductionEnvsRead":
        if (item.environment.NonProductionEnvsRead) {
          item.environment.NonProductionEnvsWrite = false;
          item.environment.NonProductionEnvs = "1";
        } else {
          item.environment.NonProductionEnvs = "0";
          item.environment.NonProductionEnvsWrite = false;
        }
        break;
      /* #endregion */
      /* #region  Other environments */
      case "OtherEnvsWrite":
        if (item.environment.OtherEnvsWrite) {
          item.environment.OtherEnvsRead = true;
          item.environment.OtherEnvs = "2";
        } else {
          if (item.environment.OtherEnvsRead) {
            item.environment.OtherEnvs = "1";
          } else {
            item.environment.OtherEnvs = "0";
          }
        }
        break;
      case "OtherEnvsRead":
        if (item.environment.OtherEnvsRead) {
          item.environment.OtherEnvsWrite = false;
          item.environment.OtherEnvs = "1";
        } else {
          item.environment.OtherEnvs = "0";
          item.environment.OtherEnvsWrite = false;
        }
        break;
      /* #endregion */
    }



    return item;
  }

  private validateData(project: any): boolean {
    let result = true;
    // let md = undefined;
    // let responsible = undefined;
    // let spoc = undefined;
    // if (project.md_name != null)
    //   md = this.peopleSortedList.find(u => u.Title.toLowerCase() == project.md_name.toLowerCase());
    // else
    //   return false;
    // if (project.responsible_name != null)
    //   responsible = this.peopleSortedList.find(u => u.Title.toLowerCase() == project.responsible_name.toLowerCase());
    // else
    //   return false;
    // if (project.spoc_name != null)
    //   spoc = this.peopleSortedList.find(u => u.Title.toLowerCase() == project.spoc_name.toLowerCase());
    // else
    //   return false;
    // if (project.project_name == undefined || project.project_name == "")
    //   result = false;
    // else
    //   if (project.md_name != undefined && project.md_name != null && project.md_name != "")
    //     result = md != undefined;
    //   else
    //     if (project.responsible_name != undefined && project.responsible_name != null && project.responsible_name != "")
    //       result = responsible != undefined;
    //     else
    //       if (project.spoc_name != undefined && project.spoc_name != null && project.spoc_name != "")
    //         result = spoc != undefined;
    return result;
  }

  removeRow(row: any, index: number) {
    // this.confirmationService.confirm({
    //   message: "Delete item from Project List?",
    //   key: "cdd",
    //   header: 'Delete Confirmation',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {
    //     row.saving = true;
    //     delete this.clonedProjects[row.project_id];
    //     let pToSave = this.projects1.find(p => p.project_id == row.project_id);
    //     // format record
    //     let record = {
    //       Active: false,
    //       Project_Name: row.project_name
    //     };
    //     this.projectManagementService.updateProject(UserActions.ProjectManagementRemoveProject,
    //       record, row.project_id);
    //     this.table.reset();
    //     this.filterActive();
    //   },
    //   reject: () => {

    //   }
    // });
  }

  /* #endregion */

  //* #region  PrimeNg table filter */

  globalFilter(value: any) {
    this.table.reset();
    this.table.filterGlobal(value, 'contains');
  }

  resetGlobalFilter() {
    this.table.reset();
    this.filterValue = "";
  }

  /* #endregion */
}
