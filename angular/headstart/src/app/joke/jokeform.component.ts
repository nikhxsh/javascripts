import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Joke } from "./Joke";

@Component({
  selector: 'joke-form',
  templateUrl: './jokeform.component.html',
  styleUrls: ['./jokeform.component.css']
})
export class JokeformComponent implements OnInit {
  /**
   * An EventEmitter is a helper class which we can use to emit events when something
   *  happens, other components can then bind and react to these events.
   * The name between the <> on the EventEmitter is the type of thing that will be
   *  output by this property.
   */
  @Output() jokeCreated = new EventEmitter<Joke>();
  @Output() jokeCleared = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  createJoke(setup, punchline) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }

  deleteJokes() {
    this.jokeCleared.emit();
  }
}
