# Spartan Frontend — Contexto para Claude

## Leer primero
Antes de cualquier tarea, leer el análisis completo del proyecto:
`C:\Users\Alan Romero\Documents\PROJECTS\molon-labe-analisis.md`

Contiene: arquitectura, roles, pantallas diseñadas, endpoints del backend, orden de desarrollo y setup completo.

## Proyecto
Sistema de gestión de gimnasio llamado **Molon Labe**. Estética espartana inspirada en la película 300.

## Stack
- Angular 17+ con standalone components
- SCSS
- Comunicación con el backend via HTTP REST + JWT

## Estructura
```
src/app/
├── core/
│   ├── auth/           ← AuthService, modelos de auth
│   ├── guards/         ← authGuard (login), roleGuard (rol)
│   └── interceptors/   ← jwtInterceptor (agrega Bearer token)
├── shared/
│   └── components/     ← componentes reutilizables del design system
└── features/
    ├── auth/login/     ← LoginComponent
    ├── admin/          ← solo rol admin
    ├── employee/       ← solo rol employee
    └── client/         ← solo rol client
```

## Roles y rutas
- `/auth/login` → libre
- `/admin/**` → solo `admin`
- `/employee/**` → solo `employee`
- `/client/**` → solo `client`
- Ruta desconocida → redirige a login

## Diseños HTML
Los diseños de cada pantalla están en:
`C:\Users\Alan Romero\Documents\PROJECTS\spartan-design\`

Cada carpeta tiene `code.html` (diseño completo) y `screen.png` (captura).

| Carpeta | Componente Angular |
|---|---|
| `login/` | `features/auth/login/login.component` |
| `admin-dashboard/` | `features/admin/dashboard/dashboard.component` |
| `client-dashboard/` | `features/client/dashboard/dashboard.component` |
| `employee-dashboard/` | `features/employee/dashboard/dashboard.component` |
| `workouts/` | `features/admin/workouts` o `features/employee/workouts` |
| `schedules/` | `features/admin/schedules` / `features/client/schedules` |
| `memberships/` | `features/admin/memberships` / `features/client/memberships` |
| `users/` | `features/admin/users` |
| `design-system/` | DESIGN.md con colores, tipografía y componentes del sistema |

## Convenciones
- Componentes standalone
- Lazy loading en todas las rutas
- El JWT se lee del localStorage con la clave `spartan_token`
- El rol viene dentro del payload del JWT en el campo `role`
- Variables de entorno en `src/environments/environment.ts`
- Backend corre en `http://localhost:5000/api` en desarrollo

## Forma de trabajo
Ambos integrantes del equipo trabajan en ambos repos. Cada uno se encarga de una feature completa (frontend + backend) por vez. Al arrancar una tarea nueva, verificar si hay cambios en el repo del compañero con `git pull`.

## Backend
El repo del backend es `spartan-backend/` (mismo nivel que este repo).
Swagger disponible en `http://localhost:5000/swagger` cuando está levantado.
