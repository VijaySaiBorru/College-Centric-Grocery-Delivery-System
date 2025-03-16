import React from 'react'
import dealsImg from "../../assets/deals.png"
const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={dealsImg} alt="" />
      </div>
      <div className='deals__content'>
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>Our TATA IPL 2025 Merchandise Deals are here to fuel your cricket passion without breaking the bank. Explore a handpicked collection of exclusive IPL jerseys, caps, and accessories, all designed to show off your team spirit in style!</p>

        <div className='deals__countdown flex-wrap'>
            <div className='deals__countdown__card'>
                <h4>14</h4>
                <p>Days</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>20</h4>
                <p>Hours</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>15</h4>
                <p>Mins</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>05</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default DealsSection
