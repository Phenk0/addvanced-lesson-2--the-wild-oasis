import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://byekcwxivmgprwqmhaxh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZWtjd3hpdm1ncHJ3cW1oYXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNjA4NTgsImV4cCI6MjAwNzkzNjg1OH0.2PEIq35x7l5I-LactHbZq5Iurovm6c7gxjEzw8w5YFc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
