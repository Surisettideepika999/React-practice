import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

const JournalForm = ({setJournalEntries,journalEntries}) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [mood,setMood] = useState("");
    const [showForm, setShowForm] = useState(false);
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const handleEntryChange = (e) => {
        setEntry(e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "" || entry.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }
         if (journalEntries.some(entry => entry.title === title && entry.date === date)) {
            alert("An entry with the same title and date already exists.");
            return;
        }
        setShowForm(false);
        setTitle(title.trim());
        setEntry(entry.trim());
        alert(`Journal Entry Submitted:\nTitle: ${title}\nDate: ${date}`);
        const newJournalEntry = { title, date, entry,mood,id: uuidv4() };
        console.log("New Journal Entry:", newJournalEntry);
        setJournalEntries([...journalEntries, newJournalEntry]);
        console.log("Journal Entries:", journalEntries);
        reset();
    };

    const reset=()=>{
        setShowForm(false);
        setTitle("");
        setDate(today);
        setEntry("");
        setMood("");
    }

  return (
    <div>
        {!showForm ? <button className='button' onClick={()=>{setShowForm(true)}}>Add new Journal</button> 
        :
        <form className='form' onSubmit={submitHandler}>
            <h2>Journal Entry</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />
            <br />
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={date} onChange={handleDateChange} required />
            <br />  
            <label htmlFor="entry">Entry</label>
            <textarea 
                id="entry" 
                name="entry" 
                value={entry}
                rows="4" 
                cols="50" 
                placeholder="Write your journal entry here..." 
                onChange={handleEntryChange}
                required>
            </textarea>
            <select name="mood" id="mood"  value={mood} className="w-full p-2 border rounded" onChange={(e)=>setMood(e.target.value)} required>
                <option value="">select mood</option>
                <option value="😊">Happy😊</option>
                <option value="😞">Sad😞</option>
                <option value="😐">Neutral😐</option>
                <option value="😠">Angry😠</option>
            </select>
            <br />
            <button className='button'  type='submit'>submit</button>
            <button className='button' style={{marginRight:"30%"}} onClick={()=>{setShowForm(false);reset()}}>cancel</button>
        </form>
        }
    </div>
  )
}

export default JournalForm
