import { Component, effect, inject, OnInit, runInInjectionContext, Injector, signal } from '@angular/core';
import { JokeServiceService } from '../../service/joke-service.service';
import { Router } from '@angular/router';
import { Joke } from '../../entitie/Joke';
import { JokeFormComponent } from '../joke-form/joke-form.component';

@Component({
  selector: 'app-joke-update',
  imports: [JokeFormComponent],
  templateUrl: './joke-update.component.html',
  styleUrl: './joke-update.component.css'
})
export class JokeUpdateComponent implements OnInit {
  joke = signal<Joke | null>(null);
  router = inject(Router);
  private Injector = inject(Injector);
  private jokeService = inject(JokeServiceService);

  ngOnInit(): void {
    const urlSegments = this.router.url.split('/');
    const id = Number(urlSegments[urlSegments.length - 1]);
    this.jokeService.getJokeById(id);


    runInInjectionContext(this.Injector, () => {
      effect(() => {
      const joke = this.jokeService.joke();
      this.joke.set(joke);
      });
    });
  }

}
