'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Flowbite } from 'flowbite-react';

import { Button, Navbar } from 'flowbite-react';

const customTheme = {
  button: {
    color: {
      primary: 'bg-[var(--primary)] hover:bg-[var(--secondary)]',
    },
  },
  navbar: {
    link: {
      active: {
        on: 'text-[var(--accent)] !important',
        off: 'text-[var(--primary)] hover:text-[var(--accent)] !important',
      },
    },
  },
};

export default function Page() {
  return (
    <>
    <Flowbite theme={{ theme: customTheme }}>
    <Navbar fluid className='bg-[var(--background)]'>
      <Navbar.Brand href="/">
        <Image src="/favicon-32x32.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold ">Doc<span className='text-[var(--primary)]'>2</span>PDF</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button color="primary">Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/">About</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </Flowbite>
    <div className="flex items-center justify-center min-h-screen gap-8">
      <div className='flex flex-col items-start gap-4'>
        <div><h1 className='text-4xl font-bold'>Doc<span className='text-[var(--primary)]'>2</span>PDF</h1></div>
        <div><p className='font-normal text-xl'>Convert your documents to PDFs with less hassle</p></div>
        <div><Link href='/convert'><button className='rounded-lg bg-[var(--primary)] w-40 h-12 text-lg font-semibold text-white hover:bg-[var(--secondary)] hover:text-[var(--primary)]'>Get Started</button></Link></div>
      </div>
      <div>
        <Image src="/transfer-files-animate.svg" alt='Vector' width={550} height={150}/>
      </div>
    </div>
    </>
  );
}

