# Club de Lectura App

Aplicación web para la gestión de un club de lectura: libros, autores, usuarios, donaciones y préstamos, con un dashboard de resumen y autenticación.

## Tecnologías

- Angular 16 (standalone components, lazy loading de rutas)
- Angular Material + Angular CDK
- Tailwind CSS
- RxJS
- ApexCharts, Angular Calendar, Quill
- Docker y Docker Compose

## Estructura

```
src/app
├── auth/        # Login y rutas públicas
├── dashboard/   # Home, libros, autores, donaciones, préstamos y usuarios
└── shared/      # Guards, interceptores, servicios, modelos, layouts y componentes comunes
```

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) con Docker Compose v2 (incluido en Docker Desktop)

No necesitas tener Node.js ni Angular instalados.

## Backend

El frontend consume una API REST configurada en [src/environments/environment.ts](src/environments/environment.ts):

```ts
baseUrl: 'http://127.0.0.1:8000/api/',
serverUrl: 'http://127.0.0.1:8000/',
```

El backend debe estar corriendo y accesible en `http://127.0.0.1:8000` para que la aplicación funcione por completo.

## Levantar el proyecto

```bash
docker compose up --build
```

La primera vez tarda unos minutos mientras se construye la imagen e instalan las dependencias. Cuando termine, abre:

**http://localhost:4200**

El código fuente está montado como volumen, así que los cambios que hagas se recargan automáticamente.

### Ejecutar en segundo plano

```bash
docker compose up -d --build
```

Ver los logs:

```bash
docker compose logs -f app
```

## Bajar el proyecto

Detener y eliminar los contenedores y la red:

```bash
docker compose down
```

Además, eliminar el volumen de `node_modules` (útil si cambiaste dependencias y quieres una instalación limpia):

```bash
docker compose down -v
```

## Comandos útiles

| Acción | Comando |
| --- | --- |
| Reconstruir la imagen tras cambiar `package.json` | `docker compose up --build` |
| Ver contenedores activos | `docker compose ps` |
| Abrir una terminal dentro del contenedor | `docker compose exec app sh` |
| Compilar para producción | `docker compose run --rm app npm run build` |

## Scripts de npm

Disponibles dentro del contenedor:

- `npm start`: servidor de desarrollo
- `npm run build`: build de producción
- `npm test`: pruebas unitarias (requiere Chrome, no disponible en la imagen por defecto)
