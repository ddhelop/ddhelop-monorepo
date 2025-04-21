'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-slate-800 text-center">
      <div className="mx-auto max-w-4xl px-6 flex flex-col gap-2">
        {/* Links row */}
        <div className="flex justify-center items-center gap-6">
          <a
            href="mailto:clfgnm9@naver.com"
            className="text-sm text-white hover:text-main-100 transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/ddhelop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-main-100 transition-colors"
          >
            Github
          </a>
          <a
            href="https://ddhelop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-main-100 transition-colors"
          >
            Blog
          </a>
          <a
            href="https://www.linkedin.com/in/ddhelop/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-main-100 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright row */}
        <div className="text-xs text-slate-200">
          Copyright {currentYear}. 김동혁 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
