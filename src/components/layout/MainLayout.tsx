
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { 
  BookOpen, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Film, 
  User, 
  X, 
  GraduationCap 
} from "lucide-react";
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, signOut, isTeacher } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Aulas",
      path: "/lessons",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: "Lições de Casa",
      path: "/homework",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Recomendações",
      path: "/recommendations",
      icon: <Film className="w-5 h-5" />,
    },
    {
      title: "Mensagens",
      path: "/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    ...(isTeacher
      ? [
          {
            title: "Gerenciar Alunos",
            path: "/students",
            icon: <User className="w-5 h-5" />,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <GraduationCap className="w-6 h-6" />
              <span>Julia Grageffe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-600"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    {user?.user_metadata?.full_name
                      ? user.user_metadata.full_name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                {isTeacher && (
                  <DropdownMenuItem onClick={() => navigate("/teacher")}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Painel do Professor</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg">Julia Grageffe</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "bg-muted text-primary font-medium"
                          : "text-gray-600 hover:bg-muted hover:text-primary"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-bold text-gray-800">Julia Grageffe - English Teacher</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Transformando o aprendizado de inglês
              </p>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
