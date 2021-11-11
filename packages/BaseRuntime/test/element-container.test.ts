import {DElementContainer} from "../src/lib/DElementContainer";
import {serialize} from "class-transformer";


test("DCONT001: makes clones with unique names", ()=>
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
    
    const strContainer = serialize(container)
    console.log("Serialized container:\n", strContainer)
});