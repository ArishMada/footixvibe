import React, {useState, useEffect} from 'react'

const Backtothetop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    }, []);
  
    return (
      <button
        className={`back-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        &#8593;
      </button>
    );
    }
 
export default Backtothetop
