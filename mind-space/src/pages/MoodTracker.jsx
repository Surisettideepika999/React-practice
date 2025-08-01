import { useEffect, useState } from "react"


const MoodTracker = ({date}) => {
  const [month, setMonth] = useState("All");
  const [journalEntries, setJournalEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

   useEffect(() => {
      const data=localStorage.getItem("journalEntries");
      if (data) {
        setJournalEntries(JSON.parse(data));
      }
      setLoaded(true);
   },[]);
   useEffect(() => {
    if (loaded) {
    const filtered = journalEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.toLocaleString('default', { month: 'long' });
      return month === "All" || entryMonth === month;
    });
    console.log("Filtered Entries:", filtered);
     const sortedEntries = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredEntries(sortedEntries);
  }
  }, [month,loaded,journalEntries]);

  return (
    <div>
      <label htmlFor="month">choose month</label>
      <select name="month" id="month" onChange={(e) => setMonth(e.target.value)} value={month}>
        <option value="All">All</option>
        {months.map((m, index) => (
          <option key={index} value={m}>{m}</option>
        ))}
      </select>

      {filteredEntries.length > 0 ? (
        <div>
          <h2>Your moods of {month==="All"? "all months" : month}</h2>
          <ul>
            {filteredEntries.map((journalEntry) => (
              <li key={journalEntry.id}>
                <p><strong>Date:</strong> {new Date(journalEntry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p><strong>Mood:</strong> {journalEntry.mood}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : <p>No moods recorded for {month === "All" ? "any month" : month}.</p>

        }
    </div>
  )
}

export default MoodTracker
