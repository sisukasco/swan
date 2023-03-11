'use strict';
import DFormElement from "./DFormElement";
import {CheckboxGroupValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import GroupChoice from "./GroupChoice";
import { NodeItem } from "@sisukas/coder-interface";
import DItem,{getTextFromItems, getItemsJSON, itemsFromText} from "./DItem";
import { ExcludeDefault } from "../lib/TxUtils";

class CheckboxGroupSettings
{
    @ExcludeDefault('vertical')
    public arrangement:string = "vertical"
    
    @Type(()=>DItem)
    public items:DItem[]=[];   
    

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
export default
class DCheckboxGroup extends DFormElement
{
    @Type(()=>CheckboxGroupSettings)
    public settings = new CheckboxGroupSettings()

    @Type(() => CheckboxGroupValidations)
    public validations:CheckboxGroupValidations= new CheckboxGroupValidations();

    constructor()
    {
        super('CheckboxGroup', 'Choose Options');
    }
    get default_value():string[]
    {
        return [];
    }
    public code(node:NodeItem)
    {
        let gc = new GroupChoice(this,"checkbox");
        return gc.code(node);
    }
    public getConverterCode()
    {
        return(".toArray()");
    }
    
} 
