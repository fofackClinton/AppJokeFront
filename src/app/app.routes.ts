import { Routes } from '@angular/router';
import { JokeListComponent } from './joke/joke-list/joke-list.component';
import { JokeDetailComponent } from './joke/joke-detail/joke-detail.component';
import { JokeFormComponent } from './joke/joke-form/joke-form.component';
import { JokeUpdateComponent } from './joke/joke-update/joke-update.component';
import { JokeCreateComponent } from './joke/joke-create/joke-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [{
  path: 'jokes',
  component: JokeListComponent
},
{
  path: 'joke-edit/:id',
  component: JokeUpdateComponent
},
{
  path: 'jokes/detail/:id',
  component: JokeDetailComponent
},
{
  path: 'joke-create',
  component: JokeCreateComponent
},
{
  path: '',
  redirectTo: '/jokes',
  pathMatch: 'full'
},
{
  path: '**',
  component: PageNotFoundComponent,
  title: 'Page Not Found'
},
];
