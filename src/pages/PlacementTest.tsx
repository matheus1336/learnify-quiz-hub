
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { testData } from "../utils/testData";
import { saveProgress, getProgress, TestProgress } from "../utils/storageUtils";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

const PlacementTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(testData.placementTest.length).fill(-1));
  const [isReviewing, setIsReviewing] = useState(false);
  
  useEffect(() => {
    // Check if there's any saved progress
    const savedProgress = getProgress();
    if (savedProgress && savedProgress.type === 'placement' && !savedProgress.completed) {
      setCurrentQuestion(savedProgress.currentQuestion);
      setAnswers(savedProgress.answers);
    } else {
      // Initialize new progress
      saveProgress({
        type: 'placement',
        currentQuestion: 0,
        answers: answers,
        completed: false
      });
    }
  }, []);
  
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Save progress
    saveProgress({
      type: 'placement',
      currentQuestion,
      answers: newAnswers,
      completed: false
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < testData.placementTest.length - 1) {
      setCurrentQuestion(prevQuestion => {
        const nextQuestion = prevQuestion + 1;
        saveProgress({
          type: 'placement',
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
          type: 'placement',
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
    // Mark as completed in storage
    saveProgress({
      type: 'placement',
      currentQuestion,
      answers,
      completed: true
    });
    
    // Navigate to results page
    navigate("/test-result");
  };
  
  const allQuestionsAnswered = answers.every(answer => answer !== -1);
  const question = testData.placementTest[currentQuestion];
  const showSubmitButton = currentQuestion === testData.placementTest.length - 1 || isReviewing;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl w-full glass rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {isReviewing ? "Review Your Answers" : "Placement Test"}
          </h2>
          
          <ProgressBar 
            current={currentQuestion + 1} 
            total={testData.placementTest.length} 
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

export default PlacementTest;
