import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        image: "https://www.kastongroup.com/site/wp-content/uploads/2017/06/resources-banner-1600x600.jpg",
        title: "Find Amazing Events",
        subtitle: "Discover the best gatherings near you.",
    },
    {
        image: "https://www.indochinasails.com/MediaUpload/121294510Du_thuyen_Indochine_Indochina_Sails_(5)_(1).jpg",
        title: "Join the Hype",
        subtitle: "Concerts, parties, and festivals all in one place.",
    },
    {
        image: "https://i.ebayimg.com/00/s/NjAwWDE2MDA=/z/~NEAAOSwhelkcVaw/$_57.JPG?set_id=8800005007",
        title: "Grow Professionally",
        subtitle: "Tech talks, workshops, and networking events.",
    },
    {
        image: "https://i.ebayimg.com/00/s/NjAwWDE2MDA=/z/~NEAAOSwhelkcVaw/$_57.JPG?set_id=8800005007",
        title: "Grow Professionally",
        subtitle: "Tech talks, workshops, and networking events.",
    },
];

const HeroCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-[45vh] rounded-2xl overflow-hidden shadow-lg">
            {slides.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={img.image}
                        alt={img.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 0 flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
                            {img.title}
                        </h1>
                        <p className="text-white text-lg mt-2 drop-shadow">
                            {img.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((x, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full ${
                            i === index ? "bg-white" : "bg-white/40"
                        } hover:scale-110 transition-transform`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
