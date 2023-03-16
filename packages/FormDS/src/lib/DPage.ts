import VisualElement from "./VisualElement";
import DRow from "./DRow"
import { NodeItem} from "@sisukas/coder-interface";
import uniqid from 'uniqid';
import "reflect-metadata";
import {Type} from "class-transformer";
import { ExcludeDefault } from "./TxUtils"
import DElement from '../elements/DElement';

export default class DPage
{
    @ExcludeDefault("")
    public title:string="";
    
    @ExcludeDefault("")
    public condition:string="";
    
    @Type(()=>DRow)
    public rows:DRow[]=[];
    
    @ExcludeDefault(0)
    public sort_position:number=0;

    constructor(public readonly id:string=uniqid())
    {

    }

    push(velmnt:VisualElement){
        this.rows.push(new DRow(velmnt))
    }

    pushToRow(row:number, velmnts:VisualElement[]){
        if(row > this.rows.length){
            throw new Error("can't extend beyond one row")
        }
        if(row == this.rows.length){
            this.rows.push(new DRow())
        }
        this.rows[row].elements.push(...velmnts)
    }

    public remove_empty_rows()
    {
        let remove_rows = [];
        for (let r = 0; r < this.rows.length; r++) 
        {
            if (this.rows[r].length() <= 0) 
            {
                remove_rows.push(r);
            }
        }
        for (let rr = remove_rows.length - 1; rr >= 0; rr--) 
        {
            this.rows.splice(remove_rows[rr], 1);
        }
    }

    public find_row(v_elmnt:VisualElement)
    {
        for(let r=0;r<this.rows.length;r++)
        {
            if(this.rows[r].findElement(v_elmnt)){
                return r;
            }
        }
        return -1;
    }

    public removeElement(v_elmnt:VisualElement){
        for(let r=0;r<this.rows.length;r++)
        {
            if(this.rows[r].removeElement(v_elmnt)){
                return r;
            }
        }
        return -1
    }

    public getElements():DElement[]{
        let all=[]

        for(let r=0;r<this.rows.length;r++)
        {
            all.push(...this.rows[r].getElements())
        }
        return all
    }
    
    code(node:NodeItem, nPages:Number)
    {
        let page = node;
        if(nPages > 1){
            page = node.section('layout.page')
        }
        
        for(let row of this.rows)
        {
            row.code(page)
        }
    }
}