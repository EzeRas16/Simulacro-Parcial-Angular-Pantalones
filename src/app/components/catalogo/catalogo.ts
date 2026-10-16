import { Component, computed, inject, signal } from '@angular/core';       // computed: señal derivada
import { toSignal } from '@angular/core/rxjs-interop';                     // convierte un Observable en señal
import { Router } from '@angular/router';                                  // para navegar al detalle
import { PantalonService } from '../../services/pantalon.service';         // servicio que habla con json-server
import type { Corte } from '../../../models/pantalon.model';               // tipo de los cortes

type OrdenPrecio = 'original' | 'asc' | 'desc';                            // las únicas tres opciones de orden posibles

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private readonly pantalonService = inject(PantalonService);              // servicio con las peticiones HTTP
  private readonly router = inject(Router);                                // para navegar desde el código

  readonly cortes: Corte[] = ['Recto', 'Slim', 'Oxford', 'Skinny', 'Cargo', 'Jogger'];  // opciones del filtro

  readonly pantalones = toSignal(this.pantalonService.obtenerTodos(), { initialValue: [] });  // lista COMPLETA, arranca vacía

  readonly filtroPorCategoria = signal<Corte | ''>('');                    // corte elegido. '' = sin filtro
  readonly precioMaximo = signal<number | null>(null);                     // tope de precio. null = sin filtro
  readonly ordenPorPrecio = signal<OrdenPrecio>('original');               // orden elegido

  readonly pantalonesFiltrados = computed(() => {                         // la lista que realmente se dibuja
    const categoria = this.filtroPorCategoria();                           // leer las señales acá adentro hace que se recalcule solo
    const maximo = this.precioMaximo();

    const resultado = this.pantalones().filter(                            // filter devuelve un arreglo NUEVO
      (p) => (categoria === '' || p.cut === categoria) && (maximo === null || p.salePrice <= maximo),
    );

    switch (this.ordenPorPrecio()) {                                       // el orden va AL FINAL, sobre lo ya filtrado
      case 'asc':
        resultado.sort((a, b) => a.salePrice - b.salePrice);               // menor a mayor
        break;
      case 'desc':
        resultado.sort((a, b) => b.salePrice - a.salePrice);               // mayor a menor
        break;
      default:
        break;                                                             // 'original': no se toca el orden
    }

    return resultado;
  });

  verMas(id: string) {
    this.router.navigate(['/detalle', id]);                                // navega a /detalle/<id>
  }
}