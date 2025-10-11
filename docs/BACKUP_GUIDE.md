# 💾 Guía del Sistema de Respaldos

## Introducción

El Sistema de Respaldos permite crear, gestionar y restaurar snapshots de tus datos ganaderos. Esta funcionalidad es esencial para proteger tu información y facilitar la migración entre diferentes entornos.

## 🎯 Tipos de Respaldos

### 1. Respaldo Completo (💾)
- **Contenido**: Pariciones + Inventario de Ganado
- **Uso**: Respaldo total del sistema
- **Recomendado**: Para migraciones completas y respaldos de seguridad

### 2. Respaldo de Pariciones (🍼)
- **Contenido**: Solo datos de nacimientos
- **Uso**: Respaldo específico de pariciones
- **Recomendado**: Para análisis reproductivos o transferencias parciales

### 3. Respaldo de Inventario (🐮)
- **Contenido**: Solo datos de ganado
- **Uso**: Respaldo específico del inventario
- **Recomendado**: Para gestión de inventario o auditorías

## 🚀 Crear Respaldos

### Acceso al Gestor de Respaldos
1. Click en **💾 Respaldos** en la barra de acciones
2. Se abre el modal del Gestor de Respaldos

### Proceso de Creación
1. **Nombrar el respaldo**:
   - Ingresa un nombre descriptivo
   - Ejemplos: "Antes Importación 2024", "Respaldo Mensual Enero"
   
2. **Seleccionar tipo**:
   - **💾 Completo**: Para respaldo total
   - **🍼 Solo Pariciones**: Para datos de nacimientos únicamente
   - **🐮 Solo Inventario**: Para datos de ganado únicamente

3. **Confirmar creación**:
   - Click en el botón del tipo deseado
   - El respaldo se crea automáticamente
   - Aparece confirmación de éxito

### Información Automática
Cada respaldo incluye:
- **Nombre**: El que proporcionaste
- **Fecha**: Fecha de creación automática
- **Tipo**: Completo, Pariciones, o Inventario
- **Contadores**: Número de registros incluidos
- **ID único**: Para identificación interna

## 📋 Gestionar Respaldos

### Visualizar Respaldos Guardados
En el gestor se muestra:
- **Lista completa** de respaldos
- **Información detallada** de cada uno
- **Acciones disponibles** para cada respaldo

### Información Mostrada
Para cada respaldo:
```
📝 Nombre del Respaldo
💾 Tipo (Completo/Pariciones/Inventario)
📅 Fecha: DD/MM/YYYY
📊 Pariciones: X registros (si aplica)
🐮 Ganado: Y registros (si aplica)
```

### Acciones Disponibles
- **📥 Cargar**: Restaurar datos del respaldo
- **⬇️ Descargar**: Obtener archivo JSON
- **🗑️ Eliminar**: Borrar respaldo permanentemente

## 📥 Cargar Respaldos

### Proceso de Carga
1. **Seleccionar respaldo**: Encuentra el respaldo deseado
2. **Click en 📥 Cargar**
3. **Confirmar acción**: 
   ```
   ¿Estás seguro de cargar el respaldo "Nombre"?
   Esto reemplazará los datos actuales.
   ```
4. **Confirmación**: Los datos se restauran automáticamente

### Comportamiento por Tipo

#### Respaldo Completo
- **Reemplaza**: Todos los datos actuales
- **Restaura**: Pariciones + Inventario completo
- **Resultado**: Sistema idéntico al momento del respaldo

#### Respaldo de Pariciones
- **Reemplaza**: Solo datos de pariciones
- **Mantiene**: Inventario de ganado actual
- **Resultado**: Pariciones restauradas, inventario intacto

#### Respaldo de Inventario
- **Reemplaza**: Solo datos de inventario
- **Mantiene**: Pariciones actuales
- **Resultado**: Inventario restaurado, pariciones intactas

### Confirmaciones y Notificaciones
- **Antes de cargar**: Confirmación obligatoria
- **Durante la carga**: Procesamiento automático
- **Después de cargar**: Notificación de éxito
- **Registro de actividad**: Se registra la acción

## ⬇️ Descargar Respaldos

### Propósito
- **Transferencia**: Mover datos entre sistemas
- **Respaldo externo**: Guardar fuera del navegador
- **Compartir**: Enviar datos a otros usuarios
- **Archivo**: Mantener copias históricas

### Proceso de Descarga
1. **Click en ⬇️ Descargar** en el respaldo deseado
2. **Descarga automática**: Se genera archivo JSON
3. **Nombre del archivo**: `respaldo_[nombre]_[fecha].json`

### Formato del Archivo
```json
{
  "id": "1699123456789",
  "name": "Respaldo Mensual Enero",
  "type": "full",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "date": "15/1/2024",
  "data": {
    "pariciones": [...],
    "ganado": [...]
  }
}
```

### Usos del Archivo Descargado
- **Importar en otro sistema**: Usar como fuente de datos
- **Respaldo en la nube**: Subir a Google Drive, Dropbox, etc.
- **Envío por email**: Compartir con otros usuarios
- **Archivo local**: Guardar en disco duro

## 🗑️ Eliminar Respaldos

### Cuándo Eliminar
- **Respaldos obsoletos**: Ya no necesarios
- **Espacio limitado**: Liberar almacenamiento
- **Organización**: Mantener lista limpia
- **Respaldos duplicados**: Eliminar redundantes

### Proceso de Eliminación
1. **Click en 🗑️ Eliminar** en el respaldo
2. **Confirmación obligatoria**:
   ```
   ¿Estás seguro de eliminar el respaldo "Nombre"?
   ```
