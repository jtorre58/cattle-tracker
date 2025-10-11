# 🗄️ Estructura de Datos

## Introducción

Esta documentación detalla la estructura de datos utilizada por el Sistema de Gestión Ganadera, incluyendo esquemas, formatos de almacenamiento y relaciones entre entidades.

## 📊 Esquema General

### Almacenamiento Principal
```javascript
// LocalStorage Keys
const STORAGE_KEYS = {
    PARICIONES: 'cattle_pariciones',      // Datos de nacimientos
    GANADO: 'cattle_ganado',              // Inventario de ganado
    SNAPSHOTS: 'cattle_snapshots',        // Respaldos del sistema
    ACTIVITY: 'cattle_activity'           // Log de actividades
};
```

### Estructura de Datos Global
```javascript
{
    pariciones: Array<Paricion>,
    ganado: Array<Ganado>,
    snapshots: Array<Snapshot>,
    activity: Array<Activity>
}
```

## 🍼 Estructura de Pariciones

### Esquema de Parición
```javascript
interface Paricion {
    id: string,                    // Identificador único
    vaca: string,                  // Nombre de la madre
    gender: 'H' | 'M',            // Género de la cría
    fecha: string,                 // Fecha de nacimiento
    criaDescripcion: string,       // Descripción de la cría
    image?: string,                // Imagen en Base64 (opcional)
    arete?: string,                // Número de arete (opcional)
    parentId?: string,             // ID del padre/madre (opcional)
    dateAdded?: string             // Fecha de registro ISO
}
```

### Ejemplo de Registro
```json
{
    "id": "1699123456789",
    "vaca": "Gorrita",
    "gender": "H",
    "fecha": "08/23",
    "criaDescripcion": "Becerra saludable nacida en la mañana",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "arete": "001",
    "parentId": null,
    "dateAdded": "2024-01-15T10:30:00.000Z"
}
```

### Validaciones de Parición
```javascript
const ParicionValidation = {
    id: {
        required: true,
        type: 'string',
        unique: true
    },
    vaca: {
        required: true,
        type: 'string',
        minLength: 1,
        maxLength: 100
    },
    gender: {
        required: true,
        type: 'string',
        enum: ['H', 'M']
    },
    fecha: {
        required: true,
        type: 'string',
        pattern: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/?\d{2,4}?$/
    },
    criaDescripcion: {
        required: false,
        type: 'string',
        maxLength: 500
    }
};
```

## 🐮 Estructura de Ganado

### Esquema de Ganado
```javascript
interface Ganado {
    id: string,                    // Identificador único
    animal: string,                // Nombre del animal
    origen: string,                // Procedencia del animal
    comentarios: string,           // Notas adicionales
    gender: 'H' | 'M',            // Género del animal
    tipo: 'V' | 'T' | 'B' | '_B', // Tipo de ganado
    fechas: string,                // Fechas importantes
    muerto_vendido: 'N' | 'S',    // Estado del animal
    image?: string,                // Imagen en Base64 (opcional)
    arete?: string,                // Número de arete (opcional)
    parentId?: string,             // ID del padre/madre (opcional)
    dateAdded?: string             // Fecha de registro ISO
}
```

### Tipos de Ganado
```javascript
const TiposGanado = {
    'V': {
        nombre: 'Vaca',
        descripcion: 'Hembra adulta reproductora',
        emoji: '🐄',
        genero_esperado: 'H'
    },
    'T': {
        nombre: 'Toro',
        descripcion: 'Macho adulto reproductor',
        emoji: '🐂',
        genero_esperado: 'M'
    },
    'B': {
        nombre: 'Becerra',
        descripcion: 'Hembra joven',
        emoji: '🐄',
        genero_esperado: 'H'
    },
    '_B': {
        nombre: 'Becerro',
        descripcion: 'Macho joven',
        emoji: '🐂',
        genero_esperado: 'M'
    }
};
```

### Estados del Animal
```javascript
const EstadosAnimal = {
    'N': {
        nombre: 'Vivo',
        descripcion: 'Animal activo en el inventario',
        emoji: '✅',
        incluir_en_conteos: true
    },
    'S': {
        nombre: 'Muerto/Vendido',
        descripcion: 'Animal no activo',
        emoji: '💀',
        incluir_en_conteos: false
    }
};
```

### Ejemplo de Registro
```json
{
    "id": "1699123456790",
    "animal": "Becerra Luna",
    "origen": "Rancho Norte",
    "comentarios": "Animal joven y saludable, excelente genética",
    "gender": "H",
    "tipo": "B",
    "fechas": "Nacimiento: 15/01/2023, Destete: 15/07/2023",
    "muerto_vendido": "N",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "arete": "B001",
    "parentId": "1699123456788",
    "dateAdded": "2024-01-15T10:30:00.000Z"
}
```

## 💾 Estructura de Snapshots

