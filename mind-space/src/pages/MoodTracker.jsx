import React from 'react'

const MoodTracker = (props) => {
    const { date } = props;
    const lastMood = { mood: "😊 Happy", date: "July 28" };
  return (
    <div>
      <p>Your last mood {lastMood.mood} on {date}</p>
    </div>
  )
}

export default MoodTracker
