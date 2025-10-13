# 🌿 My Garden - User Guide

## Quick Start

### Step 1: Add Plants to Your Garden
1. Go to the **homepage** (index.html)
2. Click on **"Add a Plant"** feature box
3. Browse through the plant database
4. Use the search bar or category filter to find plants
5. Click **"➕ Add to My Garden"** on any plant
6. Choose **"Yes"** when asked if you want to view your garden

### Step 2: View Your Garden
1. Click **"My Garden"** from the homepage, OR
2. You'll be redirected after adding a plant
3. See all your plants displayed in beautiful cards

### Step 3: Track Watering
1. Each plant card shows:
   - 📅 When you added it
   - 💧 When you last watered it
   - 🔔 When it needs watering next
2. Click **"💧 Water Now"** when you water a plant
3. The timestamp updates automatically

### Step 4: Set Watering Alarms
1. Click **"⏰ Set Alarm"** on any plant card
2. Choose watering frequency:
   - Daily, Every 2-3 days, Weekly, etc.
   - Or set a custom interval
3. Select the alarm time (e.g., 8:00 AM)
4. Choose an alarm sound
5. Enable browser notifications (optional)
6. Click **"💾 Save Alarm"**

### Step 5: Receive Reminders
When it's time to water:
- 🔊 Alarm sound plays
- 🔔 Browser notification appears (if enabled)
- ⚠️ Alert popup shows
- The alarm automatically reschedules for next time

## Features Explained

### Dashboard Statistics
At the top of My Garden, you'll see:
- **Total Plants**: How many plants you're growing
- **Need Watering Today**: Plants that need attention now
- **Active Alarms**: How many alarms you've set
- **Watered This Week**: Your watering activity

### Filter Your Plants
Use the filter dropdown to show:
- **All Plants**: Everything in your garden
- **Needs Watering**: Plants overdue or due today
- **Recently Watered**: Plants watered in last 2 days
- **Has Alarm Set**: Plants with active alarms

### Sort Your Plants
Sort by:
- **Date Added**: Newest or oldest first
- **Name**: Alphabetical order
- **Next Watering**: Most urgent first

### Search Function
Type in the search bar to find plants by:
- Common name (e.g., "Tomato")
- Scientific name (e.g., "Solanum")

### Plant Card Details

#### Top Section:
- **Plant Image**: Visual reference
- **"💧 Needs Water" Badge**: Appears when watering is overdue

#### Middle Section:
- **Plant Name**: Common name in large text
- **Scientific Name**: In italics below
- **Information Panel**:
  - Date you added the plant
  - Last time you watered it
  - Next scheduled watering
  - Alarm details (if set)

#### Progress Bar:
- Shows time since last watering
- Fills up as watering time approaches
- Green = on schedule
- Full = needs watering

#### Action Buttons:
- **💧 Water Now**: Mark as watered right now
- **⏰ Set/Edit Alarm**: Configure watering reminders
- **🗑️ Remove**: Delete plant from garden

## Alarm System Guide

### Setting Up Your First Alarm

1. **Click "Set Alarm"** on a plant card

2. **Choose Frequency**:
   - **Daily**: Perfect for thirsty plants
   - **Every 2-3 Days**: For moderate watering needs
   - **Weekly**: For drought-tolerant plants
   - **Bi-Weekly**: For succulents
   - **Monthly**: For cacti
   - **Custom**: Set any interval (1-365 days)

3. **Set Time**: Choose when you want to be reminded
   - Example: 8:00 AM for morning watering
   - Example: 6:00 PM for evening watering

4. **Pick Sound**: Choose your alarm tone
   - Default Alarm: Standard beep
   - Gentle Bell: Soft chime
   - Nature Sounds: Birds chirping
   - Wind Chime: Peaceful tones

5. **Enable Notifications**: 
   - ✅ Check to get browser notifications
   - Browser will ask for permission first
   - Notifications work even if tab is in background

6. **Preview**: See when your next alarm will trigger

7. **Save**: Click "💾 Save Alarm"

### Editing an Alarm
- Click **"⏰ Edit Alarm"** (button turns green when alarm is set)
- Change any settings
- Save to update

### Disabling an Alarm
- Currently: Remove the plant or edit to a far future date
- Future update: Add "Disable Alarm" button

## Tips & Tricks

