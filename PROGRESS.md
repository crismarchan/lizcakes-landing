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

### 3. Configuración de Tailwind v4 en el navegador

**Problema diagnosticado:** los tokens `@theme` no se aplicaban (fondo `bg-yellow-butter` y fuente `font-coiny` no se veían).

**Causa raíz:** un `<link rel="stylesheet">` se sirve con el tipo MIME `text/css`. El navegador lo parsea como **CSS nativo**, y `@theme` no existe en el estándar CSS → la regla se descarta en silencio. El script `@tailwindcss/browser@4` nunca llega a ver ese archivo.

**Solución:** mover la configuración a un bloque `<style>` con el atributo `type="text/tailwindcss"` dentro del `<head>` de `index.html`. Solo ese tipo MIME lo procesa el compilador in-browser.

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<style type="text/tailwindcss">
  @theme {
    --font-sans: 'Poppins', sans-serif;
    --font-coiny: 'Coiny', cursive;
    --color-pink-soft: #f8dddd;
    --color-yellow-butter: #fde047;
    --color-chocolate-dark: #3e2723;
  }
  body { background-color: var(--color-pink-soft); color: var(--color-chocolate-dark); }
</style>
```

**Tokens registrados:** `pink-soft`, `cream-white`, `yellow-butter`, `chocolate-dark`, `whatsapp-green`, `font-sans`, `font-coiny`.
Las fuentes se cargan ahora con `<link>` en el `<head>` (más rápido que `@import` en CSS).

---

### 4. Sección Hero / Inicio (`#inicio`) — ✅ MAQUETADO

**Diseño de referencia:** tríptico horizontal — imagen izquierda, texto al centro, imagen derecha. Fondo amarillo `yellow-butter` para contrastar con el rosa del resto de la landing. Imágenes PNG recortadas (sin fondo).

**Bocetos de la desarrolladora:** `img/boceto-inicio.png`, `img/inicio-1.png`, `img/inicio-2.png`.

**Arquitectura de 3 capas (patrón clave del proyecto):**

```
<section>    →  "la caja":    color de fondo + aire horizontal/vertical (px, py)
  └── <div> →  "el espacio":  ancho máximo legible + DISTRIBUCIÓN (flex, gap)
        ├── <div> texto        (md:order-2)
        └── <div> wrapper      → en móvil: flex-row con los 2 postres
             ├── <div> img 1   (md:order-1)
             └── <div> img 2   (md:order-3)
```

**Regla de oro:** *el `flex` va en el elemento que tiene múltiples hijos que quieres distribuir.* El `<section>` nunca debe ser flexbox si solo tiene un hijo.

**Comportamiento responsive:**

| Breakpoint | Layout | Orden |
|---|---|---|
| Móvil (<768px) | `flex-col` | Texto arriba, dos postres juntos abajo |
| Escritorio (≥768px) | `md:flex-row` | img 1 — texto — img 2 (tríptico del boceto) |

**Técnica avanzada usada: `display: contents`**

```html
<div class="flex flex-row items-center justify-center gap-2 md:contents">
```

- **Móvil:** el wrapper es un flexbox normal → los 2 postres se muestran en fila, juntos bajo el título.
- **Escritorio:** `display: contents` hace que el wrapper **desaparezca como caja** y sus hijos se vuelvan hijos directos del flexbox padre, allowing the tríptico layout.

⚠️ Es una técnica potente pero **frágil**: si se añaden clases de espaciado a ese wrapper, no surtirán efecto en escritorio porque la caja ya no existe. Documentar con comentarios al usarla.

**Prevención de deformación de imágenes:**

```html
<div class="max-w-sm">
  <img class="w-32 md:w-full object-contain">
</div>
```

- `max-w-sm` (384px) en el **`<div>` padre** → techo de ancho. Debe ir en el div, no en el `img`, para romper la dependencia circular de anchos.
- `w-32 md:w-full` → patrón mobile-first: pequeño por defecto, crece en escritorio.
- `object-contain` → **impide la deformación**. Se agregó tras descubrir que `h-64 aspect-3/2` estiraba los postres horizontalmente (forzar ancho+alto en un `<img>` deforma el contenido).

---

## 🔄 En progreso

- **Animación de levitación** de los postres en el Hero (pendiente: CSS `@keyframes` + `animation`).
- Auditoría responsive del resto de secciones (solo el Hero tiene layout responsive por ahora).

