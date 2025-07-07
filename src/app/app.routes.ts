import { Routes } from '@angular/router';
import { Login } from './login/login';
import { InscriptionComponent } from './inscription/inscription';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '' , component: Home },
  { path: 'login', component: Login },
  { path: 'inscription', component: InscriptionComponent }
];
