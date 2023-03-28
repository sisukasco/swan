import { Attributes } from '@sisukas/coder-interface';
import DRadioButton from './DRadioButton';
import DCheckboxGroup from './DCheckboxGroup';
import { Sidekick } from '../coder/Sidekick';

import { NodeItem } from '@sisukas/coder-interface';
import DItem from "./DItem";


export default class GroupChoice {
  constructor(
    private elmnt: DCheckboxGroup | DRadioButton,
    private type: 'checkbox' | 'radio'
  ) {}
  code(coder: NodeItem, sidekick: Sidekick) {
    const container = coder.startTag('div', {
      class: sidekick.css.inputContainerClasses(this.elmnt.width),
    });

    if (this.elmnt.label && this.elmnt.label.trim().length > 0) {
      container.startTag('label').html(this.elmnt.label);
    }

    let gcontainer = container.startTag('div', {
      class: sidekick.css.groupContainerClasses(
        this.elmnt.settings.arrangement
      ),
    });

    for (let i = 0; i < this.elmnt.settings.items.length; i++) {
      this.item_code(this.elmnt.settings.items[i], i, gcontainer, sidekick);
    }

    coder.style(this.style());
  }

  private item_code(
    item: DItem,
    idx: number,
    container: NodeItem,
    sidekick: Sidekick
  ) {
    let id = this.elmnt.name + '_' + idx;
    let value = item.value ? item.value : item.name;

    let item_container = container.startTag('div', {
      class: sidekick.css.groupItemContainerClasses(
        this.elmnt.settings.arrangement
      ),
    });

    const attrs:Attributes = {
      type: this.type,
      name: this.elmnt.name,
      value,
      id,
      class: sidekick.css.inputCheckboxClasses(),
    }

    if(item.rvalue){
      attrs["r-value"] = item.rvalue
    }
    

    item_container.startTag('input', attrs);

    item_container
      .startTag('label', {
        class: sidekick.css.labelCheckboxClasses(),
        for: id,
      })
      .html(item.name);
  }

  public style() {
    return `.sim-group-label
            {
                display:block;
            }
            .sim-group-item.sim-check-vertical
            {
                margin-bottom:0.5rem;
            }
            .sim-group-item.form-check-inline
            {
                margin-right:1rem;
            }`;
  }
}
