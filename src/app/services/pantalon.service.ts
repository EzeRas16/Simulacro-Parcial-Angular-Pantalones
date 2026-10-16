
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pantalon, PantalonFormulario } from '../../models/pantalon.model';


@Injectable({ providedIn: 'root' }) // Le dice a Angular que este servicio es global y puede inyectarse en cualquier componente automáticamente.
export class PantalonService {

  private readonly http = inject(HttpClient); // Inyecta la herramienta oficial para hacer peticiones web, reemplazando al constructor tradicional.
  private readonly url = 'http://localhost:3000/trousers'; // Guarda la dirección base de la API para no repetirla.

  obtenerTodos(): Observable<Pantalon[]> { // Observable es un flujo de datos asincrónico (promesa mejorada) que devolverá una lista de pantalones.
    return this.http.get<Pantalon[]>(this.url); // GET: Solicita datos al servidor. El '<Pantalon[]>' fuerza a que la respuesta respete el modelo.
  }

  obtenerPorId(id: string): Observable<Pantalon> { 
    return this.http.get<Pantalon>(`${this.url}/${id}`); // Combina la URL con el ID específico usando backticks (ej: /trousers/123).
  }

  agregar(
    pantalon: PantalonFormulario
  ): Observable<Pantalon> {
    return this.http.post<Pantalon>( // POST: Se usa exclusivamente para insertar un registro completamente nuevo en la base de datos.
      this.url,
      pantalon // Este es el "payload" o cuerpo de la petición, que viaja con los datos del formulario.
    );
  }

  editar(
    id: string,
    pantalon: PantalonFormulario
  ): Observable<Pantalon> {
    return this.http.put<Pantalon>( // PUT: Se usa para reemplazar o actualizar un registro existente.
      `${this.url}/${id}`, // Necesita saber exactamente a qué ID pegarle para modificarlo.
      pantalon
    );
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>( // DELETE: Elimina un registro. Devuelve '<void>' porque la base de datos no responde con un objeto al borrar, solo un "ok".
      `${this.url}/${id}`
    );
  }
}