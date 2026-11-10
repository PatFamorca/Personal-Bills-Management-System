import { NextResponse } from 'next/server';
import { session } from './auth';
export async function authorized(){const id=await session();return id}
export const fail=(message:string,status=400)=>NextResponse.json({error:message},{status});
export function unexpected(error:unknown){console.error(error);return fail('Server error. Check configuration and database schema.',500)}
