import { createClient } from '@supabase/supabase-js'

const URL = 'https://ybmgybisbwyxnewpchyu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWd5YmlzYnd5eG5ld3BjaHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjAxODIsImV4cCI6MjA2MTE5NjE4Mn0.IQzZqa9Lhv1rY4PkIq8gS4_n0QKTW_9FkfqtT8GaWuQ'

export const supabase = createClient(URL, API_KEY);