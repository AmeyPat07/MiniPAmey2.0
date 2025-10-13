// My Garden JavaScript
console.log('✅ My Garden Script Loaded');

// Global variables
let myGarden = [];
let alarms = [];
let currentAlarmPlant = null;

// DOM Elements
const gardenGrid = document.getElementById('garden-grid');
const emptyGarden = document.getElementById('empty-garden');
const totalPlantsEl = document.getElementById('total-plants');
const needWateringEl = document.getElementById('need-watering');
const activeAlarmsEl = document.getElementById('active-alarms');
const wateredWeekEl = document.getElementById('watered-week');
const gardenFilter = document.getElementById('garden-filter');
const gardenSort = document.getElementById('garden-sort');
const searchGarden = document.getElementById('search-garden');
const alarmModal = document.getElementById('watering-alarm-modal');
const closeAlarmModal = document.getElementById('close-alarm-modal');
const alarmForm = document.getElementById('alarm-form');
const wateringFrequency = document.getElementById('watering-frequency');
const customDaysGroup = document.getElementById('custom-days-group');
const alarmAudio = document.getElementById('alarm-audio');

// Load garden data
function loadGarden() {
    myGarden = JSON.parse(localStorage.getItem('myGarden')) || [];
    alarms = JSON.parse(localStorage.getItem('gardenAlarms')) || [];
    displayGarden();
    updateStats();
    checkAlarms();
}

// Display garden plants
function displayGarden() {
    if (!gardenGrid) return;
    
    let filteredGarden = filterAndSortGarden();
    
    if (filteredGarden.length === 0) {
        gardenGrid.style.display = 'none';
        if (emptyGarden) emptyGarden.style.display = 'flex';
        return;
    }
    
    gardenGrid.style.display = 'grid';
    if (emptyGarden) emptyGarden.style.display = 'none';
    gardenGrid.innerHTML = '';
    
    filteredGarden.forEach(plant => {
        const plantCard = createGardenPlantCard(plant);
        gardenGrid.appendChild(plantCard);
    });
}

