import { Injectable } from '@angular/core';
import { UmModel } from '@um/models/um-model';

@Injectable({
  providedIn: 'root'
})
export class UmServiceService {

  constructor() { }

  getUsers(){
    let data: UmModel[] = [
      {
        "DNI": "1A",
        "Title": "Marcos",
        "Status": "Active",
        "ID": 1,
        "Id": 1,
        "EnterpriseID": "marcos.gonzalez",
        "CareerLevel": "A",
        "Location": "Barajas",
        "EntryDate": new Date("2019/09/20"),
        "ExitDate": new Date(),
        "Selected":false,
        "Company":"Avanade SAU",
        "AirbusSAPUser":"AA12",
        "NEmployee":"123331"
      },
      {
        "DNI": "2A",
        "Title": "Romina",
        "Status": "Inactive",
        "ID": 2,
        "Id": 2,
        "EnterpriseID": "romina.congregado",
        "CareerLevel": "B",
        "Location": "Getafe",
        "EntryDate": new Date("2018/09/01"),
        "ExitDate": new Date(),
        "Selected": false,
        "Company": "Accenture SL",
        "AirbusSAPUser": "AA13",
        "NEmployee": "123561"
      },
    ];
    return data;
  }
}
