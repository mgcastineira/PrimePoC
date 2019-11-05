import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject, of } from 'rxjs';

import { WBSManagementOperations } from '@wbsmanagement/models/wbs-management-operations.model';
import { peopleListData, projectListData, myTeamListData, wbsListData, rulesListData } from '../models/mock-data';
import { IWBSManagement } from '../models/iwbs-management.model';


@Injectable({
  providedIn: 'root'
})
export class WBSManagementService {
  message: Subject<any> = new Subject();

  constructor() { }

  private getAllPeople():Observable<any>{
    return new Observable(observer => {
      observer.next(peopleListData);
      observer.complete();
    });
  }

  private getAllProjects(): Observable<any> {
    return new Observable(observer => {
      observer.next(projectListData);
      observer.complete();
    });
  }

  private getAllTeams(): Observable<any> {
    return new Observable(observer => {
      observer.next(myTeamListData);
      observer.complete();
    });
  }

  private getAllWBS(): Observable<any> {
    return new Observable(observer => {
      observer.next(wbsListData);
      observer.complete();
    });
  }

  private getAllRules(): Observable<any> {
    return new Observable(observer => {
      observer.next(rulesListData);
      observer.complete();
    });
  }

  public getInitialData() {
    console.log("loadInitialCredentialsNew");
    let call_1 = this.getAllPeople();
    let call_2 = this.getAllProjects();
    let call_3 = this.getAllTeams();
    let call_4 = this.getAllWBS();
    let call_5 = this.getAllRules();
    return forkJoin([call_1,
      call_2,
      call_3,
      call_4,
      call_5
    ]).subscribe(
      results => {
        this.getDatasource(results[3],
          results[2],
          results[1],
          results[0]
          );
        this.message.next({
          ok: true,
          operation: WBSManagementOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            allPeople:results[0],
            allProjects:results[1],
            allTeams:results[2],
            allWBS:results[3],
            datasource: this.getDatasource(results[3],
              results[2],
              results[1],
              results[0]
            ),
            allRules:results[4]
          },
          error: null,
          record: null
        });
      }
    );
  }

  private getDatasource(
    allWBSList:any[],
    allTeamsList:any[],
    allProjectsList:any[],
    allPeopleList:any[]
    ){
    let result:IWBSManagement[]=[];
    allWBSList.forEach(wbs => {
      let wbsRecordAux = {
        ID: wbs.ID,
        TeamId: wbs.TeamId,
        WBS: wbs.WBS,
        Work_Location: wbs.Work_Location,
        WBS_Comments: wbs.WBS_Comments,
        Active:wbs.Active
      }

      let record = {
        ID: wbs.ID,
        TeamId: wbs.TeamId,
        WBS: wbs.WBS,
        Work_Location: wbs.Work_Location,
        WBS_Comments: wbs.WBS_Comments,
        PeopleId: null,
        UserEnterpriseId: null,
        ProjectId: null,
        ProjectName: null,
        Active:wbs.Active,
        wbsManagementRecord: wbsRecordAux,
        saving:false,
        error:false
      }

      // get team information
      let team = allTeamsList.find(team => team.ID == wbs.TeamId);
      if(team!=undefined){
        // get project information
        let project = allProjectsList.find(project => project.ID == team.ProjectId);
        // get people information
        let people = allPeopleList.find(people => people.ID == team.PeopleId);
        if(project!=undefined && people!=undefined){
          record.ProjectName = project.ProjectName;
          record.ProjectId = project.ID;

          record.UserEnterpriseId = people.EnterpriseId;
          record.PeopleId = people.ID;

          result.push(record);
        }
      }
        
    });

    return result;

  }

  public SaveCommentRequest(componentId:number,comment:string){
    this.message.next({
      ok:true,
      operation:WBSManagementOperations.SaveComment,
      payload:{
        wbsId:componentId,
        comment:comment
      }
    });
  }
}
