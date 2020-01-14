import { Component, OnInit,OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { DialogService, ConfirmationService } from 'primeng/api';
import { UserDataService } from '../services/mydata.service';
import { Subscription } from 'rxjs';
import { UserDataOperations } from '../models/user-data-operations';
import { DatePipe } from '@angular/common';
import { ProjectDetailComponent } from '../features/project-detail/project-detail.component';

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
  @ViewChildren('projectDetail') projectDetailList: QueryList<ProjectDetailComponent>;
  
  userId:number=918; // ID del usuario que utiliza la aplicación
  personId:number=0; // ID de la persona visualizada
  myOwnData:boolean=false; // Si la persona accede a sus propios datos
  adminRole:any;

  userData:any;
  teamsData:any[];
  allPeople:any[];
  allProjects:any[];
  allUserRoles:any[];
  myUserRoles:any[];
  personRoles:any[];

  startDate: string = "";
  endDate: string = "";
  birthDate:string="";
  contractAndCompany: string = "";
  primaryContact: string = "";



  currentTabIndex:number = -1;

  constructor(private userDataService: UserDataService, private datePipe: DatePipe) {
    this.serviceSubscription = this.userDataService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case UserDataOperations.GetInitialData:
            if(serviceResponse.ok){
              this.allPeople = serviceResponse.payload.allPeople;
              this.allProjects = serviceResponse.payload.allProjects;
              this.allUserRoles = serviceResponse.payload.allUserRoles;

              this.personId = serviceResponse.payload.userData.ID;
              this.initialize();

              this.setupTopBarData(serviceResponse);

              this.userData = serviceResponse.payload.userData;

              
            }else{
              // Error obteniendo datos iniciales
            }

            break;
        }
      }
    );
   }

  private setupTopBarData(serviceResponse: any) {
    this.teamsData = this.processTeamDatasource(serviceResponse.payload.teamsData);
    if (this.teamsData.length > 0)
      this.currentTabIndex = 0;
    this.startDate = "Start Date " + this.datePipe.transform(new Date(serviceResponse.payload.userData.EntryDate), 'dd/MM/yyyy');
    this.endDate = this.datePipe.transform(new Date(serviceResponse.payload.userData.ExitDate), 'dd/MM/yyyy');
    if (serviceResponse.payload.userData.BirthDate != null) {
      this.birthDate = this.datePipe.transform(new Date(serviceResponse.payload.userData.BirthDate), 'dd/MM/yyyy');
    }
    this.contractAndCompany = serviceResponse.payload.userData.ContractType + " in " +
      serviceResponse.payload.userData.Company;
    this.primaryContact = "Primary contact: " + serviceResponse.payload.userData.PrimaryContact;
  }

  private initialize() {
    this.myOwnData = this.personId == this.userId;
    this.personRoles = this.allUserRoles.filter(role => role.PeopleId == this.personId &&
      role.Active == true);
    if (this.myOwnData) {
      this.myUserRoles = this.personRoles;
    }
    else {
      this.myUserRoles = this.allUserRoles.filter(role => role.PeopleId == this.userId &&
        role.Active == true);
    }
    this.adminRole = this.myUserRoles.find(role => role.RoleId == 13);
    if (this.adminRole != undefined) {
      // El role del usuario es 13
    }
    else {
      this.adminRole = this.myUserRoles.find(role => role.RoleId == 4 || role.RoleId == 8 || role.RoleId == 12);
    }
  }

  ngOnInit() {
    this.userDataService.getInitialData();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.serviceSubscription != undefined)
      this.serviceSubscription.unsubscribe();
    
  }

  private processTeamDatasource(teamsData:any[]):any[]{
    let result: any[]=[];
    teamsData.forEach(team => {
      let record={
        ID:team.ID,
        Active:team.Active,
        ProjectId:team.ProjectId,
        ProjectName:"",
        Contract:"",
        MD:null,
        MDName:"",
        DeliveryLead:null,
        DeliveryLeadName:"",
        Supervisor:null,
        SupervisorName:"",
        AirbusResponsible:"",
        AirbusDirectResponsible:"",
        Geography:""
      };
      // Obtener project
      this.getProjectInformation(record);

      result.push(record);
    });

    return result;
  }

  private getProjectInformation(record: any) {
    let project = this.allProjects.find(project => project.ID == record.ProjectId);
    if (project != undefined && project != null) {
      record.ProjectName = project.Project_Name;
      record.Contract = project.Contract;
      record.AirbusResponsible = project.AirbusResponsible;
      record.AirbusDirectResponsible = project.AirbusDirectResponsible;
      record.Geography = project.Geography;
      record.MD = project.MD;
      record.DeliveryLead = project.Responsible;
      record.Supervisor = project.SPOC;

      // Obtener datos de personas
      let md = this.allPeople.find(person => person.ID == project.MD);
      let deliveryLead = this.allPeople.find(person => person.ID == project.Responsible);
      let supervisor = this.allPeople.find(person => person.ID == project.SPOC);
      if (md != undefined && md != null) {
        record.MDName = md.Title;
      }
      if (deliveryLead != undefined && deliveryLead != null) {
        record.DeliveryLeadName = deliveryLead.Title;
      }
      if (supervisor != undefined && supervisor != null) {
        record.SupervisorName = supervisor.Title;
      }
    }
  }
  
  checkGeography(countryCode:string):boolean{
    switch(countryCode.toUpperCase()){
      case "ES":
        return this.personRoles.find(role=>role.RoleId==2)!=undefined;
        break;
      case "FR":
        return this.personRoles.find(role => role.RoleId == 6) != undefined;
        break;
      case "DE":
        return this.personRoles.find(role => role.RoleId == 10) != undefined;
        break;
    }
  }

  handleTabChange(e) {
    this.currentTabIndex = e.index;
  }

  private temp_add(){
    let currentProjectData = this.projectDetailList.find(projectDetail => projectDetail.tabId == this.currentTabIndex);
  }
}
