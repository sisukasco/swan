import faker from "faker"
import $ from "@sisukas/jquery";
import {CheckboxGroupParser} from "../src/CheckboxGroupParser";
import { serialize } from '@sisukas/form-ds';


test("CHKGRP100: parsing checkbox field",()=>
{
    const cgname = faker.random.word()
    const direct_name =  cgname + "[]"
    
    document.body.innerHTML =`
    <form id="myform">
    <div>
    <label for="chkbox1">Option 1</label>
    <input type="checkbox" value="v1" name="${direct_name}" id="chkbox1"/>
    </div>
    <div>
    <label for="chkbox2">Option 2</label>
    <input type="checkbox"  value="v2" name="${direct_name}" id="chkbox2"/>    
    </div>
    <div>
    <label for="chkbox3">Option 3</label>
    <input type="checkbox"  value="v3" name="${direct_name}" id="chkbox3"/>        
    </div>
    <div>
    <label for="chkbox4">Option 4</label>
    <input type="checkbox"  value="v4" name="${direct_name}" id="chkbox4"/>        
    </div>    
    </form>
    `;
    const p = new CheckboxGroupParser($("#chkbox1")[0])
    const cg = p.parse();
    expect(cg.name).toBe(cgname)
    expect(cg.settings.items.length).toBe(4)
    expect(cg.settings.items[0].name).toBe("Option 1")
    expect(cg.settings.items[0].value).toBe("v1")
    expect(cg.settings.items[3].name).toBe("Option 4")
    expect(cg.settings.items[3].value).toBe("v4")
    console.log("Checkbox group parsed ", serialize(cg))
})

