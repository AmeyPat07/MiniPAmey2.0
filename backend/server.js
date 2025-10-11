const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = './db.json';

// Load reminders
let reminders = [];
if (fs.existsSync(DB_FILE)) {
  reminders = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) || [];
}

// Save reminders to file
function saveReminders() {
  fs.writeFileSync(DB_FILE, JSON.stringify(reminders, null, 2));
}

// Schedule reminders
function scheduleReminder(reminder) {
  const date = new Date(reminder.time);
  const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

  cron.schedule(cronTime, () => {
    console.log(`🔔 Reminder for ${reminder.plantName} - ${reminder.type}`);

    // Notify frontend (for now we simulate via console)
    // You can later add WebSocket or push notifications.
  });
}

// API: Get all reminders
app.get('/api/reminders', (req, res) => {
  res.json(reminders);
});

// API: Add new reminder
app.post('/api/reminders', (req, res) => {
  const reminder = {_id: uuidv4(), ...req.body };
  reminders.push(reminder);
  saveReminders();
  scheduleReminder(reminder);
  res.json({ message: 'Reminder added!', reminder });
});

// API: Delete reminder
app.delete('/api/reminders/:id', (req, res) => {
  reminders = reminders.filter(r => r._id !== req.params.id);
  saveReminders();
  res.json({ message: 'Reminder deleted!' });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// Schedule existing reminders at startup
reminders.forEach(r => scheduleReminder(r));
