export type ResponseList<T> ={
    data:T[];
    page:number;
    pageSize:number;
    sort:string;
    search:string;
    total:number;
}
export type Response<T> = {
    data:T,
    success:boolean
    statusCode:number
}