### 🌟 Best Practices:
1. **Water plants immediately after alarm**: Click "Water Now" to track accurately
2. **Set alarms for morning**: Better for plant health
3. **Group similar plants**: Use same watering schedule
4. **Check "Needs Watering" filter daily**: Don't miss any plants
5. **Enable notifications**: Never forget to water

### 💡 Pro Tips:
- **Custom intervals**: Match your plant's exact needs
- **Multiple alarms**: Set different times for different plant types
- **Progress bar**: Visual reminder of watering status
- **Search function**: Quick access in large gardens
- **Sort by next watering**: Prioritize urgent plants

### ⚠️ Important Notes:
- **Keep browser tab open**: Alarms only trigger when page is loaded
- **Allow notifications**: For reminders when tab is closed
- **Regular updates**: Mark plants as watered to keep tracking accurate
- **Backup data**: Export localStorage periodically (future feature)

## Troubleshooting

### "My plants aren't showing"
- ✅ Make sure you added plants from the "Add a Plant" modal
- ✅ Check if you're on the correct page (my-garden.html)
- ✅ Try refreshing the page
- ✅ Clear browser cache if needed

### "Alarm didn't trigger"
- ✅ Browser tab must be open for alarms to work
- ✅ Check if alarm time is in the future
- ✅ Verify alarm is saved (check plant card for alarm details)
- ✅ Enable notifications for background alerts

### "Notifications not working"
- ✅ Click "Allow" when browser asks for permission
- ✅ Check browser settings → Notifications
- ✅ Make sure site notifications are enabled
- ✅ Alarms will still show alerts even without notifications

### "Progress bar stuck"
- ✅ Make sure you've watered the plant at least once
- ✅ Verify alarm is set for the plant
- ✅ Try clicking "Water Now" to reset

### "Can't remove a plant"
- ✅ Click the 🗑️ button
- ✅ Confirm deletion in the popup
- ✅ Plant and its alarms will be removed

## Keyboard Shortcuts

Currently not implemented, but planned:
- `Ctrl/Cmd + F`: Focus search
- `Escape`: Close modals
- `Enter`: Save alarm form

## Mobile Usage

The My Garden page is fully responsive:
- **Touch-friendly buttons**: Large tap targets
- **Swipe-friendly**: Smooth scrolling
- **Readable text**: Optimized font sizes
- **Single column**: Easy navigation
- **Full-width cards**: Better mobile view

## Data & Privacy

### Where is my data stored?
- All data is stored **locally** in your browser
- Uses **localStorage** (no server/cloud)
- **You control** all your data
- **No account needed**

### Can I access from another device?
- Currently: No (localStorage is device-specific)
- Future: Cloud sync feature planned

### How to backup my garden?
- Currently: Manual export via browser DevTools
- Future: Export to JSON/CSV feature planned

### How to clear my data?
1. Browser Settings → Privacy → Clear Data
2. Select "Cookies and Site Data"
3. Or use DevTools → Application → localStorage → Delete

## What's Next?

### Coming Soon:
- ✨ Plant health tracking
- 📸 Upload plant photos
- 📝 Custom care notes
- 🌤️ Weather-based watering adjustments
- 📊 Growth analytics
- 🔄 Cloud sync
- 📤 Export garden data
- 🎨 Theme customization

## Need Help?

### Check These Resources:
1. **MY_GARDEN_DOCUMENTATION.md**: Technical details
2. **QUICK_START_GUIDE.md**: Feature overview
3. **Browser Console**: Error messages (F12)
4. **localStorage Inspector**: View your data (DevTools → Application)

### Common Questions:

**Q: How many plants can I add?**  
A: Recommended limit is 100-200 plants (localStorage constraint)

**Q: Do alarms work when browser is closed?**  
A: No, but browser notifications can alert you if enabled

**Q: Can I set multiple alarms per plant?**  
A: Currently one alarm per plant, multiple frequencies coming soon

**Q: What happens if I miss a watering?**  
A: Plant card shows "Overdue!" and needs water badge appears

**Q: Can I share my garden with friends?**  
A: Not yet, but sharing feature is planned

## Enjoy Your Digital Garden! 🌱

Your plants are now tracked, organized, and will never be forgotten. Happy gardening! 🌿

---

**Need more help?** Check the full documentation or open browser console for detailed error messages.
