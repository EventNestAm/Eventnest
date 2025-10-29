import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from('events').select('*')
  console.log('events table:', data, 'error:', error)
  return { data, error }
})
