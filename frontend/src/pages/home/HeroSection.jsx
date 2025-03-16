
import card1 from "../../assets/card-1.png"
import card2 from "../../assets/card-2.png"
import card3 from "../../assets/card-3.png"

const cards = [
  {
    id: 1,
    image: card1, // Update with an IPL-themed image, such as a jersey or cap
    trend: 'TATA IPL 2025 Merchandise',
    title: 'IPL Team Jerseys',
  },
  {
    id: 2,
    image: card2, // Update with an IPL-themed image, such as IPL accessories like caps
    trend: 'TATA IPL 2025 Merchandise',
    title: 'IPL Caps & Hats',
  },
  {
    id: 3,
    image: card3, // Update with an IPL-themed image, such as wristbands or keychains
    trend: 'TATA IPL 2025 Merchandise',
    title: 'IPL Accessories',
  },
];

const HeroSection = () => {
  return (
    <section className='section__container hero__container'>
      {
        cards.map((card)=>(
            <div key={card.id} className='hero__card'>
                <img src={card.image} alt="" />
                <div className='hero__content'>
                    <p>{card.trend}</p>
                    <h4>{card.title}</h4>
                    <a href="#">Discover More</a>
                </div>
            </div>
        ))
      }
    </section>
  )
}

export default HeroSection
