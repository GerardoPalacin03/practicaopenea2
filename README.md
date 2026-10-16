# TrailQuest Adventure Camp Management Platform

## Overview

Angular web application for TrailQuest Adventure Camps. It manages reservations, shows the current weather of each camp and supervises the occupation of the facilities. The project follows a domain-driven, layered and component-based architecture with the sub-domains `shared`, `weather` and `adventure-camps`.

## Authorship

- Author: Gerardo Valentin Palacin Lazo
- Student code: u20211c201
- Private repository: https://github.com/GerardoPalacin03/practicaopenea2

## Features

- Home with an Adventure Camp Summary card per camp: reservations, total participants and available capacity.
- New Reservation form with validation of the participant name and of the capacity of the selected camp.
- Current temperature of the camp from the Open-Meteo API, saved with each reservation; if the weather fails, the reservation cannot be created.
- Capacity recomputed from fresh data right before saving the reservation.
- English and Spanish translations (English by default).
- Semantic routes: `/home`, `/reservations/new`, redirect from `/` and a page-not-found view.

## Architecture

- `shared`: base entity, assembler, API and endpoint classes, layout, language switcher, Home and page-not-found views.
- `weather`: weather reading entity, Open-Meteo endpoint, store and temperature component.
- `adventure-camps`: camps and reservations (domain, application, infrastructure and presentation layers).

## Stack

- Angular 22 (standalone components, signals, zoneless) and TypeScript
- Angular Material (Material 3 theme)
- @ngx-translate/core and @ngx-translate/http-loader
- HttpClient and @angular/router
- json-server 0.17.4 as fake API
- Open-Meteo Weather API

## Setup

```bash
npm install
npm run fake-api   # json-server at http://localhost:3000
npm start          # application at http://localhost:4200
```
