
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProgress, calculateScore } from "../utils/storageUtils";
import { testData, getLevelFromScore, getLevelTitle } from "../utils/testData";
import Header from "../components/Header";

const TestResult = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");
  const [levelTitle, setLevelTitle] = useState("");
  
  useEffect(() => {
    const progress = getProgress();
    
    if (!progress || !progress.completed) {
      // Se não houver dados completos do teste, redireciona para a página inicial
      navigate("/");
      return;
    }
    
    if (progress.type === 'placement') {
      // Calcula a pontuação para o teste de nivelamento
      const correctAnswers = testData.placementTest.map(q => q.correctAnswer);
      const testScore = calculateScore(progress.answers, correctAnswers);
      const recommendedLevel = getLevelFromScore(testScore);
      
      setScore(testScore);
      setLevel(recommendedLevel);
      setLevelTitle(getLevelTitle(recommendedLevel));
    } else if (progress.type === 'book' && progress.bookLevel) {
      // Calcula a pontuação para o teste do livro
      const correctAnswers = testData.books[progress.bookLevel].questions.map(q => q.correctAnswer);
      const testScore = calculateScore(progress.answers, correctAnswers);
      
      setScore(testScore);
      setLevel(progress.bookLevel);
      setLevelTitle(getLevelTitle(progress.bookLevel));
    }
  }, [navigate]);
  
  const totalQuestions = 10;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full glass rounded-2xl p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Resultados do Teste
          </h2>
          
          <div className="my-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <div className="w-full h-full rounded-full border-8 border-gray-100 flex items-center justify-center text-4xl font-bold text-primary">
                {score}/{totalQuestions}
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
            
            <p className="text-xl mb-1">Sua pontuação: <span className="font-medium">{percentage}%</span></p>
            
            {level && (
              <div className="mt-4 text-center">
                <p className="text-lg text-gray-600 mb-2">Nível Recomendado:</p>
                <h3 className="text-2xl font-bold text-primary">{levelTitle}</h3>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-6">
              {score <= 3 && "Você está no início da sua jornada de aprendizado. O nível iniciante ajudará você a construir uma base sólida."}
              {score > 3 && score <= 7 && "Você tem um bom entendimento dos conceitos básicos. O nível intermediário ajudará você a expandir suas habilidades."}
              {score > 7 && "Excelente trabalho! Você tem um bom domínio do idioma. O nível avançado ajudará você a dominar conceitos complexos."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link 
              to="/" 
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all hover:bg-gray-200 active:scale-95 text-center"
            >
              Voltar ao Início
            </Link>
            
            {level && (
              <Link 
                to={`/book-test/${level}`}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 active:scale-95 text-center"
              >
                Iniciar Teste {levelTitle}
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestResult;