### Esquema de Snapshot
```javascript
interface Snapshot {
    id: string,                    // Identificador único
    name: string,                  // Nombre del respaldo
    type: 'full' | 'pariciones' | 'ganado', // Tipo de respaldo
    timestamp: string,             // Timestamp ISO de creación
    date: string,                  // Fecha legible (DD/MM/YYYY)
    data: {
        pariciones?: Array<Paricion>,
        ganado?: Array<Ganado>
    }
}
```

### Tipos de Snapshot
```javascript
const TiposSnapshot = {
    'full': {
        nombre: 'Completo',
        descripcion: 'Pariciones + Ganado',
        emoji: '💾',
        incluye: ['pariciones', 'ganado']
    },
    'pariciones': {
        nombre: 'Solo Pariciones',
        descripcion: 'Únicamente datos de nacimientos',
        emoji: '🍼',
        incluye: ['pariciones']
    },
    'ganado': {
        nombre: 'Solo Inventario',
        descripcion: 'Únicamente datos de ganado',
        emoji: '🐮',
        incluye: ['ganado']
    }
};
```

### Ejemplo de Snapshot
```json
{
    "id": "1699123456791",
    "name": "Respaldo Mensual Enero 2024",
    "type": "full",
    "timestamp": "2024-01-31T23:59:59.000Z",
    "date": "31/1/2024",
    "data": {
        "pariciones": [
            {
                "id": "1699123456789",
                "vaca": "Gorrita",
                "gender": "H",
                "fecha": "08/23",
                "criaDescripcion": "Becerra saludable"
            }
        ],
        "ganado": [
            {
                "id": "1699123456790",
                "animal": "Becerra Luna",
                "origen": "Rancho Norte",
                "gender": "H",
                "tipo": "B",
                "muerto_vendido": "N"
            }
        ]
    }
}
```

## 📝 Estructura de Actividades

### Esquema de Actividad
```javascript
interface Activity {
    id: string,                    // Identificador único
    timestamp: string,             // Timestamp ISO
    action: string,                // Descripción de la acción
    type: 'create' | 'update' | 'delete' | 'import' | 'export' | 'backup',
    entity: 'paricion' | 'ganado' | 'snapshot',
    entityId?: string,             // ID de la entidad afectada
    details?: object               // Detalles adicionales
}
```

### Tipos de Actividades
```javascript
const TiposActividad = {
    'create': 'Crear registro',
    'update': 'Actualizar registro',
    'delete': 'Eliminar registro',
    'import': 'Importar datos',
    'export': 'Exportar datos',
    'backup': 'Operación de respaldo'
};
```

## 🔗 Relaciones Entre Entidades

### Relación Padre-Hijo
```javascript
// Parición puede tener padre/madre
paricion.parentId -> ganado.id

// Ganado puede tener padre/madre
ganado.parentId -> ganado.id

// Ejemplo de árbol genealógico
{
    "toro_principal": {
        "id": "toro_001",
        "animal": "Toro Principal",
        "tipo": "T",
        "hijos": ["becerra_001", "becerro_002"]
    },
    "becerra_001": {
        "id": "becerra_001",
        "animal": "Becerra Luna",
        "tipo": "B",
        "parentId": "toro_001"
    }
}
```

### Trazabilidad
```javascript
// Seguimiento de origen de parición a ganado
const trazabilidad = {
    paricion_id: "par_001",
    ganado_id: "gan_001", // Si la cría se mantiene en inventario
    relacion: "cria_mantenida"
};
```

## 📊 Formatos de Importación

### CSV de Pariciones
```csv
Vaca,Género,Fecha,Cría Descripción
Gorrita,H,08/23,Becerra saludable nacida en la mañana
Mora,M,09/23,Becerro grande y fuerte
Colorada,H,10/23,Gemelas hembras
```

### CSV de Ganado
```csv
Animal,Origen,Comentarios,Género,Tipo,Fechas,Estado
Becerra Luna,Rancho Norte,Animal joven y saludable,H,B,01/15/2023,N
Toro Principal,Compra Directa,Reproductor principal del hato,M,T,12/10/2022,N
Vaca Estrella,Nacimiento Propio,Excelente productora,H,V,03/20/2021,N
```

### JSON de Respaldo
```json
{
    "version": "1.0.0",
    "export_date": "2024-01-31T23:59:59.000Z",
    "data": {
        "pariciones": [...],
        "ganado": [...],
        "snapshots": [...]
    },
    "metadata": {
        "total_pariciones": 150,
        "total_ganado": 89,
        "total_snapshots": 5
    }
}
```

## 🔍 Índices y Búsquedas

### Índices Virtuales
```javascript
// Índices para búsqueda rápida
const indices = {
    pariciones_por_vaca: Map<string, Array<Paricion>>,
    pariciones_por_año: Map<string, Array<Paricion>>,
    ganado_por_tipo: Map<string, Array<Ganado>>,
    ganado_por_origen: Map<string, Array<Ganado>>,
    ganado_vivo: Array<Ganado>,
    ganado_muerto: Array<Ganado>
};
```

