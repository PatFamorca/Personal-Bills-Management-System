import postgres from 'postgres';
let client: ReturnType<typeof postgres> | undefined;
export function db(){if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing');return client ??= postgres(process.env.DATABASE_URL,{max:5,prepare:false});}
export function dateOnly(v: unknown): string {if(typeof v==='string') return v.slice(0,10); if(v instanceof Date)return v.toISOString().slice(0,10);return String(v).slice(0,10)}
export function todayPH(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Manila',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
