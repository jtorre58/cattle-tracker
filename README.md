# 🐄 Sistema de Gestión Ganadera

Un sistema web moderno para el manejo y seguimiento de ganado y pariciones.

## ✨ Características

### 📊 Gestión de Pariciones
- Registro de nacimientos y pariciones
- Filtrado por año, mes y fechas
- Seguimiento de género (Hembras/Machos)
- Importación desde CSV y hojas de cálculo

### 🐮 Inventario de Ganado
- Control completo del inventario
- Clasificación por tipos (Vacas, Toros, Becerras, Becerros)
- Estado de animales (Vivos/Muertos/Vendidos)
- Cálculos automáticos de totales históricos y netos

### 📸 Gestión Visual
- Subida de fotos para cada registro
- Vista previa de imágenes
- Interfaz visual intuitiva con iconos

### 💾 Gestión de Datos
- Almacenamiento local persistente
- Exportación/Importación de respaldos JSON
- Detección de duplicados
- Limpieza de datos por sección

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
   http://localhost:8080/vue-index.html
   ```

## 📁 Estructura del Proyecto

```
cattle-tracker/
├── vue-index.html          # Página principal (Vue.js)
├── vue-app.js             # Lógica de la aplicación
├── styles.css             # Estilos CSS
├── index.html             # Versión vanilla JS (alternativa)
├── script.js              # JavaScript vanilla (alternativa)
└── README.md              # Este archivo
```

## 🛠️ Tecnologías

- **Frontend**: Vue.js 3, HTML5, CSS3
- **Almacenamiento**: LocalStorage del navegador
- **Importación**: CSV, JSON, Copy/Paste desde hojas de cálculo
- **Imágenes**: Base64 encoding
- **Servidor**: Python HTTP server (incluido en el sistema)

## 📊 Funcionalidades Principales

### Pestañas Principales
1. **Pariciones**: Registro de nacimientos y seguimiento
2. **Cuenta de Ganado**: Inventario completo del ganado

### Acciones Disponibles
- ➕ **Agregar**: Nuevos registros de animales/ganado
- 📥 **Importar**: CSV, copy/paste desde hojas de cálculo, respaldos JSON
- 🔍 **Filtrar**: Por tipo, año, mes, estado
- 💾 **Exportar**: Respaldos completos en JSON
- ✏️ **Editar**: Click en cualquier registro para editar
- 🗑️ **Limpiar**: Datos por sección
- 📸 **Fotos**: Agregar imágenes a cada registro

### Cálculos Automáticos
- Total histórico de animales
- Conteos por género y tipo
- Animales vivos vs muertos/vendidos
- Totales netos de inventario

## 📱 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles y tablets
- ✅ Funciona offline (después de la primera carga)
- ✅ Responsive design
- ✅ No requiere instalación ni configuración

## 🎯 Uso Recomendado

**Archivo principal**: `vue-index.html` - Versión moderna con Vue.js
**Archivo alternativo**: `index.html` - Versión vanilla JavaScript

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para nueva funcionalidad
3. Commit los cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🐄 Sistema completo y autónomo para la gestión moderna de ganado
