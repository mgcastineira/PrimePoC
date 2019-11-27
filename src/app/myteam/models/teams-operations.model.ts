export enum TeamsOperations {
    GetDigest = -1,
    GetInitialData = 0
}

export enum TeamPermissions{
    NoPermission =[0,false,false] as any,
    Read = [1, true, false] as any,
    Write = [2, true, true] as any,
}