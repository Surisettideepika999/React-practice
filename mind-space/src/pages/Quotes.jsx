import { quotes } from '../utils/quotes'
import { useState } from 'react';
import '../styles/Quotes.css';

const Quotes = () => {
    const getRandomIndex = () => Math.floor(Math.random() * quotes.length);
    const [randomQuote, setQuote] = useState(quotes[getRandomIndex()]);
    const quoteHandler = () => {
        const newIndex = getRandomIndex();
        setQuote(quotes[newIndex]);
    }
    return (
        <div>
            <h4>Quote of the Day</h4>
            <p>{randomQuote}</p>
            <button onClick={quoteHandler} className='button'>New Quote</button>
        </div>
    )
}

export default Quotes
