
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { testData, getLevelTitle } from "../utils/testData";
import { saveProgress, getProgress, TestProgress } from "../utils/storageUtils";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

const BookTest = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Validate the level parameter
    if (!level || !testData.books[level]) {
      navigate("/");
      return;
    }
    
    // Check if there's any saved progress
    const savedProgress = getProgress();
    if (
      savedProgress && 
      savedProgress.type === 'book' && 
      savedProgress.bookLevel === level && 
      !savedProgress.completed
    ) {
      setCurrentQuestion(savedProgress.currentQuestion);
      setAnswers(savedProgress.answers);
    } else {
      // Initialize new progress
      const initialAnswers = Array(testData.books[level].questions.length).fill(-1);
      setAnswers(initialAnswers);
      saveProgress({
        type: 'book',
        bookLevel: level,
        currentQuestion: 0,
        answers: initialAnswers,
        completed: false
      });
    }
  }, [level, navigate]);
  
  const handleAnswer = (optionIndex: number) => {
    if (!level) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Save progress
    saveProgress({
      type: 'book',
      bookLevel: level,
      currentQuestion,
      answers: newAnswers,
      completed: false
    });
  };
  
  const handleNext = () => {
    if (!level) return;
    
    if (currentQuestion < testData.books[level].questions.length - 1) {
      setCurrentQuestion(prevQuestion => {
        const nextQuestion = prevQuestion + 1;
        saveProgress({
          type: 'book',
          bookLevel: level,
          currentQuestion: nextQuestion,
          answers,
          completed: false
        });
        return nextQuestion;
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => {
        const prevQuestionIndex = prevQuestion - 1;
        saveProgress({
          type: 'book',
          bookLevel: level,
          currentQuestion: prevQuestionIndex,
          answers,
          completed: false
        });
        return prevQuestionIndex;
      });
    }
  };
  
  const handleReview = () => {
    setIsReviewing(true);
    setCurrentQuestion(0);
  };
  
  const handleSubmit = () => {
    if (!level) return;
    
    // Calculate score
    let correctCount = 0;
    const questions = testData.books[level].questions;
    
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    
    setScore(correctCount);
    setShowResults(true);
    
    // Mark as completed in storage
    saveProgress({
      type: 'book',
      bookLevel: level,
      currentQuestion,
      answers,
      completed: true
    });
  };
  
  if (!level || !testData.books[level]) {
    return null;
  }
  
  const questions = testData.books[level].questions;
  const allQuestionsAnswered = answers.length === questions.length && answers.every(answer => answer !== -1);
  const question = questions[currentQuestion];
  const showSubmitButton = currentQuestion === questions.length - 1 || isReviewing;
  const bookInfo = testData.books[level];
  
  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedbackMessage = "";
    
    if (score <= 3) {
      feedbackMessage = "Keep studying! You'll get better with practice.";
    } else if (score <= 7) {
      feedbackMessage = "Good effort! You're making progress.";
    } else {
      feedbackMessage = "Excellent work! You have a strong understanding of this level.";
    }
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-3xl w-full glass rounded-2xl p-8 animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {bookInfo.title} Results
            </h2>
            
            <div className="my-8 flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <div className="w-full h-full rounded-full border-8 border-gray-100 flex items-center justify-center text-4xl font-bold text-primary">
                  {score}/{questions.length}
                </div>
                <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#f0f0f0" 
                    strokeWidth="12"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="12"
                    strokeLinecap="round" 
                    className="text-primary transition-all duration-1000 ease-out"
                    strokeDasharray={`${percentage * 3.39}, 339`}
                  />
                </svg>
              </div>
              
              <p className="text-xl mb-1">Your Score: <span className="font-medium">{percentage}%</span></p>
              
              <div className="mt-4 text-center">
                <p className="text-lg text-gray-600">{feedbackMessage}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 active:scale-95"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl w-full glass rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {bookInfo.title}
          </h2>
          <p className="text-gray-600 text-center mb-8">{bookInfo.description}</p>
          
          <ProgressBar 
            current={currentQuestion + 1} 
            total={questions.length} 
          />
          
          {question && (
            <QuestionCard 
              question={question}
              onAnswer={handleAnswer}
              selectedAnswer={answers[currentQuestion]}
              showResult={false}
            />
          )}
          
          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              {!isReviewing && showSubmitButton && (
                <button
                  onClick={handleReview}
                  className="px-5 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium transition-all hover:bg-secondary/90 active:scale-95"
                >
                  Review Answers
                </button>
              )}
              
              {showSubmitButton ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    allQuestionsAnswered
                      ? "bg-primary text-white hover:bg-primary/90 active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === -1}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    answers[currentQuestion] === -1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90 active:scale-95"
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookTest;
