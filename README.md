# NewsApp
A modern React News Application that fetches live news from a public API.
It supports infinite scrolling, favorites, offline detection, and light/dark themes for a smooth reading experience.

# Features
✅ Top headlines & category filtering (Business, Entertainment, Sports, Health, Science, Technology)
✅ Search news by keyword
✅ Add/remove favorites (saved in localStorage)
✅ Infinite scrolling for seamless news loading
✅ Offline detection banner (alerts when connection is lost)
✅ Responsive design using Bootstrap
✅ Light / Dark mode toggle with persistent theme
✅ Toast notifications for user feedback

# Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/news-app.git
cd news-app

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file for your News API key
REACT_APP_NEWS_API_KEY=your_api_key_here
You can get a free key from https://newsapi.org

4️⃣ Start the app
npm start
The app will run at http://localhost:3000

# Folder Structure
src/
│
├── components/
│   ├── NewsComponent.js        # Main news display logic
│   ├── NewsItem.js             # Single news card
│   ├── Favourite.js            # Favorites list
│   ├── NavBar.js               # Navigation bar + Theme toggle
│   ├── AboutUs.js              # About page
│   ├── routes/Layout.js        # Shared layout (Nav + Outlet)
│   └── theme/ThemeContext.js   # Light/Dark theme context
│
├── services/
│   └── newsServices.js         # API call logic
│
├── assets/                     # Images (e.g., no_news_found.jpg)
├── App.js
├── index.js
├── index.css                   # Global + Theme styles
└── NewsComponent.css           # Card & layout styling

# Dark & Light Theme
Controlled via a ThemeContext
Uses data-theme on <body> for easy CSS customization
Automatically persists the selected theme in localStorage

# Favorites Feature
Users can click ⭐ to save/un-save an article.
Favorites are stored locally (localStorage), so they persist even after page refresh.

# API Usage & Limits

This project uses the NewsAPI.org
 free tier,
which limits to 100 articles per request and 1,000 requests/day.

If you see this error:

"code": "maximumResultsReached"


→ That means the API free limit was reached.
You can upgrade to a paid plan or use a mock API for testing.
