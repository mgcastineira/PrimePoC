import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { TabViewModule, TabView } from 'primeng/tabview';
import { DialogService, ConfirmationService, DynamicDialogConfig } from 'primeng/api';
import { UserDataService } from '../services/mydata.service';
import { Subscription } from 'rxjs';
import { UserDataOperations } from '../models/user-data-operations';
import { DatePipe } from '@angular/common';
import { ProjectDetailComponent } from '../features/project-detail/project-detail.component';
import { NewProjectComponent } from '../features/new-project/new-project.component';
import { Calendar } from 'primeng/calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
export class MyDataComponent implements OnInit, OnDestroy {
  @ViewChildren('projectDetail') projectDetailList: QueryList<ProjectDetailComponent>;

  /* #region  ViewChild */
  @ViewChild('tabView') tabView: TabView;
  @ViewChild('startDateCalendar') startDateCalendar: Calendar;
  @ViewChild('endDateCalendar') endDateCalendar: Calendar;
  @ViewChild('birthDateCalendar') birthDateCalendar: Calendar;
  /* #endregion */

  /* #region  forms groups */
  cardInfoForm: FormGroup;
  birthInfoForm: FormGroup;
  emailInfoForm: FormGroup;
  locationInfoForm: FormGroup;
  rollOnInfoForm: FormGroup;
  organizationInfoForm: FormGroup;
  costCenterInfoForm: FormGroup;
  careerInfoForm: FormGroup;
  otherLocationsInfoForm: FormGroup;
  commentsInfoForm: FormGroup;
  /* #endregion */

  /* #region  forms edit flags */
  cardInfoFormModeEdition: boolean = false;
  birthInfoFormModeEdition: boolean = false;
  emailInfoFormModeEdition: boolean = false;
  locationInfoFormModeEdition: boolean = false;
  rollOnInfoFormModeEdition: boolean = false;
  organizationInfoFormModeEdition: boolean = false;
  costCenterInfoFormModeEdition: boolean = false;
  careerInfoFormModeEdition: boolean = false;
  otherLocationsInfoFormModeEdition: boolean = false;
  commentsInfoFormModeEdition: boolean = false;
  /* #endregion */

  userDataOperations = UserDataOperations;
  protected serviceSubscription: Subscription;


  userId: number = 918; // ID del usuario que utiliza la aplicación
  personId: number = 0; // ID de la persona visualizada
  myOwnData: boolean = false; // Si la persona accede a sus propios datos
  adminRole: any;

  userData: any;
  teamsData: any[];
  allPeople: any[];
  allActiveProjects: any[];
  allUserRoles: any[];
  myUserRoles: any[];
  personRoles: any[];

  startDate: string = "";
  contractAndCompany: string = "";
  primaryContact: string = "";

  showInactiveProjects: boolean = false;
  currentTabIndex: number = -1;


  entryDate: Date;
  exitDate: Date;
  birthDate: Date;

