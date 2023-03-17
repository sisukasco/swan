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

    @Type(()=>VisualElement)
    private rows:undefined|VisualElement[][]=undefined;

    @Type(()=>DRow)
    private rowsx:DRow[]=[];
    
    @ExcludeDefault(0)
    public sort_position:number=0;

    constructor(public readonly id:string=uniqid())
    {

    }

    push(velmnt:VisualElement){
        this.rowsx.push(new DRow(velmnt))
    }

    public numRows(){
        return this.rowsx.length
    }

    public getRows():DRow[]{
        return this.rowsx;
    }

    public getRow(idx:number):DRow{
        return this.rowsx[idx]
    }

    pushToRow(row:number, velmnts:VisualElement[]){
        if(row > this.rowsx.length){
            throw new Error("can't extend beyond one row")
        }
        if(row == this.rowsx.length){
            this.rowsx.push(new DRow())
        }
        this.rowsx[row].push(velmnts)
    }

    public elementAt(row:number, col:number){
        return this.rowsx[row].getElementAt(col)
    }
   
    public getRowLength(row:number):number{
        return this.rowsx[row].length()
    }

    public printPicture(){
        for(let r=0;r<this.rowsx.length; r++){
            console.log("row %d num elements %d",r, this.rowsx[r].length())
        }
    }    

    public find_row(v_elmnt:VisualElement)
    {
        for(let r=0;r<this.rowsx.length;r++)
        {
            if(this.rowsx[r].findElement(v_elmnt)){
                return r;
            }
        }
        return -1;
    }

    public removeElementAt(row:number,idx:number){
        this.rowsx[row].removeElementAt(idx)
    }

    public removeElement(v_elmnt:VisualElement){
        for(let r=0;r<this.rowsx.length;r++)
        {
            if(this.rowsx[r].removeElement(v_elmnt)){
                return r;
            }
        }
        return -1
    }

    public getElements():DElement[]{
        let all=[]

        for(let r=0;r<this.rowsx.length;r++)
        {
            all.push(...this.rowsx[r].getElements())
        }
        return all
    }

    

    private split_overflowing_rows()
    {
        //Split overflowing rowsx
        for (let r = 0; r < this.numRows(); r++) 
        {
            const new_items = this.rowsx[r].getOverflowingItems()

            if (new_items.length > 0) 
            {
                this.pushToRow(r+1, new_items)
            }

        }
    }

    private update_element_position()
    {
        for(let r=0;r<this.numRows();r++)
        {
            for(let col=0; col < this.rowsx[r].length();col++)
            {
                this.rowsx[r].elements[col].elmnt.position(r, col);
            }
        }
    }

    private remove_empty_rows()
    {
        let remove_rows = [];
        for (let r = 0; r < this.rowsx.length; r++) 
        {
            if (this.rowsx[r].length() <= 0) 
            {
                remove_rows.push(r);
            }
        }
        for (let rr = remove_rows.length - 1; rr >= 0; rr--) 
        {
            this.rowsx.splice(remove_rows[rr], 1);
        }
    }

    public normalize_elements() 
    {
        this.split_overflowing_rows()
        this.remove_empty_rows();
        this.update_element_position();
    }
    
    public afterLoad(){
        /**
         ** Older version where the elements were in two-dimensional array.
         ** We upgrade to the new version.
         */
        if(this.rows && this.rows.length > 0){
            for(let r=0;r<this.rows.length;r++){
                const row = new DRow()
                row.push(this.rows[r])
                this.rowsx.push(row)
            }
            this.rows = undefined;
        }
    }
    code(node:NodeItem, nPages:Number)
    {
        let page = node;
        if(nPages > 1){
            page = node.section('layout.page')
        }
        
        for(let row of this.rowsx)
        {
            row.code(page)
        }
    }
}