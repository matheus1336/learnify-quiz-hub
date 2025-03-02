
import { createClient } from '@supabase/supabase-js';

// Valores padrão para desenvolvimento (não usar em produção)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Exibir aviso no console em vez de lançar erro
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found in environment variables. Using placeholder values for development. Authentication and database features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