  constructor(private userDataService: UserDataService,
    private fBuilder: FormBuilder,
    private dialogService: DialogService,
    private datePipe: DatePipe) {
    this.serviceSubscription = this.userDataService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case UserDataOperations.GetInitialData:
            if (serviceResponse.ok) {
              this.sortPeopleAndProjects(serviceResponse);
              this.allUserRoles = serviceResponse.payload.allUserRoles;

              this.personId = serviceResponse.payload.userData.ID;
              this.initialize();

              this.setupTopBarData(serviceResponse);

              this.userData = serviceResponse.payload.userData;

              if (serviceResponse.payload.userData.EntryDate != null) {
                this.entryDate = new Date(serviceResponse.payload.userData.EntryDate);
              } else {
                this.entryDate = null;
              }
              if (serviceResponse.payload.userData.ExitDate != null) {
                this.exitDate = new Date(serviceResponse.payload.userData.ExitDate);
              } else {
                this.exitDate = null;
              }
              if (serviceResponse.payload.userData.BirthDate != null) {
                this.birthDate = new Date(serviceResponse.payload.userData.BirthDate);
              } else {
                this.birthDate = null;
              }

            } else {
              // Error obteniendo datos iniciales
            }

            break;
        }
      }
    );
  }

  private initilizeControls() {
    /* #region  cardInfoForm */
    this.cardInfoForm = this.fBuilder.group({
      dni: new FormControl({ value: null, disabled: true }, Validators.required),
      airbusSAPUser: new FormControl({ value: null, disabled: true }),
      nEmployee: new FormControl({ value: null, disabled: true }),
      NATO: new FormControl({ value: null, disabled: true }),
      enterpriseID: new FormControl({ value: null, disabled: true }),
      nUserNG: new FormControl({ value: null, disabled: true }),
      nSS: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  birthInfoForm */
    this.birthInfoForm = this.fBuilder.group({
      birthDate: new FormControl({ value: null, disabled: true }),
      placeBirth: new FormControl({ value: null, disabled: true }),
      nationality: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  emailInfoForm */
    this.emailInfoForm = this.fBuilder.group({
      mailAccenture: new FormControl({ value: null, disabled: true }, Validators.required),
      mailAirbus: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  locationInfoForm */
    this.locationInfoForm = this.fBuilder.group({
      location: new FormControl({ value: null, disabled: true }),
      workplace: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  rollOnInfoForm */
    this.rollOnInfoForm = this.fBuilder.group({
      rollOnOff: new FormControl({ value: null, disabled: true }),
      exitReason: new FormControl({ value: null, disabled: true }),
      gESUB: new FormControl({ value: null, disabled: true }),
      primaryContact: new FormControl({ value: null, disabled: true }),
      startDate: new FormControl({ value: null, disabled: true }),
      endDate: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  organizationInfoForm */
    this.organizationInfoForm = this.fBuilder.group({
      company: new FormControl({ value: null, disabled: true }),
      contractType: new FormControl({ value: null, disabled: true }),
      deplGeoUnit: new FormControl({ value: null, disabled: true }),
      companyCode: new FormControl({ value: null, disabled: true }),
      orgUnit: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  costCenterInfoForm */
    this.costCenterInfoForm = this.fBuilder.group({
      costCenterName: new FormControl({ value: null, disabled: true }),
      economicProfile: new FormControl({ value: null, disabled: true }),
      costCenterCode: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  careerInfoForm */
    this.careerInfoForm = this.fBuilder.group({
      careerTrack: new FormControl({ value: null, disabled: true }),
      roleFamily: new FormControl({ value: null, disabled: true }),
      reqIndustryCategory: new FormControl({ value: null, disabled: true }),
      careerLevel: new FormControl({ value: null, disabled: true }),
      talentSegment: new FormControl({ value: null, disabled: true }),
      reqIndustrySpeciality: new FormControl({ value: null, disabled: true }),
      reqFuncTechCapability: new FormControl({ value: null, disabled: true }),

    });
    /* #endregion */
    /* #region  otherLocationsInfoForm */
    this.otherLocationsInfoForm = this.fBuilder.group({
      otherLocations: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    /* #region  commentsInfoForm */
    this.commentsInfoForm = this.fBuilder.group({
      observations: new FormControl({ value: null, disabled: true }),
    });
    /* #endregion */
    }


  private sortPeopleAndProjects(serviceResponse: any) {
    this.allPeople = serviceResponse.payload.allPeople.sort((s1, s2) => {
      if (s1.Title.toLowerCase() > s2.Title.toLowerCase()) {
        return 1;
      }
      if (s1.Title.toLowerCase() < s2.Title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    this.allActiveProjects = serviceResponse.payload.allProjects.filter(project => project.Active == true)
      .sort((s1, s2) => {
        if (s1.Project_Name != undefined
          && s1.Project_Name != undefined
          && (s1.Project_Name.toLowerCase() > s2.Project_Name.toLowerCase())) {
          return 1;
        }
        if (s1.Project_Name != undefined
          && s1.Project_Name != undefined
          && (s1.Project_Name.toLowerCase() < s2.Project_Name.toLowerCase())) {
          return -1;
        }
        return 0;
      });
  }

  private setupTopBarData(serviceResponse: any) {
    this.teamsData = this.processTeamDatasource(serviceResponse.payload.teamsData);
    if (this.teamsData.length > 0)
      this.currentTabIndex = 0;
    this.startDate = "Start Date " + this.datePipe.transform(new Date(serviceResponse.payload.userData.EntryDate), 'dd/MM/yyyy');

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

  isAdminMode(): boolean {
    let allowedRolesForEdit = [4, 8, 12, 13];
    return allowedRolesForEdit.find(a => this.adminRole != undefined && a == this.adminRole.RoleId) != undefined;
  }

  ngOnInit() {
    this.userDataService.getInitialData();
    this.initilizeControls();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.serviceSubscription != undefined)
      this.serviceSubscription.unsubscribe();

  }

  private processTeamDatasource(teamsData: any[]): any[] {
    let result: any[] = [];
    teamsData.forEach(team => {
      let record = {
        ID: team.ID,
        Active: team.Active,
        ProjectId: team.ProjectId,
        ProjectName: "",
        Contract: "",
        MD: null,
        MDName: "",
        DeliveryLead: null,
        DeliveryLeadName: "",
        Supervisor: null,
        SupervisorName: "",
        AirbusResponsible: "",
        AirbusDirectResponsible: "",
        Geography: "",
        ActivationDate: null,
        DeactivationDate: null
      };
      if (team.ActivationDate != null)
        record.ActivationDate = new Date(team.ActivationDate);
      if (team.DeactivationDate != null)
        record.DeactivationDate = new Date(team.DeactivationDate);
      // Obtener project
      this.getProjectInformation(record);

      result.push(record);
    });

    return result;
  }

  private getProjectInformation(record: any) {
    let project = this.allActiveProjects.find(project => project.ID == record.ProjectId);
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

  checkGeography(countryCode: string): boolean {
    switch (countryCode.toUpperCase()) {
      case "ES":
        return this.personRoles.find(role => role.RoleId == 2) != undefined;
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


  addUserToTeam() {
    let config = new DynamicDialogConfig();
    config.data = {
      sortedPeopleList: this.allPeople,
      sortedProjectList: this.allActiveProjects
    };
    // Filtrar proyectos por geografía
    switch (this.adminRole.RoleId) {
      case 4:
        config.data.sortedProjectList = this.allActiveProjects;
        break;
      case 8:
        config.data.sortedProjectList = this.allActiveProjects;
        break;
      case 12:
        config.data.sortedProjectList = this.allActiveProjects;
        break;
    }

    config.showHeader = false;
    config.dismissableMask = true;
    config.closeOnEscape = true;
    config.transitionOptions = "400ms cubic-bezier(0.25, 0.8, 0.25, 1)";


    const ref = this.dialogService.open(NewProjectComponent, config);

    ref.onClose.subscribe((result: any) => {
      if (result != undefined && result != null && result.length > 0) {
        // Llamar servicio actualización

      }
    });
  }

  showThisProject(project: any): boolean {
    if (this.showInactiveProjects) {
      return true;
    }
    else {


      return project.Active;
    }
  }

  changeProjectFilter(evento: any) {
    if (!this.showInactiveProjects && this.currentTabIndex >= this.tabView.tabs.length) {
      this.currentTabIndex = this.tabView.tabs.length - 1;

    }
  }

  editData(type: UserDataOperations) {
    switch (type) {
      /* #region  EditCardInfo */
      case UserDataOperations.EditCardInfo:
        this.cardInfoFormModeEdition = !this.cardInfoFormModeEdition;
        if (this.cardInfoFormModeEdition) {
          Object.keys(this.cardInfoForm.controls).forEach(key => {
            this.cardInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.cardInfoForm.controls).forEach(key => {
            this.cardInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditBirthInfo */
      case UserDataOperations.EditBirthInfo:
        this.birthInfoFormModeEdition = !this.birthInfoFormModeEdition;
        if (this.birthInfoFormModeEdition) {
          Object.keys(this.birthInfoForm.controls).forEach(key => {
            this.birthInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.birthInfoForm.controls).forEach(key => {
            this.birthInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditEmailInfo */
      case UserDataOperations.EditEmailInfo:
        this.emailInfoFormModeEdition = !this.emailInfoFormModeEdition;
        if (this.emailInfoFormModeEdition) {
          Object.keys(this.emailInfoForm.controls).forEach(key => {
            this.emailInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.emailInfoForm.controls).forEach(key => {
            this.emailInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditLocationInfo */
      case UserDataOperations.EditLocationInfo:
        this.locationInfoFormModeEdition = !this.locationInfoFormModeEdition;
        if (this.locationInfoFormModeEdition) {
          Object.keys(this.locationInfoForm.controls).forEach(key => {
            this.locationInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.locationInfoForm.controls).forEach(key => {
            this.locationInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditRollOnInfo */
      case UserDataOperations.EditRollOnInfo:
        this.rollOnInfoFormModeEdition = !this.rollOnInfoFormModeEdition;
        if (this.rollOnInfoFormModeEdition) {
          Object.keys(this.rollOnInfoForm.controls).forEach(key => {
            this.rollOnInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.rollOnInfoForm.controls).forEach(key => {
            this.rollOnInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditOrganizationInfo */
      case UserDataOperations.EditOrganizationInfo:
        this.organizationInfoFormModeEdition = !this.organizationInfoFormModeEdition;
        if (this.organizationInfoFormModeEdition) {
          Object.keys(this.organizationInfoForm.controls).forEach(key => {
            this.organizationInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.organizationInfoForm.controls).forEach(key => {
            this.organizationInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditCostCenterInfo */
      case UserDataOperations.EditCostCenterInfo:
        this.costCenterInfoFormModeEdition = !this.costCenterInfoFormModeEdition;
        if (this.costCenterInfoFormModeEdition) {
          Object.keys(this.costCenterInfoForm.controls).forEach(key => {
            this.costCenterInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.costCenterInfoForm.controls).forEach(key => {
            this.costCenterInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditCareerInfo */
      case UserDataOperations.EditCareerInfo:
        this.careerInfoFormModeEdition = !this.careerInfoFormModeEdition;
        if (this.careerInfoFormModeEdition) {
          Object.keys(this.careerInfoForm.controls).forEach(key => {
            this.careerInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.careerInfoForm.controls).forEach(key => {
            this.careerInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditOtherLocations */
      case UserDataOperations.EditOtherLocations:
        this.otherLocationsInfoFormModeEdition = !this.otherLocationsInfoFormModeEdition;
        if (this.otherLocationsInfoFormModeEdition) {
          Object.keys(this.otherLocationsInfoForm.controls).forEach(key => {
            this.otherLocationsInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.otherLocationsInfoForm.controls).forEach(key => {
            this.otherLocationsInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
      /* #region  EditComments */
      case UserDataOperations.EditComments:
        this.commentsInfoFormModeEdition = !this.commentsInfoFormModeEdition;
        if (this.commentsInfoFormModeEdition) {
          Object.keys(this.commentsInfoForm.controls).forEach(key => {
            this.commentsInfoForm.get(key).enable();
          });
        } else {
          Object.keys(this.commentsInfoForm.controls).forEach(key => {
            this.commentsInfoForm.get(key).disable();
          });
        }

        break;
      /* #endregion */
    }


  }

  setNullDate(evento: any, calendarId: string) {
    switch (calendarId) {
      case "birthDate":
        if (evento.currentTarget.value == "") {
          this.birthDateCalendar.value = null;
          this.birthDateCalendar.updateInputfield();
        }
        break;
      case "startDate":
        if (evento.currentTarget.value == "") {
          this.startDateCalendar.value = null;
          this.startDateCalendar.updateInputfield();
        }
        break;
      case "endDate":
        if (evento.currentTarget.value == "") {
          this.endDateCalendar.value = null;
          this.endDateCalendar.updateInputfield();
        }
        break;
    }

  }

}
