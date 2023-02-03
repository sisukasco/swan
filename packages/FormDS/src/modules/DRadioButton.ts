'use strict';
import DFormElement from "./DFormElement";
import {RadioButtonValidations} from "../containers";

import "reflect-metadata"; 
import {Type} from "class-transformer";
import GroupChoice from "./GroupChoice";
import { NodeItem } from "@sisukas/coder-interface";
import DItem from "./DItem";
import { ExcludeDefault } from "../lib/TxUtils";

class RadioButtonSettings
{
    @Type(()=>DItem)
    public items:DItem[]=[];
    
    @ExcludeDefault('vertical')
    public arrangement='vertical';
    
    @ExcludeDefault('')
    public default=''
    
    public set items_text(str_items:string)
    {
        this.items = str_items.split(/\r?\n/)
                .map( (itm:string)=>(itm.trim()))
                .filter(itm=>itm && itm.length>0)
                .map((itm:string)=>(new DItem(itm, itm)));
        
    }
    public get items_text()
    {
        return this.items.map((itm)=>(itm.value)).join("\n")
    }
    addItem(name:string, value:string)
    {
        this.items.push(new DItem(name,value))
    }
}

class DRadioButton extends DFormElement
{
    public settings = new RadioButtonSettings();
    
    constructor()
    {
        super('RadioButton', 'Choose one');
    }

    @Type(() => RadioButtonValidations) 
    public readonly validations =new RadioButtonValidations();

    public code(node: NodeItem)
    {
        let gc  = new GroupChoice(this,"radio");
        return gc.code(node);
    }

} 

export default DRadioButton;