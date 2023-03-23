'use strict';

import 'reflect-metadata';
import DFormElement from './DFormElement';
import { TextboxValidations } from '../containers';
import { Attributes, NodeItem } from '@sisukas/coder-interface';
import { ExcludeDefault } from '../lib/TxUtils';
import { Type } from 'class-transformer';
import { Sidekick } from '../coder/Sidekick';

class TextboxSettings {
  @ExcludeDefault('')
  public placeholder: string = '';

  @ExcludeDefault('')
  public default_value: string = '';
}

class DTextbox extends DFormElement {
  @Type(() => TextboxSettings)
  public settings = new TextboxSettings();

  @Type(() => TextboxValidations)
  public readonly validations = new TextboxValidations();

  constructor() {
    super('Textbox', 'Your Question Here:');
  }

  get default_value() {
    return this.settings.default_value;
  }

  public code(coder: NodeItem, sidekick: Sidekick) {

    const containerClasses = sidekick.css.inputContainerClasses(this.width);
    const container = coder.startTag('div', { class: containerClasses });

    if(this.hasLabel()){
    container
      .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
      .html(this.label);
    }
    const attrs:Attributes = {
        type:'text', 
        name:this.name,
        id:this.name
    }

    if(this.settings.placeholder){
        attrs['placeholder'] = this.settings.placeholder
    }
    if(this.validations.required.enabled){
        attrs['required'] = 'required'
    }
    if(this.validations.maxlength.size != null){
        attrs['maxlength'] = String(this.validations.maxlength.size)
    }
    if(this.validations.minlength.size != null){
        attrs['minlength'] = String(this.validations.minlength.size)
    }

    attrs['class'] = sidekick.css.inputClasses()

    container.startTag('input',attrs)

  }
  /*public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container', { width: this.width});

        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }

        const attrs:InputAttributes = {
            type:'text', 
            name:this.name,
            id:this.name
        }

        if(this.settings.placeholder){
            attrs['placeholder'] = this.settings.placeholder
        }
        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
        if(this.validations.maxlength.size != null){
            attrs['maxlength'] = String(this.validations.maxlength.size)
        }
        if(this.validations.minlength.size != null){
            attrs['minlength'] = String(this.validations.minlength.size)
        }
        container.section('form.input.input',attrs);
        container.section('form.input.error',{name:this.name});

    }*/
}

export default DTextbox;
