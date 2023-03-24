export interface CSSFramework{
    setNumColumns(n:number):void
    layoutContainerClasses():string[]
    inputContainerClasses(w:number):string[]
    labelClasses():string[]
    inputClasses():string[]
    rowClasses():string[]
}