export type AttributeValue = string|number|string[]|Object|undefined;

export 
interface Attributes
{
    [name:string]:AttributeValue,
    class ?:string|string[],
    style ?:string|Object
}
export interface TextNode
{
    type:'text'
    getHTMLCode():string
}

export 
type ChildrenArray = (NodeItem|TextNode)[];

export interface Codeable
{
    code(node: NodeItem):void
}

export interface NodeItem
{
    type:'node'
    tag_name :string
    attributes ?:Attributes
    children ?: ChildrenArray

    startTag(tag_name:string,attributes?:Attributes):NodeItem;
    attribute(name:string, value:AttributeValue):NodeItem;
    getAttribute(name:string):AttributeValue|null;
    removeAttribute(name:string):void;
    popAttribute(name:string):AttributeValue|null;
    text(txt:string):NodeItem;
    html(htm:string):NodeItem;
    style(code:string):void;
    script(code:string):void;
    inline_script(code:string):void;
    inline_style(code:string):void;
    addDependency(package_name:string, cdn_link:string, str_type:string):void;
    createCodeBlock(name:string, code:string):void;
}
