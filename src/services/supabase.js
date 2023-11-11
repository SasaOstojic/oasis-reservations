
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://hswwkqsuaemvvfmeerjt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzd3drcXN1YWVtdnZmbWVlcmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMzAyNzQsImV4cCI6MjAxMTYwNjI3NH0.o3ZkF9tzYdvv2YLgdXuhan0E5WtVMMUuIEFifJsHLeI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;