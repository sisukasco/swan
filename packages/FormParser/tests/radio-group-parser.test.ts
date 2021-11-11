import faker from "faker"
import $ from "@sisukas/jquery";
import { serialize } from '@sisukas/form-ds';
import { RadioGroupParser } from '../src/RadioGroupParser';

test("RADIO100: parsing a radio group",()=>
{
    const gname = faker.random.word()
    const direct_name =  gname
    
    document.body.innerHTML =`
    <form id="myform">
    <div>
    <label for="radio1">Option 1</label>
    <input type="radio" value="v1" name="${direct_name}" id="radio1"/>
    </div>
    <div>
    <label for="radio2">Option 2</label>
    <input type="radio"  value="v2" name="${direct_name}" id="radio2"/>    
    </div>
    <div>
    <label for="radio3">Option 3</label>
    <input type="radio"  value="v3" name="${direct_name}" id="radio3"/>        
    </div>
    <div>
    <label for="radio4">Option 4</label>
    <input type="radio"  value="v4" name="${direct_name}" id="radio4"/>        
    </div>    
    </form>
    `;
    const p = new RadioGroupParser($("#radio1")[0])
    const rg = p.parse();
    expect(rg.name).toBe(gname) 
    expect(rg.settings.items.length).toBe(4)
    expect(rg.settings.items[0].name).toBe("Option 1")
    expect(rg.settings.items[0].value).toBe("v1")
    expect(rg.settings.items[3].name).toBe("Option 4")
    expect(rg.settings.items[3].value).toBe("v4")
    console.log("Radio group parsed ", serialize(rg))
})

