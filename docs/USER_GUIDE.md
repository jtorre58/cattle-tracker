# 📖 Guía de Usuario Completa

## Introducción

El Sistema de Gestión Ganadera es una aplicación web completa para el manejo de ganado y pariciones. Esta guía te ayudará a aprovechar al máximo todas las funcionalidades del sistema.

## 🚀 Primeros Pasos

### Acceso al Sistema
1. Abre tu navegador web
2. Navega a la URL del sistema
3. La aplicación se carga automáticamente

### Interfaz Principal
- **Barra de navegación**: Cambia entre Pariciones e Inventario
- **Botones de acción**: Agregar, importar, exportar datos
- **Panel de estadísticas**: Contadores en tiempo real
- **Área principal**: Tablas de datos con filtros

## 📊 Gestión de Pariciones

### Agregar Nueva Parición
1. Click en **🍼 Pariciones** en la navegación
2. Click en **➕ Nueva Parición**
3. Completa los campos:
   - **Vaca**: Nombre de la madre
   - **Género**: Hembra (H) o Macho (M)
   - **Fecha**: MM/YY o MM/DD/YYYY
   - **Cría Descripción**: Detalles del nacimiento
   - **Foto**: Opcional, imagen del animal
4. Click **➕ Agregar Parición**

### Filtrar Pariciones
- **Por año**: Dropdown con años disponibles
- **Por mes**: Enero a Diciembre
- **Por género**: Hembras, Machos, o Todos
- **Por fechas**: Rango de fechas específico
- **Por vaca**: Buscar por nombre de la madre

### Editar Pariciones
1. Click en el botón **✏️** en la fila deseada
2. Modifica los campos necesarios
3. Click **✅ Actualizar Parición**

## 🐮 Inventario de Ganado

### Agregar Nuevo Ganado
1. Click en **🐮 Inventario** en la navegación
2. Click en **➕ Nuevo Ganado**
3. Completa los campos:
   - **Animal**: Nombre del animal
   - **Arete**: Número de identificación
   - **Tipo**: Vaca, Toro, Becerra, Becerro
   - **Género**: Hembra o Macho
   - **Estado**: Vivo o Muerto/Vendido
   - **Origen**: De dónde proviene
   - **Comentarios**: Notas adicionales
   - **Fechas**: Fechas importantes
4. Click **➕ Agregar Ganado**

### Filtros Avanzados de Inventario
- **Tipo**: Vacas, Toros, Becerras, Becerros
- **Estado**: Vivos, Muertos/Vendidos
- **Género**: Hembras, Machos
- **Origen**: Dropdown con orígenes únicos
- **Fechas**: Búsqueda por texto en fechas
- **Comentarios**: Búsqueda por texto en comentarios

### Limpiar Filtros
Click en **🗑️ Limpiar Filtros** para resetear todos los filtros

## 📥 Importación de Datos

### Desde CSV
1. Click en **📄 Archivo CSV**
2. Pega los datos CSV en el área de texto
3. Click **📊 Procesar Datos**
4. Revisa la vista previa
5. Click **✅ Importar** para confirmar

### Desde Hoja de Cálculo
1. Copia datos desde Excel/Google Sheets
2. Click en **📋 Datos** (Pariciones o Ganado)
3. Pega los datos copiados
4. Click **📊 Procesar Datos**
5. Revisa duplicados si los hay
6. Click **✅ Importar** para confirmar

### Formato de Datos

#### Pariciones (4 columnas):
```
Vaca, Género, Fecha, Cría Descripción
Gorrita, H, 08/23, Becerra saludable
Mora, M, 09/23, Becerro grande
```

#### Ganado (7 columnas):
```
Animal, Origen, Comentarios, Género, Tipo, Fechas, Estado
Becerra1, Rancho Norte, Animal joven, H, B, 01/2023, N
Toro Principal, Compra, Reproductor, M, T, 12/2022, N
```

## 💾 Sistema de Respaldos

### Crear Respaldo
1. Click en **💾 Respaldos**
2. Ingresa un nombre descriptivo
3. Selecciona el tipo:
   - **💾 Completo**: Pariciones + Inventario
   - **🍼 Solo Pariciones**: Solo datos de nacimientos
   - **🐮 Solo Inventario**: Solo datos de ganado
