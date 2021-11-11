/**
 * 
 * @param str Copied from coder/utils since this is the only dependency to @sisukas/coder
 */
export function escapeQuotes(str:string)
{
    return str.replace(/\"/g,'\\"');
}