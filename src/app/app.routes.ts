import { Routes } from '@angular/router';
import { Catalogo } from './components/catalogo/catalogo';
import { Formulario } from './components/formulario/formulario';
import { Detalles } from './components/detalles/detalles';

export const routes: Routes = [
 { path: '', component: Catalogo },
  { path: 'agregar', component: Formulario },
  { path: 'detalle/:id', component: Detalles },
  { path: '**', redirectTo: '' },
];