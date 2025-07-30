import { useEffect, useState } from 'react'
import JournalForm from '../components/JournalForm'
import JournalCard from '../components/JournalCard';
import '../styles/Journal.css';

const Journal = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [filter,setFilter] = useState("All");
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowItems(true), 800);
        const storedEntries = localStorage.getItem("journalEntries");   
        if (storedEntries) {
            const parsedEntries = JSON.parse(storedEntries);
            setFilteredEntries(parsedEntries);
            setJournalEntries(parsedEntries);
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
        setFilteredEntries(journalEntries);
    }, [journalEntries,loaded]);

    useEffect(() => {       
        setFilteredEntries(
            journalEntries.filter(entry => {
                if(filter === "All") {
                    return true;
                }
                else if(entry.mood === filter) {
                    return true;
                }
                else
                    return false;
            }
            )
        )
    },[filter,journalEntries]);

    const deleteJournalEntry = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
            if (!confirmDelete) return;
        const updatedEntries = journalEntries.filter(entry => entry.id !== id);
        setJournalEntries(updatedEntries);
    }

    const changeFilter = (e) => {
        setFilter(e.target.value);
    }

  return (
    <div>
        <JournalForm setJournalEntries={setJournalEntries} journalEntries={journalEntries} />
        <h2>Journal Entries</h2>
        <p>Here you can view your journal entries.</p>
        <select name="filter" id="filter" value={filter} onChange={(e)=> {changeFilter(e)}}>
            <option value="All">All</option>
            <option value="😊">Happy😊</option>
            <option value="😞">Sad😞</option>
            <option value="😐">Neutral😐</option>
            <option value="😠">Angry😠</option>
        </select>
        {showItems?  (
    <>  {filteredEntries.length > 0 ? 
            (filteredEntries.map(entry=>(
                <div key={entry.id}>
                    <JournalCard entry={entry} deleteEntry={deleteJournalEntry}/>
                </div>
            ))) :
            <p>No journal entries found.</p>
        }
    </>
    ) : 
    <p style={{textAlign:"center"}}>Loading...</p>}
    </div>
  )
}

export default Journal
