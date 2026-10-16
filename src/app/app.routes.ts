import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const adventureCampsRoutes = () =>
  import('./adventure-camps/presentation/adventure-camps.routes').then((m) => m.adventureCampsRoutes);
const baseTitle = 'TrailQuest Adventure Camps';

/**
 * Root route table.
 *
 * @summary Composes the routes of every sub-domain; the wildcard route must stay last so unknown paths reach page-not-found.
 * @author Gerardo Palacin
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'reservations', loadChildren: adventureCampsRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];

