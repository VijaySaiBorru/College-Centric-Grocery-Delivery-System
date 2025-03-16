
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/banner.png"
const Banner = () => {
  return (
    <div  className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP TO 20% Discount on</h4>
        <h1>Clothes, Groceries & Essentials</h1>
        <p>From snacks to stationary, we've got everything you need to fuel your brain and your day! Grab your essentials and show off your campus spirit with our exclusive college gear. Shop now and make every day on campus unforgettable!</p>
        <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>
      </div>
      <div className='header__image'><img src={bannerImg} alt="banner Img" /></div>
    </div>
  )
}

export default Banner
