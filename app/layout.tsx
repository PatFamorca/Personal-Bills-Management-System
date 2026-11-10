import './globals.css';import type {Metadata,Viewport} from 'next';
export const metadata:Metadata={title:'Billflow | Personal Bills',description:'Your bills, under control',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'Billflow'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#4f46e5'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
