import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../services/simple.service';

/**
 * NgModule.providers
 * > In this configuration the service has been injected onto our applications root NgModule and therefore
 *   is in our root injector.So every request to resolve and inject the token SimpleService is going to be
 *   forwarded to our single root injector.
 * > So when you type anything it will reflect all over on holder component page
 * > If we want to share one instance of a service across the entirety of our application we configure it on
 *   our NgModule.
 *
 * Component.providers
 * > Let’s now see what happens when we configure our SimpleService additionally on th ParentComponent via the
 *   providers property.
 * > We can see from the running the code that if we type into one parent component only that
 *   parent component and it’s child component automatically updates.
 * > Each instance of ParentComponent now has it’s own instance of SimpleService, Remember when we request the 
 *   same token from different injectors we get the different instances.
 *
 * Component.viewProviders
 * > If we now configure the SimpleService provider on the viewProviders property on the ParentComponent nothing changes,
 * > But lets use content projection and the ng-content component to change the child component from being a view child of parent
 *   to the being a content child of parent
 * > We use content projection to insert the ChildComponent where it used to be hard coded.
 * > change the configuration of ParentComponent to use viewProviders instead.
 * > Now when we type into the ParentComponent the child component doesn’t update automatically
 * > That’s because when using viewProviders the component creates an injector which is only used by the current component and any view children.
 * > If you are a content child, as our child component now is, then it uses the injector in NgModule to resolve the dependency.
 * 
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
