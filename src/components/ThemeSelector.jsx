import { PaletteIcon, CheckIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('purple');
  const [themes, setThemes] = useState([]);

  // Load themes (from DaisyUI or fallback)
  useEffect(() => {
    const daisyThemes = window.daisyui?.themes
      ? Object.keys(window.daisyui.themes)
      : ['purple', 'darkPurple', 'ocean', 'forest', 'sunset']; // fallback
    setThemes(daisyThemes);

    const savedTheme = localStorage.getItem('theme') || 'purple';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle theme change
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className='dropdown dropdown-end z-[999]'>
      {/* DROPDOWN TRIGGER */}
      <button
        tabIndex={0}
        className='flex items-center gap-2 bg-primary text-base-content px-5 py-3.5 rounded-md hover:bg-secondary-focus transition-all w-full justify-center'
      >
        <PaletteIcon className='size-5 text-base-content' />
        <span className='text-sm font-medium'>Theme</span>
      </button>

      {/* DROPDOWN MENU */}
      <div
        tabIndex={0}
        className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg 
          rounded-md w-56 border border-base-content/10 z-[9999] right-0'
      >
        {themes.map((theme) => (
          <button
            key={theme}
            className={`
              w-full px-4 py-3 rounded-md flex items-center gap-3 transition-colors
              ${
                currentTheme === theme
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-base-content/5 text-base-content'
              }
            `}
            onClick={() => handleThemeChange(theme)}
          >
            <PaletteIcon className='size-4' />
            <span className='text-sm font-medium capitalize'>{theme}</span>

            {/* ACTIVE CHECKMARK */}
            {currentTheme === theme && (
              <CheckIcon className='size-4 ml-auto text-primary' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
