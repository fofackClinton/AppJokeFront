import { Routes } from '@angular/router';
import { JokeListComponent } from './joke/joke-list/joke-list.component';

export const routes: Routes = [{
  path: 'jokes',
  component: JokeListComponent
},
{
  path: '**',
  redirectTo: 'jokes'
}];
