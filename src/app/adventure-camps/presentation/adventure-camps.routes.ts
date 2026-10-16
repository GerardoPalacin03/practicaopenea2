import { Routes } from '@angular/router';

/**
 * Child routes of the adventure camps sub-domain, mounted under /reservations.
 *
 * @summary Declares /reservations/new, the New Reservation view, loaded lazily.
 * @author Gerardo Palacin
 */
export const adventureCampsRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./views/new-reservation/new-reservation').then((m) => m.NewReservation),
    title: 'TrailQuest Adventure Camps - New Reservation'
  }
];
