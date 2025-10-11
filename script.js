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





    // Search functionality (placeholder)
    if(searchBar) {
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Searching for: ' + searchBar.value);
                e.preventDefault();
            }
        });
    }

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
