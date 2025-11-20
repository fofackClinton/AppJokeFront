import { Component, inject, signal, OnInit } from '@angular/core';
import { JokeServiceService } from '../../service/joke-service.service';
import { Router } from '@angular/router';
import { JokeFormComponent } from '../joke-form/joke-form.component';
import { Joke } from '../../entitie/Joke';

@Component({
  selector: 'app-joke-detail',
  imports: [JokeFormComponent],
  templateUrl: './joke-detail.component.html',
  styleUrls: ['./joke-detail.component.css']
})
export class JokeDetailComponent {


}
