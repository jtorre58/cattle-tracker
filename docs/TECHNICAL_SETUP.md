# ⚙️ Configuración Técnica

## Introducción

Esta guía proporciona información técnica detallada para la instalación, configuración y despliegue del Sistema de Gestión Ganadera.

## 🛠️ Requisitos del Sistema

### Navegadores Compatibles
- **Chrome**: 90+ (Recomendado)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Opera**: 76+

### Requisitos Mínimos
- **JavaScript**: Habilitado (obligatorio)
- **LocalStorage**: Mínimo 10MB disponible
- **Resolución**: 1024x768 o superior
- **Conexión**: Solo para carga inicial (funciona offline después)

### Requisitos Recomendados
- **RAM**: 4GB+ para manejo de datasets grandes
- **Almacenamiento**: 50MB+ para datos extensos con imágenes
- **Resolución**: 1920x1080 para mejor experiencia
- **Conexión**: Banda ancha para carga rápida inicial

## 📁 Estructura del Proyecto

```
cattle-tracker/
├── index.html              # Página principal de la aplicación
├── app.js                  # Lógica principal de Vue.js
├── styles.css              # Estilos CSS personalizados
├── README.md               # Documentación principal
├── docs/                   # Documentación detallada
│   ├── USER_GUIDE.md       # Guía completa de usuario
│   ├── PARICIONES_GUIDE.md # Guía de pariciones
│   ├── INVENTARIO_GUIDE.md # Guía de inventario
│   ├── IMPORT_GUIDE.md     # Guía de importación
│   ├── BACKUP_GUIDE.md     # Guía de respaldos
│   ├── TECHNICAL_SETUP.md  # Esta guía
│   ├── DATA_STRUCTURE.md   # Estructura de datos
│   ├── API_REFERENCE.md    # Referencia de API
│   └── CUSTOMIZATION.md    # Guía de personalización
└── test-data.txt           # Datos de prueba
```

## 🚀 Instalación Local

### Método 1: Servidor Python (Recomendado)
```bash
# Clonar repositorio
git clone https://github.com/jtorre58/cattle-tracker.git
cd cattle-tracker

# Iniciar servidor HTTP
python3 -m http.server 8080

# Acceder en navegador
# http://localhost:8080/index.html
```

### Método 2: Servidor Node.js
```bash
# Instalar servidor HTTP global
npm install -g http-server

# Navegar al directorio del proyecto
cd cattle-tracker

# Iniciar servidor
http-server -p 8080

# Acceder en navegador
# http://localhost:8080/index.html
```

### Método 3: Servidor PHP
```bash
# Navegar al directorio del proyecto
cd cattle-tracker

# Iniciar servidor PHP
php -S localhost:8080

# Acceder en navegador
# http://localhost:8080/index.html
```

### Método 4: Abrir Directamente
```bash
# Solo para desarrollo/pruebas
# Abrir index.html directamente en navegador
# Nota: Algunas funciones pueden no trabajar por restricciones CORS
```

## 🌐 Despliegue en Producción

### Hosting Estático (Recomendado)

#### GitHub Pages
```bash
# 1. Subir código a repositorio GitHub
git add .
git commit -m "Deploy cattle tracker"
git push origin main

# 2. Habilitar GitHub Pages en configuración del repositorio
# 3. Seleccionar rama main como fuente
# 4. Acceder en: https://username.github.io/cattle-tracker/
```

#### Netlify
```bash
# 1. Conectar repositorio GitHub a Netlify
# 2. Configurar build settings:
#    Build command: (vacío)
#    Publish directory: /
# 3. Deploy automático en cada push
```

#### Vercel
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy desde directorio del proyecto
cd cattle-tracker
vercel

# 3. Seguir instrucciones interactivas
```

### Servidor Web Tradicional

#### Apache
```apache
# .htaccess (opcional para URLs limpias)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# Configurar MIME types
AddType application/json .json
AddType text/css .css
AddType application/javascript .js
```

#### Nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/cattle-tracker;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|json)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Configuración Avanzada

### Variables de Entorno (Opcional)
```javascript
// En app.js, al inicio del archivo
const CONFIG = {
    APP_NAME: 'Sistema de Gestión Ganadera',
    VERSION: '1.0.0',
    DEBUG: false,
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    STORAGE_PREFIX: 'cattle_',
    BACKUP_RETENTION: 30 // días
};
```

### Personalización de Almacenamiento
```javascript
// Cambiar prefijo de localStorage
const STORAGE_KEYS = {
    PARICIONES: 'cattle_pariciones',
    GANADO: 'cattle_ganado',
    SNAPSHOTS: 'cattle_snapshots',
    ACTIVITY: 'cattle_activity'
};
```

### Configuración de Límites
```javascript
// Límites del sistema
const LIMITS = {
    MAX_RECORDS: 10000,
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,
    MAX_SNAPSHOTS: 50,
    IMPORT_BATCH_SIZE: 1000
};
```

## 📊 Monitoreo y Rendimiento

### Métricas de LocalStorage
```javascript
// Verificar uso de almacenamiento
function getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length;
        }
    }
    return {
        used: total,
        usedMB: (total / 1024 / 1024).toFixed(2),
        available: (10 * 1024 * 1024) - total // Asumiendo límite de 10MB
    };
}
```

### Optimización de Rendimiento
```javascript
// Lazy loading para datasets grandes
const PERFORMANCE_CONFIG = {
    PAGINATION_SIZE: 100,
    VIRTUAL_SCROLLING: true,
    DEBOUNCE_SEARCH: 300, // ms
    IMAGE_COMPRESSION: true
};
```

### Logging y Debug
```javascript
// Sistema de logging
const Logger = {
    debug: (msg) => CONFIG.DEBUG && console.log(`[DEBUG] ${msg}`),
    info: (msg) => console.info(`[INFO] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`)
};
```

## 🔒 Seguridad

### Validación de Datos
```javascript
// Sanitización de entrada
function sanitizeInput(input) {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .trim();
}
```

### Límites de Seguridad
```javascript
// Prevención de ataques
const SECURITY = {
    MAX_INPUT_LENGTH: 1000,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    MAX_IMPORT_SIZE: 1000000, // caracteres
    RATE_LIMIT: 100 // operaciones por minuto
};
```

### Headers de Seguridad (Servidor)
```apache
# Apache .htaccess
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

