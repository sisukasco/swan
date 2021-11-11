import {ISupplementaryCode, Dependency, DependencyType} from "./types";
//import csso from "csso";
import { NodeItem } from "@sisukas/coder-interface"
    
interface Segments
{
    [t:string]:string[]
}
interface CodeBlocks
{
    [name:string]:string
}

export  
class SupplementaryCode implements ISupplementaryCode
{
    private segments :Segments =
    {
        style:[],
        script:[]
    };
    private dependencies: Dependency[]=[]

    private blocks:CodeBlocks={}
    
    
    addStyle(code:string)
    {
        this.addCode('style', code)
    }
    addScript(code:string)
    {
        this.addCode('script', code)
    }
    addCode(segment:string,code:string)
    {
        if(!code){ return;}
        if(!this.segments[segment])
        {
            this.segments[segment] = [];
        }
        if(!this.segments[segment].includes(code))
        {
            this.segments[segment].push(code);
        }
    }

    addDependency(package_name:string, cdn_link:string, str_type:string='script')
    {
        const type = (str_type == 'script')?DependencyType.JS:DependencyType.CSS;

        const found = this.dependencies.find((dep)=>(dep.package_name == package_name));
        if(!found)
        {
            this.dependencies.push({type,package_name,cdn_link })
        }
    }
    createCodeBlock(name:string, code:string)
    {
        if(!this.blocks[name])
        {
            this.blocks[name] = code; 
        }
        
    }
    getCodeBlock(name:string)
    {
        return this.blocks[name];
    }
    /*
    private getCombinedCodeBlocks():string
    {
        let ret_code = [];
        for(let sec in this.blocks)
        {
            ret_code.push(this.blocks[sec]);
        }
        return ret_code.join("\n");
    }*/
    
    getDependencies()
    {
        return this.dependencies;
    }
    getDependencyCode(skip:string[]=[]):string
    {
        let code:string[]=[];
        for(let dep of this.dependencies)
        {
            if(skip.includes(dep.package_name))
            {
                continue;
            }
            if(dep.type == DependencyType.JS)
            {
                code.push(`<script src="${dep.cdn_link}"></script>`);
            }
            else
            {

                code.push(`<link rel="stylesheet" href="${dep.cdn_link}">`);
            }
        }
        return code.join("\n");
    }
    getStyleCode()
    {
        const css_code = this.segments['style'].join("\n");
        return css_code;
        //Note: csso adds a large dependency to the coder lib output (705 KB - 125Kb)
        //return csso.minify(css_code).css;
    }

    getCombinedCode(segments:string[])
    {
        let ret_code = '';

        for(let segment of segments)
        {
            if(!this.segments[segment] || this.segments[segment].length <= 0 )
            {
                continue;
            }
            if(segment == 'script')
            {
                ret_code += "\n<script>\n"+this.segments['script'].join("\n")+"\n</script>\n";
            }
            else if(segment == 'style')
            {
                ret_code += "\n<style>\n"+this.segments['style'].join("\n")+"\n</style>\n";
            }
        }
        return ret_code;
    }
    getHeaderCode()
    {
        let code_lines =[];
        for(let dep of this.dependencies)
        {
            if(dep.type == DependencyType.JS)
            {
                code_lines.push(`<script src="${dep.cdn_link}"></script>`);
            }
            else if(dep.type == DependencyType.CSS)
            {
                code_lines.push(`<link rel="stylesheet" href="${dep.cdn_link}" />`);
            }
        }
        if(this.segments['style'].length > 0)
        {
            code_lines.push("<style>");
            code_lines.push(...this.segments['style']);
            code_lines.push("</style>");

        }
        return code_lines.join("\n");
    }
    
    public insertHeadCode(head:NodeItem)
    {
        for(let dep of this.dependencies)
        {
            if(dep.type == DependencyType.JS)
            {
                head.startTag("script").attribute("src", dep.cdn_link)
            }
            else if(dep.type == DependencyType.CSS)
            {
                head.startTag("link")
                .attribute("rel", "stylesheet")
                .attribute("href", "dep.cdn_link")
            }
        }
        if(this.segments['style'].length > 0)
        {
            const style = head.startTag("style");
            const code = this.segments['style'].join("\n")
            style.inline_style(code)
        }
    }
    public insertBodyCode(body: NodeItem)
    {
        if(this.segments['script'].length > 0)
        {
            const script = body.startTag("script");
            const code = this.segments['script'].join("\n")
            script.inline_script(code)            
        }
    }
    getBodyCode()
    {
        let code_lines =[];
        if(this.segments['script'].length > 0)
        {
            code_lines.push("<script>");
            code_lines.push(...this.segments['script']);
            code_lines.push("</script>");
        }
        return code_lines.join("\n");
    }

}
