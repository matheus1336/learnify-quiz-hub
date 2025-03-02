
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import MainLayout from "../components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { BookOpen, BookText, Film, FileText, BookmarkCheck } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  created_at: string;
  level: string;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: 'movie' | 'book' | 'other';
  link?: string;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [homework, setHomework] = useState<Homework[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [level, setLevel] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch student profile and level
        const { data: profile } = await supabase
          .from('profiles')
          .select('level, test_score')
          .eq('id', user.id)
          .single();
          
        if (profile?.level) {
          setLevel(profile.level);
          
          // Fetch lessons for student's level
          const { data: lessonData } = await supabase
            .from('lessons')
            .select('*')
            .eq('level', profile.level)
            .order('created_at', { ascending: false });
            
          setLessons(lessonData || []);
          
          // Fetch homework for student
          const { data: homeworkData } = await supabase
            .from('homework')
            .select('*, homework_completion(completed)')
            .eq('level', profile.level)
            .order('due_date', { ascending: true });
            
          const processedHomework = homeworkData?.map(hw => ({
            id: hw.id,
            title: hw.title,
            description: hw.description,
            due_date: hw.due_date,
            completed: hw.homework_completion?.completed || false
          })) || [];
          
          setHomework(processedHomework);
          
          // Fetch recommendations
          const { data: recommendationData } = await supabase
            .from('recommendations')
            .select('*')
            .eq('level', profile.level);
            
          setRecommendations(recommendationData || []);
        } else {
          // No level assigned yet, redirect to placement test
          navigate('/placement-test');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const markHomeworkComplete = async (homeworkId: number) => {
    try {
      // Check if entry exists
      const { data } = await supabase
        .from('homework_completion')
        .select('*')
        .eq('user_id', user?.id)
        .eq('homework_id', homeworkId)
        .single();
        
      if (data) {
        // Update existing record
        await supabase
          .from('homework_completion')
          .update({ completed: true })
          .eq('id', data.id);
      } else {
        // Create new record
        await supabase
          .from('homework_completion')
          .insert({
            user_id: user?.id,
            homework_id: homeworkId,
            completed: true
          });
      }
      
      // Update local state
      setHomework(prevHomework => 
        prevHomework.map(hw => 
          hw.id === homeworkId 
            ? { ...hw, completed: true } 
            : hw
        )
      );
    } catch (error) {
      console.error("Error marking homework complete:", error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p>Carregando...</p>
        </div>
      </MainLayout>
    );
  }

  const pendingHomework = homework.filter(hw => !hw.completed).length;
  const completedHomework = homework.filter(hw => hw.completed).length;
  const homeworkProgress = homework.length > 0 
    ? Math.round((completedHomework / homework.length) * 100) 
    : 0;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {user?.user_metadata?.full_name || 'Aluno'}!</h1>
          <p className="text-gray-600">
            Seu nível atual: <span className="font-medium text-primary">{getLevelTitle(level)}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Aulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{lessons.length}</p>
              <p className="text-sm text-gray-500">aulas disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Lições de Casa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingHomework}</p>
              <p className="text-sm text-gray-500">pendentes</p>
              <div className="mt-2">
                <Progress value={homeworkProgress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">{completedHomework} de {homework.length} completas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Film className="w-5 h-5 text-primary" />
                Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{recommendations.length}</p>
              <p className="text-sm text-gray-500">filmes e livros recomendados</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="lessons">Aulas</TabsTrigger>
            <TabsTrigger value="homework">Lições de Casa</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Suas aulas</h2>
            {lessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>
                        {new Date(lesson.created_at).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{lesson.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => navigate(`/lessons/${lesson.id}`)}>
                        Ver aula
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma aula disponível no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="homework" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Suas lições de casa</h2>
            {homework.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homework.map((hw) => (
                  <Card key={hw.id} className={hw.completed ? "border-green-200 bg-green-50" : ""}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{hw.title}</CardTitle>
                        {hw.completed && (
                          <BookmarkCheck className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <CardDescription>
                        Entrega: {new Date(hw.due_date).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{hw.description}</p>
                    </CardContent>
                    <CardFooter>
                      {hw.completed ? (
                        <Button variant="outline" className="w-full" disabled>
                          Completada
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          className="w-full"
                          onClick={() => markHomeworkComplete(hw.id)}
                        >
                          Marcar como completa
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma lição de casa disponível no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Recomendações personalizadas</h2>
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {rec.type === 'movie' ? (
                          <Film className="w-5 h-5 text-primary" />
                        ) : rec.type === 'book' ? (
                          <BookText className="w-5 h-5 text-primary" />
                        ) : (
                          <BookmarkCheck className="w-5 h-5 text-primary" />
                        )}
                        <CardTitle>{rec.title}</CardTitle>
                      </div>
                      <CardDescription>
                        {rec.type === 'movie' ? 'Filme' : rec.type === 'book' ? 'Livro' : 'Outro'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{rec.description}</p>
                    </CardContent>
                    {rec.link && (
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <a href={rec.link} target="_blank" rel="noopener noreferrer">
                            Acessar
                          </a>
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma recomendação disponível no momento.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Helper function
function getLevelTitle(level: string): string {
  switch (level) {
    case 'book1':
      return 'Iniciante (Book 1)';
    case 'book2':
      return 'Intermediário (Book 2)';
    case 'book3':
      return 'Avançado (Book 3)';
    default:
      return 'Não definido';
  }
}

export default StudentDashboard;
