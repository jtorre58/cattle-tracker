const { createApp } = Vue;

createApp({
    data() {
        return {
            animals: JSON.parse(localStorage.getItem('ranchAnimals')) || [],
            activities: JSON.parse(localStorage.getItem('ranchActivities')) || [],
            pariciones: JSON.parse(localStorage.getItem('ranchPariciones')) || [],
            ganado: JSON.parse(localStorage.getItem('ranchGanado')) || [],
            
            // UI State
            activeTab: 'pariciones',
            showAddAnimal: false,
            showCsvUpload: false,
            showSpreadsheetImport: false,
            showAddParicion: false,
            showAddGanado: false,
            showGanadoImport: false,
            animalFilter: 'all',
            ganadoFilter: 'all',
            yearFilter: 'all',
            monthFilter: 'all',
            dateFrom: '',
            dateTo: '',
            
            // Forms
            newAnimal: {
                type: 'cattle',
                tagNumber: '',
                name: '',
                gender: 'male',
                birthDate: '',
                breed: '',
                weight: '',
                notes: ''
            },
            
            // CSV Upload
            csvPreview: [],
            duplicates: [],
            
            // Spreadsheet Import
            spreadsheetData: '',
            importPreview: [],
            importDuplicates: [],
            editingParicion: null,
            
            // Paricion Form
            currentParicion: {
                vaca: '',
                gender: 'H',
                fecha: '',
                notes: '',
                image: null,
                arete: '',
                parentId: null
            },
            
            // Ganado Import
            ganadoData: '',
            ganadoPreview: [],
            editingGanado: null,
            
            // Ganado Form
            newGanado: {
                animal: '',
                origen: '',
                comentarios: '',
                gender: 'H',
                tipo: 'V',
                fechas: '',
                muerto_vendido: 'N',
                notas: '',
                image: null,
                arete: '',
                parentId: null
            },
            
            // Form change tracking
            originalParicion: null,
            originalGanado: null,
            
            // Image lightbox
            showImageLightbox: false,
            lightboxImage: null,
            
            // Family tree
            showFamilyTree: false,
            selectedAnimal: null
        }
    },
    
    computed: {
        activeAnimals() {
            return this.animals.filter(a => a.status === 'active');
        },
        
        maleCount() {
            return this.activeAnimals.filter(a => a.gender === 'male').length;
        },
        
        femaleCount() {
            return this.activeAnimals.filter(a => a.gender === 'female').length;
        },
        
        // Pariciones Calculations (H/M based) - use filtered data
        paricionesMales() {
            // Force reactivity by directly accessing filter properties
            let filtered = [...this.pariciones];
            
            if (this.yearFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date.getFullYear() == this.yearFilter;
                });
            }
            
            if (this.monthFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && (date.getMonth() + 1) == this.monthFilter;
                });
            }
            
            if (this.dateFrom) {
                const fromDate = new Date(this.dateFrom);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date >= fromDate;
                });
            }
            
            if (this.dateTo) {
                const toDate = new Date(this.dateTo);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date <= toDate;
                });
            }
            
            return filtered.filter(p => p.gender && p.gender.toUpperCase() === 'M').length;
        },
        
        paricionesHembras() {
            // Force reactivity by directly accessing filter properties
            let filtered = [...this.pariciones];
            
            if (this.yearFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date.getFullYear() == this.yearFilter;
                });
            }
            
            if (this.monthFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && (date.getMonth() + 1) == this.monthFilter;
                });
            }
            
            if (this.dateFrom) {
                const fromDate = new Date(this.dateFrom);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date >= fromDate;
                });
            }
            
            if (this.dateTo) {
                const toDate = new Date(this.dateTo);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date <= toDate;
                });
            }
            
            return filtered.filter(p => p.gender && p.gender.toUpperCase() === 'H').length;
        },
        
        totalFilteredPariciones() {
            return this.filteredPariciones.length;
        },
        
        // Debug counter to test reactivity
        debugYearFilter() {
            return `Year: ${this.yearFilter} - Count: ${this.filteredPariciones.length}`;
        },
        
        // Debug available years
        debugAvailableYears() {
            const debug = [];
            this.pariciones.forEach((p, i) => {
                const date = this.parseDate(p.fecha);
                debug.push(`${i}: "${p.fecha}" -> ${date ? date.getFullYear() : 'null'}`);
            });
            return debug.slice(0, 5); // Show first 5
        },
        
        filteredAnimals() {
            if (this.animalFilter === 'all') {
                return this.activeAnimals;
            }
            return this.activeAnimals.filter(a => a.type === this.animalFilter);
        },
        
        filteredPariciones() {
            let filtered = [...this.pariciones];
            
            if (this.yearFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date.getFullYear() == this.yearFilter;
                });
            }
            
            if (this.monthFilter !== 'all') {
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && (date.getMonth() + 1) == this.monthFilter;
                });
            }
            
            if (this.dateFrom) {
                const fromDate = new Date(this.dateFrom);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date >= fromDate;
                });
            }
            
            if (this.dateTo) {
                const toDate = new Date(this.dateTo);
                filtered = filtered.filter(p => {
                    const date = this.parseDate(p.fecha);
                    return date && date <= toDate;
                });
            }
            
            return filtered.sort((a, b) => {
                const dateA = this.parseDate(a.fecha);
                const dateB = this.parseDate(b.fecha);
                return (dateB || new Date(0)) - (dateA || new Date(0));
            });
        },
        
        availableYears() {
            const years = new Set();
            this.pariciones.forEach(p => {
                if (p.fecha && typeof p.fecha === 'string') {
                    const date = this.parseDate(p.fecha);
                    if (date && date instanceof Date && !isNaN(date.getTime())) {
                        const year = date.getFullYear();
                        if (Number.isInteger(year) && year >= 1900 && year <= 2100) {
                            years.add(year);
                        }
                    }
                }
            });
            const validYears = Array.from(years).filter(year => Number.isInteger(year) && !isNaN(year));
            return validYears.sort((a, b) => b - a);
        },
        
        filteredGanado() {
            if (this.ganadoFilter === 'all') {
                return this.ganado;
            }
            return this.ganado.filter(g => g.tipo === this.ganadoFilter);
        },
        
        ganadoByType() {
            const counts = { V: 0, T: 0, B: 0, _B: 0 };
            // Only count living animals (not dead/sold)
            this.filteredGanado.filter(g => g.muerto_vendido !== 'S').forEach(g => {
                if (counts.hasOwnProperty(g.tipo)) {
                    counts[g.tipo]++;
                }
            });
            return counts;
        },
        
        ganadoVivos() {
            return this.filteredGanado.filter(g => g.muerto_vendido !== 'S').length;
        },
        
        ganadoMuertosVendidos() {
            return this.filteredGanado.filter(g => g.muerto_vendido === 'S').length;
        },
        
        // Ganado Calculations (matching spreadsheet structure)
        ganadoTotalHistorico() {
            return this.ganado.length; // 101
        },
        
        ganadoHembrasTotal() {
            return this.ganado.filter(g => g.gender === 'H').length; // 93
        },
        
        ganadoMachosTotal() {
            return this.ganado.filter(g => g.gender === 'M').length; // 8
        },
        
        ganadoCriasNacidas() {
            // Count all B and _B types (regardless of alive/dead) - Ganado tab logic
            return this.ganado.filter(g => g.tipo === 'B' || g.tipo === '_B').length;
        },
        
        ganadoVacasVivas() {
            // Count V type that are alive (N or empty)
            return this.ganado.filter(g => g.tipo === 'V' && (g.muerto_vendido === 'N' || !g.muerto_vendido)).length; // 17
        },
        
        ganadoTorosVivos() {
            // Count T type that are alive (N or empty)
            return this.ganado.filter(g => g.tipo === 'T' && (g.muerto_vendido === 'N' || !g.muerto_vendido)).length; // 1
        },
        
        ganadoBecerrasVivas() {
            // Count B type that are alive (N or empty)
            return this.ganado.filter(g => g.tipo === 'B' && (g.muerto_vendido === 'N' || !g.muerto_vendido)).length; // 36
        },
        
        ganadoTotalNeto() {
            // Sum of living Vacas + Toros + Becerras only (excludes _B becerros)
            return this.ganadoVacasVivas + this.ganadoTorosVivos + this.ganadoBecerrasVivas; // Should be 54
        },
        
        ganadoVacasMuertas() {
            // Count V type that are dead/sold (S)
            return this.ganado.filter(g => g.tipo === 'V' && g.muerto_vendido === 'S').length; // 13
        },
        
        ganadoBecerrasMuertas() {
            // Count B type that are dead/sold (S)
            return this.ganado.filter(g => g.tipo === 'B' && g.muerto_vendido === 'S').length; // 7
        },
        
        ganadoTotalRebajarHembras() {
            // Total dead/sold hembras (Vacas + Becerras)
            return this.ganadoVacasMuertas + this.ganadoBecerrasMuertas; // 20
        },
        
        ganadoTorosVendidos() {
            // Count T type that are dead/sold (S)
            return this.ganado.filter(g => g.tipo === 'T' && g.muerto_vendido === 'S').length; // 2
        },
        
        ganadoTotalMuertosVendidos() {
            // Total dead/sold (Vacas + Becerras + Toros + Becerros)
            const becerrosMuertos = this.ganado.filter(g => g.tipo === '_B' && g.muerto_vendido === 'S').length;
            return this.ganadoVacasMuertas + this.ganadoBecerrasMuertas + this.ganadoTorosVendidos + becerrosMuertos; // 22
        },
        
        recentActivities() {
            return this.activities.slice(0, 10);
        },
        
        paricionHasChanges() {
            if (!this.originalParicion) return false;
            return JSON.stringify(this.currentParicion) !== JSON.stringify(this.originalParicion);
        },
        
        ganadoHasChanges() {
            if (!this.originalGanado) return false;
            return JSON.stringify(this.newGanado) !== JSON.stringify(this.originalGanado);
        }
    },
    
    methods: {
        addAnimal() {
            const animal = {
                id: Date.now().toString(),
                ...this.newAnimal,
                status: 'active',
                dateAdded: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
            
            this.animals.push(animal);
            this.addActivity(`Added new ${animal.type}: ${animal.tagNumber}${animal.name ? ` (${animal.name})` : ''}`);
            this.saveData();
            this.showAddAnimal = false;
            this.resetNewAnimal();
        },
        
        resetNewAnimal() {
            this.newAnimal = {
                type: 'cattle',
                tagNumber: '',
                name: '',
                gender: 'male',
                birthDate: '',
                breed: '',
                weight: '',
                notes: ''
            };
        },
        
        updateAnimalStatus(animalId, status) {
            const animal = this.animals.find(a => a.id === animalId);
            if (animal) {
                animal.status = status;
                animal.lastUpdated = new Date().toISOString();
                if (status === 'sold') {
                    animal.soldDate = new Date().toISOString();
                } else if (status === 'deceased') {
                    animal.deceasedDate = new Date().toISOString();
                }
                this.addActivity(`Marked ${animal.tagNumber} as ${status}`);
                this.saveData();
            }
        },
        
        addActivity(description) {
            this.activities.unshift({
                id: Date.now().toString(),
                description,
                timestamp: new Date().toISOString()
            });
            
            if (this.activities.length > 50) {
                this.activities = this.activities.slice(0, 50);
            }
        },
        
        handleCsvFile(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            if (!file.name.toLowerCase().endsWith('.csv')) {
                alert('Please select a CSV file');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.parseCsvData(e.target.result);
            };
            reader.readAsText(file);
        },
        
        handleDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.handleCsvFile({ target: { files } });
            }
        },
        
        parseCsvData(csvText) {
            const lines = csvText.split('\n').filter(line => line.trim());
            console.log('CSV Lines:', lines); // Debug
            
            this.csvPreview = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                console.log('Row values:', values); // Debug
                
                if (values[0] && values[0].trim()) {
                    const paricion = {
                        vaca: values[0].trim(),
                        gender: values[1] ? values[1].trim() : '',
                        fecha: values[2] ? values[2].trim() : '',
                        notes: values[3] ? values[3].trim() : '',
                        id: Date.now().toString() + i
                    };
                    console.log('Created paricion:', paricion); // Debug
                    this.csvPreview.push(paricion);
                }
            }
            
            console.log('Total parsed:', this.csvPreview.length); // Debug
            this.findDuplicates();
        },
        
        findDuplicates() {
            this.duplicates = [];
            for (const newParicion of this.csvPreview) {
                const existing = this.pariciones.find(p => 
                    p.vaca.toLowerCase() === newParicion.vaca.toLowerCase() && 
                    p.fecha === newParicion.fecha
                );
                if (existing) {
                    this.duplicates.push(newParicion);
                }
            }
        },
        
        isDuplicate(paricion) {
            return this.duplicates.some(d => d.vaca === paricion.vaca && d.fecha === paricion.fecha);
        },
        
        processCsvData() {
            const newPariciones = this.csvPreview.filter(newP => 
                !this.duplicates.some(d => d.vaca === newP.vaca && d.fecha === newP.fecha)
            );
            
            newPariciones.forEach(paricion => {
                paricion.dateAdded = new Date().toISOString();
                paricion.parsedDate = this.parseDate(paricion.fecha);
                this.pariciones.push(paricion);
            });
            
            this.addActivity(`Imported ${newPariciones.length} pariciones from CSV${this.duplicates.length > 0 ? ` (${this.duplicates.length} duplicates skipped)` : ''}`);
            this.saveData();
            
            this.showCsvUpload = false;
            this.csvPreview = [];
            this.duplicates = [];
            
            alert(`Successfully imported ${newPariciones.length} pariciones!${this.duplicates.length > 0 ? ` ${this.duplicates.length} duplicates were skipped.` : ''}`);
        },
        
        parseDate(dateStr) {
            if (!dateStr || typeof dateStr !== 'string') return null;
            
            const trimmed = dateStr.trim();
            if (!trimmed) return null;
            
            // Handle MM/YY format (e.g., "08/23", "1/24")
            const parts = trimmed.split('/');
            if (parts.length === 2) {
                const month = parseInt(parts[0]);
                const year = parseInt(parts[1]);
                
                // Validate month and year
                if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return null;
                
                // Convert 2-digit year to 4-digit
                let fullYear;
                if (year < 50) {
                    fullYear = 2000 + year;
                } else if (year < 100) {
                    fullYear = 1900 + year;
                } else {
                    fullYear = year;
                }
                
                // Validate final year
                if (fullYear < 1900 || fullYear > 2100) return null;
                
                return new Date(fullYear, month - 1, 1);
            }
            
            // Handle MM/DD/YYYY format
            if (parts.length === 3) {
                const month = parseInt(parts[0]);
                const day = parseInt(parts[1]);
                const year = parseInt(parts[2]);
                
                if (isNaN(month) || isNaN(day) || isNaN(year) || 
                    month < 1 || month > 12 || day < 1 || day > 31 ||
                    year < 1900 || year > 2100) return null;
                
                return new Date(year, month - 1, day);
            }
            
            // Try to parse as regular date
            const date = new Date(trimmed);
            return isNaN(date.getTime()) ? null : date;
        },
        
        calculateAge(birthDate) {
            if (!birthDate) return 'Unknown';
            
            const birth = new Date(birthDate);
            const now = new Date();
            const diffTime = Math.abs(now - birth);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 30) {
                return `${diffDays} days`;
            } else if (diffDays < 365) {
                const months = Math.floor(diffDays / 30);
                return `${months} month${months > 1 ? 's' : ''}`;
            } else {
                const years = Math.floor(diffDays / 365);
                const remainingMonths = Math.floor((diffDays % 365) / 30);
                return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = now - date;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                return 'Today ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            } else if (diffDays === 1) {
                return 'Yesterday';
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else {
                return date.toLocaleDateString();
            }
        },
        
        clearFilters() {
            this.yearFilter = 'all';
            this.monthFilter = 'all';
            this.dateFrom = '';
            this.dateTo = '';
        },
        
        clearAllData() {
            if (this.activeTab === 'pariciones') {
                if (confirm('¿Estás seguro de que quieres eliminar TODOS los datos de Pariciones? Esta acción no se puede deshacer.')) {
                    this.pariciones = [];
                    this.saveData();
                    alert('Datos de Pariciones eliminados exitosamente!');
                }
            } else if (this.activeTab === 'ganado') {
                if (confirm('¿Estás seguro de que quieres eliminar TODOS los datos de Ganado? Esta acción no se puede deshacer.')) {
                    this.ganado = [];
                    this.saveData();
                    alert('Datos de Ganado eliminados exitosamente!');
                }
            }
        },
        
        exportData() {
            const backupData = {
                animals: this.animals,
                pariciones: this.pariciones,
                activities: this.activities,
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            const dataStr = JSON.stringify(backupData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `ranch-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            this.addActivity('Exported data backup');
        },
        
        importData(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const backupData = JSON.parse(e.target.result);
                    
                    // Validate backup structure
                    if (!backupData.animals || !backupData.pariciones || !backupData.activities) {
                        throw new Error('Invalid backup file format');
                    }
                    
                    const confirmMsg = `Import backup from ${backupData.exportDate ? new Date(backupData.exportDate).toLocaleDateString() : 'unknown date'}?\n\nThis will replace all current data:\n- ${backupData.animals.length} animals\n- ${backupData.pariciones.length} pariciones\n- ${backupData.activities.length} activities`;
                    
                    if (confirm(confirmMsg)) {
                        this.animals = backupData.animals;
                        this.pariciones = backupData.pariciones;
                        this.activities = backupData.activities;
                        this.saveData();
                        
                        alert('Backup imported successfully!');
                        this.addActivity('Imported data backup');
                    }
                    
                } catch (error) {
                    alert('Error importing backup: Invalid file format');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
            
            // Reset file input
            event.target.value = '';
        },
        
        // Ganado Methods
        addGanado() {
            if (this.editingGanado) {
                // Update existing ganado
                const index = this.ganado.findIndex(g => g.id === this.editingGanado.id);
                if (index !== -1) {
                    this.ganado[index] = { ...this.newGanado, id: this.editingGanado.id };
                    this.addActivity(`Actualizado ganado: ${this.newGanado.animal}`);
                }
                this.editingGanado = null;
            } else {
                // Add new ganado
                const ganado = {
                    id: Date.now().toString(),
                    ...this.newGanado,
                    dateAdded: new Date().toISOString()
                };
                this.ganado.push(ganado);
                this.addActivity(`Agregado ganado: ${ganado.animal}`);
            }
            
            this.saveData();
            this.showAddGanado = false;
            this.resetGanadoForm();
        },
        
        resetGanadoForm() {
            this.newGanado = {
                animal: '',
                origen: '',
                comentarios: '',
                gender: 'H',
                tipo: 'V',
                fechas: '',
                muerto_vendido: 'N',
                notas: '',
                image: null,
                arete: '',
                parentId: null
            };
            this.originalGanado = null;
        },
        
        parseGanadoData() {
            if (!this.ganadoData.trim()) {
                alert('Please paste ganado data first');
                return;
            }
            
            const lines = this.ganadoData.trim().split('\n');
            this.ganadoPreview = [];
            
            // Skip header row if it exists
            const startIndex = lines[0].toLowerCase().includes('animal') ? 1 : 0;
            
            for (let i = startIndex; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const values = line.includes('\t') ? line.split('\t') : line.split(',');
                
                if (values[0] && values[0].trim()) {
                    const ganado = {
                        animal: values[0].trim(),
                        origen: values[1] ? values[1].trim() : '',
                        comentarios: values[2] ? values[2].trim() : '',
                        gender: values[3] ? values[3].trim() : 'H',
                        tipo: values[4] ? values[4].trim() : 'V',
                        fechas: values[5] ? values[5].trim() : '',
                        muerto_vendido: values[6] ? values[6].trim() : 'N',
                        notas: values[7] ? values[7].trim() : '',
                        id: Date.now().toString() + i,
                        dateAdded: new Date().toISOString()
                    };
                    console.log('Parsed ganado:', ganado); // Debug
                    this.ganadoPreview.push(ganado);
                }
            }
            
            console.log('Total ganado parsed:', this.ganadoPreview.length); // Debug
        },
        
        processGanadoData() {
            const importCount = this.ganadoPreview.length;
            
            // Check for duplicates
            const newRecords = this.ganadoPreview.filter(newG => 
                !this.ganado.some(existing => 
                    existing.animal === newG.animal && 
                    existing.origen === newG.origen &&
                    existing.tipo === newG.tipo
                )
            );
            
            newRecords.forEach(ganado => {
                this.ganado.push(ganado);
            });
            
            const duplicateCount = importCount - newRecords.length;
            
            this.addActivity(`Imported ${newRecords.length} ganado records${duplicateCount > 0 ? ` (${duplicateCount} duplicates skipped)` : ''}`);
            this.saveData();
            
            this.showGanadoImport = false;
            this.ganadoData = '';
            this.ganadoPreview = [];
            
            alert(`Successfully imported ${newRecords.length} ganado records!${duplicateCount > 0 ? ` ${duplicateCount} duplicates were skipped.` : ''}`);
        },
        
        testVue() {
            alert('Vue is working! showSpreadsheetImport = ' + this.showSpreadsheetImport);
        },
        
        // Spreadsheet Import Methods
        parseSpreadsheetData() {
            if (!this.spreadsheetData.trim()) {
                alert('Please paste spreadsheet data first');
                return;
            }
            
            const lines = this.spreadsheetData.trim().split('\n');
            this.importPreview = [];
            let skippedRows = [];
            
            // Skip header row - check if first row contains header keywords
            let startIndex = 0;
            if (lines.length > 0) {
                const firstLine = lines[0].toLowerCase();
                if (firstLine.includes('vaca') || firstLine.includes('h/m') || firstLine.includes('fecha')) {
                    startIndex = 1;
                }
            }
            
            for (let i = startIndex; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                // Split by tab (from spreadsheet copy) or comma
                const values = line.includes('\t') ? line.split('\t') : line.split(',');
                
                if (values[0] && values[0].trim()) {
                    const paricion = {
                        vaca: values[0].trim(),
                        gender: values[1] ? values[1].trim() : '',
                        fecha: values[2] ? values[2].trim() : '',
                        notes: values[3] ? values[3].trim() : '',
                        id: Date.now().toString() + i
                    };
                    
                    // Validation warnings
                    if (!paricion.gender) {
                        paricion.warning = 'Missing gender';
                    } else if (!paricion.fecha) {
                        paricion.warning = 'Missing date';
                    }
                    
                    this.importPreview.push(paricion);
                } else {
                    skippedRows.push(`Row ${i + 1}: Missing cow name`);
                }
            }
            
            // Show validation summary
            if (skippedRows.length > 0) {
                alert(`Warning: ${skippedRows.length} rows skipped:\n${skippedRows.join('\n')}`);
            }
            
            this.findImportDuplicates();
        },
        
        findImportDuplicates() {
            this.importDuplicates = [];
            for (const newParicion of this.importPreview) {
                const existing = this.pariciones.find(p => 
                    p.vaca.toLowerCase() === newParicion.vaca.toLowerCase() && 
                    p.fecha === newParicion.fecha
                );
                if (existing) {
                    this.importDuplicates.push(newParicion);
                }
            }
        },
        
        isImportDuplicate(paricion) {
            return this.importDuplicates.some(d => d.vaca === paricion.vaca && d.fecha === paricion.fecha);
        },
        
        processSpreadsheetData() {
            const newPariciones = this.importPreview.filter(newP => 
                !this.importDuplicates.some(d => d.vaca === newP.vaca && d.fecha === newP.fecha)
            );
            
            newPariciones.forEach(paricion => {
                paricion.dateAdded = new Date().toISOString();
                paricion.parsedDate = this.parseDate(paricion.fecha);
                this.pariciones.push(paricion);
            });
            
            this.addActivity(`Imported ${newPariciones.length} pariciones from spreadsheet${this.importDuplicates.length > 0 ? ` (${this.importDuplicates.length} duplicates skipped)` : ''}`);
            this.saveData();
            
            this.showSpreadsheetImport = false;
            this.spreadsheetData = '';
            this.importPreview = [];
            this.importDuplicates = [];
            
            alert(`Successfully imported ${newPariciones.length} pariciones!${this.importDuplicates.length > 0 ? ` ${this.importDuplicates.length} duplicates were skipped.` : ''}`);
        },
        
        editParicion(paricion) {
            this.editingParicion = paricion;
            this.currentParicion = { ...paricion };
            this.originalParicion = { ...paricion };
            this.showAddParicion = true;
        },
        
        startAddParicion() {
            this.editingParicion = null;
            this.resetParicionForm();
            // For new records, set original to empty so any input shows as changes
            this.originalParicion = {
                vaca: '',
                gender: 'H',
                fecha: '',
                notes: '',
                image: null
            };
            this.showAddParicion = true;
        },
        
        editGanadoRecord(ganado) {
            this.editingGanado = ganado;
            this.newGanado = { ...ganado };
            this.originalGanado = { ...ganado };
            this.showAddGanado = true;
        },
        
        startAddGanado() {
            this.editingGanado = null;
            this.resetGanadoForm();
            // For new records, set original to empty so any input shows as changes
            this.originalGanado = {
                animal: '',
                origen: '',
                comentarios: '',
                gender: 'H',
                tipo: 'V',
                fechas: '',
                muerto_vendido: 'N',
                notas: '',
                image: null
            };
            this.showAddGanado = true;
        },
        
        saveParicion() {
            if (this.editingParicion) {
                // Update existing paricion
                const index = this.pariciones.findIndex(p => p.id === this.editingParicion.id);
                if (index !== -1) {
                    this.pariciones[index] = { 
                        ...this.currentParicion, 
                        id: this.editingParicion.id,
                        parsedDate: this.parseDate(this.currentParicion.fecha)
                    };
                    this.addActivity(`Actualizada parición: ${this.currentParicion.vaca}`);
                }
                this.editingParicion = null;
            } else {
                // Add new paricion
                const paricion = {
                    id: Date.now().toString(),
                    ...this.currentParicion,
                    dateAdded: new Date().toISOString(),
                    parsedDate: this.parseDate(this.currentParicion.fecha)
                };
                this.pariciones.push(paricion);
                this.addActivity(`Agregada parición: ${paricion.vaca}`);
            }
            
            this.saveData();
            this.showAddParicion = false;
            this.resetParicionForm();
        },
        
        resetParicionForm() {
            this.currentParicion = {
                vaca: '',
                gender: 'H',
                fecha: '',
                notes: '',
                image: null,
                arete: '',
                parentId: null
            };
            this.originalParicion = null;
        },
        
        handleParicionImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.currentParicion.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        
        removeParicionImage() {
            this.currentParicion.image = null;
        },
        
        handleGanadoImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newGanado.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        
        removeGanadoImage() {
            this.newGanado.image = null;
        },
        
        showAnimalDetails(animal) {
            // Simple alert for now - can be enhanced with a modal
            alert(`Animal Details:\nID: ${animal.tagNumber}\nName: ${animal.name || 'Unnamed'}\nType: ${animal.type}\nGender: ${animal.gender}\nAge: ${this.calculateAge(animal.birthDate)}`);
        },
        
        addTestData() {
            const testPariciones = [
                { id: '1', vaca: 'Gorrita', gender: 'H', fecha: '08/23', notes: 'Test data' },
                { id: '2', vaca: 'Mora', gender: 'M', fecha: '08/23', notes: 'Test data' },
                { id: '3', vaca: 'Colorada', gender: 'M', fecha: '1/24', notes: 'Test data' }
            ];
            
            testPariciones.forEach(p => {
                p.dateAdded = new Date().toISOString();
                p.parsedDate = this.parseDate(p.fecha);
                this.pariciones.push(p);
            });
            
            this.addActivity('Added test pariciones data');
            this.saveData();
            alert('Test data added!');
        },

        // Reprocess existing data to ensure parsedDate is set
        reprocessExistingData() {
            let updated = false;
            this.pariciones.forEach(p => {
                if (p.fecha && !p.parsedDate) {
                    p.parsedDate = this.parseDate(p.fecha);
                    updated = true;
                }
            });
            if (updated) {
                this.saveData();
            }
        },
        
        openImageLightbox(imageUrl) {
            this.lightboxImage = imageUrl;
            this.showImageLightbox = true;
        },
        
        showFamilyTreeFor(animal) {
            this.selectedAnimal = animal;
            this.showFamilyTree = true;
        },
        
        getFamilyTree(animal) {
            const tree = {
                animal: animal,
                parent: null,
                grandparent: null,
                children: [],
                grandchildren: []
            };
            
            // Find parent
            if (animal.parentId) {
                const parent = [...this.pariciones, ...this.ganado].find(a => a.id === animal.parentId);
                if (parent) {
                    tree.parent = parent;
                    
                    // Find grandparent
                    if (parent.parentId) {
                        const grandparent = [...this.pariciones, ...this.ganado].find(a => a.id === parent.parentId);
                        if (grandparent) {
                            tree.grandparent = grandparent;
                        }
                    }
                }
            }
            
            // Find children
            tree.children = [...this.pariciones, ...this.ganado].filter(a => a.parentId === animal.id);
            
            // Find grandchildren
            tree.children.forEach(child => {
                const grandchildren = [...this.pariciones, ...this.ganado].filter(a => a.parentId === child.id);
                tree.grandchildren.push(...grandchildren);
            });
            
            return tree;
        },
        
        getAllAnimals() {
            return [...this.pariciones, ...this.ganado].filter(a => a.vaca || a.animal);
        },

        saveData() {
            localStorage.setItem('ranchAnimals', JSON.stringify(this.animals));
            localStorage.setItem('ranchActivities', JSON.stringify(this.activities));
            localStorage.setItem('ranchPariciones', JSON.stringify(this.pariciones));
            localStorage.setItem('ranchGanado', JSON.stringify(this.ganado));
        }
    },
    
    mounted() {
        // Reprocess existing data to ensure years dropdown works
        this.reprocessExistingData();
    }
}).mount('#app');
