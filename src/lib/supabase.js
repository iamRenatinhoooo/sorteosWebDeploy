// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Usamos el Service Role Key SOLO en el backend
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);