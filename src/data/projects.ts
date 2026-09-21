const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const links = {
  github: 'https://github.com/Bruno-Sanchez-GH',
  email: 'mailto:brnosnchez@gmail.com',
  despuesDividimosWeb: 'https://despues-dividimos.onrender.com/',
  despuesDividimosRepository: 'https://github.com/Bruno-Sanchez-GH/Despues-dividimos.',
  logApiDocs: 'https://log-api-nchy.onrender.com/docs',
  logApiRepository: 'https://github.com/Bruno-Sanchez-GH/log-api',
  logApiServer: 'https://log-api-nchy.onrender.com',
  logApiHealth: 'https://log-api-nchy.onrender.com/health',
  fitlogicRepository: 'https://github.com/Franco-Rodriguez-dev/fitlogic',
  bookspaceWeb: 'https://bookspace.com.ar/',
  bookspaceRepository: 'https://github.com/Bruno-Sanchez-GH/bookspace',
  nexoCompany: 'https://nexokinetics.com/en',
  cvPdf: publicAsset('Bruno_Sanchez_CV.pdf'),
  cvPreview: publicAsset('assets/cv-preview.webp'),
} as const

export const aboutContent = {
  title: 'Hola, soy Bruno.',
  education: 'Estudiante de tercer año de Ingeniería en Informática.',
  focus: 'Me enfoco en el desarrollo backend y en crear aplicaciones que resuelvan problemas cotidianos.',
  internship: 'El 28 de septiembre de 2026 comienzo una pasantía de desarrollo de software en Nexo Kinetics.',
  universityLogo: publicAsset('assets/logos/logo-ubp.png'),
  technologies: [
    { name: 'TypeScript', logo: publicAsset('assets/logos/typescript.svg') },
    { name: 'Node.js', logo: publicAsset('assets/logos/nodedotjs.svg') },
    { name: 'PostgreSQL', logo: publicAsset('assets/logos/postgresql.svg') },
  ],
} as const

export type ProjectId = 'about' | 'despues-dividimos' | 'log-api' | 'fitlogic' | 'bookspace' | 'nexo-kinetics' | 'cv'

export type ProjectDetails = {
  summary: string
  features: readonly string[]
}

export type AboutProject = {
  id: 'about'
  title: 'Sobre mí'
  category: 'Presentación'
  description: string
}

export type ShowcaseProject = {
  id: Exclude<ProjectId, 'about'>
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
  imageTheme: 'light' | 'dark' | 'black' | 'paper'
  primary: { label: string; kind: 'external'; url: string } | { label: string; kind: 'detail' }
  repository?: string
  secondary?: { label: string; url: string }
  details?: ProjectDetails
}

export type Project = AboutProject | ShowcaseProject

export const projects: readonly Project[] = [
  {
    id: 'about',
    title: 'Sobre mí',
    category: 'Presentación',
    description: aboutContent.focus,
  },
  {
    id: 'despues-dividimos',
    title: 'Después Dividimos',
    category: 'Proyecto personal',
    description: 'Aplicación para organizar gastos compartidos en viajes, juntadas y grupos. El backend está en desarrollo.',
    image: publicAsset('assets/despues-dividimos.webp'),
    imageAlt: 'Captura de la interfaz de Después Dividimos',
    imageTheme: 'light',
    primary: { label: 'Ver proyecto', kind: 'external', url: links.despuesDividimosWeb },
    repository: links.despuesDividimosRepository,
    details: {
      summary: 'Aplicación para organizar gastos compartidos durante viajes, juntadas y actividades grupales. Permite llevar un registro de quién pagó y cómo se distribuyen los gastos entre los participantes.',
      features: [
        'Organizar grupos, viajes y actividades.',
        'Registrar gastos y sus participantes.',
        'Consultar balances para saber cuánto le corresponde pagar o recibir a cada persona.',
      ],
    },
  },
  {
    id: 'log-api',
    title: 'Log API',
    category: 'Proyecto personal',
    description: 'API para centralizar logs e incidentes de distintos proyectos.',
    image: publicAsset('assets/log-api.webp'),
    imageAlt: 'Captura de la documentación de Log API',
    imageTheme: 'dark',
    primary: { label: 'Ver documentación', kind: 'external', url: links.logApiDocs },
    repository: links.logApiRepository,
    details: {
      summary: 'API para centralizar logs y errores de distintos proyectos, pensada para facilitar su seguimiento. Permite organizar los registros y agrupar errores relacionados en incidentes.',
      features: [
        'Recibir logs mediante claves de acceso por proyecto.',
        'Consultar registros con filtros y revisar incidentes.',
        'Explorar los endpoints mediante documentación Swagger.',
      ],
    },
  },
  {
    id: 'fitlogic',
    title: 'FitLogic',
    category: 'Proyecto académico · Colaborador',
    description: 'Aplicación de escritorio para generar rutinas de entrenamiento según filtros, desarrollada en colaboración.',
    image: publicAsset('assets/fitlogic.webp'),
    imageAlt: 'Captura de la aplicación de escritorio FitLogic',
    imageTheme: 'dark',
    primary: { label: 'Sobre el proyecto', kind: 'detail' },
    repository: links.fitlogicRepository,
    details: {
      summary: 'Aplicación de escritorio para generar rutinas de entrenamiento según las preferencias del usuario. Participé como colaborador en su desarrollo.',
      features: [
        'Configurar el tiempo disponible, nivel, lugar, objetivo y músculos a entrenar.',
        'Generar rutinas y reemplazar ejercicios individuales.',
        'Guardar las rutinas generadas y consultar el registro de entrenamientos.',
      ],
    },
  },
  {
    id: 'bookspace',
    title: 'BookSpace',
    category: 'Proyecto académico',
    description: 'Prototipo web para presentar libros y explorar información bibliográfica.',
    image: publicAsset('assets/bookspace.webp'),
    imageAlt: 'Captura de BookSpace',
    imageTheme: 'light',
    primary: { label: 'Ver proyecto', kind: 'external', url: links.bookspaceWeb },
    repository: links.bookspaceRepository,
    details: {
      summary: 'Prototipo web orientado a la presentación de libros. La versión actual muestra una selección bibliográfica y un panel con datos simulados; la búsqueda y la integración real con Google Books están previstas para una etapa posterior.',
      features: [
        'Explorar una selección de libros destacados.',
        'Consultar títulos, autores, categorías, años y portadas.',
        'Abrir un panel demostrativo de estadísticas bibliográficas.',
      ],
    },
  },
  {
    id: 'nexo-kinetics',
    title: 'Nexo Kinetics',
    category: 'Pasantía confirmada en Nexo Kinetics. Inicio: 28 de septiembre de 2026.',
    description: 'Próxima incorporación a una pasantía de desarrollo de software de dos meses.',
    image: publicAsset('assets/nexo-kinetics.webp'),
    imageAlt: 'Logo de Nexo Kinetics',
    imageTheme: 'black',
    primary: { label: 'Ver experiencia', kind: 'detail' },
    secondary: { label: 'Sitio de la empresa', url: links.nexoCompany },
  },
  {
    id: 'cv',
    title: 'Mi CV',
    category: 'Curriculum vitae',
    description: 'Curriculum vitae de Bruno Sánchez.',
    image: links.cvPreview,
    imageAlt: 'Vista previa de la primera página del CV de Bruno Sánchez',
    imageTheme: 'paper',
    primary: { label: 'Ver CV', kind: 'external', url: links.cvPdf },
    secondary: { label: 'Descargar PDF', url: links.cvPdf },
  },
]