// Create garden plant card
function createGardenPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'garden-plant-card';
    
    const alarm = alarms.find(a => a.plantId === plant.id);
    const nextWatering = calculateNextWatering(plant, alarm);
    const needsWater = checkIfNeedsWater(plant, alarm);
    const daysUntilWater = calculateDaysUntilWater(nextWatering);
    
    card.innerHTML = `
        <div class="garden-card-header">
            <img src="${plant.image}" alt="${plant.name}" class="garden-plant-image" onerror="this.src='default.jpg'">
            ${needsWater ? '<div class="needs-water-badge">💧 Needs Water</div>' : ''}
        </div>
        
        <div class="garden-card-body">
            <h3 class="garden-plant-name">${plant.name}</h3>
            <p class="garden-plant-scientific">${plant.scientificName}</p>
            
            <div class="garden-plant-info">
                <div class="info-row">
                    <span class="info-label">📅 Added:</span>
                    <span class="info-value">${formatDate(plant.addedDate)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">💧 Last Watered:</span>
                    <span class="info-value">${plant.lastWatered ? formatDate(plant.lastWatered) : 'Never'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🔔 Next Watering:</span>
                    <span class="info-value ${needsWater ? 'text-warning' : ''}">${nextWatering || 'Not scheduled'}</span>
                </div>
                ${alarm ? `
                <div class="info-row alarm-info">
                    <span class="info-label">⏰ Alarm:</span>
                    <span class="info-value">${alarm.time} (${alarm.frequencyLabel})</span>
                </div>
                ` : ''}
            </div>
            
            <div class="watering-progress">
                <div class="progress-label">
                    <span>Watering Status</span>
                    <span class="days-until">${daysUntilWater}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${calculateWateringProgress(plant, alarm)}%"></div>
                </div>
            </div>
            
            <div class="garden-card-actions">
                <button class="action-btn btn-water" onclick="waterPlant(${plant.id})" title="Mark as watered">
                    💧 Water Now
                </button>
                <button class="action-btn btn-alarm ${alarm ? 'has-alarm' : ''}" onclick="setWateringAlarm(${plant.id})" title="${alarm ? 'Edit alarm' : 'Set alarm'}">
                    ${alarm ? '⏰ Edit Alarm' : '⏰ Set Alarm'}
                </button>
                <button class="action-btn btn-remove" onclick="removePlant(${plant.id})" title="Remove from garden">
                    🗑️
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter and sort garden
function filterAndSortGarden() {
    let filtered = [...myGarden];
    
    // Apply search filter
    if (searchGarden && searchGarden.value) {
        const searchTerm = searchGarden.value.toLowerCase();
        filtered = filtered.filter(plant => 
            plant.name.toLowerCase().includes(searchTerm) ||
            plant.scientificName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (gardenFilter && gardenFilter.value !== 'all') {
        const filterValue = gardenFilter.value;
        filtered = filtered.filter(plant => {
            switch(filterValue) {
                case 'needs-water':
                    return checkIfNeedsWater(plant, alarms.find(a => a.plantId === plant.id));
                case 'recently-watered':
                    return plant.lastWatered && isWithinDays(plant.lastWatered, 2);
                case 'has-alarm':
                    return alarms.some(a => a.plantId === plant.id);
                default:
                    return true;
            }
        });
    }
    
    // Apply sorting
    if (gardenSort) {
        const sortValue = gardenSort.value;
        filtered.sort((a, b) => {
            switch(sortValue) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date-added':
                    return new Date(b.addedDate) - new Date(a.addedDate);
                case 'next-watering':
                    const aAlarm = alarms.find(al => al.plantId === a.id);
                    const bAlarm = alarms.find(al => al.plantId === b.id);
                    const aNext = calculateNextWateringTimestamp(a, aAlarm);
                    const bNext = calculateNextWateringTimestamp(b, bAlarm);
                    return aNext - bNext;
                default:
                    return 0;
            }
        });
    }
    
    return filtered;
}

// Update statistics
function updateStats() {
    if (totalPlantsEl) totalPlantsEl.textContent = myGarden.length;
    
    if (needWateringEl) {
        const needsWater = myGarden.filter(plant => 
            checkIfNeedsWater(plant, alarms.find(a => a.plantId === plant.id))
        ).length;
        needWateringEl.textContent = needsWater;
    }
    
    if (activeAlarmsEl) {
        activeAlarmsEl.textContent = alarms.length;
    }
    
    if (wateredWeekEl) {
        const wateredThisWeek = myGarden.filter(plant => 
            plant.lastWatered && isWithinDays(plant.lastWatered, 7)
        ).length;
        wateredWeekEl.textContent = wateredThisWeek;
    }
}

// Water plant
function waterPlant(plantId) {
    const plant = myGarden.find(p => p.id === plantId);
    if (!plant) return;
    
    plant.lastWatered = new Date().toISOString();
    localStorage.setItem('myGarden', JSON.stringify(myGarden));
    
    // Show success message
    showNotification(`✅ ${plant.name} has been watered!`, 'success');
    
    // Reload display
    loadGarden();
}

// Remove plant from garden
function removePlant(plantId) {
    const plant = myGarden.find(p => p.id === plantId);
    if (!plant) return;
    
    if (confirm(`Are you sure you want to remove ${plant.name} from your garden?`)) {
        myGarden = myGarden.filter(p => p.id !== plantId);
        alarms = alarms.filter(a => a.plantId !== plantId);
        
        localStorage.setItem('myGarden', JSON.stringify(myGarden));
        localStorage.setItem('gardenAlarms', JSON.stringify(alarms));
        
        showNotification(`${plant.name} has been removed from your garden.`, 'info');
        loadGarden();
    }
}

// Set watering alarm
function setWateringAlarm(plantId) {
    currentAlarmPlant = myGarden.find(p => p.id === plantId);
    if (!currentAlarmPlant) return;
    
    const existingAlarm = alarms.find(a => a.plantId === plantId);
    
    // Populate alarm info
    const alarmPlantInfo = document.getElementById('alarm-plant-info');
    if (alarmPlantInfo) {
        alarmPlantInfo.innerHTML = `
            <div class="alarm-plant-display">
                <img src="${currentAlarmPlant.image}" alt="${currentAlarmPlant.name}" onerror="this.src='default.jpg'">
                <div>
                    <h3>${currentAlarmPlant.name}</h3>
                    <p>${currentAlarmPlant.scientificName}</p>
                    <p class="recommended-watering">💧 Recommended: ${currentAlarmPlant.wateringFrequency}</p>
                </div>
            </div>
        `;
    }
    
    // Populate existing alarm data
    if (existingAlarm) {
        wateringFrequency.value = existingAlarm.frequency;
        document.getElementById('alarm-time').value = existingAlarm.time;
        document.getElementById('alarm-sound').value = existingAlarm.sound || 'default';
        document.getElementById('enable-notifications').checked = existingAlarm.notifications !== false;
        
        if (existingAlarm.frequency === 'custom') {
            customDaysGroup.style.display = 'block';
            document.getElementById('custom-days').value = existingAlarm.customDays;
        }
    } else {
        alarmForm.reset();
        customDaysGroup.style.display = 'none';
    }
    
    // Open modal
    alarmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close alarm modal
function closeAlarmModalFunc() {
    alarmModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentAlarmPlant = null;
    alarmForm.reset();
}

// Handle alarm form submission
if (alarmForm) {
    alarmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!currentAlarmPlant) return;
        
        const frequency = wateringFrequency.value;
        const time = document.getElementById('alarm-time').value;
        const sound = document.getElementById('alarm-sound').value;
        const notifications = document.getElementById('enable-notifications').checked;
        const customDays = document.getElementById('custom-days').value;
        
        // Remove existing alarm for this plant
        alarms = alarms.filter(a => a.plantId !== currentAlarmPlant.id);
        
        // Create new alarm
        const alarm = {
            id: Date.now(),
            plantId: currentAlarmPlant.id,
            plantName: currentAlarmPlant.name,
            frequency: frequency,
            frequencyLabel: getFrequencyLabel(frequency, customDays),
            time: time,
            sound: sound,
            notifications: notifications,
            customDays: frequency === 'custom' ? parseInt(customDays) : null,
            nextAlarm: calculateNextAlarmTime(frequency, time, customDays),
            createdAt: new Date().toISOString()
        };
        
        alarms.push(alarm);
        localStorage.setItem('gardenAlarms', JSON.stringify(alarms));
        
        showNotification(`⏰ Alarm set for ${currentAlarmPlant.name}!`, 'success');
        closeAlarmModalFunc();
        loadGarden();
        
        // Request notification permission
        if (notifications && 'Notification' in window) {
            Notification.requestPermission();
        }
    });
}

// Show/hide custom days input
if (wateringFrequency) {
    wateringFrequency.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            customDaysGroup.style.display = 'block';
        } else {
            customDaysGroup.style.display = 'none';
        }
        updateAlarmPreview();
    });
}

// Update alarm preview
function updateAlarmPreview() {
    const preview = document.getElementById('alarm-preview');
    if (!preview) return;
    
    const frequency = wateringFrequency.value;
    const time = document.getElementById('alarm-time').value;
    const customDays = document.getElementById('custom-days').value;
    
    if (frequency && time) {
        const nextAlarm = calculateNextAlarmTime(frequency, time, customDays);
        preview.innerHTML = `
            <div class="preview-content">
                <strong>Next Alarm:</strong> ${formatDateTime(nextAlarm)}
            </div>
        `;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

// Check and trigger alarms
function checkAlarms() {
    const now = new Date();
    
    alarms.forEach(alarm => {
        const alarmTime = new Date(alarm.nextAlarm);
        const diff = alarmTime - now;
        
        // If alarm is within the next minute
        if (diff > 0 && diff < 60000) {
            setTimeout(() => {
                triggerAlarm(alarm);
            }, diff);
        }
    });
    
    // Check every minute
    setTimeout(checkAlarms, 60000);
}

// Trigger alarm
function triggerAlarm(alarm) {
    console.log('🔔 Triggering alarm for:', alarm.plantName);
    
    // Play sound
    if (alarmAudio) {
        alarmAudio.play().catch(err => console.log('Audio play failed:', err));
    }
    
    // Show notification
    if (alarm.notifications && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(`💧 Time to water ${alarm.plantName}!`, {
            body: `Don't forget to water your ${alarm.plantName}`,
            icon: 'favicon.ico',
            badge: 'favicon.ico'
        });
    }
    
    // Show alert
    alert(`⏰ Watering Reminder!\n\nTime to water your ${alarm.plantName}!`);
    
    // Update next alarm time
    alarm.nextAlarm = calculateNextAlarmTime(alarm.frequency, alarm.time, alarm.customDays);
    localStorage.setItem('gardenAlarms', JSON.stringify(alarms));
}

