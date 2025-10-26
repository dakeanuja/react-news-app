# NewsApp
A modern React News Application that fetches live news from a public API.
It supports infinite scrolling, favorites, offline detection, and light/dark themes for a smooth reading experience.

# Features
1. Top headlines & category filtering (Business, Entertainment, Sports, Health, Science, Technology)
   
2. Search news by keyword

3. Add/remove favorites (saved in localStorage)
 
4. Infinite scrolling for seamless news loading
  
5. Offline detection banner (alerts when connection is lost)
   
6. Responsive design using Bootstrap
    
7. Light / Dark mode toggle with persistent theme
    
8. Toast notifications for user feedback

# Installation & Setup
1️. Clone the repository
   - git clone https://github.com/your-username/news-app.git
   - cd news-app

2️. Install dependencies
   - npm install

3️. Create a .env file for your News API key
   - REACT_APP_NEWS_API_KEY=your_api_key_here
   - You can get a free key from https://newsapi.org

4️. Start the app
  - npm start
  - The app will run at http://localhost:3000

# Dark & Light Theme
Controlled via a ThemeContext

Uses data-theme on <body> for easy CSS customization

Automatically persists the selected theme in localStorage

# Favorites Feature
Users can click ⭐ to save/un-save an article.

Favorites are stored locally (localStorage), so they persist even after page refresh.

# API Usage & Limits

This project uses the NewsAPI.org free tier, which limits to 100 articles per request and 1,000 requests/day.

If you see this error:

"code": "maximumResultsReached"


→ That means the API free limit was reached.

You can upgrade to a paid plan or use a mock API for testing.
