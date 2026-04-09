import React, { useState, useEffect, useCallback } from 'react';

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  isSelectedStart: boolean; 
  isSelectedEnd: boolean;   
  isInRange: boolean;      
}

const MONTHLY_IMAGES: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1547754980-3df97fed72a8", 
  1: "https://plus.unsplash.com/premium_photo-1675431436445-7856cd05ecd6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwYWVzdGhldGljfGVufDB8fDB8fHww", 
  2: "https://images.unsplash.com/photo-1685197875186-fb632f2b4041?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5hdHVyZSUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D", 
  3: "https://images.unsplash.com/photo-1693050017564-37a1f52701c2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZSUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D", 
  4: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", 
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", 
  6: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", 
  7: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", 
  8: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", 
  9: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce", 
  10: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c", 
  11: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66", 
};

const WallCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [todayDate] = useState<Date>(new Date(2026, 3, 9));
  
  
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 3, 25));
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [days, setDays] = useState<Day[]>([]);
  const [allNotes, setAllNotes] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState<string>('');

  const getDateKey = (date: Date) => date.toISOString().split('T')[0];

  const generateDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 
    
    const daysArray: Day[] = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = offset - 1; i >= 0; i--) {
      daysArray.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false, isToday: false, isHoliday: false, 
        isSelectedStart: false, isSelectedEnd: false, isInRange: false
      });
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      
      const isStart = startDate ? date.toDateString() === startDate.toDateString() : false;
      const isEnd = endDate ? date.toDateString() === endDate.toDateString() : false;
      const inRange = startDate && endDate && date > startDate && date < endDate;

      daysArray.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === todayDate.toDateString(),
        isHoliday: [0, 6].includes(date.getDay()), 
        isSelectedStart: isStart,
        isSelectedEnd: isEnd,
        isInRange: !!inRange
      });
    }

    const remainingSlots = 42 - daysArray.length;
    for (let i = 1; i <= remainingSlots; i++) {
      daysArray.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false, isToday: false, isHoliday: false,
        isSelectedStart: false, isSelectedEnd: false, isInRange: false
      });
    }
    setDays(daysArray);
  }, [currentDate, todayDate, startDate, endDate]);

  useEffect(() => {
    generateDays();
  }, [generateDays]);


useEffect(() => {
  const savedNotes = localStorage.getItem('calendar-notes');
  if (savedNotes) {
    setAllNotes(JSON.parse(savedNotes));
  }
}, []);


useEffect(() => {
  if (Object.keys(allNotes).length > 0) {
    localStorage.setItem('calendar-notes', JSON.stringify(allNotes));
  }
}, [allNotes]);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else if (date.toDateString() !== startDate.toDateString()) {
        setEndDate(date);
      }
    }
  };

  const handleAddNote = () => {
    if (!currentInput.trim() || !startDate) return;
    const key = getDateKey(startDate);
    setAllNotes(prev => ({ ...prev, [key]: currentInput }));
    setCurrentInput(''); 
  };

  const changeMonth = (dir: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-card">
      <div className="hero-side">
        <img src={MONTHLY_IMAGES[currentDate.getMonth()]} alt="Seasonal" className="hero-img" />
        <div className="hero-text-overlay">
          <h1>{currentDate.getFullYear()}</h1>
          <h2>{currentDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}</h2>
        </div>
      </div>

      <div className="calendar-side">
        <header className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>‹</button>
          <div className="title-group">
            <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
            <span className="subtitle-date">
              {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Select Date'}
              {endDate ? ` - ${endDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}` : ''}
            </span>
          </div>
          <button onClick={() => changeMonth(1)}>›</button>
        </header>

        <div className="today-chip-container">
            <button className="today-chip" onClick={() => {
                const now = new Date(2026, 3, 9);
                setCurrentDate(new Date(2026, 3, 1));
                setStartDate(now);
                setEndDate(null);
            }}>Today</button>
        </div>

        <div className="calendar-grid-wrapper">
          <div className="weekday-labels">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
              <div key={d} className={`label ${['SAT', 'SUN'].includes(d) ? 'weekend' : ''}`}>{d}</div>
            ))}
          </div>

          <div className="days-grid">
            {days.map((d, i) => (
              <div
                key={i}
                onClick={() => d.isCurrentMonth && handleDateClick(d.date)}
                className={`day-cell 
                  ${!d.isCurrentMonth ? 'inactive' : ''} 
                  ${d.isToday ? 'is-today' : ''} 
                  ${d.isSelectedStart ? 'is-selected-start' : ''}
                  ${d.isSelectedEnd ? 'is-selected-end' : ''}
                  ${d.isInRange ? 'is-in-range' : ''}
                  ${d.isHoliday ? 'is-holiday' : ''}
                `}
              >
                {d.date.getDate()}
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-legend">
          <span className="legend-item"><i className="dot holiday"></i> Holiday</span>
          <span className="legend-item"><i className="dot today"></i> Today</span>
          <span className="legend-item"><i className="dot selected"></i> Selection</span>
        </div>

        <div className="notes-section">
          <div className="notes-title"><span className="icon">📖</span> Notes</div>
          <div className="notes-content">
            <div className="note-date">
              {startDate ? startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'No date selected'}
            </div>
            <p className="note-text">
              {startDate ? (allNotes[getDateKey(startDate)] || "No notes yet.") : "Select a start date to see notes."}
            </p>
            <div className="note-input-area">
              <input 
                type="text" placeholder="Add a note..." value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                disabled={!startDate}
              />
              <button className="add-btn" onClick={handleAddNote}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;