// Helper functions
function calculateNextWatering(plant, alarm) {
    if (!alarm) return 'No alarm set';
    return formatDate(alarm.nextAlarm);
}

function calculateNextWateringTimestamp(plant, alarm) {
    if (!alarm) return Infinity;
    return new Date(alarm.nextAlarm).getTime();
}

function checkIfNeedsWater(plant, alarm) {
    if (!alarm) return false;
    const nextWatering = new Date(alarm.nextAlarm);
    const now = new Date();
    return nextWatering <= now;
}

function calculateDaysUntilWater(nextWatering) {
    if (!nextWatering || nextWatering === 'No alarm set' || nextWatering === 'Not scheduled') {
        return 'Not scheduled';
    }
    
    const next = new Date(nextWatering);
    const now = new Date();
    const diff = next - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Overdue!';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
}

function calculateWateringProgress(plant, alarm) {
    if (!alarm || !plant.lastWatered) return 0;
    
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(alarm.nextAlarm);
    const now = new Date();
    
    const totalDuration = nextWatering - lastWatered;
    const elapsed = now - lastWatered;
    
    const progress = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progress, 0), 100);
}

function calculateNextAlarmTime(frequency, time, customDays) {
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const nextAlarm = new Date();
    nextAlarm.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If time has passed today, start from tomorrow
    if (nextAlarm <= now) {
        nextAlarm.setDate(nextAlarm.getDate() + 1);
    }
    
    // Adjust based on frequency
    const daysToAdd = getDaysFromFrequency(frequency, customDays);
    if (daysToAdd > 1) {
        nextAlarm.setDate(nextAlarm.getDate() + daysToAdd - 1);
    }
    
    return nextAlarm.toISOString();
}

