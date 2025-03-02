
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import PlacementTest from "./pages/PlacementTest";
import TestResult from "./pages/TestResult";
import BookTest from "./pages/BookTest";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Teacher route component
const TeacherRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isTeacher, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isTeacher) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/placement-test" element={<PlacementTest />} />
    <Route path="/test-result" element={<TestResult />} />
    <Route path="/book-test/:level" element={<BookTest />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected routes */}
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    } />
    
    {/* Teacher routes */}
    <Route path="/teacher" element={
      <TeacherRoute>
        <TeacherDashboard />
      </TeacherRoute>
    } />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
