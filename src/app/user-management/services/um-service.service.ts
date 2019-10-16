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
        "EntryDate": null,
        "ExitDate": null
      },
      {
        "DNI": "2A",
        "Title": "Romina",
        "Status": "Active",
        "ID": 2,
        "Id": 2,
        "EnterpriseID": "romina.congregado",
        "CareerLevel": "B",
        "Location": "Getafe",
        "EntryDate": null,
        "ExitDate": null
      },
    ];
    return data;
  }
}