function getDaysFromFrequency(frequency, customDays) {
    switch(frequency) {
        case 'daily': return 1;
        case 'every-2-days': return 2;
        case 'every-3-days': return 3;
        case 'weekly': return 7;
        case 'bi-weekly': return 14;
        case 'monthly': return 30;
        case 'custom': return parseInt(customDays) || 1;
        default: return 1;
    }
}

function getFrequencyLabel(frequency, customDays) {
    switch(frequency) {
        case 'daily': return 'Daily';
        case 'every-2-days': return 'Every 2 Days';
        case 'every-3-days': return 'Every 3 Days';
        case 'weekly': return 'Weekly';
        case 'bi-weekly': return 'Bi-Weekly';
        case 'monthly': return 'Monthly';
        case 'custom': return `Every ${customDays} Days`;
        default: return frequency;
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', dateOptions) + ' at ' + date.toLocaleTimeString('en-US', timeOptions);
}

function isWithinDays(dateString, days) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    return diff < (days * 24 * 60 * 60 * 1000);
}

function showNotification(message, type = 'info') {
    alert(message);
}

// Event listeners
if (closeAlarmModal) {
    closeAlarmModal.addEventListener('click', closeAlarmModalFunc);
}

if (alarmModal) {
    alarmModal.addEventListener('click', (e) => {
        if (e.target === alarmModal) {
            closeAlarmModalFunc();
        }
    });
}

if (document.getElementById('cancel-alarm-btn')) {
    document.getElementById('cancel-alarm-btn').addEventListener('click', closeAlarmModalFunc);
}

if (searchGarden) {
    searchGarden.addEventListener('input', displayGarden);
}

if (gardenFilter) {
    gardenFilter.addEventListener('change', displayGarden);
}

if (gardenSort) {
    gardenSort.addEventListener('change', displayGarden);
}

// Add more plants button
const addMorePlantsBtn = document.getElementById('add-more-plants-btn');
if (addMorePlantsBtn) {
    addMorePlantsBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Add first plant button
const addFirstPlantBtn = document.getElementById('add-first-plant-btn');
if (addFirstPlantBtn) {
    addFirstPlantBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Listen for alarm time changes
if (document.getElementById('alarm-time')) {
    document.getElementById('alarm-time').addEventListener('change', updateAlarmPreview);
}

if (document.getElementById('custom-days')) {
    document.getElementById('custom-days').addEventListener('input', updateAlarmPreview);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 My Garden initialized');
    loadGarden();
});

// Reload garden when returning to page
window.addEventListener('focus', () => {
    loadGarden();
});
