# Portafolio de Bruno Sánchez

Portafolio personal de una sola página desarrollado con React, TypeScript y Vite. Presenta proyectos, experiencia, información de contacto y un CV descargable mediante un carrusel adaptable a dispositivos móviles y escritorio.

## Requisitos

- Node.js 24
- npm

## Instalación

```bash
npm ci
```

## Desarrollo

```bash
npm run dev
```

## Verificación y build

```bash
npm run typecheck
npm run build
```

Para revisar localmente el build de producción:

```bash
npm run preview
```

El resultado compilado se genera en `dist/`. La vista previa queda disponible en `http://localhost:4173/Portafolio/`.

## Publicación en GitHub Pages

El proyecto está configurado para publicarse en:

`https://bruno-sanchez-gh.github.io/Portafolio/`

El workflow `.github/workflows/deploy-pages.yml` instala las dependencias con `npm ci`, ejecuta el typecheck y el build, y publica únicamente `dist/`. Se ejecuta con cada push a `main` y también puede iniciarse manualmente.

Para activar el primer despliegue:

1. Abrir **Settings → Pages** en el repositorio.
2. En **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Abrir **Actions**, seleccionar el workflow de despliegue a GitHub Pages y ejecutar **Run workflow** sobre `main` si el workflow disparado por el push anterior no se reanuda automáticamente.
4. Esperar a que finalice el job `deploy` y abrir la URL indicada por GitHub en el environment `github-pages`.

La aplicación es una página estática sin router ni servicios necesarios para renderizar su contenido. Las URLs de Render y de los demás proyectos son enlaces externos.

## Estructura principal

- `src/components/`: componentes de interfaz.
- `src/data/projects.ts`: contenido y enlaces de proyectos.
- `public/assets/`: imágenes utilizadas por el portafolio.
- `public/Bruno_Sanchez_CV.pdf`: CV público enlazado desde la aplicación.