### Algoritmos de Búsqueda
```javascript
// Búsqueda por texto (case-insensitive)
function buscarTexto(array, campo, texto) {
    return array.filter(item => 
        item[campo].toLowerCase().includes(texto.toLowerCase())
    );
}

// Búsqueda por múltiples criterios
function buscarMultiple(array, criterios) {
    return array.filter(item => {
        return Object.keys(criterios).every(key => {
            if (!criterios[key]) return true;
            return item[key] === criterios[key];
        });
    });
}
```

## 📈 Cálculos y Estadísticas

### Contadores Básicos
```javascript
const estadisticas = {
    // Pariciones
    total_pariciones: pariciones.length,
    pariciones_hembras: pariciones.filter(p => p.gender === 'H').length,
    pariciones_machos: pariciones.filter(p => p.gender === 'M').length,
    
    // Ganado
    total_historico: ganado.length,
    ganado_vivo: ganado.filter(g => g.muerto_vendido === 'N').length,
    ganado_muerto: ganado.filter(g => g.muerto_vendido === 'S').length,
    
    // Por tipo
    vacas: ganado.filter(g => g.tipo === 'V' && g.muerto_vendido === 'N').length,
    toros: ganado.filter(g => g.tipo === 'T' && g.muerto_vendido === 'N').length,
    becerras: ganado.filter(g => g.tipo === 'B' && g.muerto_vendido === 'N').length,
    becerros: ganado.filter(g => g.tipo === '_B' && g.muerto_vendido === 'N').length
};
```

### Análisis Temporal
```javascript
// Pariciones por año
function paricionesPorAño(pariciones) {
    const porAño = {};
    pariciones.forEach(p => {
        const año = extraerAño(p.fecha);
        porAño[año] = (porAño[año] || 0) + 1;
    });
    return porAño;
}

// Tendencias mensuales
function tendenciasMensuales(pariciones, año) {
    const meses = Array(12).fill(0);
    pariciones
        .filter(p => extraerAño(p.fecha) === año)
        .forEach(p => {
            const mes = extraerMes(p.fecha) - 1;
            meses[mes]++;
        });
    return meses;
}
```

## 🔒 Validación y Integridad

### Validadores de Datos
```javascript
const validadores = {
    // Validar ID único
    validarIdUnico: (id, array) => {
        return !array.some(item => item.id === id);
    },
    
    // Validar formato de fecha
    validarFecha: (fecha) => {
        const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/?\d{2,4}?$/;
        return regex.test(fecha);
    },
    
    // Validar género
    validarGenero: (genero) => {
        return ['H', 'M'].includes(genero);
    },
    
    // Validar tipo de ganado
    validarTipo: (tipo) => {
        return ['V', 'T', 'B', '_B'].includes(tipo);
    }
};
```

### Limpieza de Datos
```javascript
// Sanitizar entrada de texto
function sanitizarTexto(texto) {
    return texto
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 500); // Límite de caracteres
}

// Normalizar fechas
function normalizarFecha(fecha) {
    // Convertir diferentes formatos a MM/DD/YYYY
    const regex = /^(\d{1,2})\/(\d{1,2})\/?(\d{2,4})?$/;
    const match = fecha.match(regex);
    
    if (match) {
        let [, mes, dia, año] = match;
        if (!año) año = new Date().getFullYear().toString();
        if (año.length === 2) año = '20' + año;
        
        return `${mes.padStart(2, '0')}/${dia.padStart(2, '0')}/${año}`;
    }
    
    return fecha; // Retornar original si no coincide
}
```

## 📦 Migración de Datos

### Versionado de Esquemas
```javascript
const SCHEMA_VERSIONS = {
    '1.0.0': {
        pariciones: ['id', 'vaca', 'gender', 'fecha', 'notes'],
        ganado: ['id', 'animal', 'origen', 'comentarios', 'gender', 'tipo', 'fechas', 'muerto_vendido']
    },
    '1.1.0': {
        pariciones: ['id', 'vaca', 'gender', 'fecha', 'criaDescripcion'], // notes -> criaDescripcion
        ganado: ['id', 'animal', 'origen', 'comentarios', 'gender', 'tipo', 'fechas', 'muerto_vendido']
    }
};
```

### Scripts de Migración
```javascript
function migrarDatos(version_actual, version_destino) {
    const datos = cargarDatos();
    
    if (version_actual === '1.0.0' && version_destino === '1.1.0') {
        // Migrar notes a criaDescripcion
        datos.pariciones = datos.pariciones.map(p => ({
            ...p,
            criaDescripcion: p.notes || '',
            notes: undefined
        }));
    }
    
    guardarDatos(datos);
    actualizarVersion(version_destino);
}
```

---

**¡Estructura de datos robusta y escalable! 🗄️**
