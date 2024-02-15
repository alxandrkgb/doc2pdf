import Link from 'next/link';

export default function Page() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className='flex flex-col justify-center text-center items-center gap-4'>
        <div><h1 className='text-4xl font-bold'>Doc<span className='text-[var(--primary)]'>2</span>PDF</h1></div>
        <div><p className='font-normal text-2xl'>Convert your documents to PDFs with less hassle</p></div>
        <div><Link href='/home'><button className='rounded-lg bg-[var(--primary)] w-40 h-12 text-lg font-semibold text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]'>Get Started</button></Link></div>
      </div>
    </div>
    </>
  );
}