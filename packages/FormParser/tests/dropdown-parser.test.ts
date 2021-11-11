import $ from "@sisukas/jquery";
import {DropDownParser} from "../src/DropDownParser";
import { serialize } from '@sisukas/form-ds';


test("DROP100: parsing dropdown  field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Select your country:</label>
    <select name="country" id="direct_name" required>
    <option value="val1">Item1</option>
    <option value="val2">Item2</option>
    <option value="val3">Item3</option>
    <option value="val4">Item4</option>
    </select>
    </form>
    `;
    
    const p = new DropDownParser($("#direct_name")[0]);
    const dbox = p.parse();
    expect(dbox.name).toBe("country");
    
    expect(dbox.settings.items[0].name).toBe("Item1");
    expect(dbox.settings.items[0].value).toBe("val1");
    expect(dbox.settings.items[1].name).toBe("Item2");
    expect(dbox.settings.items[1].value).toBe("val2");
    console.log("Dropdown parsed ", serialize(dbox))
    expect(dbox.validations.required.enabled).toBe(true);
})

test("DROP101: parsing dropdown  field with default values",()=>
{
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Select your country:</label>
    <select name="country" id="direct_name">
    <option value="">Select ...</option>
    <option >Item1</option>
    <option >Item2</option>
    <option >Item3</option>
    <option >Item4</option>
    </select>
    </form>
    `;
    
    const p = new DropDownParser($("#direct_name")[0]);
    const dbox = p.parse();
    expect(dbox.name).toBe("country");
    
    expect(dbox.settings.items[0].value).toBe("");
    expect(dbox.settings.items[1].name).toBe("Item1");
    expect(dbox.settings.items[1].value).toBe("Item1");
    expect(dbox.settings.items[2].name).toBe("Item2");
    expect(dbox.settings.items[2].value).toBe("Item2");
    
    console.log("Dropdown parsed ", serialize(dbox))
})