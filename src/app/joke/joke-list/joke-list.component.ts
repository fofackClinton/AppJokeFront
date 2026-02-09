import { Joke } from '../../entitie/Joke';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { JokeServiceService } from '../../service/joke-service.service';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-joke-list',
  imports: [RouterLink],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css'
})
export class JokeListComponent {

  jokesList = signal<{values: Joke[], loaded: boolean, error?: any}>({values: [], loaded: true});
  private router = inject(Router);
  private jokeService = inject(JokeServiceService);

  constructor() {
    this.getAllJokes();
  }

  getAllJokes(): void {
    this.jokeService.getAllJokes().subscribe({
      next: () => {
        this.jokesList.set({values: this.jokeService.jokes(), loaded: false});
      },
      error: (error) => {
        this.jokesList.set({values: [], loaded: false, error: error});
    }});
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
