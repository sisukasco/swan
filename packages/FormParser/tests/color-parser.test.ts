import faker from "faker"
import $ from "@sisukas/jquery";
import { ColorFieldParser } from "../src/ColorFieldParser";
import { serialize } from '@sisukas/form-ds';

test("COLOR1: parsing color field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please select color</label>
    <input type="color" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new ColorFieldParser($("#direct_name")[0])
    const colorbox = p.parse();
    expect(colorbox.name).toBe(direct_name);
    expect(colorbox.type).toBe("Color");
    expect(colorbox.label).toBe("Please select color");
    expect(colorbox.validations.required.enabled).toBe(true);
    expect(colorbox.validations.content_type.type).toBe("color");
    expect(colorbox.validations.content_type.is_enabled()).toBe(true);
    console.log("colorbox ", serialize(colorbox));
});


