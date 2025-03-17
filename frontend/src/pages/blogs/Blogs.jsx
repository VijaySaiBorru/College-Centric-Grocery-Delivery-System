import blogsData from "../../data/blogs.json";  // Assuming blogsData contains IPL-related blog information
import storeImg1 from "../../assets/store-image1.png";
import storeImg2 from "../../assets/store-image2.png";
import storeImg3 from "../../assets/store-image3.png";
import storeImg4 from "../../assets/store-image4.png";
const map=[
  storeImg1,storeImg2,storeImg3,storeImg4
]
const Blogs = () => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Our latest stores</h2>
      <p className="section__subheader">
      "Unleash freshness  healthy, everyday essentials "
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {blogsData.map((blog, index) => (
          <a
            key={index}
            href={blog.link}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // For security purposes when opening in a new tab
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img
              src={map[index]}
              alt="blog image"
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="blog__card__content mt-4">
              <h6 className="text-xl font-semibold">{blog.subtitle}</h6>
              <h4 className="text-2xl font-bold mt-2">{blog.title}</h4>
              <p className="text-sm text-gray-500 mt-2">{blog.date}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
