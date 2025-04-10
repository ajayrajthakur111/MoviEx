🎬 MoviEx App
A modern React + TypeScript web app to search, save, and manage your favorite movies. Built with Redux Toolkit and Material UI, featuring a responsive design, smooth animations, and infinite scrolling for a seamless user experience.

🚀 Features
✔ Search Movies – Find movies with a debounced search.
✔ Infinite Scroll – Automatically load more results as you scroll.
✔ Watchlist – Add or remove movies from your personal watchlist.
✔ Movie Details – View ratings, plot, and cast in a responsive modal.
✔ Optimized Performance – Uses debouncing, lazy loading, and caching.

📸 Screenshots
Home Page	Movie Details Modal	Watchlist
📦 Tech Stack
Frontend: React, TypeScript

State Management: Redux Toolkit and redux-persist

UI Library: Material UI (MUI)

Routing: React Router

Utils: Lodash (for debouncing), Infinite Scroll

🛠 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/ajayrajthakur111/MoviEx.git
cd omdb-movie-search
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
# or
yarn install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your OMDb API key:

env
Copy
Edit
REACT_APP_OMDB_API_KEY=your_api_key_here
Get a free API key from OMDb API.

4️⃣ Start the Development Server
sh
Copy
Edit
npm start
# or
yarn start
Open http://localhost:3000 in your browser.

📜 Folder Structure
go
Copy
Edit
📂 omdb-movie-search
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📜 Login.tsx        // Authentication login
 ┃ ┃ ┣ 📂 common
 ┃ ┃ ┃ ┣ 📜 Header.tsx       // App header component
 ┃ ┃ ┃ ┣ 📜 Loader.module.css // Loader styles
 ┃ ┃ ┃ ┣ 📜 Loader.tsx       // Loading spinner
 ┃ ┃ ┃ ┣ 📜 ProtectedRoute.tsx // Route protection
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📜 SearchMoviesPage.tsx // Movie search page
 ┃ ┃ ┃ ┣ 📜 WatchlistPage.tsx    // Watchlist page
 ┃ ┣ 📂 store
 ┃ ┃ ┣ 📂 slices
 ┃ ┃ ┃ ┣ 📜 watchlistSlice.ts  // Watchlist state management
 ┃ ┃ ┃ ┣ 📜 moviesSlice.ts     // Movie search & fetch logic
 ┃ ┃ ┃ ┣ 📜 authSlice.ts       // Authentication state
 ┃ ┣ 📜 App.tsx
 ┃ ┣ 📜 index.tsx
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
🌎 API Integration
The app fetches movie data using OMDb API.
Example API request:

sh
Copy
Edit
https://www.omdbapi.com/?s=batman&apikey=your_api_key
📌 Available Scripts
Command	Description
npm start	Run the development server
npm run build	Build the production app
npm test	Run unit tests
npm run lint	Lint your code
🛡 Security & Best Practices
✅ Environment Variables – API keys are stored in .env.
✅ Debounced API Calls – Reduces unnecessary requests.
✅ Code Splitting – Improves performance.
✅ Responsive UI – Mobile-first design.

🤝 Contributing
Want to improve the app?

Fork this repository.

Create a feature branch (feature/add-something).

Commit your changes.

Open a pull request.

📜 License
This project is open-source and licensed under the MIT License.

📩 Contact & Support
👨‍💻 Developer: Ajay Rajput
📧 Email: ajayrajthakur111@gmail.com
🚀 GitHub: [Movie Watchlist Repo](https://github.com/ajayrajthakur111/MoviEx.git)

#   M o v i E x  
 