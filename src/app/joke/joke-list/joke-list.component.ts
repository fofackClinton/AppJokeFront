import { Joke } from '../../entitie/Joke';
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
    console.log('Fetched jokes:', this.jokesList);
  }

  goToJokeDetails(id: any): void {
    this.router.navigate(['/joke', id]);
  }

  deleteJoke(id: any): void {
    this.jokeService.deleteJoke(id).subscribe({
      next: () => {
        console.log('Joke deleted successfully');
        this.router.navigate(['/jokes']);
      },
      error: (err) => {
        console.error('Error deleting joke:', err);
      }
    });
  }

  goToAddJoke(): void {
    this.router.navigate(['/joke-create']);
  }

  goToEditJoke(id: any): void {
    this.router.navigate(['/joke-edit', id]);
  }

}
