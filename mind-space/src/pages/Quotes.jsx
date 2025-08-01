import { templates } from '../utils/quotes'
import { useState,useEffect } from 'react';
import '../styles/Quotes.css';

const Quotes = () => {
    const [month, setMonth] = useState("");
    const [journalEntries, setJournalEntries] = useState([]);
    const [mood, setMood] = useState("neutral");
    const [loaded, setLoaded] = useState(false);
    const getRandomIndex = () => Math.floor(Math.random() * templates[mood].length);
    const [randomQuote, setQuote] = useState(templates.neutral[getRandomIndex()]);

    useEffect(() => {
          const data=localStorage.getItem("journalEntries");
          if (data) {
            setJournalEntries(JSON.parse(data));
          }
          setLoaded(true);
       },[]);

    useEffect(() => {
        if (loaded) {
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            setMonth(currentMonth);
            const currentMonthEntries= journalEntries.filter(entry => {
                const entryDate = new Date(entry.date);
                const entryMonth = entryDate.toLocaleString('default', { month: 'long' });
                return entryMonth === currentMonth;
            });
            if(currentMonthEntries.length === 0) {
                setMood('neutral');
                return;
            }
            const happyCount = currentMonthEntries.filter(entry => entry.mood === '😊').length;
            const sadCount = currentMonthEntries.filter(entry => entry.mood === '😞').length
            const neutralCount = currentMonthEntries.filter(entry => entry.mood === '😌').length;
            const angryCount = currentMonthEntries.filter(entry => entry.mood === '😠').length;
            if (happyCount > sadCount && happyCount > neutralCount && happyCount > angryCount) {
                setMood('happy');
            } else if (sadCount > happyCount && sadCount > neutralCount && sadCount > angryCount) {
                setMood('sad');
            } else if (neutralCount > happyCount && neutralCount > sadCount && neutralCount > angryCount) {
                setMood('neutral');
            } else if (angryCount > happyCount && angryCount > sadCount && angryCount > neutralCount) {
                setMood('angry');
            }else {
                setMood('neutral');
            }
            setQuote(templates[mood][getRandomIndex()]);
        }
        console.log("uotws")
    }, [month, loaded, journalEntries]);

    return (
        <div>
            <h4>Quote of the Day</h4>
            <p>{randomQuote}</p>
        </div>
    )
}

export default Quotes
