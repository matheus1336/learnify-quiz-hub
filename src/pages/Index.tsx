
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { clearProgress } from "../utils/storageUtils";

const Index = () => {
  useEffect(() => {
    // Limpa qualquer progresso existente ao voltar para a página inicial
    clearProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full glass rounded-2xl p-8 sm:p-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center">
            Teste de Nivelamento de Idioma
          </h1>
          
          <div className="space-y-6 mb-10">
            <p className="text-gray-600 text-center leading-relaxed">
              Descubra seu nível de proficiência em inglês com nosso teste de nivelamento adaptativo.
              Responda 10 questões para determinar se você é iniciante, intermediário ou avançado.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Livro 1</div>
                <p className="text-sm text-gray-500">Iniciante</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Livro 2</div>
                <p className="text-sm text-gray-500">Intermediário</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="text-lg font-medium mb-2">Livro 3</div>
                <p className="text-sm text-gray-500">Avançado</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-center leading-relaxed">
              Após completar o teste de nivelamento, você receberá um nível recomendado e acesso ao teste do livro correspondente.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/placement-test" 
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 active:scale-95 shadow-sm"
            >
              Iniciar Teste de Nivelamento
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
