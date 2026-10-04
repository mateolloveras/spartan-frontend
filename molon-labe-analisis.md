# Molon Labe — Análisis de diseño, arquitectura y skeleton

## Stack definido
- **Frontend:** Angular (standalone components, Angular 17+)
- **Backend:** .NET 9 (ASP.NET Core) + Entity Framework + PostgreSQL

---

## Arquitectura

**Monolito Modular** — un solo proyecto .NET con módulos bien separados por carpeta.
No se usa microservicios ni multitenant (single tenant, un solo gimnasio).

```
Angular (SPA)
     │ HTTP/REST + JWT
ASP.NET Core API
  ├── Modules/Auth
  ├── Modules/Users
  ├── Modules/Memberships
  ├── Modules/Workouts
  └── Modules/Schedules
     │
  PostgreSQL
```

**Repos separados, cada uno con su git:**
- `spartan-frontend/` → Angular
- `spartan-backend/` → .NET

---

## Autenticación

- **JWT + Roles** (`admin`, `employee`, `client`)
- El token contiene: `sub`, `email`, `name`, `role`
- **Google OAuth** soportado — el backend valida el token de Google y emite su propio JWT
- El frontend agrega el JWT en cada request via interceptor (`jwt.interceptor.ts`)
- Cada endpoint del backend se protege con `[Authorize(Roles = "...")]`

**Flujo de login:**
1. Usuario ingresa email/password → POST `/api/auth/login`
2. Backend verifica, emite JWT
3. Angular guarda el token en localStorage
4. Guards redirigen según el rol: admin → `/admin/dashboard`, employee → `/employee/dashboard`, client → `/client/dashboard`

---

## Estructura Frontend (Angular)

```
src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts       ← login, logout, Google, JWT decode
│   │   └── auth.models.ts        ← tipos: AuthUser, LoginRequest, LoginResponse
│   ├── guards/
│   │   ├── auth.guard.ts         ← redirige a login si no autenticado
│   │   └── role.guard.ts         ← redirige si el rol no tiene acceso
│   └── interceptors/
│       └── jwt.interceptor.ts    ← agrega Bearer token a cada request
├── shared/
│   └── components/               ← componentes reutilizables del design system
├── features/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   └── login/                ← LoginComponent (TODO: aplicar diseño HTML)
│   ├── admin/
│   │   ├── admin.routes.ts
│   │   └── dashboard/            ← AdminDashboardComponent (TODO: aplicar diseño)
│   ├── employee/
│   │   ├── employee.routes.ts
│   │   └── dashboard/
│   └── client/
│       ├── client.routes.ts
│       └── dashboard/
└── environments/
    ├── environment.ts            ← apiUrl: localhost:5000, googleClientId
    └── environment.prod.ts
```

**Routing con lazy loading y guards:**
- `/auth/login` → libre
- `/admin/**` → requiere rol `admin`
- `/employee/**` → requiere rol `employee`
- `/client/**` → requiere rol `client`
- Cualquier ruta desconocida → redirige a login

---

## Estructura Backend (.NET)

```
spartan-backend/
├── Program.cs                    ← configuración: JWT, CORS, EF, servicios
├── SpartanBackend.csproj         ← dependencias: EF, JWT, Npgsql, BCrypt
├── appsettings.json              ← ConnectionString, Jwt config, Google ClientId
├── Modules/
│   ├── Auth/
│   │   ├── AuthController.cs     ← POST /api/auth/login, POST /api/auth/google
│   │   ├── AuthService.cs        ← lógica de login, generación de JWT
│   │   └── DTOs/AuthDtos.cs
│   ├── Users/
│   │   ├── UsersController.cs    ← CRUD (solo admin)
│   │   └── UsersService.cs
│   ├── Memberships/
│   │   ├── MembershipsController.cs ← GET planes (público), GET mi membresía (client), GET todas (admin)
│   │   └── MembershipsService.cs
│   ├── Workouts/
│   │   ├── WorkoutsController.cs ← GET todas, POST (admin/employee)
│   │   └── WorkoutsService.cs
│   └── Schedules/
│       ├── SchedulesController.cs ← GET, POST reserva (client), POST crear (admin)
│       └── SchedulesService.cs
├── Infrastructure/
│   ├── AppDbContext.cs           ← DbSets: Users, Memberships, Plans, Workouts, Schedules
│   └── Entities/
│       ├── User.cs               ← Id, Name, Email, PasswordHash, GoogleId, Role, IsActive
│       ├── Membership.cs         ← MembershipPlan + Membership (usuario ↔ plan)
│       ├── Workout.cs            ← Workout + Exercise
│       └── Schedule.cs           ← Schedule + ScheduleBooking (reservas de clases)
└── Common/
    └── Middleware/               ← para manejo global de errores (TODO)
```

