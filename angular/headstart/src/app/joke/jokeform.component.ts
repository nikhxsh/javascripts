import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Joke } from "./Joke";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'joke-form',
  templateUrl: './jokeform.component.html'
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
  jokeForm: FormGroup;
  setup: FormControl;
  punchline: FormControl;
  constructor() {
  }

  ngOnInit() {
    this.setup = new FormControl('', [Validators.required]);
    this.punchline = new FormControl('', Validators.required);
    this.jokeForm = new FormGroup({
      setup: this.setup,
      punchline: this.punchline
    });
  }

  createJoke() {
    this.jokeCreated.emit(
      new Joke(
        this.jokeForm.get("setup").value,
        this.jokeForm.get("punchline").value)
    );
    this.jokeForm.reset();
  }

  deleteJokes() {
    this.jokeCleared.emit();
  }
}
