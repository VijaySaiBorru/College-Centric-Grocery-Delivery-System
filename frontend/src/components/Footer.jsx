
import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'
const Footer = () => {
  return (
    <>
      <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className='ri-map-pin-2-fill'></i></span>
                123, Kalinga Nagar, Bhubaneswar, Odisha
            </p>
            <p>
                <span><i className='ri-mail-fill'></i></span>
                support@e-commerce.com
            </p>
            <p>
                <span><i className='ri-phone-fill'></i></span>
                (+91) 22343532323
            </p>
        </div>
        <div className='footer__col'>
            <h4>Stores</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">Work With Us</a>
            <a href="/">Our Blogs</a>
            <a href="/">Terms & Conditions</a>
        </div>
        <div className='footer__col'>
            <h4>USEFUL LINK</h4>
            <a href="/">Help</a>
            <a href="/">Track your Order</a>
            <a href="/">Near by stores</a>
            <a href="/">Fruits and vegetables</a>
            <a href="/">clothing</a>
        </div>
        <div className='footer__col'>
            <h4>INSTAGRAM</h4>
            <div className='instagram__grid'>
                <img src="https://imgs.search.brave.com/S8OI2vgYSjFSh8U2VE6BJSblJDzKG21UDE3xuRKjA-I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI5LzgyLzkz/LzM2MF9GXzQyOTgy/OTMwNV9obmx3S1hN/cmRiaWdnTmhJSVFp/dXUzWXhrQXVOcUpi/Ti5qcGc" alt="" />
                <img src={instaImg2} alt="" />
                <img src={instaImg3} alt="" />
                <img src={instaImg4} alt="" />
                <img src={instaImg5} alt="" />
                <img src={instaImg6} alt="" />
            </div>
        </div>
      </footer>
      <div className='footer__bar'>
        Copyright  &copy; 2025 Web Design Mastery. All rights reserved.
      </div>
    </>
  )
}

export default Footer

