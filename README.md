# 🎯 Rewards Dashboard (ReactJS Assignment)

## 📌 Overview

This project is a **ReactJS-based Rewards Dashboard** that calculates and displays reward points for customers based on their transactions over a three-month period.

It demonstrates:

* Clean architecture
* Reusable components
* Data processing & aggregation
* Modern UI with React-Bootstrap
* Testing & linting best practices

---

## 🧮 Reward Calculation Logic

* **2 points** for every dollar spent **above $100**
* **1 point** for every dollar spent **between $50 and $100**
* No points for amounts below $50

### Example:

* Purchase of **$120**

  * $50 → 50 points
  * $20 → 40 points
  * **Total = 90 points**

---

## 🚀 Features

* 📊 Transactions Table
* 📅 Monthly Rewards Calculation
* 🧾 Total Rewards Summary
* 🔍 Search (global filtering)
* ↕️ Sorting (column-based)
* 📄 Pagination
* ⏳ Loading & Error Handling
* 🧪 Unit & Component Testing
* 🧹 ESLint for code quality
* 🧩 Reusable DataTable Component

---

## 🏗️ Project Structure

```
rewards-app/
│
├── public/
│   └── db.json
│
├── src/
│   │
│   ├── components/
│   │   ├── DataTable.jsx
│   │   ├── Loader.jsx
│   │   └── Notification.jsx
│   │
│   ├── pages/
│   │   ├── Transactions.jsx
│   │   ├── MonthlyRewards.jsx
│   │   └── TotalRewards.jsx
│   │
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── constants/
│   │   └── constants.js
│   │
│   ├── helper/
│   │   ├── rewardUtils.js
│   │   ├── logger.js
│   │   ├── dateUtils.js
│   │   └── constants.js
│   │
│   ├── __tests__/
│   │   ├── dateUtils.test.js
│   │   ├── rewardUtils.test.js
│   │   ├── DataTable.test.js
│   │   └── App.test.js
│   │
│   ├── App.jsx
│   └── index.jsx
│
├── .eslintrc.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd rewards-app
```

### 2. Install dependencies

```
npm install
```

### 3. Start the application

```
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🧪 Running Tests

```
npm test
```

---

## 🧹 Linting

```
npm run lint
```

---

## 📡 Data Source

* Data is fetched from:

  * Mock API (`mockData.js`) OR
  * `public/db.json` (via fetch)

---

## 🧠 Key Design Decisions

### 1. Reusable DataTable

* Centralized table logic
* Handles sorting, filtering, pagination

### 2. Separation of Concerns

* UI → pages
* Reusable Components → components
* Logic → helper
* API → services

### 3. Pure Functions

* Reward logic implemented using pure functions
* No mutation of original data

### 4. Logger Utility

* Centralized logging
* Disabled in production

---

## 🧪 Testing Strategy

* Unit tests for:

  * Reward calculation logic
* Component tests for:

  * DataTable behavior
* Integration tests for:

  * App flow (API success/failure)

---

## ⚠️ Constraints Followed

* ✔ ReactJS (No TypeScript Use)
* ✔ No Redux
* ✔ Async API simulation
* ✔ Pure functional approach
* ✔ Clean and reusable code

---

## 💡 Improvements (Future Scope)

* 📊 Charts for reward visualization
* 🔐 Real API integration
* ⚡ Performance optimization (memoization)
* 📦 Custom hooks for reuse

---

## 👨‍💻 Author

**Prashant Kumar**

---

## ⭐ Summary

This project demonstrates a **scalable, maintainable, and production-ready React application** with strong emphasis on clean code, reusability, and best practices.

