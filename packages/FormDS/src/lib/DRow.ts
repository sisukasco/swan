import VisualElement from "./VisualElement";
import { NodeItem, Attributes} from "@sisukas/coder-interface";
import "reflect-metadata";
import {Type} from "class-transformer";
import { ExcludeDefault } from "./TxUtils"
import DElement from '../elements/DElement';
import { Sidekick } from '../coder/Sidekick';

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

    fixMinimumWidth(minWidth:number){
        for (let e = 0; e < this.elements.length; e++) 
        {
            if(minWidth == 33){
                if(this.elements[e].width == 25){
                    this.elements[e].setWidth(33) 
                }else if (this.elements[e].width == 50){
                    this.elements[e].setWidth(66) 
                }
                continue;
            }
            if( this.elements[e].width == 33 ){
                this.elements[e].setWidth(minWidth)
                continue;
            }
            if(this.elements[e].width == 66){
                if(minWidth != 100){
                    this.elements[e].setWidth(50)
                }
            }

            if (this.elements[e].width < minWidth) 
            {
                this.elements[e].setWidth(minWidth)
            }
        }
    }

    getOverflowingItems():VisualElement[]{
        let width = 0;

        for (let e = 0; e < this.elements.length; e++) 
        {
            width += this.elements[e].width;
            if (width > 100) 
            {
                return this.elements.splice(e, this.elements.length - e);
            }
        }

        return []
    }
    length(){
        return this.elements.length
    }

    findElement(v_elmnt:VisualElement){
        for(let e=0; e < this.elements.length;e++)
        {
            if(this.elements[e].id === v_elmnt.id)
            {
                return e;
            }
        } 
        return -1;       
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

    push(velmnts:VisualElement[]){
        return this.elements.push(...velmnts)
    }

    insertAt(idx:number, velmnts:VisualElement[]){
        return this.elements.splice(idx,0,...velmnts)
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

    code(parent: NodeItem, sidekick: Sidekick){
        let page = parent;

        if(this.elements.length <= 0){
            //empty row sometimes added at the enc of the page
            return;
        }
        const attrs:Attributes ={}

        let condition = this.condition.trim()
        condition = condition.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');

        if(condition.length > 0){
            attrs["r-show"] = condition;

            parent.addDependency('nitti','https://unpkg.com/@sisukas/nitti@1.0.9/dist/nitti.js','script');
        }

        attrs['class'] = sidekick.css.rowClasses()
        let rowElment = page.startTag('div', attrs)
        //let rcode = page.section("layout.row", attrs)
        for(let velmnt of this.elements)
        {
            velmnt.elmnt.code(rowElment, sidekick)
        }
    }

}