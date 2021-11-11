import {filterXSS} from  "xss";

/**
 * htmlEntities code from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/ 
 * */
export function htmlEntities(str:string):string
{
    //&apos;
    return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

export function filterHTML(html:string):string
{
    return filterXSS(html);
}
