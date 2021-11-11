import mergewith from "lodash.mergewith";

export function merge(obj1:any,obj2:any)
{
    let merged = mergewith({},obj1,obj2,
    (obj:any,src:any)=>
    {
        if(Array.isArray(obj) && Array.isArray(src))
        {
           return obj.concat(src);
        }
        //if undefined is returned, mergewith handles the merge
        return undefined;
    });
    return merged;
}

export function escapeQuotes(str:string)
{
    return str.replace(/\"/g,'\\"');
}