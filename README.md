# Smart Expense Tracker

A modern expense tracking application built with React and TypeScript, featuring AI-powered financial insights.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3.32-319795?logo=chakraui&logoColor=white)

## Features

- **Expense Management** - Add, view, and delete expenses with descriptions and categories
- **Budget Tracking** - Set monthly budgets and track spending with visual progress indicators
- **Smart Filtering** - Filter expenses by category, date range, or search by description
- **Analytics Dashboard** - Visualize spending patterns with interactive pie and bar charts
- **AI Insights** - Get personalized financial recommendations powered by Google Gemini AI
- **Persistent Storage** - All data is saved locally in your browser

## Tech Stack

- **Frontend:** React 19, TypeScript
- **UI Library:** Chakra UI
- **State Management:** Zustand
- **Charts:** Recharts
- **AI:** Google Gemini API
- **Routing:** React Router v7

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/kqlzd/smart-expense-tracker.git
   cd smart-expense-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Project Structure

```
src/
├── components/       # Reusable UI components
├── consts/          # Constants and configuration
├── hooks/           # Custom React hooks
│   ├── useAiInsights.ts    # AI integration hook
│   └── useLocalStorage.ts  # Local storage persistence
├── pages/           # Page components
│   ├── HomePage/    # Main dashboard
│   ├── Expenses/    # Expense list with filters
│   └── Analytics/   # Charts and AI insights
├── routes/          # Route configuration
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
```

## Screenshots

### Dashboard
Track your monthly spending at a glance with budget progress indicators.

### Analytics
Visualize your expenses with interactive charts and get AI-powered recommendations.

## Categories

The app includes predefined expense categories:
- Market (Groceries)
- Nəqliyyat (Transportation)
- Alış-veriş (Shopping)
- Əyləncə (Entertainment)
- Restoran (Restaurant)

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Kanan Guluzade** - [@kqlzd](https://github.com/kqlzd)
