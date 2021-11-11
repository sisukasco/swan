import faker from "faker"
import $ from "@sisukas/jquery";
import {DateFieldParser} from "../src/DateFieldParser";
import { serialize } from '@sisukas/form-ds';

test("DATE1: parsing date field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Start Date</label>
    <input type="date" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new DateFieldParser($("#direct_name")[0])
    const datebox = p.parse();
    expect(datebox.name).toBe(direct_name);
    expect(datebox.type).toBe("Date");
    expect(datebox.label).toBe("Start Date");
    expect(datebox.validations.required.enabled).toBe(true);
    expect(datebox.validations.content_type.type).toBe("date");
    expect(datebox.validations.content_type.is_enabled()).toBe(true);
    let strDatebox = serialize(datebox)
    console.log("datebox ", strDatebox);
    let dateObj = JSON.parse(strDatebox)
    
    expect(dateObj.validations.required).toBeDefined()
    expect(dateObj.validations.required.enabled).toBe(true)
});


test("DATE2: parsing date field - not required field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Start Date</label>
    <input type="date" min="2020-10-10"  max="2020-10-20" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new DateFieldParser($("#direct_name")[0])
    const datebox = p.parse();
    expect(datebox.name).toBe(direct_name);
    expect(datebox.type).toBe("Date");
    expect(datebox.label).toBe("Start Date");
    expect(datebox.validations.required.enabled).toBe(false);
    expect(datebox.validations.required.is_enabled()).toBe(false);
    expect(datebox.validations.content_type.type).toBe("date");
    expect(datebox.validations.content_type.is_enabled()).toBe(true);
    
    expect(datebox.validations.min_date.is_enabled()).toBe(true);
    expect(datebox.validations.max_date.is_enabled()).toBe(true);
    
    let strDatebox = serialize(datebox)
    console.log("datebox ", strDatebox);
    let dateObj = JSON.parse(strDatebox)
    expect(dateObj.validations.required).toBeUndefined()
    expect(dateObj.validations.min_date).toBeDefined()
    expect(dateObj.validations.max_date).toBeDefined()
    
});
