import { Directive, ElementRef, Renderer, HostListener, HostBinding, Input } from '@angular/core';

/**
 * Components are Directives with View
 * Directive are component without view
 */
@Directive({
  selector: '[ccCardHover]'
})
/**
 * > Selector attribute uses CSS matching rules to match a component/directive to a HTML element.
 * > We want to associate the directive to an element which has a certain attribute.
 * > To do that in CSS we wrap the name of the attribute with [], and this is why the selector is called
 * [ccCardHover].
 */
export class CardHoverDirective {
  /**
   * > As well as listening to output events from the host element a directive can also bind to input
   * properties in the host element with @HostBinding.
   * > This directive can change the properties of the host element, such as the list of classes that are set
   * on the host element as well as a number of other properties.
   * > @HostBinding decorator a directive can link an internal property to an input property on
   * the host element
   */
  @HostBinding('class.border-success') private ishovering: boolean;

  /**
   * > This way if we wanted to add further config params in the future we can just add them as
   * properties to our config object.
   * > We’ve configured the querySelector to select on .card-text again, just like before but this time
   * it’s configurable.
   * > This way We can configure our directives with standard input property bindings.
   */
  @Input('ccCardHover') config: any = {
    querySelector: ''
  };

  /**
   * > When the directive gets created Angular can inject an instance of something called ElementRef into
   * its constructor
   * > ElementRef gives the directive direct access to the DOM element upon which it’s attached
   * > Angular team has provided a platform independent way of setting properties on our elements via something 
   * called a Renderer.
   * > Instead of setting the background color directly via the DOM element we do it by going through the renderer
   */
  constructor(private el: ElementRef, private renderer: Renderer) {
    //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  /**
   * > As the name of the directive implies we need a way of detecting if the user is hovering over the
   * host element.
   * > Angular makes this easy with the @HostListener decorator.This is a function decorator that accepts an event 
   * name as an argument. When that event gets fired on the host element it calls the associated function
   */
  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement.querySelector(this.config.querySelector);
    //this.renderer.setElementStyle(part, 'display', 'block');
    this.ishovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement.querySelector(this.config.querySelector);
    //this.renderer.setElementStyle(part, 'display', 'none');
    this.ishovering = false;
  }
}
