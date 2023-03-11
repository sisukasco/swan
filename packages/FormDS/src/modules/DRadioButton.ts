'use strict';
import DFormElement from "./DFormElement";
import {RadioButtonValidations} from "../containers";

import "reflect-metadata"; 
import {Type} from "class-transformer";
import GroupChoice from "./GroupChoice";
import { NodeItem } from "@sisukas/coder-interface";
import DItem,{getTextFromItems, getItemsJSON, itemsFromText} from "./DItem";
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
        this.items = itemsFromText(str_items);
        
    }
    public get items_text()
    {
        return getTextFromItems(this.items)
    }
    
    public get items_json(){
        return getItemsJSON(this.items)
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