import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, ContentChild, AfterContentInit } from '@angular/core';
import { Joke } from "./Joke";
import { JokeComponent } from './joke.component';

@Component({
  selector: 'jokelist',
  templateUrl: './jokelist.component.html'
})
export class JokelistComponent implements AfterViewInit, AfterContentInit {
  jokes: Joke[];
  /**
   * We are storing a reference to the child JokeComponent in a property called jokeViewChild
   * jokeViewChild isn’t an instance of a Joke class, it is the actual instance of the child
   * JokeComponent that exists inside this components view.
   * View children are only initialised by the time the AfterViewInit lifecycle phase has been run.
   * Content children are only initialised by the time the AfterContentInit lifecycle phase has been run.
   */
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
  @ViewChild("header") headerEl: ElementRef;

  /**
   * - The concept of a content child is similar to that of a view child but the content children of the given
   *   component are the child elements that are projected into the component from the host component.
   * - In our example application we are projecting one joke in from the host AppComponent.
   * - To get a reference to that child we can use either the @ContentChild or the @ContentChildren
   *   decorators. They work in similar ways to the view child counterparts, @ContentChild returns one
   *   child and @ContentChildren returns a QueryList.
   */
  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;

  constructor() {
    this.jokes = [
      new Joke(`Why rivers can not hear??`, `Becuase wo behari hoti hai!`),
      new Joke(`What will people call "Burj Khalifa" after 100 years?`, `Bujurg Khalifa`),
      new Joke(`What do you call a group of farmers stuck at one place?`, `KISSAN JAM`),
    ];
  }

  // In the ngAfterViewInit function jokeViewChild has been initialised and we can see it logged in the
  // console.
  ngAfterViewInit() {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);
    // The above isn’t so useful in our case since we have multiple joke children components. We can solve
    // that by using the alternative @ViewChildren decorator along side the QueryList generic type.

    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    // We use the @ViewChildren decorator which matches all JokeComponent`s and stores them in a
    // `QueryList called jokeViewChildren.
    console.log(jokes);

    // Since headerEl is an ElementRef we can interact with the DOM directly and change the title of our
    // header to Best Joke Machine.
    console.log(`ngAfterViewInit - headerEl is ${this.headerEl}`);
    //It’s not recommended to interact with the DOM directly with an ElementRef since
    // that results in code that’s not very portable.
    this.headerEl.nativeElement.textContent = "Best Joke Machine";
  }

  // Just like before we need to tap into one of the component lifecycle hooks, this time it’s
  // AfterContentInit
  // We create a jokeContentChild property and bind it to the content child by using the @ContentChild
  // decorator.
  // By the time the ngAfterContentInit hook is run the jokeContentChild property is set to the content child.
  ngAfterContentInit() {
    console.log(`ngAfterContentInit - jokeContentChild is ${this.jokeContentChild}`);
  }

  addJoke(joke) {
    this.jokes.unshift(joke);
  }

  deleteJokes() {
    this.jokes = [];
  }
}
