import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { TitleCasePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class NewProjectComponent implements OnInit {
  @ViewChild('teamExitDate') calendar: Calendar;
  newForm: FormGroup;
  allPeople: any[] = [];
  allProjects: any[] = [];
  peopleProjectsList:any[]=[];

  autocompletePeopleProjectsList: string[] = [];
  autocompletePeopleList: string[] = [];
  filteredSupervisorsByDeliveryLeads: any[] = [];
  selectedProject:any;
  showProjectsList:boolean = false;
  showSupervisorInput:boolean = false;
  optionsProjectsList:any[]=[];
  projectFound:boolean=false;

  constructor(private fBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private titleCasePipe:TitleCasePipe) { }

  ngOnInit() {
    this.allPeople = this.config.data.sortedPeopleList;
    this.allProjects = this.config.data.sortedProjectList;

    this.getAutocompleteDatasource();

    this.initilizeControls();
  }

  private getAutocompleteDatasource() {
    this.peopleProjectsList=[];
    this.allPeople.forEach(person => {
      let record = {
        ID: person.ID,
        Description: this.titleCasePipe.transform(person.Title),
        isProject: false
      };
      this.peopleProjectsList.push(record);
    });
    this.allProjects.forEach(project => {
      let record = {
        ID: project.ID,
        Description: project.Project_Name,
        isProject: true
      };
      this.peopleProjectsList.push(record);
    });
  }

  private initilizeControls() {
    this.newForm = this.fBuilder.group({
      projectId: new FormControl({ value: null, disabled: false }, Validators.required),
      projectName: new FormControl({ value: null, disabled: false }, Validators.required),
      supervisorId: new FormControl({ value: null, disabled: false }, Validators.required),
      supervisorName: new FormControl({ value: [], disabled: false }, Validators.required),
      selectedProject: new FormControl({ value: null, disabled: false }),
      teamStartDate: new FormControl({ value: false, disabled: false }),
      teamExitDate: new FormControl({ value: false, disabled: false }),
    });
  }

  /* #region  autocomplete supervisor */
  // autocomplete
  filterPeopleSingle(event: any) {
    this.selectedProject=null;
    let query = event.query;
    this.autocompletePeopleList = this.filterPeopleAutocomplete(query, this.allPeople);
  }

  filterPeopleAutocomplete(query, peopleList: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < peopleList.length; i++) {
      let people = peopleList[i];
      if (people.Title != undefined
        && people.Title != null
        && people.Title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push({
          ID: people.ID,
          Title: people.Title,
          EnterpriseID: people.EnterpriseID
        });
        
      }
    }
    return filtered;
  }

  selectPeople(event: any,controlId:string) {
    this.newForm.controls[controlId].setValue(event.value.ID);
    if (this.newForm.valid){
      if (this.newForm.controls["projectId"].value != null) {
        this.optionsProjectsList = this.allProjects.filter(project => project.Responsible == this.newForm.controls["projectName"].value.ID
          && project.SPOC == this.newForm.controls["supervisorId"].value);
        if (this.optionsProjectsList.length > 1) {
          this.showProjectsList = true;
        } else {
          this.showProjectsList = false;
          this.selectedProject = this.optionsProjectsList[0];
          this.projectFound = true;
        }
      }
    }
  }
  /* #endregion */

  /* #region  autocomplete project/deliver lead */
  // autocomplete
  filterProjectSingle(event: any) {
    this.showSupervisorInput = false;
    this.selectedProject = null;
    let query = event.query;
    this.autocompletePeopleProjectsList = this.filterProjectAutocomplete(query, this.peopleProjectsList);
  }

  filterProjectAutocomplete(query, recordList: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < recordList.length; i++) {
      let record = recordList[i];
      if (record.Description != undefined
        && record.Description != null
        && record.Description.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push({
          ID: record.ID,
          Description: record.Description,
          isProject: record.isProject
        });

      }
    }
    return filtered;
  }

  selectProject(event: any, controlId: string) {
    this.newForm.controls[controlId].setValue(event.ID);
    this.filteredSupervisorsByDeliveryLeads=[];
    if (event.isProject) {
      this.showProjectsList = false;
      this.selectedProject = this.allProjects.find(project => project.ID == event.ID);
    } else {
      this.showSupervisorInput = true;
      if (this.newForm.controls["supervisorId"].value != null) {
        this.optionsProjectsList = this.allProjects.filter(project => project.Responsible == this.newForm.controls["projectName"].value
          && project.SPOC == this.newForm.controls["supervisorId"].value);
        if (this.optionsProjectsList.length > 0) {
          this.showProjectsList = true;
        } else {
          this.showProjectsList = false;
          this.selectedProject = this.optionsProjectsList[0];
          this.projectFound=true;
        }
      }else{
        // filtrar todos los proyectos cuyo delivery lead sea el indicado
        let projectListAux = this.allProjects.filter(project => project.Responsible == this.newForm.controls["projectId"].value);
        // de esos proyectos ir obteniendo la lista de people
        this.filteredSupervisorsByDeliveryLeads=[];
        if(projectListAux.length>0){
          projectListAux.forEach(project => {
            let supervisor = this.allPeople.find(person=>person.ID==project.SPOC);
            if(supervisor!=undefined){
              this.filteredSupervisorsByDeliveryLeads.push({
                ID:supervisor.ID,
                Name:this.titleCasePipe.transform(supervisor.Title)
              });
            }
          });
        }
      }
    }
  }

/* #endregion */

  closeAddWBS(returnValue: any) {
    this.ref.close(returnValue);
  }

  saveNewWBS() {
    if (this.newForm.valid) {
    }
  }

  selectProjectOption(event:any){
    this.selectedProject=event.value;
    this.projectFound = true;
  }

  setNullDate(evento: any) {
    if (evento.currentTarget.value == "") {
      this.calendar.value = null;
      this.calendar.updateInputfield();
    }
  }
}
