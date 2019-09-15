export interface Imenu{
    _id:string,
    title:string,
    link:string,
    icon:string,
    isParent:string,
    group:string,
}
export interface Ichildmenu{
    _id:string,
    title:string,
    link:string,
    icon:string,
    isParent:string,
    group:string,
    parentId:string
}