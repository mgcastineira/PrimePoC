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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DragDropModule } from 'primeng/dragdrop';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
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
    DialogModule,
    ToggleButtonModule,
    RadioButtonModule,
    DragDropModule,
    FileUploadModule,
    ProgressBarModule,
    CardModule,
    InputTextareaModule,
    SidebarModule,
    TabViewModule,
    CarouselModule,
    OverlayPanelModule,
    FieldsetModule,
    AccordionModule,
    ScrollPanelModule,
    InputMaskModule,
    SelectButtonModule
  ],
  exports: [
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
    DialogModule,
    ToggleButtonModule,
    RadioButtonModule,
    DragDropModule,
    FileUploadModule,
    ProgressBarModule,
    CardModule,
    InputTextareaModule,
    SidebarModule,
    TabViewModule,
    CarouselModule,
    OverlayPanelModule,
    FieldsetModule,
    AccordionModule,
    ScrollPanelModule,
    InputMaskModule,
    SelectButtonModule
  ]
})
export class PrimengModule { }
