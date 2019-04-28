import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../services/simple.service';

/**
 * The ParentComponent has just one input box which reads and writes to the SimpleService value
 * property using two way ngModel binding, the ChildComponent just renders the value to the screen
 * with {{ }}.
 */
@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
  /** 
   * If we want to have one instance of a service per component, and shared with all
   * the components children, we configure it on the providers property on our
   * component decorator. 
   */
  providers: [SimpleService]
  /** 
   * If we want to have one instance of a service per component, and shared with only
   * the components view children and not the components content children, we
   * configure it on the viewProviders property on our component decorator.
   */
  //viewProviders: [SimpleService]
})
export class ParentComponent implements OnInit {

  constructor(private service: SimpleService) { }

  ngOnInit() {
  }
}
