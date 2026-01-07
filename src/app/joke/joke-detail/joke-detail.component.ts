import { Component, effect, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { Joke } from '../../entitie/Joke';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeServiceService } from '../../service/joke-service.service';

@Component({
  selector: 'app-joke-detail',
  imports: [],
  templateUrl: './joke-detail.component.html',
  styleUrls: ['./joke-detail.component.css']
})

export class JokeDetailComponent implements OnInit {
  joke = signal<Joke | null>(null);
  // private router = inject(Router);
  private route = inject(ActivatedRoute)
  private injector = inject(Injector);
  private jokeService = inject(JokeServiceService);

  ngOnInit(): void {
    // const urlSegments = this.router.url.split('/');
    // const id = Number(urlSegments[urlSegments.length - 1]);
    const id = Number(this.route.snapshot.params['id']);
    this.jokeService.getJokeById(id);

      runInInjectionContext(this.injector, () => {
        effect(() => {
        const joke = this.jokeService.joke();
        this.joke.set(joke);
        });
      });
  }
}
