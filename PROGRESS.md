# PROGRESS.md — LizCakes (vane-postres)

> Registro formal del avance del proyecto.
> Generado por el mentor con autorización explícita de la desarrolladora.
> **Excepción a la Regla 1 de AGENTS.md:** este archivo es documentación, no código.
> Todo archivo de código (HTML/CSS/JS) sigue siendo transcrito manualmente por la desarrolladora.

---

## 📦 Stack del proyecto

- HTML5 semántico (`<header>`, `<main>`, `<section>`, `<footer>`)
- Tailwind CSS v4 vía CDN (`@tailwindcss/browser`)
- JavaScript Vanilla (ES6)
- Font Awesome 6.7.2 (iconos)
- Google Fonts: Poppins
- Git + GitHub con Conventional Commits

---

## ✅ Componentes completados

### 1. Header / Navbar — commit `5945eca`
- Header `sticky top-0` con `backdrop-blur-md`, borde y sombra.
- Logo con efecto `group-hover:scale-105`.
- Botón hamburguesa `#btn-menu` visible solo en móvil (`md:hidden`).
- Nav `#menu-nav` responsive:
  - Móvil (<768px): oculto por defecto (`hidden`), se despliega en columna (`flex-col`) al abrir.
  - Escritorio (≥768px): siempre visible en fila (`md:flex md:flex-row`).
- CTA de WhatsApp (icono; texto "Pedidos" comentado).

### 2. js/main.js — toggle del menú — commit `5945eca`
- `getElementById` para `#btn-menu` y `#menu-nav`.
- `addEventListener("click", () => { ... })` con cuerpo de función en `{ }`.
- `classList.toggle("hidden")` + `classList.toggle("flex")` en cada clic.

---

## 🔄 En progreso

### Sección Hero (`#inicio`)
- HTML pelado, sin clases de Tailwind todavía.
- Bocetos guardados por la desarrolladora:
  - `img/boceto-inicio.png`
  - `img/inicio-1.png`
  - `img/inicio-2.png`
- Maquetación pendiente (siguiente micro-reto).

---

## ⏳ Pendientes

- Sección Catálogo (`#catalogo`): contenedor `#contenedor-postres` vacío, sin JS que lo pueble.
- Sección Sobre Mí (`#sobre-mi`): texto de relleno.
- Footer: básico.
- Imágenes de catálogo disponibles en `img/` (pasteles, flanes, galletas, cheescakes, etc.).

---

## 🐛 Pendientes técnicos conocidos

- El menú móvil se queda abierto al volver a tamaño móvil desde escritorio (decisión de diseño pendiente: ¿cerrar automáticamente o aceptarlo?).
- El nav móvil ya no tiene `bg-white` (decisión de diseño: hereda `bg-pink-soft` del body).
- `index.html` tiene cambios sin commitear (se quitó el enlace "Ver Catálogo" del Hero y el `bg-white` del nav).

---

## 📚 Aprendizajes acumulados

**Tailwind CSS v4**
- Utilidades de display: `hidden`, `flex`, `block`.
- Breakpoints responsivos: `md:` (≥768px) siempre vencen a las clases base.
- Flexbox: `flex-col`, `flex-row`, `justify-between`, `items-center`.
- Efectos: `group-hover`, `backdrop-blur`, `shadow`.
- Tokens personalizados en `@theme` (custom.css).

**JavaScript Vanilla**
- `document.getElementById()`
- `addEventListener("click", callback)`
- `classList.toggle()` — interruptor de una clase.
- Arrow function: sin llaves = una sola expresión; con `{ }` = varias instrucciones.

**QA con DevTools**
- Panel Elements (clases en vivo), Styles (reglas tachadas = pisadas), Console (fotos instantáneas, no en vivo).
- Toggle Device Toolbar para probar responsive.
- Recarga dura: Ctrl+Shift+R.

**Git**
- Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
- Commit atómico = un componente terminado.

---

## 📏 Reglas de trabajo

Ver `AGENTS.md`. Resumen: el mentor guía y no edita código; la desarrolladora transcribe, prueba en navegador y commitea por componente.
