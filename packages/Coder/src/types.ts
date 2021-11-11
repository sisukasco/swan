import {NodeItem, Attributes} from "@sisukas/coder-interface";

export interface ICodingAssistant
{
    make?(section:string, attributes:Attributes):NodeItem|null;
    modify?(section:string,node:NodeItem):void;
}

export interface INodeBuilder
{
    makeSection(section:string, attributes:Attributes):NodeItem;
    makeNodeItem(tag:string,attributes?:Attributes, addnl_attributes?:Attributes):NodeItem;
}

export interface ICodingAssistantsHandler
{
    register(assistant:ICodingAssistant):void;
}

export interface ISupplementaryCode
{
    addScript(script:string):void;
    addStyle(style:string):void;
    addDependency(package_name:string, cdn_link:string, str_type:string):void;
    createCodeBlock(name:string, code:string):void;
}


export interface INodeContext
{
    builder:INodeBuilder
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

export interface CodingAssistant
{
    make?(section:string, attributes:Attributes):NodeItem|null;
    modify?(section:string,node:NodeItem):void;
}

export interface ICodegenOptions
{
    assistants ?:CodingAssistant[]
    framework ?:"bootstrap"|"none"
}



export interface IGeneratedCode
{
    getHTMLCode(indent:boolean):string
}