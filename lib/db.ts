import { MongoClient, Db, ObjectId } from 'mongodb';
let client: MongoClient | undefined;
let connection: Promise<MongoClient> | undefined;
export async function db(): Promise<Db> {
  const uri=process.env.MONGODB_URI;
  if(!uri) throw new Error('MONGODB_URI is missing');
  if(!connection) {client=new MongoClient(uri,{maxPoolSize:5,serverSelectionTimeoutMS:8000});connection=client.connect().catch(e=>{connection=undefined;throw e});}
  return (await connection).db(process.env.MONGODB_DB || 'billflow');
}
export function oid(value: unknown): ObjectId | null {return typeof value==='string'&&ObjectId.isValid(value)?new ObjectId(value):null}
export function todayPH(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Manila',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=(key:string)=>parts.find(p=>p.type===key)?.value;return `${v('year')}-${v('month')}-${v('day')}`}
export async function ensureIndexes(){const d=await db();await Promise.all([d.collection('users').createIndex({username:1},{unique:true}),d.collection('occurrences').createIndex({bill_id:1,due_date:1},{unique:true}),d.collection('bills').createIndex({user_id:1}),d.collection('occurrences').createIndex({user_id:1,due_date:-1})])}
