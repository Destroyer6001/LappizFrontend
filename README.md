# 🎨 Frontend - Registro de Usuarios Lappiz Low Code

Aplicación frontend desarrollada en **Angular (última versión)** que permite registrar y visualizar usuarios interesados en el servicio de desarrollo **Low Code de Lappiz**.

La aplicación implementa **Angular Material**, **componentes standalone** y **lazy loading**, siguiendo buenas prácticas modernas de desarrollo en Angular.

---

## 📌 Tecnologías utilizadas

* Angular (última versión)
* TypeScript
* Angular Material
* RxJS
* Standalone Components
* Lazy Loading

---

## 🧩 Características principales

* 📌 Registro de usuarios interesados
* 📄 Listado de usuarios registrados
* ✅ Validación de formularios
* 🎨 Interfaz moderna con Angular Material
* ⚡ Carga optimizada mediante Lazy Loading
* 🧱 Arquitectura basada en componentes standalone (sin NgModules)

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js (v18 o superior recomendado)
* Angular CLI

```bash
npm install -g @angular/cli
```

---

## 📥 Clonar el repositorio desde GitHub

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO_FRONT.git
```

```bash
cd TU_REPOSITORIO_FRONT
```

---

## 📦 Instalación de dependencias

```bash
npm install
```

---

## ▶️ Ejecutar la aplicación

```bash
ng serve
```

Luego abre tu navegador en:

```
http://localhost:4200
```

---

## 🔌 Configuración del backend

Asegúrate de que la API esté corriendo.
Por defecto, el frontend consume los endpoints:

* `POST /client/addPerson`
* `GET /client/getPersons`

Si necesitas cambiar la URL del backend, configúrala en:

```bash
src/environments/environment.ts
```

Ejemplo:

```ts
export const environment = {
  apiUrl: 'http://localhost:3000'
};
```

---

## 🧪 Funcionalidades

### 📌 Registro de usuarios

Formulario con validaciones:

* Nombre requerido
* Email válido

---

### 📌 Listado de usuarios

Visualización de los usuarios registrados en una tabla utilizando Angular Material.

---

## 🎨 UI con Angular Material

Se utilizan componentes como:

* MatFormField
* MatInput
* MatButton
* MatDialog
* MatTable
* MatSnackBar

---

## ⚡ Lazy Loading

Las funcionalidades están cargadas bajo demanda mediante rutas lazy:

```ts
{
  path: 'clients',
  loadComponent: () =>
    import('./features/client/pages/client-page.component')
      .then(m => m.ClientPageComponent)
}
```

---

## 🧠 Arquitectura

La aplicación sigue una arquitectura basada en:

* Separación por features
* Servicios para consumo de API
* Componentes reutilizables
* Standalone components (sin módulos tradicionales)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 👨‍💻 Autor

Desarrollado como parte de una prueba técnica / proyecto profesional.
