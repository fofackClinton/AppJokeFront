import { JokeFormComponent } from '../joke-form/joke-form.component';
import { Joke } from './../../entitie/Joke';
import { Component } from '@angular/core';

@Component({
  selector: 'app-joke-create',
  imports: [JokeFormComponent],
  templateUrl: './joke-create.component.html',
  styleUrl: './joke-create.component.css'
})
export class JokeCreateComponent {


}
