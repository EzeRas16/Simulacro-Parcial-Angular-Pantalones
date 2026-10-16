import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PantalonService } from '../../services/pantalon.service';
import { Pantalon } from '../../../models/pantalon.model';
import { Formulario } from '../formulario/formulario';

@Component({
  selector: 'app-detalles',
  imports: [Formulario],
  templateUrl: './detalles.html',
  styleUrl: './detalles.css',
})
export class Detalles {
  private readonly route = inject(ActivatedRoute);                      // Lee datos de la URL actual (para sacar el ID)
  private readonly router = inject(Router);                             // Permite navegar por código hacia otras pantallas
  private readonly pantalonService = inject(PantalonService);

  readonly pantalon = signal<Pantalon | undefined>(undefined);          // Almacena el pantalón encontrado (arranca vacío)
  readonly noEncontrado = signal(false);       
  readonly editando = signal(false);                         // Bandera que avisa al HTML si falló la búsqueda (error 404)

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;                 // Captura el ID directamente de la barra de direcciones

    this.pantalonService.obtenerPorId(id).subscribe({                   // Pide el pantalón al servidor usando ese ID
      next: (p) => this.pantalon.set(p),                                // Si sale bien: guarda el pantalón recibido en la señal
      error: () => this.noEncontrado.set(true),                         // Si falla: prende la bandera de "no encontrado"
    });
  }

  alActualizar(p: Pantalon) {                                          // se ejecuta cuando el formulario emite el pantalón editado
    this.pantalon.set(p);                                              // reemplaza los datos: la tarjeta se refresca sola
    this.editando.set(false);                                          // cierra el formulario
  }

  borrar() {
    const p = this.pantalon();                                          // Extrae el valor actual guardado en la señal
    if (!p) return;                                                     // Barrera de seguridad: si está vacío, corta la ejecución acá

    if (confirm('¿Seguro que querés eliminar este pantalón?')) {        // Muestra una alerta nativa de confirmación al usuario
      this.pantalonService.eliminar(p.id).subscribe(() => this.router.navigateByUrl('/')); // Si acepta, lo borra y nos devuelve al catálogo
    }
  }
}