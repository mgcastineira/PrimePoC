import { Component, OnInit, Input } from '@angular/core';
import { WBSManagementService } from '@wbsmanagement/services/wbs-management.service';

@Component({
  selector: 'app-wbs-comment',
  templateUrl: './wbs-comment.component.html',
  styleUrls: ['./wbs-comment.component.scss']
})
export class WbsCommentComponent implements OnInit {

  @Input() id: number;
  @Input() WBS_Comments: string;


  editing:boolean = false;

  constructor(
    private wbsManagementService: WBSManagementService
  ) { 

  }

  ngOnInit() {
  }

  saveComment(){
    console.log("saveComment");
    this.wbsManagementService.SaveCommentRequest(this.id,this.WBS_Comments);
    this.editing=false;
  }

}
