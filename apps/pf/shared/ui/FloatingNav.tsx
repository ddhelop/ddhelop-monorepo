'use client';

import { useState, useEffect } from 'react';

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('intro');
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
      const introSection = document.getElementById(
        'intro'
      ) as HTMLElement | null;
      const projectsSection = document.getElementById(
        'projects'
      ) as HTMLElement | null;
      const projectElements =
        document.querySelectorAll<HTMLElement>('[id^="project-"]');

      // Check which section is currently in view
      if (
        introSection &&
        scrollPosition < introSection.offsetTop + introSection.offsetHeight
      ) {
        setActiveSection('intro');
      } else if (projectsSection) {
        if (scrollPosition < projectsSection.offsetTop + 200) {
          setActiveSection('projects');
        } else {
          // Check individual projects
          for (const project of projectElements) {
            const projectId = project.id;
            if (
              scrollPosition >= project.offsetTop &&
              scrollPosition < project.offsetTop + project.offsetHeight
            ) {
              setActiveSection(projectId);
            }
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
      className={`fixed top-1/3 ${isMobile ? 'right-4' : 'right-5'} z-40 group`}
    >
      {/* Minimized view (indicator lines) */}
      <div className="flex flex-col items-end space-y-3 group-hover:opacity-0 group-hover:invisible transition-all duration-200">
        {/* Intro line */}
        <div
          className={`w-5 h-0.5 ${
            activeSection === 'intro' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Projects line */}
        <div
          className={`w-4.5 h-0.5 ${
            activeSection === 'projects' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Project MOA line */}
        <div
          className={`w-3.5 h-0.5 ${
            activeSection === 'project-moa' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Project IBT line */}
        <div
          className={`w-3.5 h-0.5 ${
            activeSection === 'project-ibt' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Project Portfolio line */}
        <div
          className={`w-3.5 h-0.5 ${
            activeSection === 'project-portfolio'
              ? 'bg-gray-900'
              : 'bg-gray-300'
          } transition-colors`}
        />

        {/* Project Linkit line */}
        <div
          className={`w-3.5 h-0.5 ${
            activeSection === 'project-linkit' ? 'bg-gray-900' : 'bg-gray-300'
          } transition-colors`}
        />
      </div>

      {/* Expanded navigation on hover */}
      <div className="absolute top-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
        <div
          className={`flex flex-col space-y-5 p-3 rounded-lg ${
            isMobile ? 'bg-white border border-gray-200' : 'bg-white/90'
          }`}
        >
          {/* Main sections - vertical layout */}
          <div className="flex flex-col space-y-4">
            {/* Intro section */}
            <button
              type="button"
              onClick={() => scrollToSection('intro')}
              className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                activeSection === 'intro'
                  ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
              }`}
            >
              Intro
            </button>

            {/* Projects section with subsections */}
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className={`text-sm whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                  activeSection === 'projects'
                    ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-[#5670CF]/10'
                }`}
              >
                Project
              </button>

              {/* Indented project subsections */}
              <div className="flex flex-col space-y-2 pl-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('project-moa')}
                  className={`text-xs whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                    activeSection === 'project-moa'
                      ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-[#5670CF]/10'
                  }`}
                >
                  1. 모아 커뮤니티
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('project-ibt')}
                  className={`text-xs whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                    activeSection === 'project-ibt'
                      ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-[#5670CF]/10'
                  }`}
                >
                  2. IBT 웹사이트
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('project-portfolio')}
                  className={`text-xs whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                    activeSection === 'project-portfolio'
                      ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-[#5670CF]/10'
                  }`}
                >
                  3. 포트폴리오
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('project-linkit')}
                  className={`text-xs whitespace-nowrap transition-all text-left cursor-pointer rounded-md py-1 px-2 ${
                    activeSection === 'project-linkit'
                      ? 'text-gray-900 font-medium bg-[#5670CF]/10'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-[#5670CF]/10'
                  }`}
                >
                  4. 링킷
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNav;
