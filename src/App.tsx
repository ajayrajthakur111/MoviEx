import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Loader } from "./components/common/Loader";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";
import { useAppSelector } from "./store";
import Header from "./components/common/Header";

// Lazy load components
const Login = lazy(() => import("./components/auth/Login"));
const SearchMoviesPage = lazy(
  () => import("./components/pages/SearchMoviesPage")
);
const WatchlistPage = lazy(() => import("./components/pages/WatchlistPage"));

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Suspense
        fallback={
          <div className="w-full h-[100vh] flex items-center justify-center bg-gray-50">
            <Loader />
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/search" : "/login"} />}
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Header />
                <SearchMoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Header />
                <WatchlistPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/search" : "/login"} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
