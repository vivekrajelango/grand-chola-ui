import { useState, useRef, useEffect } from 'react';
import { Lightbulb, Cloud, Shield, Server, ArrowLeftCircle, ArrowRightCircle, Computer, ChartNoAxesCombined } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ServicesScroller() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    const scrollAmount = 300; // Adjust as needed
    
    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
      
      // Update scroll position after scrolling
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }, 300);
    }
  };

  // Update max scroll value when component mounts
  const updateScrollMeasurements = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  };

  // Add a scroll event listener to update position
  const handleScrollEvent = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  // Call updateScrollMeasurements when the component loads
  useEffect(() => {
    // Initial measurements
    setTimeout(updateScrollMeasurements, 100);
    
    // Set up event listeners
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScrollEvent);
    }
    
    window.addEventListener('resize', updateScrollMeasurements);
    
    // Cleanup
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScrollEvent);
      }
      window.removeEventListener('resize', updateScrollMeasurements);
    };
  }, []);

  interface ServiceItem {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  const services: ServiceItem[] = [
    {
      icon: "biryani/lamb.jpg",
      title: "Biryani",
      description: "Unlock the power of artificial intelligence to drive innovation, efficiency, and growth in your business."
    },
    {
      icon: "veg_dry/balls.jpg",
      title: "Starter",
      description: "Transform your business with cutting-edge digital solutions tailored to your needs."
    },
    {
      icon: "fish/vancharam.jpg",
      title: "Sea Food",
      description: "Leverage cloud technology to scale your business and improve operational efficiency."
    },
    {
      icon: "tandoori/full.jpg",
      title: "Tandoori",
      description: "Protect your business with advanced security solutions and best practices."
    },
    {
      icon: "parotta/parotta.jpg",
      title: "Parotta",
      description: "Build and maintain robust IT infrastructure that grows with your business."
    },
    {
      icon: "dosai/masala.jpg",
      title: "Dosa Corner",
      description: "Gain actionable insights from your data with advanced AI-powered analytics solutions."
    }
  ];

  return (
    <div className="py-6 px-4 text-white relative bg-gray-100" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-amber-900">Explore Menus</h2>
          <div className="w-20 h-1 bg-green mx-auto mb-5"></div>
          <p className="text-amber-900 max-w-2xl mx-auto">
            Order Online or  Collection at M27 8FH
          </p>
        </div>
        
        {/* Scrollable Cards Container with Navigation Buttons */}
        <div className="relative">
          {/* Left scroll button */}
          <button 
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full shadow-lg p-2 ${
              scrollPosition <= 10 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
            }`}
            onClick={() => handleScroll('left')}
            disabled={scrollPosition <= 10}
          >
            <ArrowLeftCircle size={24} className="text-amber-700" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={()=>router.push('/menus')}
                className="cursor-pointer flex-shrink-0 w-72 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center h-full mb-4">
                  <div className="mb-4">
                    <section className="relative rounded-lg w-72 h-44 bg-cover bg-center" style={{ backgroundImage: `url(https://vivek-295524865.imgix.net/${service.icon})` }}>
                      </section>
                  </div>
                  <div className='flex flex-row items-center justify-between gap-8'>
                    <h3 className="text-2xl font-bold text-amber-800">{service.title}</h3>
                    <a
                      onClick={()=>router.push('/menus')}
                      className="inline-flex py-1.5 text-1xl animate-shimmer items-center justify-center rounded-md border border-pink-500 bg-[linear-gradient(110deg,#fd1d1d,30%,#f56040,50%,#fcaf45,70%,#bc2a8d)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white"
                    >
                      Order now
                    </a>          
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right scroll button */}
          <button 
            className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full shadow-lg p-2 ${
              scrollPosition >= maxScroll - 10 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
            }`}
            onClick={() => handleScroll('right')}
            disabled={scrollPosition >= maxScroll - 10}
          >
            <ArrowRightCircle size={24} className="text-amber-700" />
          </button>
        </div>
        
        {/* Scroll indicator dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => {
            // Calculate which dot should be active based on scroll position
            const isActive = scrollPosition >= (index * (maxScroll / Math.ceil(services.length / 3))) && 
                         scrollPosition < ((index + 1) * (maxScroll / Math.ceil(services.length / 3)));
            
            return (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-gray-300' : 'w-2 bg-gray-200'
                }`}
              ></div>
            );
          })}
        </div>
      </div>
      
      {/* Note: We're using inline styles instead of JSX styles for browser compatibility */}
    </div>
  );
}