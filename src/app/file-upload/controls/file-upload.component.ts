import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FileFilters } from '../models/file-filters.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  resultFiles: File[] = [];
  tempFiles: File[] = [];
  userName: string;
  @Output() filesOut: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() disableControlFile: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesuploadedEvt: EventEmitter<any> = new EventEmitter<any>();
  @Input() multipleFiles: boolean = true;
  @Input() filter: FileFilters[]=[];
  @Input() fileName: string;

  progress: number;
  hasBaseDropZoneOver = false;
  validComboDrag: any;
  disableFile = true;

  constructor() {
  }

  ngOnInit(): void {
  }



  /**
   * Uploads file
   */
  uploadFile() {
    console.log('upload');
    if(this.multipleFiles){
      this.resultFiles = this.tempFiles;
    }else{
      this.resultFiles = [];
      let foundItem = this.tempFiles.find(file => this.findFilter(file.type)==true
      &&file.name==this.fileName);
      if(foundItem!=undefined){
        this.resultFiles.push(this.tempFiles[0]);
        
      }else{

      }
      this.tempFiles = this.resultFiles;
    }
    this.filesOut.emit(this.resultFiles);
  }

  /**
   * Removes file
   */
  removeFile() {
    if (this.multipleFiles) {
      this.resultFiles = this.tempFiles;
    }
    this.filesOut.emit(this.resultFiles);
    this.filesuploadedEvt.emit(true);
  }

  resetFiles() {
    this.tempFiles = [];
    this.resultFiles = this.tempFiles;
    this.filesuploadedEvt.emit(this.resultFiles);
  }

  private findFilter(type:any):boolean{
    return this.filter.includes(type);
  }
}
