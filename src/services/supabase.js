
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://uvybasyuajbnldlrhitn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2eWJhc3l1YWpibmxkbHJoaXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTUwNzEsImV4cCI6MjAyNDc5MTA3MX0.G3cZAOyue5oU9LdvuIZaZZztl7JLiPb_nHD16o4XHN4"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase