
export const meta: MetaFunction = () => {
  return [
    { title: "Otto Art Cellar | Original Oil Paintings & Fine Art" },
    { name: "description", content: "Explore the gallery of Otto Art Cellar, featuring a collection of original oil on canvas paintings, still life, and landscapes." },
    { property: "og:title", content: "Otto Art Cellar | Original Oil Paintings" },
    { property: "og:image", content: "/images/coffee_cup.jpeg"  }, // This shows a preview on social media
  ];
}

export default function Home() {
  const galleryItems = [
    { id: 1, title: "Dressed for Winter", medium: "Oil on Canvas", image: "/images/Winter_reindeer.JPG" },
    { id: 2, title: "Morning Aroma", medium: "Oil on Canvas", image: "/images/coffee_cup.jpeg" },
    { id: 3, title: "Fall Stoop", medium: "Oil on Canvas", image: "/images/Fall_stoop.JPG" },
    { id: 4, title: "Hat Stack", medium: "Oil on Canvas", image: "/images/hatstack.JPEG" },
    { id: 5, title: "A Visitor", medium: "Oil on Canvas", image: "/images/pumpkin.JPG" },
    { id: 6, title: "Christmas Coffee", medium: "Oil on Canvas", image: "/images/christmas_coffee.jpg" },
    { id: 7, title: "Spring Wine", medium: "Oil on Canvas", image: "/images/spring_wine.JPEG" },
    { id: 8, title: "Alcove", medium: "Oil on Canvas", image: "/images/alcove.jpg"  },
    { id: 9, title: "Poppy", medium: "Oil on Canvas", image: "/images/redflower.JPG" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-montserrat text-6xl md:text-8xl font-light tracking-wide mb-4">
            Otto Art Cellar
          </h1>
          <p className="font-montserrat text-xl md:text-2xl font-light tracking-widest uppercase">
            Ann Marie Otto
          </p>
           <p className="font-montserrat text-xl md:text-2xl font-light tracking-widest uppercase">
            Contemporary Artist
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-montserrat text-4xl md:text-5xl font-light text-center mb-16 tracking-wide">
          Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.map((item) => (
            <div key={item.id} className="group">
              <div className="aspect-[4/5] bg-gray-200 mb-4 overflow-hidden">
  <img 
    src={item.image} 
    alt={item.title} 
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
  />
              </div>
              <h3 className="font-montserrat text-xl font-light mb-1">{item.title}</h3>
              <p className="font-cormorant text-gray-600 text-lg">{item.medium}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-montserrat text-4xl md:text-5xl font-light text-center mb-12 tracking-wide">
            About
          </h2>
          <p className="font-cormorant text-xl md:text-2xl leading-relaxed text-gray-800">
            Ann Marie Otto is a contemporary artist based in Reading, Pa., exploring themes of light, 
            space, and the subtle beauty found in everyday moments. She exclusively paints landscapes 
            and portraits of everyday objects. Her work is driven by a simple love for painting and an 
            appreciation for the quiet beauty that surrounds us. She hopes her paintings might offer a 
            moment of calm reflection in our busy lives.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat text-4xl md:text-5xl font-light mb-8 tracking-wide">
            Contact
          </h2>
          <p className="font-cormorant text-xl md:text-2xl mb-8 text-gray-700">
            Interested in my work? I'd love to hear from you.
          </p>
          <a 
            href="mailto:ottoartcellar@yahoo.com"
            className="inline-block font-montserrat text-lg px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 tracking-wide"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-200">
        <p className="font-cormorant text-gray-600 text-lg">
          © {new Date().getFullYear()} Ann Marie Otto. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
