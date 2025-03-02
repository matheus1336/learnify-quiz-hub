
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { clearProgress } from "../utils/storageUtils";

const Index = () => {
  useEffect(() => {
    // Clear any existing progress when landing on the home page
    clearProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full glass rounded-2xl p-8 sm:p-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center">
            Language Placement Test
          </h1>
          
          <div className="space-y-6 mb-10">
            <p className="text-gray-600 text-center leading-relaxed">
              Discover your English language proficiency level with our adaptive placement test. 
              Answer 10 questions to determine if you're a beginner, intermediate, or advanced learner.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Book 1</div>
                <p className="text-sm text-gray-500">Beginner</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Book 2</div>
                <p className="text-sm text-gray-500">Intermediate</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Book 3</div>
                <p className="text-sm text-gray-500">Advanced</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-center leading-relaxed">
              After completing the placement test, you'll receive a recommended level and access to the corresponding book test.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/placement-test" 
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 active:scale-95 shadow-sm"
            >
              Start Placement Test
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
