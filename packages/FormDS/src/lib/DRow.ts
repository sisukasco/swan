import VisualElement from "./VisualElement";
import { NodeItem} from "@sisukas/coder-interface";
import "reflect-metadata";
import {Type} from "class-transformer";
import { ExcludeDefault } from "./TxUtils"
import DElement from '../elements/DElement';

export default class DRow
{
    @ExcludeDefault("")
    public condition:string="";
    
    @Type(()=>VisualElement)
    public elements:VisualElement[]=[];

    constructor(velmnt?: VisualElement) {
        if(velmnt){
            this.elements.push(velmnt)
        }
    }
    getOverflowingItems():VisualElement[]{
        let width = 0;
        let new_items:VisualElement[] = [];

        for (let e = 0; e < this.elements.length; e++) 
        {
            width += this.elements[e].width;
            if (width > 100) 
            {
                new_items.push(this.elements[e]);
                this.elements.splice(e, 1);
            }
        }

        return new_items
    }
    length(){
        return this.elements.length
    }

    findElement(v_elmnt:VisualElement){
        for(let e=0; e < this.elements.length;e++)
        {
            if(this.elements[e].id === v_elmnt.id)
            {
                return true;
            }
        } 
        return false       
    }

    removeElement(v_elmnt:VisualElement){

        for(let e=0; e < this.elements.length;e++){

            if(this.elements[e].id === v_elmnt.id)
            {
                this.elements.splice(e,1);
                return true;
            }
        }
        return false;
    }

    push(v_elmnt:VisualElement){
        return this.elements.push(v_elmnt)
    }

    public getElements():DElement[]{
        let all=[]
        for(let e=0;e<this.elements.length;e++){
            all.push(this.elements[e].elmnt)
        }
        return all;
    }

    public getElementAt(idx:number){
        return this.elements[idx]
    }

    public removeElementAt(idx:number){
        this.elements.splice(idx,1)
    }

    code(node:NodeItem){
        let page = node;

        if(this.elements.length <= 0){
            //empty row sometimes added at the enc of the page
            return;
        }
        let rcode = page.section("layout.row")
        for(let velmnt of this.elements)
        {
            velmnt.code(rcode)
        }
    }

}