3. **Eliminación permanente**: No se puede deshacer
4. **Notificación**: Confirmación de eliminación

### ⚠️ Precauciones
- **Acción irreversible**: No se puede recuperar
- **Verificar antes**: Asegurar que no se necesita
- **Descargar primero**: Si hay duda, descargar antes de eliminar

## 🎯 Casos de Uso Prácticos

### 1. Respaldo de Seguridad Regular
```
Frecuencia: Semanal
Tipo: 💾 Completo
Nombre: "Respaldo Semanal [Fecha]"
Propósito: Protección contra pérdida de datos
```

### 2. Antes de Importación Grande
```
Momento: Antes de importar datos masivos
Tipo: 💾 Completo
Nombre: "Antes Importación [Descripción]"
Propósito: Poder revertir si algo sale mal
```

### 3. Migración a Producción
```
Origen: Entorno de desarrollo/pruebas
Tipo: 💾 Completo
Proceso: Crear → Descargar → Importar en producción
Propósito: Transferir datos entre entornos
```

### 4. Análisis Específico
```
Tipo: 🍼 Solo Pariciones o 🐮 Solo Inventario
Propósito: Compartir datos específicos para análisis
Ventaja: No exponer datos completos
```

### 5. Respaldo Antes de Limpieza
```
Momento: Antes de eliminar registros masivamente
Tipo: 💾 Completo
Propósito: Poder recuperar datos eliminados por error
```

## 📊 Mejores Prácticas

### Nomenclatura de Respaldos
- **Incluir fecha**: "Respaldo 15-01-2024"
- **Describir propósito**: "Antes Importación Enero"
- **Usar convenciones**: Mantener formato consistente
- **Ser específico**: "Pre-Migración Producción"

### Frecuencia Recomendada
- **Diario**: En períodos de alta actividad
- **Semanal**: Para uso regular
- **Mensual**: Para mantenimiento básico
- **Antes de cambios**: Siempre antes de modificaciones importantes

### Gestión de Almacenamiento
- **Eliminar obsoletos**: Respaldos muy antiguos
- **Mantener críticos**: Respaldos de hitos importantes
- **Descargar importantes**: Guardar externamente los críticos
- **Rotar respaldos**: Mantener solo los más recientes

### Verificación de Respaldos
- **Probar carga**: Verificar que los respaldos funcionan
- **Revisar contenido**: Confirmar que tienen los datos esperados
- **Documentar**: Mantener registro de respaldos importantes

## 🔄 Flujo de Trabajo Recomendado

### Rutina Diaria
1. **Verificar**: Estado actual de datos
2. **Crear respaldo**: Si hubo cambios significativos
3. **Nombrar apropiadamente**: Con fecha y descripción

### Rutina Semanal
1. **Respaldo completo**: Crear respaldo total
2. **Limpieza**: Eliminar respaldos obsoletos
3. **Descarga**: Guardar respaldo semanal externamente

### Antes de Importaciones
1. **Respaldo completo**: Crear antes de cualquier importación
2. **Verificar**: Que el respaldo se creó correctamente
3. **Proceder**: Con la importación
4. **Verificar resultado**: Después de importar
5. **Nuevo respaldo**: Si la importación fue exitosa

### Migración Entre Entornos
1. **Respaldo en origen**: Crear respaldo completo
2. **Descargar**: Obtener archivo JSON
3. **Transferir**: Mover archivo al destino
4. **Importar**: En el sistema destino
5. **Verificar**: Que todos los datos se transfirieron

## 🆘 Solución de Problemas

### Problema: Respaldo No Se Crea
**Posibles causas:**
- Navegador sin espacio en localStorage
- Datos corruptos
- Error temporal del sistema

**Soluciones:**
1. Refrescar la página e intentar nuevamente
2. Verificar espacio disponible en el navegador
3. Crear respaldo de tipo específico en lugar de completo
4. Reiniciar el navegador

### Problema: No Puedo Cargar Respaldo
**Posibles causas:**
- Respaldo corrupto
- Formato de datos incompatible
- Error en el proceso de carga

**Soluciones:**
1. Verificar que el respaldo existe en la lista
2. Intentar con otro respaldo
3. Refrescar la página e intentar nuevamente
4. Verificar la consola del navegador para errores

### Problema: Descarga No Funciona
**Posibles causas:**
- Bloqueador de descargas del navegador
- Respaldo muy grande
- Error temporal

**Soluciones:**
1. Verificar configuración de descargas del navegador
2. Permitir descargas desde el sitio
3. Intentar con navegador diferente
4. Crear respaldo más pequeño (específico)

### Problema: Datos Perdidos Después de Cargar
**Soluciones:**
1. **No entrar en pánico**: Los datos pueden estar en otro respaldo
2. **Revisar otros respaldos**: Buscar respaldo más reciente
3. **Verificar tipo de respaldo**: Asegurar que era el correcto
4. **Cargar respaldo anterior**: Si existe uno más reciente

## 📞 Soporte y Mantenimiento

### Mantenimiento Regular
- **Revisar respaldos**: Verificar que funcionan correctamente
- **Limpiar antiguos**: Eliminar respaldos obsoletos
- **Documentar importantes**: Mantener registro de respaldos críticos
- **Probar restauración**: Verificar proceso de carga periódicamente

### Monitoreo
- **Espacio usado**: Verificar almacenamiento disponible
- **Cantidad de respaldos**: Mantener número manejable
- **Fechas**: Asegurar respaldos recientes disponibles

---

**¡Tus datos están seguros con el sistema de respaldos! 💾**
