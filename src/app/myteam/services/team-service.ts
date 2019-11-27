import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject, of } from 'rxjs';

import { PeopleMock, ProjectMock, TeamMock, WBSMock } from '../models/team-mock-model';
import { TeamsOperations } from '../models/teams-operations.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  message: Subject<any> = new Subject();

  constructor() { }

  private getWBSMock(): Observable<any> {
    return new Observable(observer => {
      observer.next(WBSMock);
      observer.complete();
    });
  }

  private getTeamMock(): Observable<any> {
    return new Observable(observer => {
      observer.next(TeamMock);
      observer.complete();
    });
  }

  private getProjectMock(): Observable<any> {
    return new Observable(observer => {
      observer.next(ProjectMock);
      observer.complete();
    });
  }

  private getPeopleMock(): Observable<any> {
    return new Observable(observer => {
      observer.next(PeopleMock);
      observer.complete();
    });
  }

  private getDatasource(projectList: any[],
    peopleList: any[],
    teamList: any[],
    peopleId: number): any {

    let result:any = null;
    let summaryList:any[]=[];
    let resultDatasource: any[] = [];

    let proj = projectList.filter(p => p.SPOC == peopleId || p.Responsible == peopleId)
    if (proj != undefined && proj != null) {
      for (let index = 0; index < proj.length; index++) {
        const project = proj[index];
        const group = {
          asResponsible: project.Responsible == peopleId,
          project: project.Project_Name,
          projectData: project,
          spocName: peopleList.find(p => p.ID == project.SPOC).Title,
          items: []
        };

        let myTeamRecords = teamList.filter(p => p.ProjectId == project.ID
          && p.Active == true);
        for (let index2 = 0; index2 < myTeamRecords.length; index2++) {
          const myTeamRecord = myTeamRecords[index2];


          const item = {
            projectData: project,
            ID: myTeamRecord.ID,
            PeopleId: myTeamRecord.PeopleId,
            ProjectId: myTeamRecord.ProjectId,
            active: myTeamRecord.Active,
            activationDate: myTeamRecord.ActivationDate,
            deactivationDate: myTeamRecord.DeactivationDate,
            dateAccessReq: myTeamRecord.DateAccessReq,
            environment:{
              ProductionEnv: myTeamRecord.ProductionEnv,
              ProductionEnvRead: false,
              ProductionEnvWrite: false,
              NonProductionEnvs: myTeamRecord.NonProductionEnvs,
              NonProductionEnvRead: false,
              NonProductionEnvWrite: false,
              OtherEnvs: myTeamRecord.OtherEnvs,
              OtherEnvsRead: false,
              OtherEnvsWrite: false,
              SameAppEnvs: myTeamRecord.SameAppEnvs,
            },            
            wbsList: [],
            activeprojects: [],
            userData: null,
            name: "",
            project: project.Project_Name,
            saving: false,
            error: false
          };

          // Informamos environments
          switch(item.environment.ProductionEnv){
            case "1":
              item.environment.ProductionEnvRead = true;
              break;
            case "2":
              item.environment.ProductionEnvRead = true;
              item.environment.ProductionEnvWrite = true;
              break;
          }

          switch (item.environment.NonProductionEnvs) {
            case "1":
              item.environment.NonProductionEnvRead = true;
              break;
            case "2":
              item.environment.NonProductionEnvRead = true;
              item.environment.NonProductionEnvWrite = true;
              break;
          }

          switch (item.environment.OtherEnvs) {
            case "1":
              item.environment.OtherEnvsRead = true;
              break;
            case "2":
              item.environment.OtherEnvsRead = true;
              item.environment.OtherEnvsWrite = true;
              break;
          }

          // Para cada registro obtenemos el usuario
          item.userData = peopleList.find(p => p.ID == item.PeopleId);
          if (item.userData != undefined)
            item.name = item.userData.Title;
          group.items.push(item);
          summaryList.push(item);

          // Obtenemos otros registros en MyTeam que no sean de este proyecto
          // para este usuario
          let otherMyTeamRecords = teamList.filter(p => p.ProjectId != project.ID
            && p.Active == true && p.PeopleId == item.PeopleId);

          if (otherMyTeamRecords != undefined) {
            for (let index3 = 0; index3 < otherMyTeamRecords.length; index3++) {
              const otherMyTeamRecord = otherMyTeamRecords[index3];
              const newItem = {
                project: null,
                spocId: null,
                responsibleId: null,
                spocName: null,
                spocEmail: null,
                responsibleName: null,
                responsibleEmail: null
              };
              let otherProjectRecord = projectList.find(p => p.ID == otherMyTeamRecord.ProjectId);
              if (otherProjectRecord != undefined) {
                newItem.project = otherProjectRecord;
                newItem.spocId = otherProjectRecord.SPOC;
                newItem.responsibleId = otherProjectRecord.Responsible;
                let otherProjectSpoc = peopleList.find(p => p.ID == newItem.spocId);
                if (otherProjectSpoc != undefined) {
                  newItem.spocName = otherProjectSpoc.Title;
                  newItem.spocEmail = otherProjectSpoc.MailAccenture;
                  let otherProjectResponsible = peopleList.find(p => p.ID == newItem.responsibleId);
                  if (otherProjectResponsible != undefined) {
                    newItem.responsibleName = otherProjectResponsible.Title;;
                    newItem.responsibleEmail = otherProjectResponsible.MailAccenture;
                    item.activeprojects.push(newItem);
                  } else {
                    // Error
                  }

                } else {
                  // Error
                }

              } else {
                // Error
              }
            }
          } else {
            // Error
          }
        }
        resultDatasource.push(group);
      }
    }
    result = {dataSource:resultDatasource,summaryList:summaryList};
    return result;
  }

  public getInitialData(peopleId:number) {
    console.log('gettin initial data');
    let call_1 = this.getWBSMock();
    let call_2 = this.getTeamMock();
    let call_3 = this.getProjectMock();
    let call_4 = this.getPeopleMock();
    return forkJoin([call_1,
      call_2,
      call_3,
      call_4
    ]).subscribe(
      results => {
        let wbsList = results[0];
        let teamList = results[1];
        let projectList = results[2];
        let peopleList = results[3];
        let result = this.getDatasource(projectList,
          peopleList,
          teamList,
          peopleId);

        this.message.next({
          ok: true,
          operation: TeamsOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            result: result
          },
          error: null,
          record: null
        });
      }
    );
  }
}
