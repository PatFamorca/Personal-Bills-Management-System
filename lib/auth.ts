import { SignJWT,jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const secret=()=>{const s=process.env.SESSION_SECRET;if(!s||s.length<32)throw new Error('SESSION_SECRET must be at least 32 characters');return new TextEncoder().encode(s)};
export async function token(id:string){return new SignJWT({uid:id}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('14d').sign(secret())}
export async function session(){try{const cookie=(await cookies()).get('billflow_session')?.value;if(!cookie)return null;const {payload}=await jwtVerify(cookie,secret());return typeof payload.uid==='string'?payload.uid:null}catch{return null}}
export async function setSession(id:string){(await cookies()).set('billflow_session',await token(id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:1209600})}
export async function clearSession(){(await cookies()).delete('billflow_session')}
