import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { InscriptionComponent } from './inscription/inscription';
import { Home } from './home/home';
import { Maintenance } from './maintenance/maintenance';
import { VenteDesPieces } from './vente-des-pieces/vente-des-pieces';
import { DashboardClient } from './dashboard-client/dashboard-client';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { Conception } from './conception/conception';
import { Vente } from './vente/vente';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'maintenance', component: Maintenance },
  { path: 'vente-des-pieces', component: VenteDesPieces },
  { path: 'dashboard-client', component: DashboardClient },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: 'conception', component: Conception },
  { path: 'vente', component: Vente }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

