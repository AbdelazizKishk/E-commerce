import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'brandproducts/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client,
  },
];
