'use client';

import React, { useState, useEffect } from 'react';

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Check if the user has scrolled down the page
  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      // 300px from the top to show the button
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={styles.scrollButton} // Apply the styles
        aria-label="Scroll to top"
        className='hover:opacity-100 opacity-40 shadow-2xl shadow-mainOrange hover:translate-y-[-5px] transition-all duration-300'
      >
        ↑
      </button>
    )
  );
};

const styles: { scrollButton: React.CSSProperties } = {
  scrollButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    fontSize: '20px',
    backgroundColor: '#DB4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensure it appears on top of other elements
    width: '3rem',
  },
};

export default ScrollTop;
