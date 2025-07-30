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
    const [search, setSearch] = useState("");
    const [editItem, setEditItem] = useState(null);
     const [formCompleted, setFormCompleted] = useState(true);
    useEffect(() => {
        setTimeout(() => setShowItems(true), 800);
        const storedEntries = localStorage.getItem("journalEntries");   
         
        if (storedEntries) {
            try {
                const parsedEntries = JSON.parse(storedEntries);
                setJournalEntries([...parsedEntries].sort((a, b) => new Date(b.date) - new Date(a.date)));
                 
            } catch (error) {
                console.error("Error parsing stored journal entries:", error);
                localStorage.removeItem("journalEntries");
            }
        }
            setLoaded(true);
        
    }, []);

    useEffect(() => {
        if (loaded) {
        localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
        }
    }, [journalEntries,loaded]);

    useEffect(() => {  
        console.log("updates");
        const sorted=[...journalEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredEntries(
            sorted.filter(entry => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword= search.toLowerCase();
        const searchResult=filteredEntries.filter(journalEntry => {
            return journalEntry.title.toLowerCase().includes(keyword) || journalEntry.entry.toLowerCase().includes(keyword);
        })
        setFilteredEntries(searchResult);
        setSearch("");
    }

    const editEntry = (id) => {
        const entryToEdit = journalEntries.find(entry => entry.id === id);
        setEditItem(entryToEdit)
    }    

    const handleCancel = () => {
        setSearch("");
        setFilteredEntries(journalEntries);
        setFilter("All");
    }

  return (
    <div>
        <JournalForm setJournalEntries={setJournalEntries} journalEntries={journalEntries} editItem={editItem} setFormCompleted={setFormCompleted} setEditItem={setEditItem}/>
        { formCompleted && 
        ( <> {formCompleted}
                <h2>Journal Entries</h2>
                <p>Here you can view your journal entries.</p>
                <form onSubmit={(e) => { handleSearch(e) }}>
                    <input type="text" value={search} name="search" onChange={(e) => { setSearch(e.target.value) }} />
                    <button type='submit'>search</button>
                    <button type='button' onClick={handleCancel}>cancel</button>
                </form>
                <select name="filter" id="filter" value={filter} onChange={(e) => { changeFilter(e) }}>
                    <option value="All">All</option>
                    <option value="😊">Happy😊</option>
                    <option value="😞">Sad😞</option>
                    <option value="😌">Neutral😌</option>
                    <option value="😠">Angry😠</option>
                </select>
                {showItems ? (
                    <>
                        {filteredEntries.length > 0 ?
                            (filteredEntries.map(entry => (
                                <div key={entry.id}>
                                    <JournalCard journalEntry={entry} deleteEntry={deleteJournalEntry} editEntry={editEntry} />
                                </div>
                            ))) :
                            <p>No journal entries found.</p>
                        }
                    </>
                ) :
                    <p style={{ textAlign: "center" }}>Loading...</p>
                }
            </>)
        }
    </div>
  )
}

export default Journal