## 🧪 Testing y Desarrollo

### Datos de Prueba
```javascript
// Generar datos de prueba
function generateTestData() {
    const testPariciones = [];
    const testGanado = [];
    
    // Generar 100 pariciones de prueba
    for (let i = 1; i <= 100; i++) {
        testPariciones.push({
            id: `test_p_${i}`,
            vaca: `Vaca${i}`,
            gender: Math.random() > 0.5 ? 'H' : 'M',
            fecha: `${Math.floor(Math.random() * 12) + 1}/23`,
            criaDescripcion: `Cría de prueba ${i}`
        });
    }
    
    return { pariciones: testPariciones, ganado: testGanado };
}
```

### Debugging
```javascript
// Herramientas de debug
window.cattleDebug = {
    exportData: () => JSON.stringify(app.getAllData()),
    clearData: () => localStorage.clear(),
    getStats: () => ({
        pariciones: app.pariciones.length,
        ganado: app.ganado.length,
        snapshots: app.savedSnapshots.length
    })
};
```

### Testing Manual
```javascript
// Checklist de testing
const TEST_CHECKLIST = [
    'Agregar parición',
    'Agregar ganado',
    'Importar CSV',
    'Crear respaldo',
    'Cargar respaldo',
    'Filtrar datos',
    'Exportar datos',
    'Subir imagen',
    'Editar registro',
    'Eliminar registro'
];
```

## 🔄 Migración y Actualización

### Migración de Datos
```javascript
// Script de migración
function migrateData(fromVersion, toVersion) {
    const data = JSON.parse(localStorage.getItem('cattle_data'));
    
    if (fromVersion < '1.1.0') {
        // Migrar estructura de datos
        data.pariciones = data.pariciones.map(p => ({
            ...p,
            criaDescripcion: p.notes || ''
        }));
    }
    
    localStorage.setItem('cattle_data', JSON.stringify(data));
}
```

### Versionado
```javascript
// Control de versiones
const VERSION_CONTROL = {
    current: '1.0.0',
    migrations: {
        '1.0.0': () => console.log('Initial version'),
        '1.1.0': () => migrateNotesToCriaDescripcion()
    }
};
```

## 📱 Responsive y PWA

### Configuración PWA (Opcional)
```json
// manifest.json
{
    "name": "Sistema de Gestión Ganadera",
    "short_name": "CattleTracker",
    "description": "Sistema completo para gestión de ganado",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#4CAF50",
    "icons": [
        {
            "src": "icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

### Service Worker (Opcional)
```javascript
// sw.js - Para funcionalidad offline
const CACHE_NAME = 'cattle-tracker-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/styles.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});
```

## 🆘 Solución de Problemas Técnicos

### Problemas Comunes

#### LocalStorage Lleno
```javascript
// Detectar y limpiar
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
} catch (e) {
    if (e.name === 'QuotaExceededError') {
        alert('Almacenamiento lleno. Elimine datos antiguos.');
    }
}
```

#### Datos Corruptos
```javascript
// Validar y reparar datos
function validateAndRepairData() {
    try {
        const data = JSON.parse(localStorage.getItem('cattle_data'));
        // Validar estructura
        if (!Array.isArray(data.pariciones)) {
            data.pariciones = [];
        }
        if (!Array.isArray(data.ganado)) {
            data.ganado = [];
        }
        return data;
    } catch (e) {
        console.error('Datos corruptos, inicializando vacío');
        return { pariciones: [], ganado: [] };
    }
}
```

#### Problemas de Rendimiento
```javascript
// Optimizaciones
const PERFORMANCE_FIXES = {
    // Debounce para búsquedas
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Paginación para listas grandes
    paginate: (array, page, size) => {
        return array.slice((page - 1) * size, page * size);
    }
};
```

## 📞 Soporte Técnico

### Información de Debug
Para reportar problemas técnicos, incluir:
- Versión del navegador
- Sistema operativo
- Tamaño del dataset
- Pasos para reproducir
- Mensajes de error de la consola

### Logs del Sistema
```javascript
// Habilitar logging detallado
localStorage.setItem('cattle_debug', 'true');
// Recargar página para activar
```

### Herramientas de Desarrollo
```javascript
// Acceso a datos internos (solo desarrollo)
window.cattleApp = app; // En producción, remover esta línea
```

---

**¡Sistema técnicamente robusto y escalable! ⚙️**
