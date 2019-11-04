export interface IWBSManagementRecord {
    ID: number;
    TeamId: number;
    WBS: string;
    Work_Location: string;
    WBS_Comments: string;
    Active:boolean;
}
export interface IWBSManagement {
    ID: number;
    TeamId: number;
    WBS: string;
    Work_Location: string;
    WBS_Comments: string;
    PeopleId:number;
    UserEnterpriseId:string;
    ProjectId:number;
    ProjectName:string;
    Active:boolean;
    wbsManagementRecord: IWBSManagementRecord;
    saving:boolean;
    error:boolean;
}