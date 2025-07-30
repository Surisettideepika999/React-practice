import '../styles/Journal.css';

const JournalCard = ({entry,deleteEntry}) => {
  return (
    <div className='journal-card'>
        <h3 style={{color:"beige"}}>{entry.title} {entry.mood}</h3>
        <p style={{color:"white"}}><strong>Date:</strong> {entry.date}</p>
        <p style={{color:"white"}}>{entry.entry}</p>
        <button style={{marginLeft:'85%'}} className='button' onClick={()=>deleteEntry(entry.id)}>Delete</button>
    </div>
  )
}

export default JournalCard
