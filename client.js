import { createClient } from '@supabase/supabase-js'

const URL = 'https://lxmezwkhlkoipygrypdq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bWV6d2tobGtvaXB5Z3J5cGRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDU2NzAwMiwiZXhwIjoyMDYwMTQzMDAyfQ.J8QsFeWk7uvJ0oOHlotNK_56zkaCNmjq1CADUpsYFlc'

export const supabase = createClient(URL, API_KEY);