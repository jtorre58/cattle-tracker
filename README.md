# 🐄 Sistema de Gestión Ganadera

Un sistema web moderno y completo para el manejo, seguimiento y administración de ganado y pariciones.

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

### 🐮 Inventario de Ganado
- Control completo del inventario ganadero
- Clasificación por tipos (Vacas, Toros, Becerras, Becerros)
- Estados de animales (Vivos/Muertos/Vendidos)
- Filtrado avanzado por múltiples criterios
- Cálculos automáticos de totales históricos y netos
- Seguimiento de origen, comentarios y fechas importantes

### 📸 Gestión Visual
- Subida de fotos para cada registro
- Vista previa de imágenes con lightbox
- Interfaz visual intuitiva con iconos y emojis

### 💾 Sistema de Respaldos
- Creación de snapshots del sistema
- Respaldos completos o por sección
- Gestión de múltiples respaldos guardados
- Descarga de respaldos en formato JSON
- Carga y restauración de datos

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

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jtorre58/cattle-tracker.git
   cd cattle-tracker
   ```

2. **Iniciar servidor local**
   ```bash
   python3 -m http.server 8080
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8080/index.html
   ```

## 📚 Documentación Detallada

### Guías de Usuario
- [**📖 Guía de Usuario Completa**](docs/USER_GUIDE.md) - Tutorial paso a paso
- [**📊 Gestión de Pariciones**](docs/PARICIONES_GUIDE.md) - Manejo de nacimientos
- [**🐮 Inventario de Ganado**](docs/INVENTARIO_GUIDE.md) - Control de inventario
- [**📥 Importación de Datos**](docs/IMPORT_GUIDE.md) - Cómo importar datos
- [**💾 Sistema de Respaldos**](docs/BACKUP_GUIDE.md) - Gestión de respaldos

### Documentación Técnica
- [**⚙️ Configuración Técnica**](docs/TECHNICAL_SETUP.md) - Instalación y configuración
- [**🗄️ Estructura de Datos**](docs/DATA_STRUCTURE.md) - Formato de datos y esquemas
- [**🔧 API y Funciones**](docs/API_REFERENCE.md) - Referencia técnica
- [**🎨 Personalización**](docs/CUSTOMIZATION.md) - Cómo personalizar el sistema

## 📁 Estructura del Proyecto

```
cattle-tracker/
├── index.html              # Página principal de la aplicación
├── app.js                  # Lógica principal de Vue.js
├── styles.css              # Estilos CSS personalizados
├── README.md               # Este archivo
├── docs/                   # Documentación detallada
│   ├── USER_GUIDE.md       # Guía completa de usuario
│   ├── PARICIONES_GUIDE.md # Guía de pariciones
│   ├── INVENTARIO_GUIDE.md # Guía de inventario
│   ├── IMPORT_GUIDE.md     # Guía de importación
│   ├── BACKUP_GUIDE.md     # Guía de respaldos
│   ├── TECHNICAL_SETUP.md  # Configuración técnica
│   ├── DATA_STRUCTURE.md   # Estructura de datos
│   ├── API_REFERENCE.md    # Referencia de API
│   └── CUSTOMIZATION.md    # Guía de personalización
└── test-data.txt           # Datos de prueba
```

## 🛠️ Tecnologías

- **Frontend**: Vue.js 3, HTML5, CSS3
- **Almacenamiento**: LocalStorage del navegador
- **Importación**: CSV, JSON, Copy/Paste desde hojas de cálculo
- **Imágenes**: Base64 encoding para almacenamiento local
- **Servidor**: Python HTTP server (incluido en el sistema)

## 📊 Capacidades del Sistema

### Datos Soportados
- **Pariciones**: Registro ilimitado de nacimientos
- **Inventario**: Control completo de ganado
- **Imágenes**: Fotos asociadas a cada registro
- **Respaldos**: Múltiples snapshots del sistema

### Filtros y Búsquedas
- **Pariciones**: Por año, mes, género, fechas, vaca
- **Ganado**: Por tipo, estado, género, origen, comentarios, fechas
- **Búsqueda de texto**: En todos los campos relevantes
- **Combinación**: Múltiples filtros simultáneos

### Importación/Exportación
- **Formatos**: CSV, JSON, Copy/Paste
- **Detección**: Duplicados inteligente
- **Mapeo**: Automático de columnas
- **Vista previa**: Antes de confirmar importación

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **Dispositivos móviles** y tablets
- ✅ **Funciona offline** (después de la primera carga)
- ✅ **Responsive design** para todas las pantallas
- ✅ **No requiere instalación** ni configuración especial

## 🎯 Casos de Uso

### Para Ganaderos
- Control diario del ganado
- Registro de pariciones
- Seguimiento de ventas y muertes
- Análisis de productividad

### Para Administradores
- Reportes y estadísticas
- Gestión de múltiples períodos
- Respaldos y restauración
- Importación de datos históricos

### Para Técnicos
- Integración con otros sistemas
- Personalización de campos
- Exportación para análisis
- Migración de datos

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🐄 Sistema completo y autónomo para la gestión moderna de ganado

---

**Desarrollado con ❤️ para la comunidad ganadera**
