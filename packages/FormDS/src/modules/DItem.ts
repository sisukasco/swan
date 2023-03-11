import "reflect-metadata"; 
import { deserialize } from 'class-transformer';
import {Type} from "class-transformer";
import { ExcludeDefault } from "../lib/TxUtils";

export default class DItem
{
    
    @ExcludeDefault("")
    public name:string="";
    
    @ExcludeDefault("")
    public value:string="";

    @ExcludeDefault("")
    public rvalue:string="";
    
    constructor(name:string, value:string)
    {
        this.name = name;
        this.value = value;
    }

    public isComplex(){
        if(this.name != this.value){
            return true;
        }
        if(this.rvalue){
            return true;
        }
        return false;
    }
}

class DItemContainerTmp{

    @Type(()=>DItem)
    public items:DItem[]=[];
}

export function itemsFromText(text:string):DItem[]{
    text = text.trim();
    if(text.charAt(0) == "["){
        
        const ser =`{"items":`+text+`}`;
        const tmpContainer = deserialize(DItemContainerTmp, ser)

        return tmpContainer.items;
    }

    return text.split(/\r?\n/)
                .map( (itm:string)=>(itm.trim()))
                .filter(itm=>itm && itm.length>0)
                .map((itm:string)=>(new DItem(itm, itm)));
}

function isComplexItems(items:DItem[]):Boolean{
    for(let i=0;i<items.length;i++){
        if(items[i].isComplex()){
            return true;
        }
    }
    return false;
}


const replacer = (key:string, value:any) => {
    if (key === "rvalue" && value === "") {
      return undefined;
    }
    return value;
  };

function toJSONItems(items:DItem[]){
    return JSON.stringify(items,replacer, 2)
}
export function getTextFromItems(items:DItem[]):string{

    if(isComplexItems(items)){
        //return JSON.stringify(items, null, 2)
        return toJSONItems(items)
    }

    return items.map((itm)=>(itm.value)).join("\n")
}

export function getItemsJSON(items:DItem[]):string{
    //return JSON.stringify(items, null, 2)

    return toJSONItems(items)
}
