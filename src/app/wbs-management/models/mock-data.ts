export const peopleListData = [
    {
        ID:1,
        Name:"Marcos Gonzalez",
        EnterpriseId:"marcos.gonzalez"
    },
    {
        ID: 2,
        Name: "Romina"
        ,
        EnterpriseId: "romina.congregado"
    },
    {
        ID: 3,
        Name: "Alberto Jusdado",
        EnterpriseId: "a.jusdado"
    },
    {
        ID: 4,
        Name: "Mireia Malonda",
        EnterpriseId: "mireia.malonda"
    }
];
export const projectListData = [
    {
        ID: 1,
        ProjectName: "Projecto 1",
        MD:1,
        DeliveryLead:2,
        Supervisor:3
    },
    {
        ID: 2,
        ProjectName: "Projecto 2",
        MD: 4,
        DeliveryLead: 3,
        Supervisor: 2
    },
    {
        ID: 3,
        ProjectName: "Projecto 3",
        MD: 2,
        DeliveryLead: 2,
        Supervisor: 1
    },
    {
        ID: 4,
        ProjectName: "Projecto 4",
        MD: 1,
        DeliveryLead: 4,
        Supervisor: 2
    }
];
export const myTeamListData = [
    {
        ID: 1,
        ProjectId: 2,
        PeopleId: 1,
        Active: true
    },
    {
        ID: 2,
        ProjectId: 2,
        PeopleId: 2,
        Active: true
    },
    {
        ID: 3,
        ProjectId: 1,
        PeopleId: 1,
        Active: true
    },
    {
        ID: 4,
        ProjectId: 4,
        PeopleId: 3,
        Active: true
    }
];
export const wbsListData = [
    {
        ID: 1,
        TeamId: 1,
        WBS: "WBS000001",
        Work_Location:"Madrid",
        WBS_Comments:"Comment 1",
        Active:true
    },
    {
        ID: 2,
        TeamId: 1,
        WBS: "WBS000002",
        Work_Location: "Barcelona",
        WBS_Comments: "Comment 2",
        Active: true
    },
    {
        ID: 3,
        TeamId: 3,
        WBS: "WBS000003",
        Work_Location: "Bilbao",
        WBS_Comments: "Comment 3",
        Active: false
    },
    {
        ID: 4,
        TeamId: 3,
        WBS: "WBS000004",
        Work_Location: "Sevilla",
        WBS_Comments: "Comment 4",
        Active: false
    }
];
export const rulesListData = [
    {
        ID: 1,
        Name: "Rule 1",
        Description:"Rule 1 Description",
        Quantity: 14,
        Active: true,
        Execute:false,
        LastExecutionDate: new Date(2019,10,1)
    },
    {
        ID: 2,
        Name: "Rule 2",
        Description: "Rule 2 Description",
        Quantity: 11,
        Active: true,
        Execute: false,
        LastExecutionDate: new Date(2019, 11, 1)
    },
    {
        ID: 3,
        Name: "Rule 3",
        Description: "Rule 3 Description",
        Quantity: 2,
        Active: false,
        Execute: false,
        LastExecutionDate: new Date(2019, 1, 1)
    },
    {
        ID: 4,
        Name: "Rule 4",
        Description: "Rule 4 Description",
        Quantity: 0,
        Active: true,
        Execute: false,
        LastExecutionDate: new Date(2019, 10, 28)
    }
];