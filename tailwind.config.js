// https://tailwindcss.com/docs/content-configuration
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: ['bg-teal-800', 'bg-amber-500', 'bg-rose-500'], // Safelisting classes
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        purple: {
          primary: '#845ec2', // bar color and selected sorting algorithm color
          secondary: '#4b4453', // bar section background
          'secondary-focus': '#362d3d', // hover color, not working rn
          accent: '#c34a36', // bar changer color
          'base-100': '#362d3d', // main background and modal background
          'base-200': '#4b4453', // hover effect in modal table
          'base-300': '#845ec2', // modal border color
          'base-content': '#ffffff', // text color
          success: '#36d399',
          warning: '#fbbd23',
          error: '#c34a36',
        },
        darkPurple: {
          primary: '#845ec2',
          'primary-focus': '#6b3fa5',
          secondary: '#4b4453',
          'secondary-focus': '#362d3d',
          accent: '#c34a36',
          'accent-focus': '#a12f2a',
          neutral: '#2a2433',
          'base-100': '#1f1a2a',
          'base-200': '#2a2433',
          'base-300': '#362d3d',
          'base-content': '#ffffff',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#c34a36',
        },
        // NEW THEME 1: Ocean Blue - Professional and calming
        ocean: {
          primary: '#0891b2', // Cyan-600 - bright blue for bars and selected algorithms
          'primary-focus': '#0e7490', // Cyan-700 - deeper blue on focus
          secondary: '#374151', // Gray-700 - neutral dark background for bar sections
          'secondary-focus': '#1f2937', // Gray-800 - darker hover state
          accent: '#f59e0b', // Amber-500 - warm orange for bar changer
          'accent-focus': '#d97706', // Amber-600 - deeper orange on focus
          neutral: '#111827', // Gray-900 - very dark neutral
          'base-100': '#1f2937', // Gray-800 - main dark background
          'base-200': '#374151', // Gray-700 - modal/card backgrounds
          'base-300': '#4b5563', // Gray-600 - borders and dividers
          'base-content': '#f3f4f6', // Gray-100 - light text
          success: '#10b981', // Emerald-500
          warning: '#f59e0b', // Amber-500
          error: '#ef4444', // Red-500
        },
        // NEW THEME 2: Forest Green - Nature-inspired and easy on eyes
        forest: {
          primary: '#059669', // Emerald-600 - rich green for primary elements
          'primary-focus': '#047857', // Emerald-700 - deeper green focus
          secondary: '#374151', // Gray-700 - balanced dark background
          'secondary-focus': '#1f2937', // Gray-800 - darker hover
          accent: '#dc2626', // Red-600 - bold red for accents/bar changer
          'accent-focus': '#b91c1c', // Red-700 - deeper red focus
          neutral: '#0f172a', // Slate-900 - deep neutral base
          'base-100': '#1e293b', // Slate-800 - main background
          'base-200': '#334155', // Slate-700 - secondary backgrounds
          'base-300': '#475569', // Slate-600 - borders
          'base-content': '#f1f5f9', // Slate-100 - crisp white text
          success: '#22c55e', // Green-500
          warning: '#eab308', // Yellow-500
          error: '#dc2626', // Red-600
        },
        // NEW THEME 3: Sunset Orange - Warm and energetic
        sunset: {
          primary: '#9F5c12', // Orange-600 - vibrant orange for primary elements
          'primary-focus': '#c2410c', // Orange-700 - deeper orange focus
          secondary: '#44403c', // Stone-700 - warm dark background
          'secondary-focus': '#292524', // Stone-800 - darker warm hover
          accent: '#7c3aed', // Violet-600 - purple accent for contrast
          'accent-focus': '#6d28d9', // Violet-700 - deeper purple focus
          neutral: '#1c1917', // Stone-900 - deep warm neutral
          'base-100': '#292524', // Stone-800 - warm main background
          'base-200': '#44403c', // Stone-700 - secondary warm backgrounds
          'base-300': '#57534e', // Stone-600 - warm borders
          'base-content': '#fafaf9', // Stone-50 - warm white text
          success: '#16a34a', // Green-600
          warning: '#ca8a04', // Yellow-600
          error: '#dc2626', // Red-600
        },
      },
    ],
  },
};
