// Plant Modal JavaScript
console.log('✅ Plant Modal Script Loaded');

// Global variables
let plantsData = [];
let filteredPlants = [];

// DOM Elements
const addPlantBtn = document.getElementById('add-plant-btn');
const plantModal = document.getElementById('add-plant-modal');
const closePlantModal = document.getElementById('close-plant-modal');
const plantSearch = document.getElementById('plant-search');
const categoryFilter = document.getElementById('plant-category-filter');
const plantsGrid = document.getElementById('plants-grid');

// Load plants data from JSON file
async function loadPlantsData() {
    try {
        const response = await fetch('plants-database.json');
        const data = await response.json();
        plantsData = data.plants;
        filteredPlants = plantsData;
        displayPlants(filteredPlants);
        console.log('✅ Plants data loaded:', plantsData.length, 'plants');
    } catch (error) {
        console.error('❌ Error loading plants data:', error);
        showErrorMessage();
    }
}

// Display plants in the grid
function displayPlants(plants) {
    if (!plantsGrid) return;
    
    plantsGrid.innerHTML = '';
    
    if (plants.length === 0) {
        plantsGrid.innerHTML = `
            <div class="no-plants-message">
                <div class="icon">🌱</div>
                <p>No plants found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    plants.forEach(plant => {
        const plantCard = createPlantCard(plant);
        plantsGrid.appendChild(plantCard);
    });
}

// Create a plant card element
function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    
    // Determine difficulty class
    let difficultyClass = '';
    if (plant.difficulty.toLowerCase().includes('easy')) {
        difficultyClass = 'easy';
    } else if (plant.difficulty.toLowerCase().includes('moderate')) {
        difficultyClass = 'moderate';
    }
    
    card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" class="plant-card-image" onerror="this.src='default.jpg'">
        <div class="plant-card-content">
            <div class="plant-card-header">
                <h3 class="plant-card-title">${plant.name}</h3>
                <p class="plant-card-scientific">${plant.scientificName}</p>
            </div>
            
            <div class="plant-card-badges">
                <span class="plant-badge badge-category">${plant.category}</span>
                <span class="plant-badge badge-difficulty ${difficultyClass}">${plant.difficulty}</span>
            </div>
            
            <div class="plant-card-details">
                <div class="plant-detail-item">
                    <span class="plant-detail-icon">💧</span>
                    <span class="plant-detail-label">Water:</span>
                    <span>${plant.wateringFrequency}</span>
                </div>
                <div class="plant-detail-item">
                    <span class="plant-detail-icon">☀️</span>
                    <span class="plant-detail-label">Sun:</span>
                    <span>${plant.sunlight}</span>
                </div>
                <div class="plant-detail-item">
                    <span class="plant-detail-icon">🌱</span>
                    <span class="plant-detail-label">Soil:</span>
                    <span>${plant.soilType}</span>
                </div>
                <div class="plant-detail-item">
                    <span class="plant-detail-icon">⏱️</span>
                    <span class="plant-detail-label">Growth:</span>
                    <span>${plant.growthTime}</span>
                </div>
                <div class="plant-detail-item">
                    <span class="plant-detail-icon">📏</span>
                    <span class="plant-detail-label">Spacing:</span>
                    <span>${plant.spacing}</span>
                </div>
            </div>
            
            <button class="add-plant-btn" onclick="addPlantToGarden(${plant.id})">
                ➕ Add to My Garden
            </button>
        </div>
    `;
    
    return card;
}

// Show error message
function showErrorMessage() {
    if (!plantsGrid) return;
    plantsGrid.innerHTML = `
        <div class="no-plants-message">
            <div class="icon">⚠️</div>
            <p>Error loading plants database. Please try again later.</p>
        </div>
    `;
}

// Open modal
function openPlantModal() {
    if (plantModal) {
        plantModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Load plants data if not already loaded
        if (plantsData.length === 0) {
            loadPlantsData();
        }
    }
}

// Close modal
function closePlantModalFunc() {
    if (plantModal) {
        plantModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Reset filters
        if (plantSearch) plantSearch.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        filteredPlants = plantsData;
        displayPlants(filteredPlants);
    }
}

// Filter plants based on search and category
function filterPlants() {
    const searchTerm = plantSearch ? plantSearch.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    
    filteredPlants = plantsData.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm) ||
                            plant.scientificName.toLowerCase().includes(searchTerm) ||
                            plant.category.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || plant.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayPlants(filteredPlants);
}

// Add plant to user's garden
function addPlantToGarden(plantId) {
    const plant = plantsData.find(p => p.id === plantId);
    
    if (!plant) {
        alert('❌ Plant not found!');
        return;
    }
    
    // Get existing garden from localStorage
    let myGarden = JSON.parse(localStorage.getItem('myGarden')) || [];
    
    // Check if plant already exists in garden
    const existingPlant = myGarden.find(p => p.id === plantId);
    if (existingPlant) {
        alert(`🌿 ${plant.name} is already in your garden!`);
        return;
    }
    
    // Add plant to garden with additional info
    const gardenPlant = {
        ...plant,
        addedDate: new Date().toISOString(),
        lastWatered: null,
        notes: ''
    };
    
    myGarden.push(gardenPlant);
    localStorage.setItem('myGarden', JSON.stringify(myGarden));
    
    // Add visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
    
    // Show success message with option to view garden
    setTimeout(() => {
        const viewGarden = confirm(`✅ ${plant.name} has been added to your garden!\n\nWould you like to view your garden now?`);
        if (viewGarden) {
            window.location.href = 'my-garden.html';
        } else {
            btn.textContent = originalText;
            btn.style.background = '';
        }
    }, 500);
}

// Event Listeners
if (addPlantBtn) {
    addPlantBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPlantModal();
    });
}

if (closePlantModal) {
    closePlantModal.addEventListener('click', closePlantModalFunc);
}

// Close modal when clicking outside
if (plantModal) {
    plantModal.addEventListener('click', (e) => {
        if (e.target === plantModal) {
            closePlantModalFunc();
        }
    });
}

// Search functionality
if (plantSearch) {
    plantSearch.addEventListener('input', filterPlants);
}

// Category filter
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterPlants);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && plantModal && plantModal.classList.contains('active')) {
        closePlantModalFunc();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 Plant Modal initialized');
});
