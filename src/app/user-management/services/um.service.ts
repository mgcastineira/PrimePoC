import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { UserManagementOperations } from '../models/user-management-operations';

@Injectable({
  providedIn: 'root'
})
export class UmService {
  private _userDataJASONUrl = 'assets/mock-user-data.json';
  private _teamsDataJASONUrl = 'assets/mock-team-data.json';
  private _peopleJASONUrl = 'assets/mock-people-data.json';
  private _projectsJASONUrl = 'assets/mock-projects-data.json';
  private _userRolesJASONUrl = 'assets/mock-all-user-roles-data.json';

  message: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
  }

  private getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  private getMyData(): Observable<any> {
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

  public getInitialData() {
    let call_1 = this.getAllPeople();
    let call_2 = this.getAllUserRoles();
    return forkJoin([call_1, call_2
    ]).subscribe(
      results => {
        let allPeople = results[0];
        let allUserRoles = results[1];
        this.message.next({
          ok: true,
          operation: UserManagementOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            allPeople: allPeople,
            allUserRoles: allUserRoles
          },
          error: null,
          record: null
        });
      },
      error => {
        this.message.next({
          ok: false,
          operation: UserManagementOperations.GetInitialData,
          method: "getInitialData",
          payload: null,
          error: error,
          record: null
        });
      }
    );
  }

  // getUsers(){
  //   let data: UmModel[] = [
  //     {
  //       "DNI": "1A",
  //       "Title": "Marcos",
  //       "Status": "Active",
  //       "ID": 1,
  //       "Id": 1,
  //       "EnterpriseID": "marcos.gonzalez",
  //       "CareerLevel": "A",
  //       "Location": "Barajas",
  //       "EntryDate": new Date("2019/09/20"),
  //       "ExitDate": new Date(),
  //       "Selected":false,
  //       "Company":"Avanade SAU",
  //       "AirbusSAPUser":"AA12",
  //       "NEmployee":"123331"
  //     },
  //     {
  //       "DNI": "2A",
  //       "Title": "Romina",
  //       "Status": "Inactive",
  //       "ID": 2,
  //       "Id": 2,
  //       "EnterpriseID": "romina.congregado",
  //       "CareerLevel": "B",
  //       "Location": "Getafe",
  //       "EntryDate": new Date("2018/09/01"),
  //       "ExitDate": new Date(),
  //       "Selected": false,
  //       "Company": "Accenture SL",
  //       "AirbusSAPUser": "AA13",
  //       "NEmployee": "123561"
  //     },
  //   ];
  //   return data;
  // }
}
