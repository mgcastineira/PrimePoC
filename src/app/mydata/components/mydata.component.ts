import { Component, OnInit,OnDestroy } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { DialogService, ConfirmationService } from 'primeng/api';
import { UserDataService } from '../services/mydata.service';
import { Subscription } from 'rxjs';
import { UserDataOperations } from '../models/user-data-operations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mydata',
  templateUrl: './mydata.component.html',
  styleUrls: ['./mydata.component.scss'],
  providers: [
    DialogService,
    ConfirmationService,
    DatePipe
  ]
})
export class MyDataComponent implements OnInit,OnDestroy {
  protected serviceSubscription: Subscription;

  userData:any;
  startDate: string = "";
  endDate: string = "";
  birthDate:string="";
  contractAndCompany: string = "";
  primaryContact: string = "";

  constructor(private userDataService: UserDataService, private datePipe: DatePipe) {
    this.serviceSubscription = this.userDataService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case UserDataOperations.GetInitialData:
            if(serviceResponse.ok){
              this.userData = serviceResponse.payload.userData;
              this.startDate = "Start Date " + this.datePipe.transform(
                new Date(serviceResponse.payload.userData.EntryDate), 
                'dd/MM/yyyy');
              this.endDate = this.datePipe.transform(
                new Date(serviceResponse.payload.userData.ExitDate),
                'dd/MM/yyyy');
              if (serviceResponse.payload.userData.BirthDate!=null){
                this.birthDate = this.datePipe.transform(
                  new Date(serviceResponse.payload.userData.BirthDate),
                  'dd/MM/yyyy');
              }
              this.contractAndCompany = serviceResponse.payload.userData.ContractType + " in " + 
              serviceResponse.payload.userData.Company;
              this.primaryContact = "Primary contract: " + serviceResponse.payload.userData.PrimaryContact;
              
            }else{

            }

            break;
        }
      }
    );
   }

  ngOnInit() {
    this.userDataService.getInitialData();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.serviceSubscription != undefined)
      this.serviceSubscription.unsubscribe();
    
  }
}
