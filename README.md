# Sorting Visualization Tool

Interactive web application that visualizes 7 sorting algorithms in real-time. Built with React 18 and Tailwind CSS.

## Features

- 7 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, Radix, Bucket
- Real-time animated visualization
- Interactive controls: start, pause, resume, reset
- Speed control (slow, medium, fast)
- Algorithm information modal with complexity details
- State persistence across sessions
- Responsive design
- Comprehensive test suite

## Tech Stack

- React 18.2.0 + Vite
- Tailwind CSS
- Jest + React Testing Library
- Context API for state management

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

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # State management
├── helpers/            # Algorithms and utilities
├── data/               # Algorithm descriptions
└── __tests__/          # Test files
```

## Testing

Comprehensive test coverage including:
- Unit tests for all algorithms
- Component tests with user interactions
- Integration tests for state management
- Accessibility tests
