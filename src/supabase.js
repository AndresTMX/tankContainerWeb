import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aGtnYWdwd25mbHhkbHFybnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4ODgzMjksImV4cCI6MjAxNTQ2NDMyOX0.3NNT2vY_M1egv6jt7GusSCX21w3cImwPXhGJ2NqiWdg"
const supabase = createClient("https://xuhkgagpwnflxdlqrnpf.supabase.co", key);

export default supabase

