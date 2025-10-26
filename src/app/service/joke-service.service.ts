import { Injectable, signal } from '@angular/core';
import { Joke } from '../entitie/joke';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokeServiceService {

  private apiUrl = 'http://localhost:8084/api/jokes';
  joke = signal<Joke | null>(null);
  jokes = signal<Joke[]>([]);

  constructor(private http: HttpClient) { }

  getAllJokes() {
    this.http.get<Joke[]>(this.apiUrl).subscribe((data) => {
      this.jokes.set(data);
    });
  }

  getJokeById(id: number) {
    this.http.get<Joke>(`${this.apiUrl}/${id}`).subscribe((data) => {
      this.joke.set(data);
    });
  }

  createJoke(joke: Joke) {
    this.http.post<Joke>(this.apiUrl, joke).subscribe((data) => {
      this.jokes.update((jokes) => [...jokes, data]);
    });
  }

  updateJoke(id: number, joke: Joke) {
    this.http.put<Joke>(`${this.apiUrl}/${id}`, joke).subscribe((data) => {
      this.jokes.update((jokes) =>
        jokes.map((j) => (j.id === id ? data : j))
      );
    });
  }

  deleteJoke(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.jokes.update((jokes) => jokes.filter((j) => j.id !== id));
    });
  }

  getRandomJoke() {
    this.http.get<Joke>(`${this.apiUrl}/random`).subscribe((data) => {
      this.joke.set(data);
    });
  }
}
