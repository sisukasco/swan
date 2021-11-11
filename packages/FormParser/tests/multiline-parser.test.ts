import faker from "faker"
import $ from "@sisukas/jquery";
import {MultilineParser} from "../src/MultilineParser";
import { serialize } from '@sisukas/form-ds';

test("ML100: parsing MultilineParser field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Message:</label>
    <textarea required name="${direct_name}" id="direct_name"></textarea>
    </form>
    `;
    const p = new MultilineParser($("#direct_name")[0])
    const multiline = p.parse();
    expect(multiline.name).toBe(direct_name);
    expect(multiline.type).toBe("Multiline");
    expect(multiline.label).toBe("Message:");
    expect(multiline.validations.required.enabled).toBe(true);
    console.log("multiline ", serialize(multiline));
});

test("ML101: parsing MultilineParser validations",()=>
{
    const direct_name = faker.random.word();
    const maxlen = faker.random.number();
    const minlen = faker.random.number();
    
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Message:</label>
    <textarea maxlength="${maxlen}" minlength="${minlen}" 
    name="${direct_name}" id="direct_name"></textarea>
    </form>
    `;
    const p = new MultilineParser($("#direct_name")[0])
    const multiline = p.parse();
    expect(multiline.name).toBe(direct_name);
    expect(multiline.type).toBe("Multiline");
    expect(multiline.label).toBe("Message:");
    expect(multiline.validations.required.is_enabled()).toBe(false);
    expect(multiline.validations.maxlength.is_enabled()).toBe(true);
    expect(multiline.validations.maxlength.size).toBe(maxlen);
    expect(multiline.validations.minlength.is_enabled()).toBe(true);
    expect(multiline.validations.minlength.size).toBe(minlen);
    console.log("multiline ", serialize(multiline));
});