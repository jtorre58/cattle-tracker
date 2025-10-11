# 📥 Guía de Importación de Datos

## Introducción

Esta guía detalla cómo importar datos al Sistema de Gestión Ganadera desde diferentes fuentes como CSV, hojas de cálculo de Excel/Google Sheets, y archivos de respaldo.

## 🎯 Tipos de Importación

### 1. Importación CSV
- **Formato**: Archivo CSV estándar
- **Separador**: Coma (,)
- **Codificación**: UTF-8 recomendado

### 2. Importación desde Hoja de Cálculo
- **Fuentes**: Excel, Google Sheets, LibreOffice Calc
- **Método**: Copy/Paste directo
- **Formato**: Datos tabulares

### 3. Importación de Respaldos
- **Formato**: JSON
- **Fuente**: Respaldos previos del sistema
- **Contenido**: Datos completos o parciales

## 📊 Formatos de Datos

### Pariciones (4 columnas obligatorias)

#### Estructura:
```
Vaca, Género, Fecha, Cría Descripción
```

#### Ejemplo:
```csv
Gorrita,H,08/23,Becerra saludable nacida en la mañana
Mora,M,09/23,Becerro grande y fuerte
Colorada,H,10/23,Gemelas hembras
Prieta,M,11/23,Becerro con marca especial
```

#### Detalles de Campos:
- **Vaca**: Nombre de la madre (texto libre)
- **Género**: H (Hembra) o M (Macho)
- **Fecha**: MM/YY, MM/DD/YY, o MM/DD/YYYY
- **Cría Descripción**: Detalles del nacimiento (texto libre)

### Ganado/Inventario (7 columnas obligatorias)

#### Estructura:
```
Animal, Origen, Comentarios, Género, Tipo, Fechas, Estado
```

#### Ejemplo:
```csv
Becerra Luna,Rancho Norte,Animal joven y saludable,H,B,01/15/2023,N
Toro Principal,Compra Directa,Reproductor principal del hato,M,T,12/10/2022,N
Vaca Estrella,Nacimiento Propio,Excelente productora de leche,H,V,03/20/2021,N
Becerro Vendido,Tio Pepe,Vendido por buen precio,M,_B,08/05/2023,S
```

#### Detalles de Campos:
- **Animal**: Nombre del animal (texto libre)
- **Origen**: Procedencia (Rancho Norte, Compra, etc.)
- **Comentarios**: Notas adicionales (texto libre)
- **Género**: H (Hembra) o M (Macho)
- **Tipo**: V (Vaca), T (Toro), B (Becerra), _B (Becerro)
- **Fechas**: Fechas importantes (texto libre)
- **Estado**: N (Vivo) o S (Muerto/Vendido)

## 🔧 Proceso de Importación Paso a Paso

### Importación CSV

#### 1. Preparar Archivo CSV
```csv
# Ejemplo para Pariciones
Vaca,Género,Fecha,Cría Descripción
Gorrita,H,08/23,Becerra saludable
Mora,M,09/23,Becerro grande

# Ejemplo para Ganado
Animal,Origen,Comentarios,Género,Tipo,Fechas,Estado
Becerra1,Rancho Norte,Animal joven,H,B,01/2023,N
Toro1,Compra,Reproductor,M,T,12/2022,N
```

#### 2. Importar en el Sistema
1. Click en **📄 Archivo CSV**
2. Abrir archivo CSV en editor de texto
3. Copiar todo el contenido
4. Pegar en el área de texto del sistema
5. Click **📊 Procesar Datos**
6. Revisar vista previa
7. Click **✅ Importar**

### Importación desde Hoja de Cálculo

#### 1. Preparar Datos en Excel/Google Sheets
| Vaca | Género | Fecha | Cría Descripción |
|------|--------|-------|------------------|
| Gorrita | H | 08/23 | Becerra saludable |
| Mora | M | 09/23 | Becerro grande |

#### 2. Copiar y Pegar
1. Seleccionar datos incluyendo encabezados
2. Copiar (Ctrl+C o Cmd+C)
3. En el sistema, click **📋 Datos Pariciones** o **📋 Datos Ganado**
4. Pegar en el área de texto (Ctrl+V o Cmd+V)
5. Click **📊 Procesar Datos**
6. Revisar vista previa y duplicados
7. Click **✅ Importar**

## ⚠️ Detección de Duplicados

### Criterios de Detección

#### Para Pariciones:
- **Duplicado si**: Misma vaca + misma fecha + misma cría descripción

#### Para Ganado:
- **Duplicado si**: Mismo animal + mismo origen + mismo tipo + mismas fechas + mismos comentarios

### Manejo de Duplicados
1. **Detección Automática**: El sistema identifica duplicados durante el procesamiento
2. **Vista Previa**: Se muestran en tabla comparativa (nuevo vs existente)
3. **Decisión del Usuario**: Solo se importan registros únicos
4. **Notificación**: Se informa cuántos duplicados se omitieron

### Ejemplo de Duplicados Detectados:
```
⚠️ Duplicados Encontrados (2)

Nuevo Registro          | Registro Existente
------------------------|-------------------
Gorrita | H | 08/23    | Gorrita | H | 08/23
Mora | M | 09/23       | Mora | M | 09/23
```

## 📋 Validación de Datos

