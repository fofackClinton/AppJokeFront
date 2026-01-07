import { Component, Input, OnInit, inject, runInInjectionContext, Injector } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Joke } from '../../entitie/Joke';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeServiceService } from '../../service/joke-service.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-joke-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './joke-form.component.html',
  styleUrl: './joke-form.component.css'
})
export class JokeFormComponent implements OnInit {

  form!: FormGroup;
  formData!: any;
  private jokeService = inject(JokeServiceService);
  private injector = inject(Injector);
  @Input() joke: Joke | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      jokeQuestion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200), Validators.pattern(/.*\?$/)]],
      jokeAnswer: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200), Validators.pattern(/^.*[^!?]\.$/)]],
    });
    if (this.joke && this.form) {
      console.log('Joke loaded:', this.joke);
      this.form.patchValue({
        jokeQuestion: this.joke.jokeContent,
        jokeAnswer: this.joke.jokeAnswer
      });
    }
  }

  intForm(): void {
    if (this.form.valid) {
      this.formData = {
        id: this.joke ? this.joke.id : undefined,
        jokeContent: this.form.value.jokeQuestion,
        jokeAnswer: this.form.value.jokeAnswer,
        category: { id: 92, categoryName: 'General' } // Example category
      };
    }
  }

  createJoke(): void {
    this.intForm();
    this.jokeService.createJoke(this.formData).subscribe(() => {
      console.log('Joke added:', this.formData);
      this.router.navigate(['/jokes']);
    });
  }

  updateJoke(): void {
    this.intForm();
    if (this.joke?.jokeAnswer != this.form.value.jokeAnswer || this.joke?.jokeContent !== this.form.value.jokeQuestion) {

      this.jokeService.updateJoke(this.joke?.id, this.formData).subscribe({
        next: () => {
          console.log('Joke updated:', this.formData);
          this.router.navigate(['/jokes']);
        },
        error: (err) => {
          console.error('Error updating joke:', err);
        }

      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.joke){
      this.updateJoke();
    }else if (this.form.valid && !this.joke){
      this.createJoke();
    }
  }
}

