import { Joke } from './../../entitie/joke';
import { Component, effect, inject, OnInit } from '@angular/core';
import { JokeServiceService } from '../../service/joke-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joke-list',
  imports: [],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css'
})
export class JokeListComponent implements OnInit {

  jokesList: Joke[] | undefined = [];

  private router = inject(Router);

  constructor(private jokeService: JokeServiceService) {
    effect(() => {
      const jokes = this.jokeService.jokes();
      this.jokesList = jokes;
    });
  }

  ngOnInit(): void {
    this.getAllJokes();
  }

  getAllJokes(): void {
    this.jokeService.getAllJokes();
  }

  goToJokeDetails(id: number): void {
    this.router.navigate(['/joke', id]);
  }


}
