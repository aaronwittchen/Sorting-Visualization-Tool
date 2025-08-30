# Testing Documentation

## Setup
- Jest and React Testing Library
- Dependencies: @testing-library/jest-dom, @testing-library/user-event

## Commands
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm test -- pattern      # Run specific tests
```

## Test Structure

### Unit Tests
**Sorting Algorithms** (`src/helpers/__tests__/sortingAlgorithms.test.js`)
- All 7 algorithms: Bubble, Selection, Insertion, Merge, Quick, Radix, Bucket
- Edge cases: empty arrays, single elements, duplicates, negatives
- Error handling and pause/resume functionality

**Helpers**
- Math functions: getRandomNumber, getDigit, mostDigits
- Async utilities: awaitTimeout, checkPause
- Configuration: speed mapping, algorithm mapping

### Component Tests
**Context** (`src/contexts/__tests__/Context.test.jsx`)
- State management, array generation, algorithm selection
- Speed changes, localStorage persistence, error handling

**Overlay** (`src/components/__tests__/Overlay.test.jsx`)
- UI rendering, algorithm buttons, speed selector
- Modal interactions, button states, array visualization

**Modal** (`src/components/Modal/__tests__/Modal.test.jsx`)
- Open/close behavior, click outside, keyboard events
- Content rendering, accessibility

**App** (`src/__tests__/App.test.jsx`)
- Component mounting, structure, integration

## Coverage
- All 7 sorting algorithms
- Edge cases and error handling
- State management and UI interactions
- localStorage persistence
- Accessibility features

## Mocking
- Algorithm mocks in component tests
- localStorage and matchMedia mocks
- Component mocks for isolation

## Best Practices
- Clear test organization with describe/it blocks
- Realistic user interactions with userEvent
- Specific assertions (toBe, toEqual, toContain)
- Consistent test data and edge case coverage

## CI/CD Ready
- Fast execution (< 30 seconds)
- No external dependencies
- Comprehensive coverage reporting