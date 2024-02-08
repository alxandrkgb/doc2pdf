'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import mammoth from 'mammoth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Navbar, Button, Spinner } from 'flowbite-react';
import Link from 'next/link';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.docx',
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    }
  });

  const convertToPdf = async () => {
    setLoading(true);
  const buffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer: buffer });

  // Create a new div and insert the converted HTML
  const div = document.createElement('div');
  div.innerHTML = result.value;

  // Convert the div to a canvas using html2canvas
  const canvas = await html2canvas(div);

  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Add the canvas as an image on a PDF page
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);

  // Download the PDF
  pdf.save('document.pdf');

  setLoading(false);
};

  return (
    <>
      <Navbar fluid className='bg-[var(--secondary)]'>
        <Navbar.Brand as={Link} href="/">
          <img src=" ../favicon-32x32.png" className="mr-3 h-6 sm:h-9" alt="Doc2PDF Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-[var(--text)]">Doc2PDF</span>
        </Navbar.Brand>
      </Navbar>

      <div className='flex flex-col justify-center items-center mt-[100px]'>
        <div {...getRootProps()} className="dropzone rounded-lg border-2 border-[var(--primary)] h-[300px] w-[500px] mb-5 text-center">
          <input {...getInputProps()} />
          <p className='text-center pt-[130px] text-[var(--text)]'>Drag and drop a Word document here, or click to select one</p>
        </div>
        <Button onClick={convertToPdf} disabled={!file || loading} className='bg-[var(--primary)] hover:bg-[var(--secondary)]'>
          {loading ? (
            <>
              <Spinner size="sm" /> Generating...
            </>
          ) : (
            'Generate PDF'
          )}
        </Button>
      </div>
    </>
  );
}
