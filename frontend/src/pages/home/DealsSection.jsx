import React, { useState, useEffect }  from 'react'
import dealsImg from "../../assets/full-trolley.jpeg"
const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    // Set the target date for the countdown (April 1, 2025)
    const targetDate = new Date('2025-04-01T00:00:00'); // Target date set to April 1, 2025

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      // Calculate the time remaining
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Countdown finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
      // Update the countdown every second
      const timer = setInterval(updateCountdown, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }, []);
  
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={dealsImg} alt="" />
      </div>
      <div className='deals__content'>
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>"Exciting news for all! Our 2025 Grocery Deals are here to fuel your shopping spree without breaking the bank. Explore a handpicked collection of fresh produce, snacks, and essentials, all designed to keep your kitchen stocked and your meals on point!</p>

        <div className='deals__countdown flex-wrap'>
            <div className='deals__countdown__card'>
                <h4>{timeLeft.days}</h4>
                <p>Days</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>{timeLeft.hours}</h4>
                <p>Hours</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>{timeLeft.minutes}</h4>
                <p>Mins</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>{timeLeft.seconds}</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default DealsSection
