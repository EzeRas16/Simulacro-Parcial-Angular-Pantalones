import { Component, effect, inject, input, output } from '@angular/core';                  
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';  
import { Router } from '@angular/router';                                                  
import { PantalonService } from '../../services/pantalon.service';                         
import { Corte, Pantalon, Talle } from '../../../models/pantalon.model';                   

@Component({
  imports: [ReactiveFormsModule],                                 
  selector: 'app-formulario',                                      
  styleUrl: './formulario.css',                                   
  templateUrl: './formulario.html',                               
})
export class Formulario {
  private readonly pantalonService = inject(PantalonService);      // servicio con las peticiones HTTP
  private readonly router = inject(Router);                        // para navegar a otra ruta desde el código
  private readonly fb = inject(NonNullableFormBuilder);            // arma formularios sin null: al limpiar vuelven al valor inicial

  readonly pantalon = input<Pantalon | undefined>(undefined);      // ENTRA del padre: con pantalón = editar, sin pantalón = agregar
  readonly actualizado = output<Pantalon>();                       // SALE hacia el padre: avisa con el pantalón ya editado

  readonly pantalonForm = this.fb.group({                          // crea el formulario. Cada campo: [valorInicial, validaciones]
    modelName: ['', Validators.required],                          // texto, obligatorio
    salePrice: [0, [Validators.required, Validators.min(0)]],      // número, obligatorio y no negativo
    isInStore: [false],                                            // checkbox, arranca destildado
    size: ['' as Talle, Validators.required],                      // talle, obligatorio. "as Talle": arranca sin elegir
    cut: ['' as Corte, Validators.required],                       // corte, obligatorio
    notes: ['', Validators.maxLength(200)],                        // descripción opcional, máximo 200 caracteres
  });

  private readonly sincronizar = effect(() => {                    // corre al inicio y cada vez que cambia el input
    const actual = this.pantalon();                                // lee el pantalón recibido (o undefined)

    if (actual) {                                                  // si hay pantalón, estamos editando
      this.pantalonForm.patchValue({                               // rellena los campos con los datos del pantalón
        modelName: actual.modelName,                               // nombre del modelo
        salePrice: actual.salePrice,                               // precio
        isInStore: actual.isInStore,                               // disponible en tienda
        size: actual.size,                                         // talle
        cut: actual.cut,                                           // corte
        notes: actual.notes ?? '',                                 // notes es opcional: si no hay, queda vacío
      });
    }
  });

  guardar(): void {
    if (this.pantalonForm.invalid) return;                         // si hay errores de validación, corta acá

    const actual = this.pantalon();                                // pantalón recibido: existe solo al editar
    const datos = this.pantalonForm.getRawValue();                 // objeto con todo lo que escribió el usuario

    if (actual) {                                                  // MODO EDICIÓN
      this.pantalonService.editar(actual.id, datos).subscribe((editado) => {  // PUT con id y datos nuevos. subscribe dispara el pedido
        this.actualizado.emit(editado);                            // avisa al padre con el pantalón editado
      });
    } else {                                                       // MODO ALTA
      this.pantalonService.agregar(datos).subscribe(() => {        // POST con los datos nuevos
        this.router.navigateByUrl('/');                            // vuelve al catálogo
      });
    }
  }

  limpiarformulario(): void {
    this.pantalonForm.reset();                                     // cada campo vuelve a su valor inicial (precio 0, resto vacío)
  }
}