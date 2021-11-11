/** 
 * Generate a serial, but unique ID.
*/

//source: 
export default function serialID():number
{
    var time = Date.now();

    //@ts-ignore
    var last = serialID.last || time;
    //@ts-ignore
    return serialID.last = time > last ? time : last + 1;
}