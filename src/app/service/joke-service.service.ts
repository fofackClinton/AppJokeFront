import { Injectable, signal } from '@angular/core';
import { Joke } from '../entitie/Joke';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeServiceService {

  private apiUrl = 'http://localhost:8084/jokes';
  joke = signal<Joke | null>(null);
  jokes = signal<Joke[]>([]);

  constructor(private http: HttpClient) { }

  getAllJokes() {
    this.http.get<Joke[]>(`${this.apiUrl}/all`).subscribe((data) => {
      this.jokes.set(data);
    });
  }

  getJokeById(id: number) {
    this.http.get<Joke>(`${this.apiUrl}/${id}`).subscribe((data) => {
      this.joke.set(data);
    });
  }

  createJoke(joke: Joke): Observable<Joke> {
    return this.http.post<Joke>(`${this.apiUrl}/create`, joke).pipe(
      tap((data) => {
        this.jokes.update((jokes) => [...jokes, data]);
      })
    );
  }

  updateJoke(id: number| undefined, joke: Joke): Observable<Joke> {
    return this.http.put<Joke>(`${this.apiUrl}/${id}`, joke).pipe(
      tap((data) => {
        this.jokes.update((jokes) =>
          jokes.map((j) => (j.id === id ? data : j))
        );
      })
    );
  }

  deleteJoke(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRandomJoke() {
    this.http.get<Joke>(`${this.apiUrl}/random`).subscribe((data) => {
      this.joke.set(data);
    });
  }
}
