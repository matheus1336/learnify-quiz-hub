
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import MainLayout from "../components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { PlusCircle, Users, BookOpen, FileText, Film } from "lucide-react";
import { toast } from "../components/ui/use-toast";

interface Student {
  id: string;
  full_name: string;
  email: string;
  level: string;
  test_score: number;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonLevel, setLessonLevel] = useState("book1");
  
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [homeworkDueDate, setHomeworkDueDate] = useState("");
  const [homeworkLevel, setHomeworkLevel] = useState("book1");
  
  const [recTitle, setRecTitle] = useState("");
  const [recDescription, setRecDescription] = useState("");
  const [recType, setRecType] = useState<"movie" | "book" | "other">("movie");
  const [recLevel, setRecLevel] = useState("book1");
  const [recLink, setRecLink] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Verify this is a teacher
        const { data: role } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
          
        if (!role || role.role !== 'teacher') {
          navigate('/dashboard');
          return;
        }
        
        // Fetch students
        const { data: studentsData, error } = await supabase
          .from('profiles')
          .select('id, full_name, email, level, test_score')
          .eq('role', 'student');
          
        if (error) throw error;
        setStudents(studentsData || []);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleCreateLesson = async () => {
    try {
      const { error } = await supabase
        .from('lessons')
        .insert({
          title: lessonTitle,
          description: lessonDescription,
          level: lessonLevel,
          created_by: user?.id,
          created_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      toast({
        title: "Aula criada com sucesso!",
        description: "A nova aula foi adicionada e está disponível para os alunos."
      });
      
      // Reset form
      setLessonTitle("");
      setLessonDescription("");
      setLessonLevel("book1");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar aula",
        description: error.message || "Por favor, tente novamente."
      });
    }
  };

  const handleCreateHomework = async () => {
    try {
      const { error } = await supabase
        .from('homework')
        .insert({
          title: homeworkTitle,
          description: homeworkDescription,
          level: homeworkLevel,
          due_date: homeworkDueDate,
          created_by: user?.id
        });
        
      if (error) throw error;
      
      toast({
        title: "Lição de casa criada com sucesso!",
        description: "A nova lição foi adicionada e está disponível para os alunos."
      });
      
      // Reset form
      setHomeworkTitle("");
      setHomeworkDescription("");
      setHomeworkLevel("book1");
      setHomeworkDueDate("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar lição de casa",
        description: error.message || "Por favor, tente novamente."
      });
    }
  };

  const handleCreateRecommendation = async () => {
    try {
      const { error } = await supabase
        .from('recommendations')
        .insert({
          title: recTitle,
          description: recDescription,
          type: recType,
          level: recLevel,
          link: recLink || null,
          created_by: user?.id
        });
        
      if (error) throw error;
      
      toast({
        title: "Recomendação criada com sucesso!",
        description: "A nova recomendação foi adicionada e está disponível para os alunos."
      });
      
      // Reset form
      setRecTitle("");
      setRecDescription("");
      setRecType("movie");
      setRecLevel("book1");
      setRecLink("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar recomendação",
        description: error.message || "Por favor, tente novamente."
      });
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

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel do Professor</h1>
          <p className="text-gray-600">
            Gerencie suas aulas, lições de casa e recomendações para os alunos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Alunos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{students.length}</p>
              <p className="text-sm text-gray-500">alunos registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar nova aula</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova aula para seus alunos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="lessonTitle">Título da aula</Label>
                      <Input
                        id="lessonTitle"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="Digite o título da aula"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lessonLevel">Nível</Label>
                      <Select value={lessonLevel} onValueChange={setLessonLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book1">Iniciante (Book 1)</SelectItem>
                          <SelectItem value="book2">Intermediário (Book 2)</SelectItem>
                          <SelectItem value="book3">Avançado (Book 3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lessonDescription">Descrição</Label>
                      <Textarea
                        id="lessonDescription"
                        value={lessonDescription}
                        onChange={(e) => setLessonDescription(e.target.value)}
                        placeholder="Digite a descrição da aula"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateLesson}>Criar aula</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Lições
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar nova lição de casa</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova lição de casa para seus alunos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="homeworkTitle">Título da lição</Label>
                      <Input
                        id="homeworkTitle"
                        value={homeworkTitle}
                        onChange={(e) => setHomeworkTitle(e.target.value)}
                        placeholder="Digite o título da lição"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeworkLevel">Nível</Label>
                      <Select value={homeworkLevel} onValueChange={setHomeworkLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book1">Iniciante (Book 1)</SelectItem>
                          <SelectItem value="book2">Intermediário (Book 2)</SelectItem>
                          <SelectItem value="book3">Avançado (Book 3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeworkDueDate">Data de entrega</Label>
                      <Input
                        id="homeworkDueDate"
                        type="date"
                        value={homeworkDueDate}
                        onChange={(e) => setHomeworkDueDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeworkDescription">Descrição</Label>
                      <Textarea
                        id="homeworkDescription"
                        value={homeworkDescription}
                        onChange={(e) => setHomeworkDescription(e.target.value)}
                        placeholder="Digite a descrição da lição de casa"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateHomework}>Criar lição</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Seus alunos</h2>
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Nível</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Pontuação</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{student.full_name}</td>
                        <td className="px-4 py-3 text-sm">{student.email}</td>
                        <td className="px-4 py-3 text-sm">{getLevelTitle(student.level)}</td>
                        <td className="px-4 py-3 text-sm">{student.test_score || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/student/${student.id}`)}>
                            Ver detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Nenhum aluno registrado no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recomendações</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nova recomendação
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar nova recomendação</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova recomendação para seus alunos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="recTitle">Título</Label>
                      <Input
                        id="recTitle"
                        value={recTitle}
                        onChange={(e) => setRecTitle(e.target.value)}
                        placeholder="Digite o título da recomendação"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recType">Tipo</Label>
                        <Select value={recType} onValueChange={(value) => setRecType(value as "movie" | "book" | "other")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="movie">Filme</SelectItem>
                            <SelectItem value="book">Livro</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recLevel">Nível</Label>
                        <Select value={recLevel} onValueChange={setRecLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="book1">Iniciante (Book 1)</SelectItem>
                            <SelectItem value="book2">Intermediário (Book 2)</SelectItem>
                            <SelectItem value="book3">Avançado (Book 3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recLink">Link (opcional)</Label>
                      <Input
                        id="recLink"
                        value={recLink}
                        onChange={(e) => setRecLink(e.target.value)}
                        placeholder="https://"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recDescription">Descrição</Label>
                      <Textarea
                        id="recDescription"
                        value={recDescription}
                        onChange={(e) => setRecDescription(e.target.value)}
                        placeholder="Digite a descrição da recomendação"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateRecommendation}>Criar recomendação</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar recomendações</CardTitle>
                <CardDescription>
                  Aqui você pode adicionar recomendações de filmes, livros e outros materiais para seus alunos baseado em seus interesses e nível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  As recomendações ajudam seus alunos a praticar inglês com conteúdo que eles gostam, aumentando a motivação e retenção.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Filmes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Livros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Outros conteúdos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default TeacherDashboard;
