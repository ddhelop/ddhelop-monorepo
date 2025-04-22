'use client';

import { useState, useEffect } from 'react';

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('personal-info');
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adding offset

      // Get all section elements
      const sections = [
        document.getElementById('personal-info'),
        document.getElementById('projects'),
        document.getElementById('experience'),
        document.getElementById('education'),
      ];

      // Check which section is currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const nextSection = sections[i + 1];

          if (
            scrollPosition >= section.offsetTop &&
            (!nextSection || scrollPosition < nextSection.offsetTop)
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) as HTMLElement | null;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={`fixed top-1/3 ${
        isMobile ? 'right-4' : 'right-5'
      } z-40 group floating-nav`}
    >
      {/* Minimized view (indicator lines) */}
      <div className="flex flex-col items-end space-y-3 group-hover:opacity-0 group-hover:invisible transition-all duration-200">
        {/* Personal Info line */}
        <div
          className={`w-5 h-0.5 ${
            activeSection === 'personal-info' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Projects line */}
        <div
          className={`w-4.5 h-0.5 ${
            activeSection === 'projects' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Experience line */}
        <div
          className={`w-4.5 h-0.5 ${
            activeSection === 'experience' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Education line */}
        <div
          className={`w-4.5 h-0.5 ${
            activeSection === 'education' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />
      </div>

      {/* Expanded navigation on hover */}
      <div className="absolute top-[-15] right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
        <div
          className={`flex flex-col space-y-5 p-3 rounded-lg ${
            isMobile ? 'bg-white border border-gray-200' : 'bg-white/90'
          }`}
        >
          {/* Main sections - vertical layout */}
          <div className="flex flex-col space-y-4">
            {/* Personal Info section */}
            <button
              type="button"
              onClick={() => scrollToSection('personal-info')}
              className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                activeSection === 'personal-info'
                  ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
              }`}
            >
              인트로
            </button>

            {/* Projects section */}
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                activeSection === 'projects'
                  ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
              }`}
            >
              프로젝트
            </button>

            {/* Experience section */}
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
              className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                activeSection === 'experience'
                  ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
              }`}
            >
              경력
            </button>

            {/* Education section */}
            <button
              type="button"
              onClick={() => scrollToSection('education')}
              className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                activeSection === 'education'
                  ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
              }`}
            >
              학력
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNav;
