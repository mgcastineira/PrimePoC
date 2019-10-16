import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule,
    CalendarModule,
    CheckboxModule,
    DialogModule
  ],
  exports:[
    TableModule,
    MultiSelectModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule,
    CalendarModule,
    CheckboxModule,
    DialogModule
  ]
})
export class PrimengModule { }
