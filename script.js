document.addEventListener('DOMContentLoaded', function() {
    const cameraBtn = document.getElementById('camera-btn');
    const searchBar = document.getElementById('search-bar');
    const homeBtn = document.getElementById('home-btn');
    const addPlantBtn = document.getElementById('add-plant-btn');
    const accountName = document.getElementById('account-name');

    // Load user name from localStorage
    if(accountName) {
        const username = localStorage.getItem('username') || 'User';
        accountName.textContent = username + ' ▼';
    }

    // Camera functionality
    if(cameraBtn) {
        cameraBtn.addEventListener('click', function() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        // Create a video element to display the stream
                        const video = document.createElement('video');
                        video.srcObject = stream;
                        video.play();
                        video.style.position = 'fixed';
                        video.style.top = '50%';
                        video.style.left = '50%';
                        video.style.transform = 'translate(-50%, -50%)';
                        video.style.zIndex = '1000';
                        video.style.borderRadius = '12px';
                        video.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                        document.body.appendChild(video);

                        // Create a close button
                        const closeBtn = document.createElement('button');
                        closeBtn.textContent = 'Close Camera';
                        closeBtn.style.position = 'fixed';
                        closeBtn.style.top = 'calc(50% + 180px)';
                        closeBtn.style.left = '50%';
                        closeBtn.style.transform = 'translateX(-50%)';
                        closeBtn.style.zIndex = '1001';
                        closeBtn.style.padding = '10px 20px';
                        closeBtn.style.backgroundColor = '#4caf50';
                        closeBtn.style.color = 'white';
                        closeBtn.style.border = 'none';
                        closeBtn.style.borderRadius = '8px';
                        closeBtn.style.cursor = 'pointer';
                        closeBtn.style.fontSize = '16px';
                        document.body.appendChild(closeBtn);

                        closeBtn.addEventListener('click', () => {
                            stream.getTracks().forEach(track => track.stop());
                            document.body.removeChild(video);
                            document.body.removeChild(closeBtn);
                        });
                    })
                    .catch(function(err) {
                        console.error('Error accessing camera: ', err);
                        alert('Camera access denied or not available.');
                    });
            } else {
                alert('Camera not supported on this device.');
            }
        });
    }


    // === 🌿 Full Smart Reminder Integration ===
console.log("✅ Reminder script loaded successfully");

const API_URL = 'http://localhost:5000/api/reminders';

const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');


// Cache DOM elements
const reminderList = document.getElementById("reminder-list");
const reminderFeature = document.getElementById("reminder-feature");

// Load all reminders from backend and display them
async function loadReminders() {
  try {
    const res = await fetch(API_URL);
    const reminders = await res.json();
    displayReminders(reminders);
    scheduleUpcomingAlarms(reminders);
  } catch (err) {
    console.error("⚠️ Error fetching reminders:", err);
  }
}

