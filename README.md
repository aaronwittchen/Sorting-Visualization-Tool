# Sorting Visualization Tool

[![MIT License](https://img.shields.io/github/license/aaronwittchen/Sorting-Visualization-Tool)](https://github.com/aaronwittchen/Sorting-Visualization-Tool/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green?logo=vercel)](https://sorting-visualization-tool.vercel.app/)
[![React Version](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Vitest](https://github.com/aaronwittchen/Sorting-Visualization-Tool/actions/workflows/test.yml/badge.svg)](https://github.com/aaronwittchen/Sorting-Visualization-Tool/actions)
[![Codecov](https://codecov.io/gh/aaronwittchen/Sorting-Visualization-Tool/branch/main/graph/badge.svg)](https://codecov.io/gh/aaronwittchen/Sorting-Visualization-Tool)
[![GitHub last commit](https://img.shields.io/github/last-commit/aaronwittchen/Sorting-Visualization-Tool)](https://github.com/aaronwittchen/Sorting-Visualization-Tool/commits)

Interactive web application that visualizes 7 sorting algorithms in real-time. Built with React 18 and Tailwind CSS.  
Live page: https://sorting-visualization-tool.vercel.app/

https://github.com/user-attachments/assets/4a68b46e-1270-4553-add3-4a68b7006d7c

## Features

### Sorting Algorithms
- **7 sorting algorithms** with real-time visualization:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Radix Sort
  - Bucket Sort

### Interactive Controls
- **Visualization Controls**:
  - Start/Pause/Resume sorting
  - Reset array generation
  - Adjustable speed (slow, medium, fast)
  - Real-time step counter
  - Swap and comparison counters

### User Experience
- **Responsive Design**:
  - Adapts to different screen sizes
  - Dynamic array size based on viewport width
  - Touch-friendly controls

### Educational Features
- **Algorithm Information**:
  - Detailed descriptions of each algorithm
  - Time and space complexity analysis
  - Step-by-step pseudocode
  - Comparison table of all algorithms

### Customization
- **Theme Support**:
  - Multiple color themes (purple, darkPurple, ocean, forest, sunset)
  - Theme persistence across sessions
  - System preference detection

### Internationalization
- **Multi-language Support**:
  - English and German language options
  - Easy to add more languages

### Performance
- **Optimized Visualization**:
  - Smooth animations
  - Efficient state management with React Context
  - Abort and pause/resume functionality

### Developer Experience
- **Testing**:
  - Comprehensive test suite with Vitest
  - Component testing with React Testing Library
  - Code coverage reporting
  - CI/CD integration

## Tech Stack

### Core
- **React 18.2.0** - Frontend library for building user interfaces
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS

### State Management
- **React Context API** - For global state management
- **Custom Hooks** - For reusable logic

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - For component testing
- **Codecov** - Code coverage reporting

### Build & Deploy
- **Vite** - Build tool and dev server
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform

## Installation

```bash
git clone https://github.com/aaronwittchen/Sorting-Visualization-Tool.git
cd Sorting-Visualization-Tool
npm install
npm run dev
```

Open `http://localhost:5173`

## Usage

1. Select an algorithm
2. Click "Reset" to generate new data
3. Click "Start" to begin visualization
4. Use speed dropdown to adjust speed
5. Pause/resume as needed
6. Click "?" for algorithm information

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Testing

The application includes comprehensive test coverage with a focus on reliability and maintainability:

### Algorithm Tests
- Unit tests for all 7 sorting algorithms
- Edge case testing
- Performance validation

### Component Tests
- Interactive component testing
- State management testing
- Event handling verification
- Accessibility compliance

### Integration Tests
- State management integration
- Component interaction testing
- End-to-end workflow testing

## Project Structure

```
src/
├── components/          # React components
│   ├── Modal/          # Algorithm information modal
│   ├── Overlay.jsx     # Main UI component
│   └── ThemeSelector.jsx # Theme switching component
├── contexts/           # State management
│   └── Context.jsx     # Main application context
├── helpers/            # Algorithms and utilities
│   ├── sortingAlgorithms.js  # Sorting algorithm implementations
│   ├── math.js         # Math utilities
│   └── speedConfig.js  # Animation speed configurations
├── data/               # Algorithm descriptions
│   ├── aboutAlgorithm.en.json  # English algorithm info
│   └── aboutAlgorithm.de.json  # German algorithm info
├── __tests__/          # Test files
│   ├── components/     # Component tests
│   └── helpers/        # Algorithm tests
└── assets/             # Static assets
```