'use client';

import React from 'react';

const ScrollProgressBar = () => {
  // This function will run only in the browser after the component mounts
  if (typeof window !== 'undefined') {
    // Use setTimeout to ensure the DOM is fully loaded
    setTimeout(() => {
      const progressBar = document.getElementById('scroll-progress-bar');

      if (progressBar) {
        const updateScrollProgress = () => {
          const scrollTop = window.scrollY;
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress =
            scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
          progressBar.style.width = `${progress}%`;
        };

        // Add event listener and call once
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
      }
    }, 0);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
      <div
        id="scroll-progress-bar"
        className="h-full bg-[#5670CF] transition-all duration-150 ease-out"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ScrollProgressBar;