// Display reminders inside reminder list (if it exists)
function displayReminders(reminders) {
  if (!reminderList) return;
  reminderList.innerHTML = "";
  reminders.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.plantName} - ${r.type} (${r.frequency}) at ${new Date(
      r.time
    ).toLocaleString()}`;
    reminderList.appendChild(li);
  });
}

// Set Reminder button inside index.html (#reminder-feature)
if (reminderFeature) {
  const setBtn = reminderFeature.querySelector("button");
  setBtn.addEventListener("click", async () => {
    const plantName = document.getElementById("plantName").value.trim();
    const type = document.getElementById("task").value;
    const frequency = document.getElementById("frequency").value;
    const time = document.getElementById("reminderTime").value;

    if (!plantName || !time) {
      alert("⚠️ Please enter both plant name and time.");
      return;
    }

    const now = new Date();
    const [hours, minutes] = time.split(":");
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);

    // Prepare reminder object for backend
    const reminder = {
      plantName,
      type,
      frequency,
      time: reminderDate.toISOString(),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reminder),
      });
      const data = await res.json();
      console.log("✅ Reminder saved:", data);

      alert(
        `✅ Reminder set for ${type} ${plantName} (${frequency}) at ${time}`
      );
      loadReminders();
    } catch (err) {
      console.error("⚠️ Error saving reminder:", err);
      alert("❌ Failed to save reminder to backend.");
    }
  });
}

// Schedule alarms locally based on reminder times
function scheduleUpcomingAlarms(reminders) {
  const now = new Date();

  reminders.forEach((r) => {
    const reminderTime = new Date(r.time);
    let delay = reminderTime - now;
    if (delay < 0) {
      // If missed, schedule next occurrence based on frequency
      if (r.frequency === "Weekly") reminderTime.setDate(reminderTime.getDate() + 7);
      else if (r.frequency === "Monthly") reminderTime.setMonth(reminderTime.getMonth() + 1);
      else return;
      delay = reminderTime - now;
    }

    console.log(`⏳ Scheduling reminder for ${r.plantName} in ${delay / 1000}s`);
    setTimeout(() => {
      triggerAlarm(r);
    }, delay);
  });
}

// Play alarm + alert popup
function triggerAlarm(reminder) {
  alarmSound.play();
  alert(`⏰ Time to ${reminder.type} your ${reminder.plantName}!`);

  // Reschedule next alarm for repeating reminders
  if (reminder.frequency !== "Once") {
    let nextTime = new Date(reminder.time);
    if (reminder.frequency === "Weekly") nextTime.setDate(nextTime.getDate() + 7);
    else if (reminder.frequency === "Monthly") nextTime.setMonth(nextTime.getMonth() + 1);

    fetch(`${API_URL}/${reminder._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time: nextTime }),
    }).then(() => loadReminders());
  }
}

// Check every minute for upcoming alarms (as backup)
setInterval(loadReminders, 60000);

