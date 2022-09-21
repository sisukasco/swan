import factory from './Factory';
import VisualElement from "./VisualElement";
import DPage from "./DPage";
import DElement from '../modules/DElement';
import "reflect-metadata";
import {Exclude, Type} from "class-transformer";
import { Codeable, NodeItem } from "@sisukas/coder-interface";
export interface PageInfo
{
    title:string;
    condition:string;
    readonly id:string;
    sort_position:number;    
}
interface BaseElement
{
    type:string,
    id:number,
    row:number,
    col:number,
    page?:string
}

function plainToClassObject(p_elmnt:BaseElement):DElement | null
{
    return factory.makeFromPlainObject(p_elmnt)
}

export class DElementContainer implements Codeable
{
    @Type(()=>DPage)
    private pages:DPage[]=[ new DPage() ];
    
    @Exclude()
    private current_page:DPage=this.pages[0];
    //public rows:VisualElement[][]=[];
    public get rows()
    {
        return this.current_page.rows;
    }
    constructor() 
    {   

    }
    private make_new(type:string, row:number)
    {
        let new_elemt = factory.makeObject(type);
        this.baptise(new_elemt);
        new_elemt.position(row,0);
        let new_v_elmnt = new VisualElement(new_elemt); 
        return new_v_elmnt;
    }
    private baptise(elmnt:DElement)
    {
        elmnt.page = this.current_page.id;
        this.ensure_unique_name(elmnt);
    }
    private ensure_unique_name(elmnt:DElement)
    {
        let idx = 1;
        while( this.element_names.includes(elmnt.name) )
        {
            let base_name = elmnt.name.split('_')[0];
            if(!base_name)
            {
                base_name='Elmnt';
            }
            elmnt.updateName( base_name+'_'+ (idx++) );
        }
    }
    
    public addElements(elemnts:DElement[])
    {
        for(const elmnt of elemnts)
        {
            this.baptise(elmnt);
            let new_v_elmnt = new VisualElement(elmnt); 
            this.rows.push([new_v_elmnt])            
        }
    }
    
    public add(type:string) 
    {
        let new_v_elmnt =  this.make_new(type, this.rows.length);
        this.rows.push([new_v_elmnt ]);
        return new_v_elmnt;
    }
    public insert(current_elmnt:VisualElement|null,type:string,packed:Boolean=false)
    {
        let current_row =-1;
        if(current_elmnt)
        {
            current_row = this.find_row(current_elmnt);
        }
        if(current_row >= 0)
        {
            if(packed)
            {
                let new_v_elmnt =  this.make_new(type, current_row);
                this.rows[current_row].push(new_v_elmnt);
                //need to normalize after completing the edits
                return new_v_elmnt;
            }
            else
            {
                let new_v_elmnt =  this.make_new(type, current_row+1);
                this.rows.splice(current_row+1, 0, [new_v_elmnt]);
                return new_v_elmnt;
            }
            
        }
        else
        {
            return this.add(type);
        }
    }
    public normalize_elements() 
    {
        this.split_overflowing_rows()
        this.remove_empty_rows();
        this.rows.push([]);
        this.update_element_position();
    }
    
    private split_overflowing_rows()
    {
        //Split overflowing rows
        for (let r = 0; r < this.rows.length; r++) 
        {
            let width = 0;
            let new_items = [];

            for (let e = 0; e < this.rows[r].length; e++) 
            {
                width += this.rows[r][e].width;

                if (width > 100) 
                {
                    new_items.push(this.rows[r][e]);
                    this.rows[r].splice(e, 1);
                }
            }

            if (new_items.length > 0) 
            {
                this.rows.splice(r + 1, 0, new_items);
            }

        }
    }
    private remove_empty_rows()
    {
        let remove_rows = [];
        for (let r = 0; r < this.rows.length; r++) 
        {
            if (this.rows[r].length <= 0) 
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
            for(let e=0; e < this.rows[r].length;e++)
            {
                if(this.rows[r][e].id === v_elmnt.id)
                {
                    return r;
                }
            }
        }
        return -1;
    }
    private remove_from_rows(v_elmnt:VisualElement)
    {
        for(let r=0;r<this.rows.length;r++)
        {
            for(let e=0; e < this.rows[r].length;e++)
            {
                if(this.rows[r][e].id === v_elmnt.id)
                {
                    this.rows[r].splice(e,1);
                    return;
                }
            }
        }
    }

