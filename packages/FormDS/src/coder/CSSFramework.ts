export interface CSSFramework{
    setNumColumns(n:number):void
    inputContainerClasses(w:number):string[]
    labelClasses():string[]
    inputClasses():string[]
    rowClasses():string[]
}