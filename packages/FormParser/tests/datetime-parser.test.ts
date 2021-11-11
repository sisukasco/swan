import faker from "faker"
import $ from "@sisukas/jquery";
import {DateTimeParser} from "../src/DateTimeParser";
import { serialize } from '@sisukas/form-ds';

test("DT1: parsing date field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Start Date</label>
    <input type="datetime-local" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new DateTimeParser($("#direct_name")[0])
    const datebox = p.parse();
    expect(datebox.name).toBe(direct_name);
    expect(datebox.type).toBe("DateTime");
    expect(datebox.label).toBe("Start Date");
    expect(datebox.validations.required.enabled).toBe(true);
    expect(datebox.validations.content_type.type).toBe("datetime");
    expect(datebox.validations.content_type.is_enabled()).toBe(true);
    console.log("datebox ", serialize(datebox));
});


test("DT2: parsing date time field - not required field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Start Date</label>
    <input type="datetime-local" min="2020-10-10T19:30"  max="2020-10-20T12:00" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new DateTimeParser($("#direct_name")[0])
    const datebox = p.parse();
    expect(datebox.name).toBe(direct_name);
    expect(datebox.type).toBe("DateTime");
    expect(datebox.label).toBe("Start Date");
    expect(datebox.validations.required.enabled).toBe(false);
    expect(datebox.validations.required.is_enabled()).toBe(false);
    expect(datebox.validations.content_type.type).toBe("datetime");
    expect(datebox.validations.content_type.is_enabled()).toBe(true);
    
    expect(datebox.validations.min_date.is_enabled()).toBe(true);
    expect(datebox.validations.max_date.is_enabled()).toBe(true);
    
    console.log("datebox ", serialize(datebox));
});