    public remove(v_elmnt:VisualElement)
    {
        this.remove_from_rows(v_elmnt);
        this.normalize_elements();
    }

    public clone(v_elmnt:VisualElement)
    {
        let r = this.find_row(v_elmnt);
        
        let elmnt_clone_plain = JSON.parse(JSON.stringify(v_elmnt.elmnt));

        let elmnt_clone = plainToClassObject(elmnt_clone_plain);
        if(!elmnt_clone)
        {
            return null;
        }
        this.baptise(elmnt_clone);
        let new_v_element = new VisualElement(elmnt_clone);

        this.rows[r].push(new_v_element);

        this.normalize_elements();

        return new_v_element;
    }

    public get element_names():string[]
    {
        return this.all_elements.map((elmnt)=>elmnt.name);
    }
    

    public get all_elements()
    {
        let all=[]
        for(let p=0; p< this.pages.length; p++)
        {
            for(let r=0;r<this.pages[p].rows.length;r++)
            {
                for(let e=0; e < this.pages[p].rows[r].length;e++)
                {
                    all.push(this.pages[p].rows[r][e].elmnt);
                }
            }
        }
        
        return all;
    }

    private update_element_position()
    {
        for(let r=0;r<this.rows.length;r++)
        {
            for(let col=0; col < this.rows[r].length;col++)
            {
                this.rows[r][col].elmnt.position(r, col);
            }
        }
    }
    
    //Note this is for calling after the class-json based deserialization
    public afterDeserialization()
    {
        this.current_page = this.pages[0];
        this.normalize_elements();
    }
    
    public get_element_ids():string[]
    {
        return this.all_elements.map((elmnt)=>elmnt.id);
    }
    
    private updatePageSorting()
    {
        for(let p=0;p<this.pages.length;p++)
        {
            this.pages[p].sort_position = p+1;
        }
    }
    private get current_page_index()
    {
        return this.pages.findIndex((pg)=>(pg.id == this.current_page.id) );
    }
    
    public add_page()
    {
        let new_page = new DPage();
        this.pages.push(new_page);
        this.updatePageSorting();
        this.current_page = new_page;
        return new_page;
    }
    
    public insert_page()
    {
        if(this.current_page_index == this.pages.length-1)
        {
            return this.add_page()
        }
        
        let new_page = new DPage();
        this.pages.splice(this.current_page_index + 1, 0, new_page);
        this.updatePageSorting();
        this.current_page = new_page;
        
        return new_page;
    }

    public get all_pages():PageInfo[]
    {
        return this.pages.map((pg)=>({
            title:pg.title, 
            condition:pg.condition, 
            id:pg.id, 
            sort_position:pg.sort_position}));
    }

    public getPage(page_id:string):DPage|undefined
    {
        return this.pages.find((pg)=>(pg.id == page_id) );
    }

    public switchToPage(page_id:string)
    {
        let other_pg = this.pages.find((pg)=>(pg.id == page_id) );
        if(other_pg)
        {
            this.current_page = other_pg;
        }
    }
    public prevPage()
    {
        if(this.current_page_index > 0){
            const pg_idx = this.current_page_index - 1 ;
            this.switchToPage(this.pages[pg_idx].id)
        }
    }
    public nextPage()
    {
        if(this.current_page_index < this.pages.length-1){
            const pg_idx = this.current_page_index + 1;
            this.switchToPage(this.pages[pg_idx].id)
        }
    }
    public getCurrentPage()
    {
        return this.current_page;
    }
    public deleteCurrentPage():string
    {
        let page_id = this.current_page.id;
        this.deletePage(this.current_page.id);
        return page_id;
    }
    public deletePage(page_id:string)
    {
        let pg_idx = this.pages.findIndex((pg)=>(pg.id == page_id) );
        if(pg_idx >= 0)
        {
            this.pages.splice(pg_idx, 1);
            if(this.pages[pg_idx])
            {
                this.current_page = this.pages[pg_idx];
            }
        }
        if(this.pages.length <= 0)
        {
            this.add_page()
        }
    }
    
    public code(node:NodeItem)
    {
        const container = node.section('layout.container')
        for(let pg of this.pages)
        {
            pg.code(container, this.pages.length)
        }
    }
}
