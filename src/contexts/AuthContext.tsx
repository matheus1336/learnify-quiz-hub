
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isTeacher: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Check if user is a teacher by querying the user_roles table
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentSession.user.id)
            .single();

          setIsTeacher(data?.role === 'teacher');
        }

        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check if user is a teacher
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => {
            setIsTeacher(data?.role === 'teacher');
          });
      }
      
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao seu portal de estudos.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Por favor, verifique suas credenciais e tente novamente.",
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      
      if (error) throw error;

      // Create a profile record for the new user
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            full_name: name,
            created_at: new Date().toISOString() 
          }]);
          
        if (profileError) throw profileError;
        
        // Set user role as 'student' by default
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ 
            user_id: data.user.id, 
            role: 'student' 
          }]);
          
        if (roleError) throw roleError;
      }
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Agora você pode fazer login com suas credenciais.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Por favor, tente novamente mais tarde.",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message || "Por favor, tente novamente mais tarde.",
      });
    }
  };

  const value = {
    user,
    session,
    isTeacher,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
