import {DElementContainer} from "../src/lib/DElementContainer";
import VisualElement from "../src/lib/VisualElement";
import _ from "lodash";


describe("DElementContainer",()=>
{
    it("adds rows correct", ()=>
    {
        let container = new DElementContainer();
        

        let element = container.add("TextBlock");

        expect(container.rows.length).toEqual(1);

        expect(container.all_elements.length).toEqual(1);

        expect(container.all_elements[0].id).toEqual(element.id);
    });

    it("gets all_elements correct", ()=>
    {
        let container = new DElementContainer();
        let element1 = container.add("TextBlock");
        let element2 = container.add("Heading");

        expect(element1.id).not.toEqual(element2.id);
        expect(container.all_elements.length).toEqual(2);
        expect(container.all_elements[1].id).toEqual(element2.id);
    });

    it("clones element", ()=>
    {
        let container = new DElementContainer();
        container.add("TextBlock");
        let element2 = container.add("Heading");

        container.clone(element2);

        expect(container.rows[2][0].elmnt.type).toEqual("Heading");
        expect(container.rows[2][0].id).not.toEqual(element2.id);
    });

    it("updates element positions when added", ()=>
    {
        let container = new DElementContainer();
        for(let e=0;e<10;e++)
        {
            container.add('TextBlock');
        }
        for(let e=0;e<10;e++)
        {
            expect(container.rows[e][0].elmnt.row).toEqual(e);
            expect(container.rows[e][0].elmnt.col).toEqual(0);
        }
        container.rows[5][0].smaller();//33%
        container.rows[5][0].smaller();
        let update_element = container.rows[6][0];
        expect(update_element.elmnt.row).toEqual(6);
        expect(update_element.elmnt.col).toEqual(0);
        container.rows[6][0].smaller();
        container.rows[6][0].smaller();

        container.rows[5].push(<VisualElement><unknown>container.rows[6].pop());
        container.normalize_elements();
        
        expect(update_element.elmnt.row).toEqual(5);
        expect(update_element.elmnt.col).toEqual(1);

        for(let c=0; c < container.rows.length ; c++)
        {
            for(let x=0;x<container.rows[c].length; x++)
            {
                expect(container.rows[c][x].elmnt.row).toEqual(c);
                expect(container.rows[c][x].elmnt.col).toEqual(x);
            }
        }

     });

     it("updates element positions when removed", ()=>
    {
        let container = new DElementContainer();
        for(let e=0;e<10;e++)
        {
            container.add("TextBlock");
        }
        container.remove(container.rows[9][0]);
        container.remove(container.rows[3][0]);
        container.remove(container.rows[5][0]);
        container.remove(container.rows[4][0]);
        
        for(let c=0; c < container.rows.length ; c++)
        {
            for(let x=0;x<container.rows[c].length; x++)
            {
                expect(container.rows[c][x].elmnt.row).toEqual(c);
                expect(container.rows[c][x].elmnt.col).toEqual(x);
            }
        }
    });

    it("finds unique names",()=>
    {
        let container = new DElementContainer();
        container.add('TextBlock');
        container.add('TextBlock');

        //console.log("names ",container.all_elements[0].name ,container.all_elements[1].name );
        expect(container.all_elements[0].name).not.toEqual(container.all_elements[1].name);
    });

    it("finds unique names every time",()=>
    {
        let container = new DElementContainer();
        container.add('TextBlock');
        container.add('TextBlock');

        container.all_elements[1].updateName('TextBlock_2');
        container.add('TextBlock');
        
        //console.log("element_names ", container.element_names);
        //console.log("element ids ", container.element_ids);
        let s = new Set(container.element_names);
        expect(s.size).toEqual(3);
        let id_set = new Set(container.get_element_ids());
        expect(id_set.size).toEqual(3);
    });

    it("makes clones with unique names", ()=>
    {
        let container = new DElementContainer();
        container.add('TextBlock');
        container.add('TextBlock');

        container.clone(container.rows[0][0]);
        container.clone(container.rows[2][0]);
        container.clone(container.rows[1][0]);

        //console.log("elements now ", container.element_names);
        //console.log(" element ids ", container.element_ids);

        let s = new Set(container.element_names);
        expect(s.size).toEqual(5);

        let id_set = new Set(container.get_element_ids());
        expect(id_set.size).toEqual(5);
    });

    it("handles large number of elements without making duplicates",()=>
    {
        const size=100;
        const types = ['TextBlock','Heading','Image'];
        let container = new DElementContainer();
        for(let i=0;i<size;i++)
        {
            let type = _.sample(types);
            if(type)
            {
                container.add(type);
            }
        }

        //make clones
        for(let c=0;c<size;c++)
        {
            container.clone(container.rows[_.random(size-1)][0]);
        }

        //console.log("elements now ", container.element_names);
        //console.log("element ids ", container.element_ids);

        let s = new Set(container.element_names);
        expect(s.size).toEqual(size*2);

        let id_set = new Set(container.get_element_ids());
        expect(id_set.size).toEqual(size*2);
    })

    it("handles multiple pages - addpage h82138", ()=>
    {
        let container = new DElementContainer();
        let v_tblock1 = container.add("TextBlock");

        container.add_page();
        
        let heading = container.add("Heading");
        container.add("Dummy");

        expect(container.all_pages.length).toBe(2); 
        //container.all_elements.find((v)=>v.page == v_tblock1.elmnt.page )

        expect(v_tblock1.elmnt.page).toBe(container.all_pages[0].id);
        expect(heading.elmnt.page).toBe(container.all_pages[1].id);


       /* container.addPage();
        container.add("Heading");
        container.switchToPage(id)
        container.add("TextBlock");
        container.add("Heading");
        container.getCurrentPage().id
        container.getPages()
        container.deletePage(id)
        container.deleteCurrentPage()
        container.cloneCurrentPage();*/
    })

    it("handles multiple pages - switchToPage", ()=>
    {
        let container = new DElementContainer();
        container.add("TextBlock");

        container.add_page();
        
        container.add("Heading");
        container.add("Dummy");

        //console.log(" container.all_pages ", container.all_pages);

        container.switchToPage(container.all_pages[0].id);

        expect(container.getCurrentPage().id).toBe(container.all_pages[0].id);

        let new_txt_block = container.add("TextBlock");

        container.switchToPage(container.all_pages[1].id);

        let new_heading = container.add("Heading");

        expect(container.all_pages.length).toBe(2); 

        expect(new_txt_block.elmnt.page).toBe(container.all_pages[0].id);

        expect(new_heading.elmnt.page).toBe(container.all_pages[1].id);

    });

    it("handles multiple pages - deletePage", ()=>
    {
        let container = new DElementContainer();
        container.add("TextBlock");

        container.add_page();
        
        container.add("Heading");
        container.add("Dummy");

        container.add_page();
        container.add("Heading");

        let page_1_id = container.all_pages[1].id;

        let page_2_id = container.all_pages[2].id;

        container.deletePage(container.all_pages[0].id);

        expect(container.all_pages[0].id).toBe(page_1_id);
        expect(container.getCurrentPage().id).toBe(page_1_id);

        container.deletePage(container.all_pages[0].id);

        expect(container.all_pages[0].id).toBe(page_2_id);
        expect(container.getCurrentPage().id).toBe(page_2_id);
        
        container.deleteCurrentPage();
        expect(container.all_pages.length).toBe(1);
        expect(container.getCurrentPage().id).not.toBe(page_2_id);

    });

    it("handles multiple pages - deletePage", ()=>
    {
        let container = new DElementContainer();
        container.add("TextBlock");

        let page_1 = container.add_page();
        
        container.add("Heading");
        container.add("Dummy");

        let page_2 = container.add_page();
        container.add("Heading");

        container.switchToPage(page_1.id);
        container.deleteCurrentPage();

        expect(container.all_pages[1].id ).toBe(page_2.id)
    });
});

