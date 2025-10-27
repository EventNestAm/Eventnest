import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ouygnjcxqjhpmketjtfo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91eWduamN4cWpocG1rZXRqdGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTMxMzYsImV4cCI6MjA3NzE2OTEzNn0.9ikjdGEWgy1iXDe4r97UBjCKM6ouwprHEsbzWNSo-J0'

export const useSupabase = () => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  return { supabase }
}
