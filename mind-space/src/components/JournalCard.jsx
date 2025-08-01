import '../styles/Journal.css';
import React, { useState, useEffect } from 'react';

const JournalCard = ({journalEntry,deleteEntry,editEntry}) => {
  const [moodColor, setMoodColor] = useState("");
   useEffect(() => {
    switch (journalEntry.mood) {
      case "😊":
        setMoodColor("green");
        break;
      case "😞":
        setMoodColor("blue");
        break;
      case "😠":
        setMoodColor("red");
        break;
      case "😌":
        setMoodColor("gray");
        break;
    }
  },[journalEntry.mood]);
  return (
    <div className='journal-card'>
      <div className='journal-icons'>
      <button className='icon' onClick={()=>deleteEntry(journalEntry.id)}>🗑</button>
        <button className='icon'  onClick={()=>editEntry(journalEntry.id)}>✎</button>
      </div>
        <h3 style={{color:moodColor}}>{journalEntry.title} {journalEntry.mood}</h3>
        <p style={{color:"white"}}><strong>Date:</strong> {journalEntry.date}</p>
        <p style={{color:"white"}}>{journalEntry.entry}</p>
    </div>
  )
}

export default JournalCard
