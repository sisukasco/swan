import faker from "faker"
import $ from "@sisukas/jquery";
import {NumberFieldParser} from "../src/NumberFieldParser";
import { serialize } from '@sisukas/form-ds';


test("NUM100: parsing number field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter a number</label>
    <input type="number" required name="${direct_name}" 
    min="10" max="100"
    id="direct_name"/>
    </form>
    `;
    const p = new NumberFieldParser($("#direct_name")[0])
    const numbox = p.parse();
    expect(numbox.name).toBe(direct_name);
    expect(numbox.type).toBe("Number");
    expect(numbox.label).toBe("Please enter a number");
    expect(numbox.validations.required.enabled).toBe(true);
    
    expect(numbox.validations.min.num).toBe(10);
    expect(numbox.validations.min.is_enabled()).toBe(true);
    expect(numbox.validations.max.num).toBe(100);
    expect(numbox.validations.max.is_enabled()).toBe(true);
    
    let strnum = serialize(numbox)
    let numobj = JSON.parse(strnum)
    console.log("numbox ", numobj);
    
    expect(numobj.validations.required).toBeDefined()
    expect(numobj.validations.max).toBeDefined()
    expect(numobj.validations.min).toBeDefined()
});

test("NUM101: parsing number field lesser validtions",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter a number</label>
    <input type="number"  name="${direct_name}" 
    id="direct_name"/>
    </form>
    `;
    const p = new NumberFieldParser($("#direct_name")[0])
    const numbox = p.parse();
    expect(numbox.name).toBe(direct_name);
    expect(numbox.type).toBe("Number");
    expect(numbox.label).toBe("Please enter a number");
    expect(numbox.validations.required.is_enabled()).toBe(false);
    expect(numbox.validations.min.is_enabled()).toBe(false);
    expect(numbox.validations.max.is_enabled()).toBe(false);
    
    let strnum = serialize(numbox)
    let numobj = JSON.parse(strnum)
    console.log("numbox ", numobj);
    
    expect(numobj.validations.required).toBeUndefined()
    expect(numobj.validations.max).toBeUndefined()
    expect(numobj.validations.min).toBeUndefined()
});