import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  /**
   * 
   * @param value The first argument to the transform function is the value that is passed into the pipe, i.e. the thing
   * that goes before the | in the expression.
   * @param fallback The second parameter to the transform function is the first param we pass into our pipe, i.e. the
   * thing that goes after the : in the expression.
   */
  transform(value: string, fallback: any, forceHttps: boolean = false): any {
    let image = "";
    if (value) {
      image = value;
    } else {
      image = fallback;
    }
    if (forceHttps) {
      if (image.indexOf("https") == -1) {
        image = image.replace("http", "https");
      }
    }
    return image;
  }
}
