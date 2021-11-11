import faker from "faker"
import $ from "@sisukas/jquery";
import { URLFieldParser } from "../src/URLFieldParser";
import { serialize } from '@sisukas/form-ds';

test("URL1: parsing URL field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter link</label>
    <input type="url" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new URLFieldParser($("#direct_name")[0])
    const urlbox = p.parse();
    expect(urlbox.name).toBe(direct_name);
    expect(urlbox.type).toBe("URL");
    expect(urlbox.label).toBe("Please enter link");
    expect(urlbox.validations.required.enabled).toBe(true);
    expect(urlbox.validations.content_type.type).toBe("url");
    expect(urlbox.validations.content_type.is_enabled()).toBe(true);
    console.log("urlbox ", serialize(urlbox));
});


test("URL2: parsing URL field - not required field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter link</label>
    <input type="url"  name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new URLFieldParser($("#direct_name")[0])
    const urlbox = p.parse();
    expect(urlbox.name).toBe(direct_name);
    expect(urlbox.type).toBe("URL");
    expect(urlbox.label).toBe("Please enter link");
    expect(urlbox.validations.required.enabled).toBe(false);
    expect(urlbox.validations.required.is_enabled()).toBe(false);
    expect(urlbox.validations.content_type.type).toBe("url");
    expect(urlbox.validations.content_type.is_enabled()).toBe(true);
    console.log("urlbox ", serialize(urlbox));
});
