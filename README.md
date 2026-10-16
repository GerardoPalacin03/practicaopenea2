# TrailQuest Adventure Camp Management Platform

## Overview

Angular web application for TrailQuest Adventure Camps. It manages reservations, shows the current weather of each camp and supervises the occupation of the facilities. The project follows a domain-driven, layered and component-based architecture with the sub-domains `shared`, `adventure-camps` and `weather`.

## Authorship

- Author: Gerardo Valentin Palacin Lazo
- Student code: u20211c201
- Private repository: https://github.com/GerardoPalacin03/practicaopenea2

## Stack

- Angular 22 (standalone components, signals, zoneless) and TypeScript
- Angular Material (Material 3 theme)
- @ngx-translate/core and @ngx-translate/http-loader for i18n (English by default, Spanish available)
- HttpClient and @angular/router
- json-server 0.17.4 as fake API
- Open-Meteo Weather API as external provider

## Setup

```bash
npm install
npm run fake-api   # json-server at http://localhost:3000
ng serve           # application at http://localhost:4200
```