### Validaciones Automáticas

#### Pariciones:
- **Vaca**: No puede estar vacío
- **Género**: Debe ser H o M
- **Fecha**: Formato válido requerido
- **Cría Descripción**: Opcional

#### Ganado:
- **Animal**: No puede estar vacío
- **Género**: Debe ser H o M
- **Tipo**: Debe ser V, T, B, o _B
- **Estado**: Debe ser N o S
- **Otros campos**: Opcionales

### Errores Comunes y Soluciones

#### Error: "Formato de fecha inválido"
- **Problema**: Fecha no reconocida
- **Solución**: Usar MM/YY, MM/DD/YY, o MM/DD/YYYY
- **Ejemplos válidos**: 08/23, 08/15/23, 08/15/2023

#### Error: "Género inválido"
- **Problema**: Valor diferente a H o M
- **Solución**: Cambiar a H (Hembra) o M (Macho)
- **Casos comunes**: "Hembra" → "H", "Macho" → "M"

#### Error: "Tipo de ganado inválido"
- **Problema**: Tipo no reconocido
- **Solución**: Usar V, T, B, o _B
- **Equivalencias**: 
  - Vaca → V
  - Toro → T
  - Becerra → B
  - Becerro → _B

## 🎯 Mejores Prácticas

### Preparación de Datos
1. **Limpieza previa**: Revisar datos antes de importar
2. **Formato consistente**: Mantener formatos uniformes
3. **Nombres estándar**: Usar nomenclatura consistente
4. **Verificación**: Revisar datos críticos

### Durante la Importación
1. **Vista previa**: Siempre revisar antes de confirmar
2. **Duplicados**: Verificar que los duplicados sean realmente iguales
3. **Respaldo**: Crear respaldo antes de importaciones grandes
4. **Lotes pequeños**: Importar en grupos manejables

### Después de la Importación
1. **Verificación**: Confirmar que los datos se importaron correctamente
2. **Contadores**: Revisar que las estadísticas sean correctas
3. **Filtros**: Usar filtros para verificar subconjuntos de datos
4. **Respaldo**: Crear respaldo después de importación exitosa

## 📊 Ejemplos Prácticos

### Ejemplo 1: Importar Pariciones de 2023
```csv
Vaca,Género,Fecha,Cría Descripción
Gorrita,H,01/15/23,Becerra saludable
Mora,M,02/20/23,Becerro grande
Colorada,H,03/10/23,Becerra con marca
Prieta,M,04/05/23,Becerro fuerte
Estrella,H,05/12/23,Gemelas
```

### Ejemplo 2: Importar Inventario Completo
```csv
Animal,Origen,Comentarios,Género,Tipo,Fechas,Estado
Vaca Principal,Rancho Norte,Reproductora principal,H,V,01/2020,N
Toro Semental,Compra Directa,Reproductor del hato,M,T,06/2021,N
Becerra Luna,Nacimiento Propio,Hija de Vaca Principal,H,B,03/2023,N
Becerro Vendido,Tio Pepe,Vendido en subasta,M,_B,08/2023,S
```

### Ejemplo 3: Migración desde Excel
1. **Abrir Excel** con datos existentes
2. **Agregar encabezados** según formato requerido
3. **Ajustar datos** a los valores válidos (H/M, V/T/B/_B, N/S)
4. **Seleccionar todo** incluyendo encabezados
5. **Copiar** datos
6. **Pegar** en el sistema
7. **Procesar** y revisar
8. **Importar** después de verificar

## 🔄 Importación de Respaldos

### Cargar Respaldo Completo
1. Click **💾 Respaldos**
2. Seleccionar respaldo deseado
3. Click **📥 Cargar**
4. Confirmar reemplazo de datos actuales
5. Verificar carga exitosa

### Cargar Respaldo Parcial
- **Solo Pariciones**: Carga únicamente datos de nacimientos
- **Solo Ganado**: Carga únicamente inventario
- **Datos actuales**: Se mantienen los no incluidos en el respaldo

## 🆘 Solución de Problemas

### Problema: Importación No Funciona
**Posibles causas:**
- Formato de datos incorrecto
- Caracteres especiales en los datos
- Número incorrecto de columnas

**Soluciones:**
1. Verificar formato de columnas
2. Eliminar caracteres especiales
3. Asegurar número correcto de campos
4. Probar con datos de ejemplo

### Problema: Muchos Duplicados Detectados
**Posibles causas:**
- Datos ya importados previamente
- Criterios de duplicados muy estrictos
- Variaciones menores en los datos

**Soluciones:**
1. Verificar si los datos ya existen
2. Revisar criterios de duplicados
3. Limpiar datos antes de importar
4. Importar solo datos nuevos

### Problema: Datos Importados Incorrectamente
**Soluciones:**
1. Usar respaldo para restaurar estado anterior
2. Eliminar registros incorrectos manualmente
3. Corregir datos fuente y reimportar
4. Verificar mapeo de columnas

## 📞 Soporte Técnico

Para problemas específicos de importación:
1. Verificar formato de datos según esta guía
2. Probar con datasets pequeños primero
3. Revisar mensajes de error específicos
4. Consultar documentación técnica adicional

---

**¡Importación exitosa garantizada siguiendo esta guía! 📊**
