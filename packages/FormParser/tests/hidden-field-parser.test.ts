import faker from "faker"
import $ from "@sisukas/jquery";
import {HiddenFieldParser} from "../src/HiddenFieldParser";
import { serialize } from '@sisukas/form-ds';

test("HIDDEN1: parsing a hidden field",()=>
{
    const direct_name = faker.random.word()
    const value =  faker.random.word()
    
    document.body.innerHTML =`
    <form id="myform">
    <input type="hidden" name="${direct_name}" value="${value}" id="direct_name"/>
    </form>
    `;
    const p = new HiddenFieldParser($("#direct_name")[0])
    const hidden = p.parse();
    expect(hidden.name).toBe(direct_name);
    expect(hidden.settings.value).toBe(value);
    console.log("hidden field ", serialize(hidden));
});
