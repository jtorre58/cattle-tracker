# 🐄 Sistema de Gestión Ganadera

Un sistema web moderno y completo para el manejo, seguimiento y administración de ganado y pariciones con almacenamiento en la nube.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Inicio Rápido](#-inicio-rápido)
- [Documentación Detallada](#-documentación-detallada)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Compatibilidad](#-compatibilidad)

## ✨ Características Principales

### 📊 Gestión de Pariciones
- Registro completo de nacimientos y pariciones
- Filtrado avanzado por año, mes, fechas y género
- Seguimiento detallado de crías (Hembras/Machos)
- Importación desde CSV y hojas de cálculo
- Descripción detallada de cada cría
- **Fotos ilimitadas** almacenadas en Amazon S3

### 🐮 Inventario de Ganado
- Control completo del inventario ganadero
- Clasificación por tipos (Vacas, Toros, Becerras, Becerros)
- Estados de animales (Vivos/Muertos/Vendidos)
- Filtrado avanzado por múltiples criterios
- Cálculos automáticos de totales históricos y netos
- Seguimiento de origen, comentarios y fechas importantes
- **Imágenes de alta calidad** en la nube

### 📸 Gestión Visual Avanzada
- Subida directa de fotos a Amazon S3
- Almacenamiento ilimitado de imágenes (5GB gratis)
- Vista previa de imágenes con lightbox
- Compresión automática para optimizar almacenamiento
- URLs firmadas para acceso seguro
- Respaldo automático de metadatos

### 💾 Sistema de Respaldos en la Nube
- Almacenamiento principal en Amazon DynamoDB
- Respaldos automáticos en la nube
- Sincronización entre dispositivos
- Acceso desde cualquier navegador
- Fallback a localStorage si no hay conexión
- Migración automática de datos locales

### 📥 Importación/Exportación
- Importación desde CSV y hojas de cálculo
- Detección inteligente de duplicados
- Vista previa antes de importar
- Exportación completa de datos
- Mapeo automático de columnas

### 🔍 Filtrado Avanzado
- Filtros múltiples combinables
- Búsqueda por texto en comentarios
- Filtrado por fechas, origen, tipo, género
- Contadores en tiempo real
- Resultados instantáneos

## 🚀 Inicio Rápido

### Desarrollo Local
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jtorre58/cattle-tracker.git
   cd cattle-tracker
   ```

2. **Configurar AWS (Opcional para desarrollo)**
   ```bash
   # Si tienes credenciales AWS configuradas
   aws configure
   ```

3. **Iniciar servidor local**
   ```bash
   python3 -m http.server 8080
   ```

4. **Abrir en navegador**
   ```
   http://localhost:8080/index.html
   ```

### Despliegue en Vercel (Recomendado)
1. **Configurar variables de entorno en Vercel:**
   - `accessKeyId`: Tu AWS Access Key ID
   - `secretAccessKey`: Tu AWS Secret Access Key

2. **Desplegar:**
   ```bash
   vercel --prod
   ```

3. **Configurar AWS S3 (Una sola vez):**
   - Crear bucket: `cattle-tracker-images-2025`
   - Configurar CORS y permisos
   - Ver [Guía de Configuración AWS](docs/AWS_SETUP.md)

## 📚 Documentación Detallada

### Guías de Usuario
- [**📖 Guía de Usuario Completa**](docs/USER_GUIDE.md) - Tutorial paso a paso
- [**📊 Gestión de Pariciones**](docs/PARICIONES_GUIDE.md) - Manejo de nacimientos
- [**🐮 Inventario de Ganado**](docs/INVENTARIO_GUIDE.md) - Control de inventario
- [**📥 Importación de Datos**](docs/IMPORT_GUIDE.md) - Cómo importar datos
- [**💾 Sistema de Respaldos**](docs/BACKUP_GUIDE.md) - Gestión de respaldos
- [**📸 Gestión de Imágenes**](docs/IMAGES_GUIDE.md) - Manejo de fotos

### Documentación Técnica
- [**⚙️ Configuración AWS**](docs/AWS_SETUP.md) - Configuración de DynamoDB y S3
- [**🗄️ Estructura de Datos**](docs/DATA_STRUCTURE.md) - Formato de datos y esquemas
- [**🔧 API y Funciones**](docs/API_REFERENCE.md) - Referencia técnica
- [**🎨 Personalización**](docs/CUSTOMIZATION.md) - Cómo personalizar el sistema
- [**🚀 Despliegue**](docs/DEPLOYMENT.md) - Guía completa de despliegue

## 📁 Estructura del Proyecto

```
cattle-tracker/
├── index.html              # Página principal de la aplicación
├── index-direct-s3.html    # Versión con S3 directo (desarrollo)
├── app.js                  # Lógica principal de Vue.js
├── aws-sdk.min.js          # AWS SDK para JavaScript
├── styles.css              # Estilos CSS personalizados
├── README.md               # Este archivo
├── api/
│   └── env.js              # Variables de entorno para Vercel
├── docs/                   # Documentación detallada
│   ├── USER_GUIDE.md       # Guía completa de usuario
│   ├── AWS_SETUP.md        # Configuración de AWS
│   ├── IMAGES_GUIDE.md     # Gestión de imágenes
│   ├── PARICIONES_GUIDE.md # Guía de pariciones
│   ├── INVENTARIO_GUIDE.md # Guía de inventario
│   ├── IMPORT_GUIDE.md     # Guía de importación
│   ├── BACKUP_GUIDE.md     # Guía de respaldos
│   ├── DEPLOYMENT.md       # Guía de despliegue
│   ├── DATA_STRUCTURE.md   # Estructura de datos
│   ├── API_REFERENCE.md    # Referencia de API
│   └── CUSTOMIZATION.md    # Guía de personalización
├── vercel.json             # Configuración de Vercel
├── package.json            # Metadatos del proyecto
└── cors-config.json        # Configuración CORS para S3
```

## 🛠️ Tecnologías

### Frontend
- **Vue.js 3**: Framework JavaScript reactivo
- **HTML5 & CSS3**: Interfaz moderna y responsiva
- **AWS SDK**: Integración directa con servicios AWS

### Backend en la Nube
- **Amazon DynamoDB**: Base de datos NoSQL para metadatos
- **Amazon S3**: Almacenamiento de imágenes de alta calidad
- **Vercel**: Hosting y despliegue automático

### Características Técnicas
- **Almacenamiento híbrido**: DynamoDB + S3 + localStorage fallback
- **URLs firmadas**: Acceso seguro a imágenes
- **Compresión automática**: Optimización de imágenes
- **Sincronización**: Datos accesibles desde cualquier dispositivo
- **Offline-first**: Funciona sin conexión con fallback local

## 📊 Capacidades del Sistema

### Almacenamiento de Datos
- **Pariciones**: Registro ilimitado en DynamoDB
- **Inventario**: Control completo en la nube
- **Imágenes**: 5GB gratis en Amazon S3 (expandible)
- **Respaldos**: Automáticos en DynamoDB
- **Usuarios**: Gestión multi-usuario

### Gestión de Imágenes
- **Subida directa**: Browser → Amazon S3
- **Compresión**: Automática para optimizar espacio
- **Acceso seguro**: URLs firmadas con expiración
- **Alta calidad**: Sin límites de resolución
- **Respaldo**: Metadatos en DynamoDB

### Filtros y Búsquedas
- **Pariciones**: Por año, mes, género, fechas, vaca
- **Ganado**: Por tipo, estado, género, origen, comentarios, fechas
- **Búsqueda de texto**: En todos los campos relevantes
- **Combinación**: Múltiples filtros simultáneos
- **Tiempo real**: Resultados instantáneos

### Importación/Exportación
- **Formatos**: CSV, JSON, Copy/Paste
- **Detección**: Duplicados inteligente
- **Mapeo**: Automático de columnas
- **Vista previa**: Antes de confirmar importación
- **Migración**: Automática desde localStorage

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **Dispositivos móviles** y tablets
- ✅ **Funciona offline** (con fallback a localStorage)
- ✅ **Responsive design** para todas las pantallas
- ✅ **Multiplataforma** (Windows, Mac, Linux, móviles)
- ✅ **Multi-dispositivo** (sincronización automática)

## 💰 Costos

### Desarrollo Local
- **Costo**: $0 (usa localStorage)
- **Limitaciones**: Solo local, sin sincronización

### Producción (Vercel + AWS)
- **Vercel**: $0 (plan gratuito)
- **AWS DynamoDB**: $0 (25GB gratis permanente)
- **AWS S3**: $0 (5GB gratis por 12 meses)
- **Total primer año**: $0
- **Después del primer año**: ~$1-3/mes para uso típico

## 🎯 Casos de Uso

### Para Ganaderos
- Control diario del ganado con fotos
- Registro de pariciones con imágenes
- Seguimiento de ventas y muertes
- Análisis de productividad
- Acceso desde campo (móvil)

### Para Administradores
- Reportes y estadísticas
- Gestión de múltiples períodos
- Respaldos automáticos en la nube
- Importación de datos históricos
- Control multi-usuario

### Para Técnicos
- Integración con AWS
- Escalabilidad automática
- Respaldos redundantes
- API para integraciones
- Migración de datos

## 🔒 Seguridad

- **Credenciales**: Variables de entorno seguras
- **Acceso a imágenes**: URLs firmadas con expiración
- **Datos**: Encriptados en tránsito y reposo (AWS)
- **Autenticación**: Control de acceso por usuario
- **Respaldos**: Múltiples copias automáticas

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🐄 Sistema completo y autónomo para la gestión moderna de ganado

**Potenciado por AWS • Desarrollado con ❤️ para la comunidad ganadera**

---

### 🌟 Características Destacadas

- **🔄 Sincronización automática** entre dispositivos
- **📸 Almacenamiento ilimitado** de imágenes en la nube
- **💾 Respaldos automáticos** sin intervención del usuario
- **📱 Acceso móvil** completo desde cualquier dispositivo
- **🔒 Seguridad empresarial** con AWS
- **💰 Costo mínimo** con generosos niveles gratuitos
