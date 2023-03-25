
export interface ISupplementaryCode
{
    addScript(script:string):void;
    addStyle(style:string):void;
    addDependency(package_name:string, cdn_link:string, str_type:string):void;
    createCodeBlock(name:string, code:string):void;
}


export interface INodeContext
{
    supp_code:ISupplementaryCode  
}

export enum DependencyType
{
    JS,
    CSS
}

export interface Dependency
{
    type:DependencyType,
    package_name: string,
    cdn_link: string
}

export type CSSFramework="bootstrap" | "tailwind" |"none"



export interface IGeneratedCode
{
    getHTMLCode(indent:boolean):string
}