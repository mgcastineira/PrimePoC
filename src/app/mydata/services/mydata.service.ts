import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { UserDataOperations } from '../models/user-data-operations';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _userDataJASONUrl = 'assets/mock-user-data.json';
  private _teamsDataJASONUrl = 'assets/mock-team-data.json';
  private _peopleJASONUrl = 'assets/mock-people-data.json';
  private _projectsJASONUrl = 'assets/mock-projects-data.json';
  private _userRolesJASONUrl = 'assets/mock-all-user-roles-data.json';

  message: Subject<any> = new Subject();

  constructor(private http: HttpClient) { 
    
  }

  private getJSON(url:string): Observable<any> {
    return this.http.get(url);
  }

  private getMyData():Observable<any>{
    return this.getJSON(this._userDataJASONUrl);
  }

  private getMyTeams(): Observable<any> {
    return this.getJSON(this._teamsDataJASONUrl);
  }

  private getAllProjects(): Observable<any> {
    return this.getJSON(this._projectsJASONUrl);
  }

  private getAllPeople(): Observable<any> {
    return this.getJSON(this._peopleJASONUrl);
  }

  private getAllUserRoles(): Observable<any> {
    return this.getJSON(this._userRolesJASONUrl);
  }

  public getInitialData(){
    let call_1 = this.getMyData();
    let call_2 = this.getMyTeams();
    let call_3 = this.getAllProjects();
    let call_4 = this.getAllPeople();
    let call_5 = this.getAllUserRoles();
    return forkJoin([call_1,call_2,call_3,call_4,call_5
    ]).subscribe(
      results => {
        let userData = results[0];
        let teamsData = results[1];
        let allProjects = results[2];
        let allPeople = results[3];
        let allUserRoles = results[4];
        this.message.next({
          ok: true,
          operation: UserDataOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            userData:userData,
            teamsData:teamsData,
            allProjects:allProjects,
            allPeople:allPeople,
            allUserRoles:allUserRoles
          },
          error: null,
          record: null
        });
      },
      error => {
        this.message.next({
          ok: false,
          operation: UserDataOperations.GetInitialData,
          method: "getInitialData",
          payload: null,
          error: error,
          record: null
        });
      }
    );
  }
}