4. El respaldo se guarda automáticamente

### Cargar Respaldo
1. En el gestor de respaldos, encuentra el respaldo deseado
2. Click **📥 Cargar**
3. Confirma la acción (reemplazará datos actuales)
4. Los datos se restauran automáticamente

### Descargar Respaldo
1. Click **⬇️ Descargar** en el respaldo deseado
2. Se descarga un archivo JSON
3. Úsalo para transferir datos entre sistemas

## 📊 Estadísticas y Contadores

### Pariciones
- **Total Pariciones**: Número total de nacimientos
- **Hembras**: Crías hembras nacidas
- **Machos**: Crías machos nacidas
- **Por Año**: Distribución anual

### Inventario
- **Total Histórico**: Todos los animales registrados
- **Ganado Vivo**: Animales actualmente vivos
- **Hembras**: Animales hembras vivos
- **Machos**: Animales machos vivos
- **Muertos/Vendidos**: Animales no activos

## 🔍 Búsqueda y Filtrado

### Consejos de Búsqueda
- **Texto parcial**: Busca "bec" para encontrar "becerra"
- **Fechas flexibles**: Busca "2023" para todos los registros de ese año
- **Combinación**: Usa múltiples filtros simultáneamente
- **Tiempo real**: Los resultados se actualizan mientras escribes

### Contadores Dinámicos
- Los contadores se actualizan según los filtros aplicados
- "Mostrando X de Y registros" indica resultados filtrados
- Los totales siempre reflejan el estado actual

## 📸 Gestión de Imágenes

### Agregar Fotos
1. En el formulario de agregar/editar
2. Click en **Seleccionar archivo**
3. Elige una imagen (JPG, PNG, etc.)
4. La imagen se guarda automáticamente

### Ver Fotos
- Click en cualquier imagen en la tabla
- Se abre en vista ampliada (lightbox)
- Click fuera de la imagen para cerrar

## ⚠️ Detección de Duplicados

### Criterios de Duplicados

#### Pariciones:
- Misma vaca + misma fecha = duplicado

#### Ganado:
- Mismo animal + mismo origen + mismo tipo + mismas fechas + mismos comentarios = duplicado

### Manejo de Duplicados
1. Durante la importación se detectan automáticamente
2. Se muestran en tabla comparativa
3. Solo se importan registros únicos
4. Los duplicados se omiten con notificación

## 💡 Consejos y Mejores Prácticas

### Organización de Datos
- Usa nombres consistentes para vacas y orígenes
- Mantén formato de fechas uniforme
- Agrega comentarios descriptivos para seguimiento

### Respaldos Regulares
- Crea respaldos antes de importaciones grandes
- Usa nombres descriptivos con fechas
- Descarga respaldos importantes como archivos

### Filtrado Eficiente
- Combina filtros para búsquedas específicas
- Usa el filtro de texto para búsquedas rápidas
- Limpia filtros cuando cambies de contexto

### Mantenimiento
- Revisa y actualiza estados de animales regularmente
- Mantén información de contacto y fechas actualizadas
- Usa el sistema de comentarios para notas importantes

## 🆘 Solución de Problemas

### Datos No Se Guardan
- Verifica que el navegador permita localStorage
- No uses modo incógnito/privado
- Actualiza la página y vuelve a intentar

### Importación Falla
- Verifica el formato de datos
- Asegúrate de tener el número correcto de columnas
- Revisa caracteres especiales en los datos

### Filtros No Funcionan
- Limpia todos los filtros y vuelve a aplicar
- Verifica que los datos contengan los valores buscados
- Actualiza la página si persiste el problema

### Imágenes No Cargan
- Verifica el tamaño del archivo (máximo recomendado: 5MB)
- Usa formatos compatibles (JPG, PNG, GIF)
- Actualiza la página si la imagen no aparece

## 📞 Soporte

Para soporte adicional o reportar problemas:
1. Revisa esta documentación completa
2. Consulta los archivos de documentación específicos
3. Verifica la consola del navegador para errores técnicos
4. Contacta al administrador del sistema

---

**¡Feliz gestión ganadera! 🐄**
