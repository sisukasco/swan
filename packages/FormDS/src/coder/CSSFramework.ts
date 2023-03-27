export interface CSSFramework{
    setNumColumns(n:number):void
    layoutContainerClasses():string[]
    inputContainerClasses(w:number):string[]
    labelClasses():string[]
    inputClasses():string[]
    rowClasses():string[]
    textAlignmentClasses(alignment:string):string[]
    hintTextClasses():string[]
    headingClasses(type:string):string[]
    flexAlignmentClasses(alignment: string): string[]
    buttonClasses():string[]
    groupContainerClasses(arrangement:string):string[]
    groupItemContainerClasses(arrangement:string):string[]
    inputCheckboxClasses():string[]
    labelCheckboxClasses():string[]
    selectFieldClasses():string[]
}