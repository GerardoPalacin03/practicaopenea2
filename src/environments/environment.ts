/**
 * Production environment settings.
 *
 * @summary Centralizes API base URLs and endpoint paths so no URL or path is hard-coded in the source.
 * @author Gerardo Palacin
 */
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderAdventureCampsEndpointPath: '/adventure-camps',
  platformProviderReservationsEndpointPath: '/reservations',
  weatherProviderApiBaseUrl: 'https://api.open-meteo.com/v1',
  weatherProviderForecastEndpointPath: '/forecast'
};
