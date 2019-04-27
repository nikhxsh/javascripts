import { Component, ViewChild } from '@angular/core';
import { Signup } from './signup';

@Component({
  selector: 'templateform',
  templateUrl: './templateform.component.html'
})
export class TemplateformComponent {
  @ViewChild('f') form: any;
  model: Signup;
  langs: string[] = [
    'Hindi',
    'English',
    'French',
    'German',
  ];

  /**
   * > The key in understanding the template driven approach is that it still uses the same models as the
   * model driven approach. In the template driven approach Angular creates the models, the FormGroups
   * and FormControls, for us via directives we add to the template.
   * > Template Drive Forms are just Model Driven Form but driven by directives in the
   * the template versus code in the component.
   */
  constructor() {
    this.model = new Signup()
  }

  onSubmit() {
    if (this.form.valid) {
      console.log("Form Submitted!");
      this.form.reset();
    }
  }
}
