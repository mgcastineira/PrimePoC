export const TeamMock = [
  {
    ID: 1,
    Active: true,
    ActivationDate: new Date(2019,11,1),
    DeactivationDate: null,
    Name: "name1",
    PeopleId: 1,
    ProjectId: 1,
    DateAccessReq: new Date(2019, 11, 2),
    NonProductionEnvs: "2",
    OtherEnvs: "1",
    ProductionEnv: "2",
    SameAppEnvs: false
  },
  {
    ID: 5,
    Active: true,
    ActivationDate: new Date(2019, 11, 1),
    DeactivationDate: null,
    Name: "name1",
    PeopleId: 1,
    ProjectId: 2,
    DateAccessReq: null,
    NonProductionEnvs: "0",
    OtherEnvs: "0",
    ProductionEnv: "1",
    SameAppEnvs: true
  },
  {
    ActivationDate: "2019-11-21T12:45:32Z",
    Active: true,
    DateAccessReq: new Date(2019, 11, 1),
    DeactivationDate: new Date(),
    ID: 2,
    Name: "name2",
    NonProductionEnvs: "0",
    OtherEnvs: "0",
    PeopleId: 2,
    ProductionEnv: "0",
    ProjectId: 1,
    SameAppEnvs: false,
  },
  {
    ActivationDate: "2019-11-20T23:00:00Z",
    Active: true,
    DateAccessReq: null,
    DeactivationDate: null,
    ID: 3,
    Name: "name3",
    NonProductionEnvs: "0",
    OtherEnvs: "0",
    PeopleId: 3,
    ProductionEnv: "0",
    ProjectId: 1
  },
  {
    ActivationDate: "2019-11-20T23:00:00Z",
    Active: true,
    DateAccessReq: null,
    DeactivationDate: null,
    ID: 4,
    Name: "name4",
    NonProductionEnvs: "0",
    OtherEnvs: "0",
    PeopleId: 4,
    ProductionEnv: "0",
    ProjectId: 1,
    SameAppEnvs: true
  }
];

export const ProjectMock = [
  {
    Active: true,
    AirbusDirectResponsible: "Javier García",
    AirbusResponsible: "Javier García",
    Contract: "EPAD",
    ID: 1,
    MD: 1,
    Project_Name: "Sharepoint Prueba",
    Responsible: 1,
    SPOC: 3
  },
  {
    Active: true,
    AirbusDirectResponsible: "Carmen de Hoz/Francisco Santamaria Muñoz",
    AirbusResponsible: "Carmen de Hoz/Francisco Santamaria Muñoz",
    Contract: "EPAM",
    Created: "2019-06-19T09:36:04Z",
    ID: 2,
    Responsible: 3,
    MD: 3,
    Project_Name: "EPAM ASG Prueba",
    SPOC: 3
  }
]

export const WBSMock = [
  {
    Active: true,
    EnterpriseId: "name1",
    ID: 1,
    ProjectName: "Sharepoint Prueba",
    TeamId: 1,
    WBS: "AXKE8005",
    WBS_Comment: "ddddd",
    Work_Location: "Spain"
  },
  {
    Active: true,
    EnterpriseId: "name1",
    ID: 2,
    ProjectName: "Sharepoint Prueba",
    TeamId: 1,
    WBS: "AXKE8005",
    WBS_Comment: "ddddd",
    Work_Location: "France"
  },
  {
    Active: true,
    EnterpriseId: "name2",
    ID: 3,
    ProjectName: "Sharepoint Prueba",
    TeamId: 2,
    WBS: "AXKE8005",
    WBS_Comment: "ddddd",
    Work_Location: "ASG"
  }
]

export const PeopleMock=[
  {
    ID:1,
    Title:"name1",
    EnterpriseId:"name1",
    Status:"Active",
    EntryDate:null,
    ExitDate:null,
  },
  {
    ID: 2,
    Title: "name2",
    EnterpriseId: "name2",
    Status: "Active",
    EntryDate: null,
    ExitDate: null,
  },
  {
    ID: 3,
    Title: "name3",
    EnterpriseId: "name3",
    Status: "Active",
    EntryDate: null,
    ExitDate: null,
  },
  {
    ID: 4,
    Title: "name4",
    EnterpriseId: "name4",
    Status: "Active",
    EntryDate: null,
    ExitDate: null,
  }
]

