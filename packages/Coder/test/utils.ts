import { NodeItem, Codeable } from "@sisukas/coder-interface";

export class ElementWithSections implements Codeable
{
    public code(root:NodeItem):void
    {
        const row = root.startTag('div').section('layout.container')
                    .section('layout.row');
        const form = row.startTag('form',{action:'#', method:'post'});
        form.section('layout.col').startTag('label').text('Name is');
        form.section('layout.col').startTag('input', {type:'text', name:'name'});
    }
}