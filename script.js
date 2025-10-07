class RanchTracker {
    constructor() {
        this.animals = JSON.parse(localStorage.getItem('ranchAnimals')) || [];
        this.activities = JSON.parse(localStorage.getItem('ranchActivities')) || [];
        this.pariciones = JSON.parse(localStorage.getItem('ranchPariciones')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDashboard();
        this.renderAnimals();
        this.renderActivities();
        this.renderPariciones();
        this.populateMotherDropdown();
        this.populateYearFilter();
    }

    bindEvents() {
        document.getElementById('addAnimalBtn').addEventListener('click', () => {
            document.getElementById('addAnimalModal').style.display = 'block';
        });

        document.querySelectorAll('.close').forEach(close => {
            close.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        document.getElementById('addAnimalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAnimal();
        });

        document.getElementById('animalTypeFilter').addEventListener('change', (e) => {
            this.renderAnimals(e.target.value);
        });

        // CSV Upload handlers
        document.getElementById('uploadCsvBtn').addEventListener('click', () => {
            document.getElementById('csvUploadModal').style.display = 'block';
        });

        const dropZone = document.getElementById('dropZone');
        const csvFileInput = document.getElementById('csvFileInput');

        dropZone.addEventListener('click', () => csvFileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleCsvFile(files[0]);
            }
        });

        csvFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleCsvFile(e.target.files[0]);
            }
        });

        document.getElementById('confirmUpload').addEventListener('click', () => {
            this.processCsvData();
        });

        // Pariciones filters
        document.getElementById('yearFilter').addEventListener('change', () => {
            this.renderPariciones();
        });

        document.getElementById('monthFilter').addEventListener('change', () => {
            this.renderPariciones();
        });

        document.getElementById('dateFromFilter').addEventListener('change', () => {
            this.renderPariciones();
        });

        document.getElementById('dateToFilter').addEventListener('change', () => {
            this.renderPariciones();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            document.getElementById('yearFilter').value = 'all';
            document.getElementById('monthFilter').value = 'all';
            document.getElementById('dateFromFilter').value = '';
            document.getElementById('dateToFilter').value = '';
            this.renderPariciones();
        });
    }

    addAnimal() {
        const formData = new FormData(document.getElementById('addAnimalForm'));
        const animal = {
            id: Date.now().toString(),
            type: document.getElementById('animalType').value,
            tagNumber: document.getElementById('tagNumber').value,
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            birthDate: document.getElementById('birthDate').value,
            breed: document.getElementById('breed').value,
            weight: document.getElementById('weight').value,
            motherId: document.getElementById('motherId').value,
            notes: document.getElementById('notes').value,
            status: 'active',
            dateAdded: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        this.animals.push(animal);
        this.addActivity(`Added new ${animal.type}: ${animal.tagNumber}${animal.name ? ` (${animal.name})` : ''}`);
        this.saveData();
        this.updateDashboard();
        this.renderAnimals();
        this.populateMotherDropdown();
        document.getElementById('addAnimalModal').style.display = 'none';
        document.getElementById('addAnimalForm').reset();
    }

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
            this.updateDashboard();
            this.renderAnimals();
        }
    }

    addActivity(description) {
        this.activities.unshift({
            id: Date.now().toString(),
            description,
            timestamp: new Date().toISOString()
        });
        
        if (this.activities.length > 50) {
            this.activities = this.activities.slice(0, 50);
        }
        
        this.renderActivities();
    }

    updateDashboard() {
        const activeAnimals = this.animals.filter(a => a.status === 'active');
        const males = activeAnimals.filter(a => a.gender === 'male').length;
        const females = activeAnimals.filter(a => a.gender === 'female').length;
        const recentActivity = this.activities.filter(a => {
            const activityDate = new Date(a.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return activityDate > weekAgo;
        }).length;

        document.getElementById('totalCount').textContent = activeAnimals.length;
        document.getElementById('maleCount').textContent = males;
        document.getElementById('femaleCount').textContent = females;
        document.getElementById('recentActivity').textContent = recentActivity;
    }

    renderAnimals(filter = 'all') {
        const container = document.getElementById('animalsList');
        let animalsToShow = this.animals.filter(a => a.status === 'active');
        
        if (filter !== 'all') {
            animalsToShow = animalsToShow.filter(a => a.type === filter);
        }

        container.innerHTML = animalsToShow.map(animal => `
            <div class="animal-card" onclick="ranchTracker.showAnimalDetails('${animal.id}')">
                <div class="animal-header">
                    <div class="animal-id">#${animal.tagNumber}</div>
                    <div class="animal-type">${animal.type}</div>
                </div>
                <div class="animal-info">
                    <div><strong>Name:</strong> ${animal.name || 'N/A'}</div>
                    <div><strong>Gender:</strong> ${animal.gender}</div>
                    <div><strong>Age:</strong> ${this.calculateAge(animal.birthDate)}</div>
                    <div><strong>Breed:</strong> ${animal.breed || 'N/A'}</div>
                </div>
                <div class="animal-actions">
                    <button class="btn-secondary btn-success" onclick="event.stopPropagation(); ranchTracker.updateAnimalStatus('${animal.id}', 'sold')">Mark Sold</button>
                    <button class="btn-secondary btn-danger" onclick="event.stopPropagation(); ranchTracker.updateAnimalStatus('${animal.id}', 'deceased')">Mark Deceased</button>
                </div>
            </div>
        `).join('');
    }

    showAnimalDetails(animalId) {
        const animal = this.animals.find(a => a.id === animalId);
        if (!animal) return;

        const offspring = this.animals.filter(a => a.motherId === animalId && a.status === 'active');
        const mother = animal.motherId ? this.animals.find(a => a.id === animal.motherId) : null;

        const detailsHtml = `
            <div class="animal-details">
                <h2>${animal.type.charAt(0).toUpperCase() + animal.type.slice(1)} #${animal.tagNumber}</h2>
                
                <div class="detail-section">
                    <h3>Basic Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Tag Number:</span>
                            <span>#${animal.tagNumber}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Name:</span>
                            <span>${animal.name || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Type:</span>
                            <span>${animal.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Gender:</span>
                            <span>${animal.gender}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Birth Date:</span>
                            <span>${animal.birthDate ? new Date(animal.birthDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Age:</span>
                            <span>${this.calculateAge(animal.birthDate)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Breed:</span>
                            <span>${animal.breed || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Weight:</span>
                            <span>${animal.weight ? animal.weight + ' lbs' : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                ${mother ? `
                <div class="detail-section">
                    <h3>Parentage</h3>
                    <div class="detail-item">
                        <span class="detail-label">Mother:</span>
                        <span>#${mother.tagNumber}${mother.name ? ` (${mother.name})` : ''}</span>
                    </div>
                </div>
                ` : ''}

                ${offspring.length > 0 ? `
                <div class="detail-section">
                    <h3>Offspring</h3>
                    <ul class="offspring-list">
                        ${offspring.map(child => `
                            <li>#${child.tagNumber}${child.name ? ` (${child.name})` : ''} - ${child.gender}</li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}

                ${animal.notes ? `
                <div class="detail-section">
                    <h3>Notes</h3>
                    <p>${animal.notes}</p>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h3>Record Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Date Added:</span>
                            <span>${new Date(animal.dateAdded).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Updated:</span>
                            <span>${new Date(animal.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status:</span>
                            <span>${animal.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('animalDetails').innerHTML = detailsHtml;
        document.getElementById('animalDetailsModal').style.display = 'block';
    }

    renderActivities() {
        const container = document.getElementById('activityLog');
        const recentActivities = this.activities.slice(0, 10);
        
        container.innerHTML = recentActivities.length > 0 ? 
            recentActivities.map(activity => `
                <div class="activity-item">
                    <div class="activity-text">${activity.description}</div>
                    <div class="activity-time">${this.formatDate(activity.timestamp)}</div>
                </div>
            `).join('') : 
            '<div class="activity-item"><div class="activity-text">No recent activity</div></div>';
    }

    populateMotherDropdown() {
        const select = document.getElementById('motherId');
        const females = this.animals.filter(a => a.gender === 'female' && a.status === 'active');
        
        select.innerHTML = '<option value="">Select Mother</option>' + 
            females.map(animal => `
                <option value="${animal.id}">#${animal.tagNumber}${animal.name ? ` (${animal.name})` : ''}</option>
            `).join('');
    }

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
    }

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
    }

    saveData() {
        localStorage.setItem('ranchAnimals', JSON.stringify(this.animals));
        localStorage.setItem('ranchActivities', JSON.stringify(this.activities));
        localStorage.setItem('ranchPariciones', JSON.stringify(this.pariciones));
    }

    // CSV Upload Methods
    handleCsvFile(file) {
        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert('Please select a CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvText = e.target.result;
            this.parseCsvData(csvText);
        };
        reader.readAsText(file);
    }

    parseCsvData(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        this.csvData = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values[0]) { // Skip empty rows
                const paricion = {
                    vaca: values[0] || '',
                    gender: values[1] || '',
                    fecha: values[2] || '',
                    notes: values[3] || '',
                    id: Date.now().toString() + i
                };
                this.csvData.push(paricion);
            }
        }

        this.showCsvPreview();
    }

    showCsvPreview() {
        const duplicates = this.findDuplicates();
        const duplicateInfo = document.getElementById('duplicateInfo');
        const previewTable = document.getElementById('previewTable');
        const csvPreview = document.getElementById('csvPreview');

        // Show duplicate information
        if (duplicates.length > 0) {
            duplicateInfo.className = 'duplicate-info has-duplicates';
            duplicateInfo.innerHTML = `
                <strong>⚠️ ${duplicates.length} duplicates found:</strong><br>
                ${duplicates.map(d => `${d.vaca} (${d.fecha})`).join(', ')}
            `;
        } else {
            duplicateInfo.className = 'duplicate-info no-duplicates';
            duplicateInfo.innerHTML = `✅ No duplicates found. ${this.csvData.length} new records will be added.`;
        }

        // Show preview table
        previewTable.innerHTML = `
            <thead>
                <tr>
                    <th>Vaca</th>
                    <th>Gender</th>
                    <th>Fecha</th>
                    <th>Notes</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${this.csvData.map(paricion => {
                    const isDuplicate = duplicates.some(d => d.vaca === paricion.vaca && d.fecha === paricion.fecha);
                    return `
                        <tr style="${isDuplicate ? 'background-color: #f8d7da;' : ''}">
                            <td>${paricion.vaca}</td>
                            <td>${paricion.gender}</td>
                            <td>${paricion.fecha}</td>
                            <td>${paricion.notes}</td>
                            <td>${isDuplicate ? 'Duplicate' : 'New'}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;

        csvPreview.style.display = 'block';
    }

    findDuplicates() {
        const duplicates = [];
        for (const newParicion of this.csvData) {
            const existing = this.pariciones.find(p => 
                p.vaca.toLowerCase() === newParicion.vaca.toLowerCase() && 
                p.fecha === newParicion.fecha
            );
            if (existing) {
                duplicates.push(newParicion);
            }
        }
        return duplicates;
    }

    processCsvData() {
        const duplicates = this.findDuplicates();
        const newPariciones = this.csvData.filter(newP => 
            !duplicates.some(d => d.vaca === newP.vaca && d.fecha === newP.fecha)
        );

        // Add new pariciones
        newPariciones.forEach(paricion => {
            paricion.dateAdded = new Date().toISOString();
            paricion.parsedDate = this.parseDate(paricion.fecha);
            this.pariciones.push(paricion);
        });

        this.addActivity(`Imported ${newPariciones.length} pariciones from CSV${duplicates.length > 0 ? ` (${duplicates.length} duplicates skipped)` : ''}`);
        this.saveData();
        this.renderPariciones();
        this.populateYearFilter();
        
        document.getElementById('csvUploadModal').style.display = 'none';
        document.getElementById('csvPreview').style.display = 'none';
        document.getElementById('csvFileInput').value = '';

        alert(`Successfully imported ${newPariciones.length} pariciones!${duplicates.length > 0 ? ` ${duplicates.length} duplicates were skipped.` : ''}`);
    }

    parseDate(dateStr) {
        // Handle formats like "08/23", "1/24", "5/15"
        if (!dateStr) return null;
        
        const parts = dateStr.split('/');
        if (parts.length === 2) {
            const month = parseInt(parts[0]);
            const year = parseInt(parts[1]);
            const fullYear = year < 50 ? 2000 + year : 1900 + year; // Assume 00-49 is 2000s, 50-99 is 1900s
            return new Date(fullYear, month - 1, 1);
        }
        return new Date(dateStr);
    }

    // Pariciones Methods
    renderPariciones() {
        const container = document.getElementById('paricionesList');
        let filteredPariciones = [...this.pariciones];

        // Apply filters
        const yearFilter = document.getElementById('yearFilter').value;
        const monthFilter = document.getElementById('monthFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;

        if (yearFilter !== 'all') {
            filteredPariciones = filteredPariciones.filter(p => {
                const date = p.parsedDate || this.parseDate(p.fecha);
                return date && date.getFullYear() == yearFilter;
            });
        }

        if (monthFilter !== 'all') {
            filteredPariciones = filteredPariciones.filter(p => {
                const date = p.parsedDate || this.parseDate(p.fecha);
                return date && (date.getMonth() + 1) == monthFilter;
            });
        }

        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filteredPariciones = filteredPariciones.filter(p => {
                const date = p.parsedDate || this.parseDate(p.fecha);
                return date && date >= fromDate;
            });
        }

        if (dateTo) {
            const toDate = new Date(dateTo);
            filteredPariciones = filteredPariciones.filter(p => {
                const date = p.parsedDate || this.parseDate(p.fecha);
                return date && date <= toDate;
            });
        }

        // Sort by date (newest first)
        filteredPariciones.sort((a, b) => {
            const dateA = a.parsedDate || this.parseDate(a.fecha);
            const dateB = b.parsedDate || this.parseDate(b.fecha);
            return (dateB || new Date(0)) - (dateA || new Date(0));
        });

        container.innerHTML = filteredPariciones.length > 0 ? 
            filteredPariciones.map(paricion => `
                <div class="paricion-card">
                    <h4>${paricion.vaca}</h4>
                    <div class="paricion-date">${paricion.fecha}</div>
                    <div class="paricion-gender ${paricion.gender.toLowerCase() === 'h' ? 'female' : 'male'}">
                        ${paricion.gender.toUpperCase() === 'H' ? 'Hembra' : 'Macho'}
                    </div>
                    ${paricion.notes ? `<div class="paricion-notes">${paricion.notes}</div>` : ''}
                </div>
            `).join('') : 
            '<div class="paricion-card"><h4>No pariciones found</h4><p>Upload a CSV file or adjust your filters.</p></div>';
    }

    populateYearFilter() {
        const yearFilter = document.getElementById('yearFilter');
        const years = new Set();
        
        this.pariciones.forEach(p => {
            const date = p.parsedDate || this.parseDate(p.fecha);
            if (date) {
                years.add(date.getFullYear());
            }
        });

        const sortedYears = Array.from(years).sort((a, b) => b - a);
        
        yearFilter.innerHTML = '<option value="all">All Years</option>' + 
            sortedYears.map(year => `<option value="${year}">${year}</option>`).join('');
    }
}

// Initialize the application
const ranchTracker = new RanchTracker();
