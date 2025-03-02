
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { clearProgress } from "../utils/storageUtils";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, Users, GraduationCap, Globe, BookText } from "lucide-react";

const Index = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Limpa qualquer progresso existente ao voltar para a página inicial
    clearProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-medium tracking-tight">Julia Grageffe</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {!isLoading && !user ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Registrar</Button>
                </Link>
              </>
            ) : !isLoading && user ? (
              <Link to="/dashboard">
                <Button>Meu Dashboard</Button>
              </Link>
            ) : null}
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Aprenda inglês com <span className="text-primary">metodologia personalizada</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Descubra seu nível de inglês e receba conteúdo adaptado às suas necessidades. 
                Aulas, exercícios e recomendações personalizadas para acelerar seu aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/placement-test">
                  <Button size="lg" className="w-full sm:w-auto">
                    Iniciar Teste de Nivelamento
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                alt="Estudantes aprendendo inglês" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Como funciona nossa plataforma</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Uma experiência de aprendizado completa e personalizada para ajudar você a dominar o inglês mais rápido.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Teste de Nivelamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    Descubra seu nível atual de inglês com nosso teste de nivelamento adaptativo. 
                    Identificamos exatamente onde você precisa focar seus estudos.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Aulas Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    Acesse aulas criadas especificamente para o seu nível, com conteúdo relevante 
                    e exercícios práticos para reforçar o aprendizado.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Lições de Casa</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    Pratique o que aprendeu com lições de casa interativas e receba feedback 
                    detalhado para melhorar suas habilidades.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Teacher Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="rounded-full w-64 h-64 mx-auto lg:mx-0 overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Julia Grageffe - English Teacher" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Julia Grageffe</h2>
              <h3 className="text-xl text-primary font-medium">English Teacher</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Com mais de 10 anos de experiência no ensino de inglês, a professora Julia Grageffe 
                desenvolveu uma metodologia única que combina técnicas comprovadas de aprendizado 
                com conteúdo personalizado para cada aluno.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sua abordagem foca em desenvolver todas as habilidades essenciais: 
                leitura, escrita, conversação e compreensão auditiva, preparando você 
                para usar o inglês em situações reais do dia a dia.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para começar sua jornada?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Faça o teste de nivelamento gratuito e descubra qual é o seu nível de inglês atual. 
              Em seguida, acesse conteúdo personalizado para acelerar seu aprendizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/placement-test">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Fazer Teste de Nivelamento
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="text-lg font-medium">Julia Grageffe</span>
            </div>
            <p className="text-gray-400">
              Transformando o aprendizado de inglês com metodologia personalizada e conteúdo adaptativo.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link to="/placement-test" className="text-gray-400 hover:text-white transition-colors">Teste de Nivelamento</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Registrar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dicas de Estudo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Material Gratuito</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contato</h3>
            <ul className="space-y-2">
              <li><a href="mailto:contato@juliagrageffe.com" className="text-gray-400 hover:text-white transition-colors">contato@juliagrageffe.com</a></li>
              <li><a href="tel:+5511999999999" className="text-gray-400 hover:text-white transition-colors">+55 (11) 99999-9999</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">São Paulo, SP</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Julia Grageffe - English Teacher. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
