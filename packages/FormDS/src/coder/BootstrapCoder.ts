import { CSSFramework } from './CSSFramework';

export class BootstrapCoder implements CSSFramework {
  private numColumns: number = 2;
  private breakPoint: string = 'md';

  setNumColumns(n: number) {
    this.numColumns = n;
  }

  layoutContainerClasses(): string[] {
    return ['container'];
  }
  inputContainerClasses(width: number): string[] {
    let colx = '';

    let colSliceCount = 1;
    let widthPerc = 100;

    if (this.numColumns == 4) {
      colSliceCount = 3;
      widthPerc = 25;
    } else if (this.numColumns == 3) {
      colSliceCount = 4;
      widthPerc = 33;
    } else if (this.numColumns == 2) {
      colSliceCount = 6;
      widthPerc = 50;
    } else if (this.numColumns == 1) {
      colSliceCount = 12;
      widthPerc = 100;
    }

    if (width) {
      colx = 'col-' + this.breakPoint + '-12';

      for (let w = 1; w * widthPerc < 100; w++) {
        if (width <= w * widthPerc) {
          colx = 'col-' + this.breakPoint + '-' + w * colSliceCount;
          break;
        }
      }
    } else {
      colx = 'col';
    }
    return [colx];
  }
  labelClasses(): string[] {
    return ['form-label'];
  }
  inputClasses(): string[] {
    return ['form-control'];
  }
  rowClasses(): string[] {
    return ['row', 'mb-3'];
  }
  textAlignmentClasses(alignment: string): string[] {
    if (alignment == 'center') {
      return ['text-center'];
    } else if (alignment == 'right') {
      return ['text-end'];
    }
    return [];
  }
  hintTextClasses(): string[] {
    return ['fs-6', 'fw-light'];
  }
  headingClasses(_type: string): string[] {
    return [];
  }

  flexAlignmentClasses(alignment: string): string[] {
    const classes = ['d-flex', 'align-items-center'];

    if (alignment == 'center') {
        classes.push('justify-content-center');
    } else if (alignment == 'right') {
        classes.push('justify-content-end');
    }
    
    return classes

  }
}
