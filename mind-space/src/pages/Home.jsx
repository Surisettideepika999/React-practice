import React, { useEffect } from 'react'
import Quotes from './Quotes';
import MoodTracker from './MoodTracker';
import '../styles/Home.css';

const Home = () => {
    const [greeting,setGreeting] = React.useState("");
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 17) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);
     const today = new Date().toLocaleDateString("en-US", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  return (
    <div className='container'>
      <p>{greeting}, Deepika 🌸 </p>
        <p>Today is {today}</p>
      <Quotes />
      <MoodTracker date={today}/>
    </div>
  )
}

export default Home
