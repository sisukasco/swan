import { generateHTMLCode } from './../src/coder/CodeGen';
import DHeading from "../src/elements/DHeading"


test('HEADING001: code generation bootstrap',()=>
{
    let heading = new DHeading();

    heading.settings.content = "My Heading";
    heading.settings.type = "h3";


    const code = generateHTMLCode(heading, {cssFramework:"bootstrap"})

    expect(code).toContain("<h3>My Heading</h3>")

    console.log("generated code ", code)    
});

test('HEADING002: code generation tailwind',()=>
{
    let heading = new DHeading();

    heading.settings.content = "My Heading";
    heading.settings.type = "h3";


    const code = generateHTMLCode(heading, {cssFramework:"tailwind"})

    expect(code).toContain(`<h3 class="text-xl">My Heading</h3>`)

    console.log("generated code ", code)    
});

test('HEADING003: code generation text align bootstrap',()=>
{
    let heading = new DHeading();

    heading.settings.content = "My Heading";
    heading.settings.type = "h3";
    heading.settings.alignment = "right"


    const code = generateHTMLCode(heading, {cssFramework:"bootstrap"})

    expect(code).toContain("text-end")

    console.log("generated code ", code)    
});