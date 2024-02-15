'use client';
import { Button, Navbar, Spinner } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const customTheme = {
  button: {
    color: {
      primary: 'bg-[var(--accent)] hover:bg-[var(--secondary)]',
      secondary: 'bg-[var(--primary)] hover:bg-[var(--secondary)]',
    },
  },
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.docx',
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    }
  });

  const convertToPdf = () => {
    setLoading(true);

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server
    fetch('http://localhost:3000/convert', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      // The server responded with the converted PDF
      // Create a blob URL and link to it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();

      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  };

  return (
    <>
    <Flowbite theme={{ theme: customTheme }}>
      <Navbar fluid className='bg-[var(--secondary)]'>
        <Navbar.Brand as={Link} href="/convert">
          <img src=" ../favicon-32x32.png" className="mr-3 h-6 sm:h-9" alt="Doc2PDF Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-[var(--text)]">Doc2PDF</span>
        </Navbar.Brand>
      </Navbar>

      <div className='flex flex-col justify-center items-center mt-[100px]'>
        <div {...getRootProps()} className="dropzone rounded-lg border-2 border-[var(--primary)] h-[300px] w-[500px] mb-5 text-center">
          <input {...getInputProps()} />
          <div className='flex flex-col items-center justify-center gap-2 mt-28 upbt'>
          <Button color="primary">Upload from Device</Button>
          <p className='text-center text-[var(--text)]'>Drag and drop a your .doc file here</p>
          </div>
        </div>
        <Button onClick={convertToPdf} disabled={!file || loading} color='secondary'>
          {loading ? (
            <>
              <Spinner size="sm" /> Generating...
            </>
          ) : (
            'Generate PDF'
          )}
        </Button>
      </div>
      </Flowbite>
    </>
  );
}