**Endpoints base:**
| Método | Ruta | Rol |
|---|---|---|
| POST | `/api/auth/login` | público |
| POST | `/api/auth/google` | público |
| GET | `/api/users` | admin |
| POST | `/api/users` | admin |
| GET | `/api/memberships/plans` | público |
| GET | `/api/memberships/my` | client |
| GET | `/api/memberships` | admin |
| GET | `/api/workouts` | autenticado |
| POST | `/api/workouts` | admin, employee |
| GET | `/api/schedules` | autenticado |
| POST | `/api/schedules/{id}/book` | client |
| POST | `/api/schedules` | admin |

---

## Pantallas diseñadas
Cada una tiene `code.html` + `screen.png` en `stitch_remix_of_spartan_strength_agoge/`.

| Carpeta | Pantalla |
|---|---|
| `login_molon_labe` | Login (Google OAuth button agregado) |
| `admin_dashboard_molon_labe` | Dashboard Admin |
| `client_dashboard_molon_labe` | Dashboard Cliente |
| `employee_dashboard_molon_labe` | Dashboard Empleado |
| `entrenamientos_molon_labe` | The Forge (Rutinas) |
| `horarios_molon_labe` | Battle Schedule |
| `gesti_n_de_membres_as_molon_labe` | Membresías (vista cliente) |
| `gesti_n_de_usuarios_molon_labe` | Gestión de Usuarios |

---

## Qué se puede implementar tal cual está

- **Login** — skeleton listo en Angular, solo falta trasladar el HTML del diseño
- **Admin Dashboard** — estructura clara, gráfico necesita librería de charts
- **Entrenamientos / The Forge** — bien definido, implementable directo
- **Gestión de Usuarios** — tabla, búsqueda, filtros claros

## Qué necesita ajustes antes de implementar

- **Horarios** — falta flujo de reserva para el cliente
- **Membresías** — dividir en vista admin (tabla suscripciones) y vista cliente (elegir plan)
- **Dashboard Empleado** — redefinir qué muestra (sus clases, sus clientes)
- **Dashboard Cliente** — agregar estado de membresía y acceso a reservas

## Pantallas que faltan crear

| Pantalla | Rol |
|---|---|
| Gestión de planes (crear/editar precios) | Admin |
| Tabla de suscripciones activas | Admin |
| Mi Membresía (plan actual + renovar) | Cliente |
| Mis Clientes (lista con progreso) | Empleado |

---

## Roles y navegación definitiva

**Admin:** `War Room` · `Usuarios` · `Planes` · `Membresías` · `Horarios`

**Empleado:** `Mi Día` · `Mis Clases` · `Rutinas` · `Mis Clientes`

**Cliente:** `Mi Fortress` · `Horarios` · `Mis Rutinas` · `Mi Membresía`

---

## Problemas del diseño original corregidos

- `Log Workout` en admin → eliminado, solo para cliente
- `Scrolls` sin pantalla → renombrar a Membresías
- Misma nav para los 3 roles → cada rol tiene su propia navegación
- Membresías mezclaba admin y cliente → separadas

---

## Orden de desarrollo sugerido

1. **Backend:** configurar BD, migration inicial, endpoint `/api/auth/login`
2. **Frontend:** trasladar diseño HTML del login al `LoginComponent`, conectar con el endpoint
3. **Backend:** endpoint `/api/users` (CRUD admin)
4. **Frontend:** `GestionUsuariosComponent` (admin)
5. **Backend:** endpoints de workouts
6. **Frontend:** `TheForgeComponent`
7. **Backend:** endpoints de horarios + reservas
8. **Frontend:** `HorariosComponent` con flujo de reserva
9. Membresías, dashboards específicos por rol

---

## Setup inicial para el compañero

### Requisitos
- .NET 10 SDK: https://dotnet.microsoft.com/download/dotnet/10.0
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Node.js 20+: https://nodejs.org

### Base de datos (Docker)
No hace falta instalar PostgreSQL. Con Docker basta un comando desde la carpeta `spartan-backend/`:
```bash
docker compose up -d
```
Eso levanta PostgreSQL 17 en `localhost:5432` con:
- Base de datos: `spartan_db`
- Usuario: `postgres`
- Contraseña: `spartan123`

Los datos persisten en un volumen Docker (`spartan_data`) — no se pierden si reiniciás el contenedor.

Para detenerlo: `docker compose down`
Para detenerlo y borrar los datos: `docker compose down -v`

### Backend
1. Clonar repo y entrar a la carpeta
2. Levantar la BD: `docker compose up -d`
3. Completar en `appsettings.json` solo el JWT secret key (la BD ya está configurada):
   ```json
   "Key": "UNA_CLAVE_SECRETA_MINIMO_32_CARACTERES"
   ```
4. Instalar herramienta de EF (una sola vez):
   ```bash
   dotnet tool install --global dotnet-ef
   ```
5. Correr migraciones:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
6. Levantar: `dotnet run`
7. Swagger disponible en `http://localhost:5000/swagger`

### Frontend
1. `npm install`
2. Completar `src/environments/environment.ts` con el Google Client ID
3. Levantar: `ng serve`
4. App en `http://localhost:4200`
