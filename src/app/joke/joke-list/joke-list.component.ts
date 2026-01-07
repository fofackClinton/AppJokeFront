import { Joke } from '../../entitie/Joke';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { JokeServiceService } from '../../service/joke-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-joke-list',
  imports: [RouterLink],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css'
})
export class JokeListComponent implements OnInit {

  jokesList = signal<Joke[]>([]);

  private router = inject(Router);
  private jokeService = inject(JokeServiceService);

  constructor() {
    effect(() => {
      const jokes = this.jokeService.jokes();
      this.jokesList.set(jokes);
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
        this.getAllJokes();
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