---

## ⏳ Pendientes

- Sección Catálogo (`#catalogo`): contenedor `#contenedor-postres` vacío, sin JS que lo pueble.
- Sección Sobre Mí (`#sobre-mi`): texto de relleno.
- Footer: básico.
- Imágenes de catálogo disponibles en `img/` (pasteles, flanes, galletas, cheescakes, etc.).
- Decisión de diseño pendiente: Hero compacto (actual) vs. Hero a pantalla completa (`min-h-screen`).

---

## 🐛 Pendientes técnicos conocidos

- El menú móvil se queda abierto al volver a tamaño móvil desde escritorio (decisión de diseño pendiente: ¿cerrar automáticamente o aceptarlo?).
- El nav móvil ya no tiene `bg-white` (decisión de diseño: hereda `bg-pink-soft` del body).
- **Hero sin separación vertical en móvil:** el padre tiene `md:gap-8` (solo escritorio) pero no hay clase `gap` base. `gap` solo funciona en el **contenedor flex padre**, nunca en los hijos. Pendiente: aplicar patrón mobile-first (`gap-4 md:gap-8`).
- Hero con `py-3`: aire vertical reducido. Pendiente de revisar si se siente "apretado".
- `css/custom.css` quedó redundante: sus variables en `:root` no las consume Tailwind (solo `@theme` las ve) y su regla `body` se movió al `<style>` del HTML.

---

## 📚 Aprendizajes acumulados

**Tailwind CSS v4**
- Utilidades de display: `hidden`, `flex`, `block`, `contents`.
- Breakpoints responsivos: `md:` (≥768px) siempre vencen a las clases base.
- **Patrón mobile-first:** valor pequeño **sin prefijo** (default, aplica siempre) + valor grande con prefijo de breakpoint. Ej: `w-32 md:w-full`.
- Flexbox: `flex-col`, `flex-row`, `justify-center`, `justify-between`, `items-center`, `gap-*`.
- `justify-*` alinea en el **eje principal** (depende de `flex-row`/`flex-col`); `items-*` alinea en el **eje transversal**.
- **`gap` solo funciona en el contenedor flex padre**, nunca en los hijos.
- `order-*` reordena hijos visualmente **sin tocar el HTML** (mantiene semántica y accesibilidad).
- `max-w-*` en el **`<div>` padre** para poner techo de ancho; en el `<img>` genera dependencia circular.
- `object-contain` / `object-cover` evitan deformación al forzar `width` + `height` en un `<img>`.
- Efectos: `group-hover`, `backdrop-blur`, `shadow`.

**CSS — conceptos existentes**
- `@theme` es una directiva **exclusiva de Tailwind**; CSS nativo la descarta. Solo funciona dentro de `<style type="text/tailwindcss">`.
- `@import` de fuentes en CSS es más lento que `<link>` en el `<head>` (bloquea el render).
- `min-height` es un **piso**, no un techo: `altura_real = max(min-height, contenido)`. Por eso `min-h-[100px]` no achicaba la sección (el contenido ya medía más). `vh`/`svh`/`dvh` permiten ocupar la pantalla.
- `display: contents` elimina la caja del elemento del layout, pero conserva sus hijos.
- `padding` = espacio interno; `margin` = espacio externo.

**JavaScript Vanilla**
- `document.getElementById()`
- `addEventListener("click", callback)`
- `classList.toggle()` — interruptor de una clase.
- Arrow function: sin llaves = una sola expresión; con `{ }` = varias instrucciones.

**QA con DevTools**
- Panel Elements (clases en vivo), Styles (reglas tachadas = pisadas), Console (fotos instantáneas, no en vivo).
- Toggle Device Toolbar para probar responsive.
- Redimensionar **arrastrando el borde** del navegador (no saltando entre tamaños) para encontrar breakpoints naturales.
- Recarga dura: Ctrl+Shift+R (evita caché de JS/CSSold).
- **Desactivar una clase en vivo** es la mejor herramienta para confirmar qué hace cada clase.

**Git**
- Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
- Commit atómico = un componente terminado.

---

## 📏 Reglas de trabajo

Ver `AGENTS.md`. Resumen: el mentor guía y no edita código; la desarrolladora transcribe, prueba en navegador y commitea por componente.
