1. Detectar qué componentes y servicios necesito:
    - Cliente Http
    - Catalogo, Detalles, Formulario, opcionalmente Tarjeta
    - Header
2. Implementar servicio http
    - Definir ruta base del servicio
    - Métodos para obtener todos, uno por id, agregar, editar, eliminar
3. Definir rutas de aplicación
    - rutas planas: una vacía para derigir a una principal
    - ruta para agregar
    - ruta de detalles
    - ruta comodín
4. Implementar el Header
    - definir layout
    - importar RouterLink y RouterLinkActive
    - RouterLinkActive no funciona si no hay una clase css para aplicar!!
5. Definir modelos de datos
    - definir modelo de diminio y modelo de formulario
6. Implementar componente de Formulario para agregar
    - Segun SignalForms:
      - definir señal del modelo de formulario
      - definir formulario usando `form()`, validaciones y submission
      - layout del formulario
      - vincular `<form>` a `[formRoot]`
      - vincular inputs, selects, textareas a `[formField]`
      - manejar estados para el boton de submit
      - mostrar mensajes de error
    - Segun ReactiveForms:
      - importar `ReactiveFormsModule`
      - inyectar `FormBuilder`
      - instanciar formulario con `formBuilder.nonNullable.group()` con `Validators`
      - agregar método de submit
      - layout del formulario
      - vincular `<form>` a `[formGroup]` y escuchar `(ngSubmit)`
      - vincular inputs, selects, textareas a `formControlName`
      - mostrar mensajes de error
7. Implementar componente de Listado (sin ordenar ni filtrar)
    - Inyectar `Cliente`
    - Traer el listado desde el cliente, consumir con `toSignal()` o `ngOnInit()`
    - Inyectar `Router`
    - layout del listado
    - iterar sobre el listado para generar tarjetas o entradas de lista
    - vincular boton de navegación con funcionalidad del router
8. Implementar componente de Detalles (sin edición, sí borrado)
    - Inyectar `ActivatedRoute`
    - Inyectar `Router`
    - Inyectar `Cliente`
    - consultar parámetro `id`
    - realizar `getById()`
    - layout de detalles
    - manejar el caso de no encontrar una entidad con el id proporcionado
    - vincular borrado a eliminación al metodo del cliente y navegar con el router
9. Refactorizar Formulario para editar
    - declarar input de entidad y computar si se está editando
    - declarar output de entidad para informar a la vista de detalles
    - modificar flujo de submission para agregar si no hay input (mantiene el comportamiento anterior) o editar si hay inputs
10. Habiliar edición en Detalles
    - desplegar formulario si se activa la edición
    - pasar input al formulario
    - escuchar output para modificar la vista interna
11 . Refactorizar Listado para incluir ordenamientos y filtrados
    - modificar lo que consume el template con una señal que compute la lista resultante
    - aplicar filtros si hay filtros activos
    - aplicar ordenamientos al final