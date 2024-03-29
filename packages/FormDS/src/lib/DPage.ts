import VisualElement from "./VisualElement";
import DRow from "./DRow"
import { NodeItem} from "@sisukas/coder-interface";
import uniqid from 'uniqid';
import "reflect-metadata";
import {Type} from "class-transformer";
import { ExcludeDefault } from "./TxUtils"
import DElement from '../elements/DElement';
import { Sidekick } from '../coder/Sidekick';

export default class DPage
{
    @ExcludeDefault("")
    public title:string="";
    
    @ExcludeDefault("")
    public condition:string="";

    /**
     ** Initial versions had two dimensional array of VisualElement to represent the 
     ** rows and columns of elements. It was later moved to DRow The old variable is retained so that 
     ** Old version files can be automatically migrated to new version
     */
    @Type(()=>VisualElement)
    private rows:undefined|VisualElement[][]=undefined;

    @Type(()=>DRow)
    private rowsx:DRow[]=[];
    
    @ExcludeDefault(0)
    public sort_position:number=0;

    @ExcludeDefault(0)
    private col_count=2;



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

    insertAt(row:number,col:number, velmnts:VisualElement[]){
        if(row >= this.rowsx.length){
            throw new Error("Attempt to insert beyond last row")
        }

        this.rowsx[row].insertAt(col, velmnts)
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
            if(this.rowsx[r].findElement(v_elmnt) >= 0){
                return r;
            }
        }
        return -1;
    }

    public find_row_col(v_elmnt:VisualElement){
        for(let r=0;r<this.rowsx.length;r++)
        {
            const c = this.rowsx[r].findElement(v_elmnt);
            if(c >= 0){
                return {row:r, col:c};
            }
        }
        return false;
    }

    public find_selected_element_pos(){
        for(let r=0;r<this.rowsx.length;r++)
        {
            for(let e=0;e<this.rowsx[r].elements.length;e++)
            {
                if(this.rowsx[r].elements[e].selected){
                    return {row:r, col:e};
                }
            }
        }
        return false
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

    public get decrWidth(){
        let decr_width = 0;
        if(this.col_count == 4){
            decr_width = 25
        }else if(this.col_count == 3){
            decr_width = 33
        }else if(this.col_count == 2){
            decr_width = 50
        }else if(this.col_count == 1){
            decr_width = 100
        }
        return decr_width
    }

    public makeElementSmaller(row:number, col:number){
        this.elementAt(row,col).elmnt.smaller(this.decrWidth)
    }

    public makeElementLarger(row:number, col:number){
        this.elementAt(row,col).elmnt.larger(this.decrWidth)
    }

    public setColCount(c:number){
        this.col_count = c
    }
    public getColCount(){
        return this.col_count;
    }
    

    private fix_minimum_width()
    {
        for (let r = 0; r < this.numRows(); r++) 
        {
            this.rowsx[r].fixMinimumWidth(this.decrWidth)
        }
    }

    private split_overflowing_rows()
    {
        //Split overflowing rowsx
        for (let r = 0; r < this.numRows(); r++) 
        {
            const new_items = this.rowsx[r].getOverflowingItems()

            if (new_items.length > 0) 
            {
                const row = new DRow();
                row.push(new_items);
                this.rowsx.splice(r+1,0,row);
                //this.pushToRow(r+1, new_items)
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
        this.fix_minimum_width();
        this.split_overflowing_rows();
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
    code(base: NodeItem, sidekick: Sidekick)
    {
        sidekick.css.setNumColumns(this.col_count)
        for(let row of this.rowsx)
        {
            row.code(base, sidekick)
        }
    }
}