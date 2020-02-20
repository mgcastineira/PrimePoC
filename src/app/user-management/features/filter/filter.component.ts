import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  activeOption= { value:"Active" } as SelectItem;
  inactiveOption = { value: "Inactive" } as SelectItem;
  statusOptions: SelectItem[] = [this.activeOption, this.inactiveOption];
  selectedStatus:string[]=[];
  constructor(private fBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeControls();
  }

  private initializeControls() {
    this.filterForm = new FormGroup({
      // statusButtons: new FormControl({ value: null, disabled: false }),
    });

  }

  selectStatus(evento:any){
    let aux = this.selectedStatus.find(s=>s==evento.option);
    if(aux!=undefined){
      this.selectedStatus=this.selectedStatus.filter(s=>s!=aux);
    }else{
      this.selectedStatus=[evento.option];
    }
    
  }
}
