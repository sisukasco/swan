'use strict';

import 'reflect-metadata';
import DFormElement from './DFormElement';
import { PasswordValidations } from '../containers';
import { Attributes, NodeItem } from '@sisukas/coder-interface';
import { ExcludeDefault } from '../lib/TxUtils';
import { Type } from 'class-transformer';
import { Sidekick } from '../coder/Sidekick';

class PasswordSettings {
  @ExcludeDefault('')
  public placeholder: string = '';

}

class DPassword extends DFormElement {
  @Type(() => PasswordSettings)
  public settings = new PasswordSettings();

  @Type(() => PasswordValidations)
  public readonly validations = new PasswordValidations();

  constructor() {
    super('Password', 'Password:');
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
        type:'password', 
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
  
}

export default DPassword;
