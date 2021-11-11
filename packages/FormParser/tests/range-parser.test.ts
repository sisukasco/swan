import faker from "faker"
import $ from "@sisukas/jquery";
import {RangeFieldParser} from "../src/RangeFieldParser";
import { serialize } from '@sisukas/form-ds';


test("RANGE1: parsing range field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Select Number</label>
    <input type="range" required name="${direct_name}" 
    min="10" max="100"
    id="direct_name"/>
    </form>
    `;
    const p = new RangeFieldParser($("#direct_name")[0])
    const range = p.parse();
    expect(range.name).toBe(direct_name);
    expect(range.type).toBe("Range");
    expect(range.label).toBe("Select Number");
    expect(range.validations.required.enabled).toBe(true);
    
    expect(range.validations.min.num).toBe(10);
    expect(range.validations.min.is_enabled()).toBe(true);
    expect(range.validations.max.num).toBe(100);
    expect(range.validations.max.is_enabled()).toBe(true);
    
    console.log("range ", serialize(range));
});

test("RANGE2: parsing range field step field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Select Number</label>
    <input type="range" name="${direct_name}" 
    min="10" max="100" step="1" id="direct_name"/>
    </form>
    `;
    const p = new RangeFieldParser($("#direct_name")[0])
    const range = p.parse();
    expect(range.name).toBe(direct_name);
    expect(range.type).toBe("Range");
    expect(range.label).toBe("Select Number");
    expect(range.validations.required.is_enabled()).toBe(false);
    expect(range.validations.min.is_enabled()).toBe(true);
    expect(range.validations.max.is_enabled()).toBe(true);
    expect(range.validations.multiples_of.is_enabled()).toBe(true);
    
    console.log("range 2 ", serialize(range));
});