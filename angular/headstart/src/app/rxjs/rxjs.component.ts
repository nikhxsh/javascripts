import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {
  form = this.fb.group({
    comment: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ])
  });

  constructor(private fb: FormBuilder) {
    /**
     * this.form.valid is true when the whole form is valid. So while the form is invalid .filter
     * (data.this.form.valid) doesn’t push items to the output stream, when the form is valid it does start
     * pushing items to the output stream
     * so this map operator only gets called when the previous filter operator publishes to it’s output stream. 
     * To put it another way, this map operator only gets called on valid form values.
     */
    this.form
      .valueChanges
      .pipe(
        filter(data => this.form.valid),
        map(data => {
          data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
          return data
        }),
        map(data => {
          data.lastUpdate = new Date();
          return data
        })
      )
      .subscribe(data => console.log(JSON.stringify(data)));
      /**
       * The advantage of RxJS and Observables come to play when we start using more of
       * the complex operators like debounce and distinctUntilChanged. Implementing the
       * same functionality as those operators via standard imperative coding techniques
       * would take many more lines of code than the equivalent RxJS solution
       */
  }

  onSubmit() {
    console.log("Form submitted!");
  }
}
