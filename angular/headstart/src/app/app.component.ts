import { Component } from '@angular/core';
/**
 * > The new project is bootstrapped with one component, our root component which it called AppComponent and 
 *   has a selector of app-root.
 * > app-root component has been added to our index.html file already.
 * > Components are the fundamental building block of Angular applications.
 * > Components are composable, we can build larger Components from smaller ones.
 * > An Angular application is therefore just a tree of such Components, when each Component renders,
 *   it recursively renders its children Components.
 *   At the root of that tree is the top level Component, the root Component.
 * > When we bootstrap an Angular application we are telling the browser to render that top level root
 *   Component which renders it’s child Components and so on.

 * The @Component is an annotation, an annotation automatically adds some boilerplate code to the class, 
 * function or property its attached to.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'headstart';
}
