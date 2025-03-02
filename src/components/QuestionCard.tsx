
import { useState, useEffect } from "react";
import { Question } from "../utils/testData";

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionIndex: number) => void;
  selectedAnswer?: number;
  showResult?: boolean;
}

const QuestionCard = ({ 
  question, 
  onAnswer, 
  selectedAnswer,
  showResult = false
}: QuestionCardProps) => {
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    onAnswer(index);
  };

  const getOptionClasses = (index: number) => {
    const baseClasses = "relative w-full p-4 border rounded-lg transition-all duration-200 ease-out flex items-center";
    
    if (showResult) {
      if (index === question.correctAnswer) {
        return `${baseClasses} border-green-300 bg-green-50 text-green-900`;
      } else if (index === selected && index !== question.correctAnswer) {
        return `${baseClasses} border-red-300 bg-red-50 text-red-900`;
      }
      return `${baseClasses} border-gray-200 bg-gray-50 text-gray-500`;
    }
    
    return selected === index
      ? `${baseClasses} border-primary text-primary bg-primary/5`
      : `${baseClasses} border-gray-200 hover:border-primary/30 hover:bg-primary/5`;
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${animate ? 'animate-scale-in' : ''}`}>
      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClasses(index)}
            onClick={() => handleSelect(index)}
            disabled={showResult}
          >
            <span className="flex-grow text-left">{option}</span>
            {selected === index && !showResult && (
              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
