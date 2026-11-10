import { db,dateOnly,todayPH } from './db';
export type Frequency='once'|'daily'|'weekly'|'monthly';
export function nextDate(start:string,frequency:Frequency,index:number){const [y,m,d]=start.split('-').map(Number);const base=new Date(Date.UTC(y,m-1,d));if(frequency==='monthly'){const total=m-1+index;const yr=y+Math.floor(total/12),month=((total%12)+12)%12;const last=new Date(Date.UTC(yr,month+1,0)).getUTCDate();return new Date(Date.UTC(yr,month,Math.min(d,last))).toISOString().slice(0,10)}base.setUTCDate(base.getUTCDate()+index*(frequency==='weekly'?7:1));return base.toISOString().slice(0,10)}
export async function syncBills(userId?:number){const sql=db();const bills=userId?await sql`SELECT * FROM bills WHERE active=true AND user_id=${userId}`:await sql`SELECT * FROM bills WHERE active=true`;
const now=todayPH();const h=new Date(now+'T00:00:00Z');h.setUTCDate(h.getUTCDate()+60);const horizon=h.toISOString().slice(0,10);let created=0;
for(const bill of bills){const start=dateOnly(bill.due_date),freq=bill.recurrence as Frequency;let count=0;
// Cap generation to avoid exhausting serverless execution on extremely old daily bills.
for(let i=0;i<5000;i++){const date=freq==='once'?start:nextDate(start,freq,i);if(date>horizon)break;const result=await sql`INSERT INTO occurrences(bill_id,due_date,amount) VALUES(${bill.id},${date},${bill.amount}) ON CONFLICT (bill_id,due_date) DO NOTHING RETURNING id`;created+=result.length;count++;if(freq==='once')break;}
if(count===5000)console.warn('Occurrence backfill capped for bill',bill.id);
}
return created;
}
