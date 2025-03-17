
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection.jsx'
import PromoBanner from './PromoBanner.jsx'
import Blogs from '../blogs/Blogs.jsx'
import Teams from './Teams.jsx'
const Home = () => {
  return (
    <div>
      <Banner/>
      {/*<Categories/>*/}
      <Teams/>
      {/* <HeroSection/> */}
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </div>
  )
}

export default Home