// Initial load
loadReminders();





    // === Plant Detail Modal Functions (Define First) ===
    
    // Show plant detail in modal
    window.showPlantDetail = function(plant) {
        const modal = document.getElementById('plant-detail-modal');
        const plantName = document.getElementById('detail-plant-name');
        const scientificName = document.getElementById('detail-scientific-name');
        const plantBody = document.getElementById('plant-detail-body');
        
        if (!modal || !plantName || !scientificName || !plantBody) return;
        
        // Set plant name and scientific name
        plantName.textContent = plant.name;
        scientificName.textContent = plant.scientificName;
        
        // Get difficulty badge class
        let difficultyClass = 'badge-easy';
        if (plant.difficulty.toLowerCase().includes('moderate')) {
            difficultyClass = 'badge-moderate';
        } else if (plant.difficulty.toLowerCase().includes('hard') || plant.difficulty.toLowerCase().includes('difficult')) {
            difficultyClass = 'badge-hard';
        }
        
        // Build plant details body
        plantBody.innerHTML = `
            <div class="plant-detail-section">
                <h3>📊 Quick Info</h3>
                <div style="margin-bottom: 15px;">
                    <span class="plant-detail-badge ${difficultyClass}">${plant.difficulty}</span>
                    <span class="plant-detail-badge" style="background: #e3f2fd; color: #1565c0;">${plant.category}</span>
                </div>
            </div>
            
            <div class="plant-detail-section">
                <h3>💧 Care Requirements</h3>
                <div class="plant-detail-grid">
                    <div class="plant-detail-item">
                        <div class="plant-detail-label">💧 Watering</div>
                        <div class="plant-detail-value">${plant.wateringFrequency}</div>
                    </div>
                    <div class="plant-detail-item">
                        <div class="plant-detail-label">☀️ Sunlight</div>
                        <div class="plant-detail-value">${plant.sunlight}</div>
                    </div>
                    <div class="plant-detail-item">
                        <div class="plant-detail-label">🌱 Soil Type</div>
                        <div class="plant-detail-value">${plant.soilType}</div>
                    </div>
                    <div class="plant-detail-item">
                        <div class="plant-detail-label">📏 Spacing</div>
                        <div class="plant-detail-value">${plant.spacing}</div>
                    </div>
                </div>
            </div>
            
            <div class="plant-detail-section">
                <h3>⏱️ Growth Information</h3>
                <div class="plant-detail-item">
                    <div class="plant-detail-label">🕐 Growth Time</div>
                    <div class="plant-detail-value">${plant.growthTime}</div>
                </div>
            </div>
            
            <div class="plant-detail-section" style="text-align: center; margin-top: 30px;">
                <button onclick="addPlantToGarden('${plant.name}')" class="nav-button" style="margin-right: 10px;">
                    ➕ Add to My Garden
                </button>
                <button onclick="setReminderForPlant('${plant.name}')" class="nav-button" style="background: linear-gradient(45deg, #f093fb, #f5576c);">
                    🔔 Set Reminder
                </button>
            </div>
        `;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    
    // Close plant detail modal
    window.closePlantDetail = function() {
        const modal = document.getElementById('plant-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };
    
    // Add plant to garden
    window.addPlantToGarden = function(plantName) {
        let garden = JSON.parse(localStorage.getItem('garden')) || [];
        
        // Check if plant already exists
        const exists = garden.some(p => p.name === plantName);
        if (exists) {
            alert(`"${plantName}" is already in your garden!`);
            return;
        }
        
        garden.push({ 
            name: plantName, 
            addedAt: new Date().toISOString() 
        });
        localStorage.setItem('garden', JSON.stringify(garden));
        alert(`✅ "${plantName}" added to your garden!`);
    };
    
    // Set reminder for plant
    window.setReminderForPlant = function(plantName) {
        // Pre-fill the reminder form with plant name
        localStorage.setItem('reminderPlantName', plantName);
        alert(`Setting reminder for "${plantName}". Redirecting to reminders page...`);
        window.location.href = 'reminders.html';
    };
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('plant-detail-modal');
        if (e.target === modal) {
            closePlantDetail();
        }
    });
    
    // === Search Functionality with Autocomplete ===
    let plantsDatabase = [];
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    console.log('🔍 Search functionality initializing...');
    console.log('Search bar element:', searchBar);
    console.log('Suggestions container:', suggestionsContainer);
    
    // Load plants database
    async function loadPlantsDatabase() {
        try {
            const response = await fetch('plants-database.json');
            const data = await response.json();
            plantsDatabase = data.plants || [];
            console.log('✅ Plants database loaded:', plantsDatabase.length, 'plants');
        } catch (error) {
            console.error('❌ Error loading plants database:', error);
        }
    }
    
    // Search plants function
    function searchPlants(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }
        
        const searchTerm = query.toLowerCase().trim();
        
        return plantsDatabase.filter(plant => {
            return plant.name.toLowerCase().includes(searchTerm) ||
                   plant.scientificName.toLowerCase().includes(searchTerm) ||
                   plant.category.toLowerCase().includes(searchTerm);
        }).slice(0, 8); // Limit to 8 results
    }
    
    // Display search suggestions
    function displaySuggestions(results) {
        if (!suggestionsContainer) return;
        
        suggestionsContainer.innerHTML = '';
        
        if (results.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-results">No plants found. Try a different search term.</div>';
            suggestionsContainer.classList.add('active');
            return;
        }
        
        results.forEach(plant => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <span class="suggestion-icon">🌿</span>
                <div class="suggestion-text">
                    <div class="suggestion-name">${plant.name}</div>
                    <div class="suggestion-category">${plant.category} • ${plant.scientificName}</div>
                </div>
            `;
            
            suggestionItem.addEventListener('click', () => {
                window.showPlantDetail(plant);
                suggestionsContainer.classList.remove('active');
                searchBar.value = '';
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        suggestionsContainer.classList.add('active');
    }
    
    // Hide suggestions
    function hideSuggestions() {
        if (suggestionsContainer) {
            setTimeout(() => {
                suggestionsContainer.classList.remove('active');
            }, 200);
        }
    }
    
    // Search bar event listeners
    if(searchBar) {
        console.log('✅ Search bar event listeners attached');
        
        // Input event for real-time search
        searchBar.addEventListener('input', function(e) {
            const query = e.target.value;
            console.log('🔍 Search query:', query);
            
            if (query.trim().length === 0) {
                hideSuggestions();
                return;
            }
            
            const results = searchPlants(query);
            console.log('📊 Search results:', results.length);
            displaySuggestions(results);
        });
        
        // Enter key to search
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchBar.value;
                const results = searchPlants(query);
                
                if (results.length > 0) {
                    window.showPlantDetail(results[0]);
                    suggestionsContainer.classList.remove('active');
                    searchBar.value = '';
                } else {
                    alert('No plants found for: ' + query);
                }
                
                e.preventDefault();
            }
        });
        
        // Hide suggestions when clicking outside
        searchBar.addEventListener('blur', hideSuggestions);
        
        // Show suggestions when focusing if there's text
        searchBar.addEventListener('focus', function() {
            if (searchBar.value.trim().length > 0) {
                const results = searchPlants(searchBar.value);
                displaySuggestions(results);
            }
        });
    } else {
        console.error('❌ Search bar element not found!');
    }
    
    // Load plants database on page load
    loadPlantsDatabase();

    // Home button
    if(homeBtn) {
        homeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Add Plant button functionality
    if(addPlantBtn) {
        addPlantBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const plantName = prompt("Enter the name of the plant to add:");
            if(plantName) {
                let garden = JSON.parse(localStorage.getItem('garden')) || [];
                garden.push({ name: plantName, addedAt: new Date().toISOString() });
                localStorage.setItem('garden', JSON.stringify(garden));
                alert(`Plant "${plantName}" added to your garden!`);
            }
        });
    }



    // Prevent page refresh on form submissions (for login/signup later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
});

// === Reminders Backend Integration ===
console.log("✅ Reminder script loaded successfully");

//console.log("✅ reminders.js loaded!");
const reminderForm = document.getElementById('reminder-form');
const reminderList = document.getElementById('reminder-list');
const alarmSound = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
const API_URL = 'http://localhost:5000/api/reminders';

console.log("🟢 Reminder form submitted");

if (reminderForm) {
    reminderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const plantName = document.getElementById('plant-name').value;
        const type = document.getElementById('reminder-type').value;
        const frequency = document.getElementById('reminder-frequency').value;
        const time = document.getElementById('reminder-time').value;

        if (!plantName || !time) {
            alert("Please fill all fields!");
            return;
        }

        const reminder = { plantName, type, frequency, time };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reminder)
        });

        const data = await res.json();
        console.log('✅ Reminder saved:', data);
        alert('Reminder set successfully!');
        loadReminders();
    });
}

async function loadReminders() {
    const res = await fetch(API_URL);
    const reminders = await res.json();
    reminderList.innerHTML = '';
    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.textContent = `${reminder.plantName} - ${reminder.type} (${reminder.frequency}) at ${new Date(reminder.time).toLocaleString()}`;
        reminderList.appendChild(li);
    });
}

function checkAlarms() {
    fetch(API_URL)
        .then(res => res.json())
        .then(reminders => {
            const now = new Date();
            reminders.forEach(r => {
                const reminderTime = new Date(r.time);
                const diff = reminderTime - now;
                if (diff > 0 && diff < 1000 * 60) {
                    setTimeout(() => {
                        alarmSound.play();
                        alert(`🔔 Reminder: ${r.plantName} - ${r.type}`);
                    }, diff);
                }
            });
        });
}

if (reminderList) {
    loadReminders();
    setInterval(checkAlarms, 60000);
}
document.addEventListener('DOMContentLoaded', function() {
    // Existing code for other elements...

    const reminderFeature = document.getElementById("reminder-feature");
    
    if(reminderFeature) {
        const setReminderBtn = reminderFeature.querySelector("#set-reminder-btn");
        
        // Check if the button exists and add an event listener
        if (setReminderBtn) {
            setReminderBtn.addEventListener("click", function() {
                // Show or toggle the reminders section/modal
                const reminderSection = document.getElementById('reminders-section');
                if (reminderSection) {
                    reminderSection.style.display = reminderSection.style.display === 'none' || reminderSection.style.display === '' ? 'block' : 'none';
                }
            });
        }
    }
});
