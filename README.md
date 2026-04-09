# 📅 Interactive Wall Calendar Component

An engineered, high-fidelity React calendar component inspired by modern wall calendar aesthetics. This project demonstrates the ability to translate a static design into a fully functional, responsive, and user-centric web application.

## 🔗 Project Links
- **Live Demo:** https://interactive-calendar-sand.vercel.app/
---

## ✨ Core Features

### 🖼️ Wall Calendar Aesthetic
- **Dynamic Imagery:** Features a hero image section that updates automatically based on the selected month, providing a seasonal feel.
- **Visual Anchor:** Maintains a clean hierarchy between high-quality imagery and functional date grids, emulating a physical wall calendar.

### 📍 Day Range Selector
- **Interactive Logic:** Users can select a start and end date across the grid.
- **Visual Feedback:** Clear, distinct styling for the **Start Date**, **End Date**, and the **connecting range** in between.
- **Smart Reset:** If a user selects a new date before the current start date, the range intelligently resets to ensure data integrity.

### 📝 Integrated Notes Section
- **Date-Specific Memos:** Allows users to attach notes to specific dates.
- **Data Persistence:** Utilizes `localStorage` to ensure that memos are saved locally in the browser and survive page refreshes.
- **UX Focused:** Includes "Enter" key support for adding notes quickly and a clear empty-state message.

### 📱 Fully Responsive Design
- **Desktop:** A sophisticated side-by-side layout (Hero vs. Calendar).
- **Mobile:** A vertically stacked layout optimized for touch interaction, ensuring the navigation and notes are easy to use on smaller screens.

---

## 🛠️ Technical Implementation

- **Framework:** React (Functional Components)
- **Language:** TypeScript (for robust type safety)
- **State Management:** Hooks (`useState`, `useEffect`, `useCallback`)
- **Styling:** CSS3 with Flexbox, Grid, and Media Queries
- **Persistence:** Browser LocalStorage API

### Performance Design Choice
The calendar grid generation is memoized using `useCallback`. This ensures that when a user is typing in the notes section, the entire calendar grid doesn't undergo expensive re-calculation, keeping the UI snappy and lag-free.

---

## 🚀 Local Setup

To get this project running on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Bhashivarshney11/Interactive-Calendar.git](https://github.com/Bhashivarshney11/Interactive-Calendar.git)

2.  **Install dependencies:**
```Bash
npm install

3.  ** Start the app:**
```Bash
npm start
