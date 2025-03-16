
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/ipl-store.webp"
const Banner = () => {
  return (
    <div  className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP TO 20% Discount on</h4>
        <h1>IPL Merchandise & Accessories</h1>
        <p>Gear up for TATA IPL 2025 with our exclusive collection of IPL-themed accessories, including jerseys, caps, and more! Show your team spirit in style.</p>
        <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>
      </div>
      <div className='header__image'><img src={bannerImg} alt="banner Img" /></div>
    </div>
  )
}

export default Banner
