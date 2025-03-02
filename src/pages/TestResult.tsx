
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProgress, calculateScore } from "../utils/storageUtils";
import { testData, getLevelFromScore, getLevelTitle } from "../utils/testData";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

const TestResult = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

      // If user is logged in, save their test result to Supabase
      if (user) {
        saveTestResultToSupabase(testScore, recommendedLevel);
      }
    } else if (progress.type === 'book' && progress.bookLevel) {
      // Calcula a pontuação para o teste do livro
      const correctAnswers = testData.books[progress.bookLevel].questions.map(q => q.correctAnswer);
      const testScore = calculateScore(progress.answers, correctAnswers);
      
      setScore(testScore);
      setLevel(progress.bookLevel);
      setLevelTitle(getLevelTitle(progress.bookLevel));
    }
  }, [navigate, user]);
  
  const saveTestResultToSupabase = async (testScore: number, level: string) => {
    try {
      // Check if user profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user?.id)
        .single();
        
      if (existingProfile) {
        // Update existing profile
        await supabase
          .from('profiles')
          .update({
            level,
            test_score: testScore,
            updated_at: new Date().toISOString()
          })
          .eq('id', user?.id);
      } else {
        // Create new profile
        await supabase
          .from('profiles')
          .insert({
            id: user?.id,
            full_name: user?.user_metadata?.full_name || '',
            level,
            test_score: testScore,
            created_at: new Date().toISOString()
          });
      }
      
      toast({
        title: "Resultado salvo com sucesso!",
        description: "Seu resultado do teste foi salvo em sua conta."
      });
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };
  
  const totalQuestions = 10;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <Card className="max-w-3xl w-full shadow-lg border-0 animate-scale-in">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">
              Resultados do Teste
            </h2>
          </CardHeader>
          
          <CardContent>
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
              {!user ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto"
                  >
                    Entrar para salvar
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => navigate("/register")}
                    className="w-full sm:w-auto"
                  >
                    Criar conta
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="w-full sm:w-auto"
                  >
                    Ir para o Dashboard
                  </Button>
                  {level && (
                    <Button 
                      variant="default"
                      onClick={() => navigate(`/book-test/${level}`)}
                      className="w-full sm:w-auto"
                    >
                      Iniciar Teste {levelTitle}
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestResult;
