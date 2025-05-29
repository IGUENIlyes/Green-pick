import { useState, useEffect } from "react";
import "./testimonials-section.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import backgroundImage from "/forme sin (1).png";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "SOUAD",
      image: "/Messi.png",
      text: "\"Un excellent choix d'options et un service client réactif. Mon dernier achat a été très satisfaisant, et j'ai même pu faire un don à une cause qui me tient à cœur. Très belle initiative !\"",
      rating: 5,
    },
    {
      id: 2,
      name: "MOUHAND",
      image: "/images/mouhand.png",
      text: "\"Une expérience d'achat unique ! J'adore le concept de faire un don en même temps. Les articles sont magnifiques et de grande qualité. Je n'hésiterai pas à recommander à mes amis !\"",
      rating: 5,
    },
    {
      id: 3,
      name: "MAYLINE",
      image: "/images/mayline.png",
      text: "Je suis impressionnée par la diversité des produits proposés. C'est motivant de dépenser dans une plateforme qui fait réellement la différence. Seul petit bémol : l'absence de la livraison .\"",
      rating: 5,
    },
    {
      id: 4,
      name: "THOMAS",
      image: "/images/placeholder.svg?height=100&width=100",
      text: '"Service impeccable et produits de qualité. Je recommande vivement cette plateforme à tous mes proches !"',
      rating: 5,
    },
    {
      id: 5,
      name: "SARAH",
      image: "/images/placeholder.svg?height=100&width=100",
      text: "\"J'ai découvert cette plateforme il y a quelques mois et je ne peux plus m'en passer. Les produits sont exceptionnels !\"",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialsPerView, setTestimonialsPerView] = useState(3);

  // Responsive handling for number of testimonials to display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialsPerView(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialsPerView(2);
      } else {
        setTestimonialsPerView(3);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length - testimonialsPerView + 1
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0
        ? testimonials.length - testimonialsPerView
        : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="star">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="testimonials-section">
      <img src={backgroundImage} alt="" className="category-background-image" />
      <div className="testimonials-container">
        <h1 className="testimonials-title">Les Avis De Nos Clients</h1>
        <p className="testimonials-subtitle">
          Vos retours sont précieux pour nous ! Voici quelques avis de clients
          satisfaits qui partagent leurs expériences avec notre plateforme.
          Merci à tous pour votre soutien et votre confiance !
        </p>

        <div className="testimonials-carousel-container">
          <button
            className="nav-button prev-button"
            onClick={prevSlide}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials-slider">
            {testimonials
              .slice(currentIndex, currentIndex + testimonialsPerView)
              .map((testimonial) => (
                <div key={testimonial.id} className="testimonial-carte">
                  <div className="testimonial-content">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-image-outer">
                    <div className="testimonial-image-container">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.name}`}
                        className="testimonial-image"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <button
            className="nav-button next-button"
            onClick={nextSlide}
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
