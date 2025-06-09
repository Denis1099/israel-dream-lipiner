import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors for monitoring (keep console.error for debugging)
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Set page title for 404
    document.title = "Page Not Found | Israeli Real Estate Lawyers";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-primary-light">
      <Navbar activeSection="" />
      <main className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-primary-gold mb-4 font-merriweather">404</h1>
            <h2 className="text-2xl font-semibold text-primary-navy mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <a 
              href="/" 
              className="inline-block py-3 px-8 bg-primary-gold text-primary-light font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Return to Home
            </a>
            <div className="text-sm text-gray-500">
              <p>Need legal assistance? <a href="/#contact" className="text-primary-gold hover:underline">Contact us</a></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
