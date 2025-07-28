// // components/EditorHeader.jsx - Header Component
// import React from 'react';
// import { Save, Download, FileDown, FolderOpen, FileText } from 'lucide-react';

// const EditorHeader = ({
//   documentTitle,
//   editor,
//   onSave,
//   onSaveAs,
//   onExportPDF,
//   onExportDOCX
// }) => {
//   const HeaderButton = ({ onClick, title, children }) => (
//     <button
//       onClick={onClick}
//       title={title}
//       className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
//     >
//       {children}
//     </button>
//   );

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-semibold text-gray-900">Richhhhh Text Editor</h2>
//             <div className="flex items-center gap-2">
//               <HeaderButton onClick={onSave} title="Save Document (Ctrl+S)">
//                 <Save size={16} />
//               </HeaderButton>

//               <HeaderButton onClick={onSaveAs} title="Save As New Document">
//                 <FolderOpen size={16} />
//               </HeaderButton>

//               <div className="relative group">
//                 <HeaderButton title="Export Options">
//                   <Download size={16} />
//                 </HeaderButton>
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <button
//                     onClick={onExportPDF}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     <FileDown size={14} />
//                     Export as PDF
//                   </button>
//                   <button
//                     onClick={onExportDOCX}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FileText size={14} />
//                     Export as DOCX
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">
//             Full-featured editor with enhanced font controls • Document: {documentTitle}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.characters() || 0}/{editor?.extensionManager.extensions.find(ext => ext.name === 'characterCount')?.options.limit || '∞'} chars
//           </span>
//           <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.words() || 0} words
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditorHeader;

// // components/EditorHeader.jsx - Header Component with Import functionality added
// import React, { useRef } from 'react';
// import { Save, Download, FileDown, FolderOpen, FileText, Upload, FileType } from 'lucide-react';

// const EditorHeader = ({
//   documentTitle,
//   editor,
//   onSave,
//   onSaveAs,
//   onExportPDF,
//   onExportDOCX,
//   onImportWord,
//   onImportPDF
// }) => {
//   const wordFileInputRef = useRef(null);
//   const pdfFileInputRef = useRef(null);

//   const HeaderButton = ({ onClick, title, children }) => (
//     <button
//       onClick={onClick}
//       title={title}
//       className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
//     >
//       {children}
//     </button>
//   );

//   const handleWordImportClick = () => {
//     wordFileInputRef.current?.click();
//   };

//   const handlePDFImportClick = () => {
//     pdfFileInputRef.current?.click();
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-semibold text-gray-900">Richhhhh Text Editor</h2>
//             <div className="flex items-center gap-2">
//               {/* Import Options - NEW */}
//               <div className="relative group">
//                 <HeaderButton title="Import Documents">
//                   <Upload size={16} />
//                 </HeaderButton>
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <button
//                     onClick={handleWordImportClick}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     <FileText size={14} />
//                     Import Word Document (.docx)
//                   </button>
//                   <button
//                     onClick={handlePDFImportClick}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FileType size={14} />
//                     Import PDF Document (.pdf)
//                   </button>
//                 </div>
//               </div>

//               {/* Hidden file inputs - NEW */}
//               <input
//                 ref={wordFileInputRef}
//                 type="file"
//                 accept=".docx"
//                 onChange={onImportWord}
//                 style={{ display: 'none' }}
//               />
//               <input
//                 ref={pdfFileInputRef}
//                 type="file"
//                 accept=".pdf"
//                 onChange={onImportPDF}
//                 style={{ display: 'none' }}
//               />

//               <HeaderButton onClick={onSave} title="Save Document (Ctrl+S)">
//                 <Save size={16} />
//               </HeaderButton>

//               <HeaderButton onClick={onSaveAs} title="Save As New Document">
//                 <FolderOpen size={16} />
//               </HeaderButton>

//               <div className="relative group">
//                 <HeaderButton title="Export Options">
//                   <Download size={16} />
//                 </HeaderButton>
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <button
//                     onClick={onExportPDF}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     <FileDown size={14} />
//                     Export as PDF
//                   </button>
//                   <button
//                     onClick={onExportDOCX}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FileText size={14} />
//                     Export as DOCX
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">
//             Full-featured editor with enhanced font controls • Document: {documentTitle}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.characters() || 0}/{editor?.extensionManager.extensions.find(ext => ext.name === 'characterCount')?.options.limit || '∞'} chars
//           </span>
//           <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.words() || 0} words
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditorHeader;

// import React, { useRef } from 'react';
// import { Save, Download, FileDown, FolderOpen, FileText, Upload, FileType } from 'lucide-react';
// import { generateJSON } from '@tiptap/core';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextStyle from '@tiptap/extension-text-style';
// import FontFamily from '@tiptap/extension-font-family';
// import { FontSize } from '../extensions/CustomExtensions.js'; // Adjusted path
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
// import Table from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableHeader from '@tiptap/extension-table-header';
// import TableCell from '@tiptap/extension-table-cell';

// // Access mammoth and PDFParser from window (loaded via CDN)
// const mammoth = window.mammoth;
// const PDFParser = window.PDFParser;

// const EditorHeader = ({
//   documentTitle,
//   editor,
//   onSave,
//   onSaveAs,
//   onExportPDF,
//   onExportDOCX,
//   onImportWord,
//   onImportPDF
// }) => {
//   const wordFileInputRef = useRef(null);
//   const pdfFileInputRef = useRef(null);

//   const HeaderButton = ({ onClick, title, children }) => (
//     <button
//       onClick={onClick}
//       title={title}
//       className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
//     >
//       {children}
//     </button>
//   );

//   const handleWordImportClick = () => {
//     wordFileInputRef.current?.click();
//   };

//   const handlePDFImportClick = () => {
//     pdfFileInputRef.current?.click();
//   };

//   // Handle DOCX import
//   const handleWordImport = async (event) => {
//     const file = event.target.files[0];
//     if (!file || !editor) {
//       alert('No file selected or editor not initialized.');
//       return;
//     }

//     if (!file.name.endsWith('.docx')) {
//       alert('Please upload a .docx file.');
//       return;
//     }

//     if (!mammoth || !mammoth.convertToHtml) {
//       alert('DOCX import is unavailable because the required library failed to load. Please refresh the page or check your network.');
//       console.error('mammoth.js is not loaded or missing convertToHtml');
//       return;
//     }

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const result = await mammoth.convertToHtml({ arrayBuffer });
//       const html = result.value;

//       // Convert HTML to TipTap JSON
//       const json = generateJSON(html, [
//         StarterKit,
//         Underline,
//         TextStyle,
//         FontFamily,
//         FontSize,
//         TextAlign,
//         Link,
//         Image,
//         Table,
//         TableRow,
//         TableHeader,
//         TableCell,
//       ]);

//       // Set document title based on file name
//       const fileName = file.name.replace(/\.[^/.]+$/, '');
//       editor.commands.setContent(json);
//       onImportWord?.({ json, fileName });
//     } catch (error) {
//       console.error('DOCX import failed:', error);
//       alert('Failed to import Word document. Please ensure the file is valid.');
//     }
//   };

//   // Handle PDF import
//   const handlePDFImport = async (event) => {
//     const file = event.target.files[0];
//     if (!file || !editor) {
//       alert('No file selected or editor not initialized.');
//       return;
//     }

//     if (!file.name.endsWith('.pdf')) {
//       alert('Please upload a .pdf file.');
//       return;
//     }

//     if (!PDFParser) {
//       alert('PDF import is unavailable because the required library failed to load. Please refresh the page or check your network.');
//       console.error('pdf2json is not loaded');
//       return;
//     }

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdfParser = new PDFParser();

//       pdfParser.on('pdfParser_dataReady', (pdfData) => {
//         // Extract text from PDF pages
//         let textContent = '';
//         pdfData.formImage.Pages.forEach(page => {
//           page.Texts.forEach(text => {
//             textContent += decodeURIComponent(text.R[0].T) + '\n';
//           });
//         });

//         // Convert text to TipTap JSON
//         const json = {
//           type: 'doc',
//           content: textContent
//             .split('\n')
//             .filter(line => line.trim())
//             .map(line => ({
//               type: 'paragraph',
//               content: [{ type: 'text', text: line }],
//             })),
//         };

//         // Set document title based on file name
//         const fileName = file.name.replace(/\.[^/.]+$/, '');
//         editor.commands.setContent(json);
//         onImportPDF?.({ json, fileName });
//       });

//       pdfParser.on('pdfParser_dataError', (err) => {
//         console.error('PDF import failed:', err);
//         alert('Failed to import PDF document. Please ensure the file is valid.');
//       });

//       pdfParser.parseBuffer(arrayBuffer);
//     } catch (error) {
//       console.error('PDF import failed:', error);
//       alert('Failed to import PDF document. Please ensure the file is valid.');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-semibold text-gray-900">Rich Text Editor</h2>
//             <div className="flex items-center gap-2">
//               {/* Import Options */}
//               <div className="relative group">
//                 <HeaderButton title="Import Documents">
//                   <Upload size={16} />
//                 </HeaderButton>
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <button
//                     onClick={handleWordImportClick}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     <FileText size={14} />
//                     Import Word Document (.docx)
//                   </button>
//                   <button
//                     onClick={handlePDFImportClick}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FileType size={14} />
//                     Import PDF Document (.pdf)
//                   </button>
//                 </div>
//               </div>

//               {/* Hidden file inputs */}
//               <input
//                 ref={wordFileInputRef}
//                 type="file"
//                 accept=".docx"
//                 onChange={handleWordImport}
//                 style={{ display: 'none' }}
//               />
//               <input
//                 ref={pdfFileInputRef}
//                 type="file"
//                 accept=".pdf"
//                 onChange={handlePDFImport}
//                 style={{ display: 'none' }}
//               />

//               <HeaderButton onClick={onSave} title="Save Document (Ctrl+S)">
//                 <Save size={16} />
//               </HeaderButton>

//               <HeaderButton onClick={onSaveAs} title="Save As New Document">
//                 <FolderOpen size={16} />
//               </HeaderButton>

//               <div className="relative group">
//                 <HeaderButton title="Export Options">
//                   <Download size={16} />
//                 </HeaderButton>
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <button
//                     onClick={onExportPDF}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     <FileDown size={14} />
//                     Export as PDF
//                   </button>
//                   <button
//                     onClick={onExportDOCX}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FileText size={14} />
//                     Export as DOCX
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">
//             Full-featured editor with enhanced font controls • Document: {documentTitle}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.characters() || 0}/{editor?.extensionManager.extensions.find(ext => ext.name === 'characterCount')?.options.limit || '∞'} chars
//           </span>
//           <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//             {editor?.storage.characterCount.words() || 0} words
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditorHeader;

import React, { useRef } from "react";
import {
  Save,
  Download,
  FileDown,
  FolderOpen,
  FileText,
  Upload,
  FileType,
  Folder,
} from "lucide-react";
import { generateJSON } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize } from "../extensions/CustomExtensions";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

const EditorHeader = ({
  documentTitle,
  editor,
  onSave,
  onSaveAs,
  onExportPDF,
  onExportDOCX,
  onImportWord,
  onImportPDF,
  onImportFromDocuments,
}) => {
  const wordFileInputRef = useRef(null);
  const pdfFileInputRef = useRef(null);

  const HeaderButton = ({ onClick, title, children }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
    >
      {children}
    </button>
  );

  const handleWordImportClick = () => {
    wordFileInputRef.current?.click();
  };

  const handlePDFImportClick = () => {
    pdfFileInputRef.current?.click();
  };

  // Handle DOCX import
  // const handleWordImport = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file || !editor) {
  //     alert('No file selected or editor not initialized.');
  //     return;
  //   }

  //   if (!file.name.endsWith('.docx')) {
  //     alert('Please upload a .docx file.');
  //     return;
  //   }

  //   try {
  //     const arrayBuffer = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = () => reject(new Error('Failed to read DOCX file'));
  //       reader.readAsArrayBuffer(file);
  //     });
  //     const result = await mammoth.convertToHtml({ arrayBuffer });
  //     const html = result.value;

  //     // Convert HTML to TipTap JSON
  //     const json = generateJSON(html, [
  //       StarterKit,
  //       Underline,
  //       TextStyle,
  //       FontFamily,
  //       FontSize,
  //       TextAlign,
  //       Link,
  //       Image,
  //       Table,
  //       TableRow,
  //       TableHeader,
  //       TableCell,
  //     ]);
  //     console.log('Generated JSON for DOCX:', json);

  //     if (!json || !json.type || !json.content) {
  //       throw new Error('Invalid JSON structure generated from DOCX');
  //     }

  //     // Ensure editor is ready
  //     if (!editor.isEditable) {
  //       console.warn('Editor is not editable, attempting to focus');
  //       editor.chain().focus().run();
  //     }
  //     editor.commands.setContent(json, false); // false to avoid history
  //     const fileName = file.name.replace(/\.[^/.]+$/, '');
  //     onImportWord?.({ json, fileName });
  //     alert(`Document "${fileName}" imported successfully!`);
  //   } catch (error) {
  //     console.error('DOCX import failed:', error);
  //     alert(`Failed to import Word document: ${error.message}`);
  //   }
  // };

  const handleWordImport = async (event) => {
    const file = event.target.files[0];
    if (!file || !editor) {
      alert("No file selected or editor not initialized.");
      return;
    }

    if (!file.name.endsWith(".docx")) {
      alert("Please upload a .docx file.");
      return;
    }

    try {
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read DOCX file"));
        reader.readAsArrayBuffer(file);
      });
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value; // Raw HTML from mammoth

      console.log("Imported HTML:", html);

      if (!html || html.trim() === "") {
        throw new Error("No content extracted from DOCX");
      }

      if (!editor.isEditable) {
        console.warn("Editor is not editable, attempting to focus");
        editor.chain().focus().run();
      }
      // Pass raw HTML to TiptapEditor
      onImportWord?.({ html, fileName: file.name.replace(/\.[^/.]+$/, "") });
      alert(
        `Document "${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}" imported successfully!`
      );
    } catch (error) {
      console.error("DOCX import failed:", error);
      alert(`Failed to import Word document: ${error.message}`);
    }
  };

  // Handle PDF import
  const handlePDFImport = async (event) => {
    const file = event.target.files[0];
    if (!file || !editor) {
      alert("No file selected or editor not initialized.");
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      alert("Please upload a .pdf file.");
      return;
    }

    try {
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read PDF file"));
        reader.readAsArrayBuffer(file);
      });

      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"; // Use local worker
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let textContent = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        textContent += content.items.map((item) => item.str).join(" ") + "\n";
      }

      const json = {
        type: "doc",
        content: textContent
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => ({
            type: "paragraph",
            content: [{ type: "text", text: line }],
          })),
      };
      console.log("Generated JSON for PDF:", json);

      if (!json || !json.type || !json.content) {
        throw new Error("Invalid JSON structure generated from PDF");
      }

      if (!editor.isEditable) {
        console.warn("Editor is not editable, attempting to focus");
        editor.chain().focus().run();
      }
      editor.commands.setContent(json, false); // false to avoid history
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      onImportPDF?.({ json, fileName });
      alert(`PDF "${fileName}" imported successfully!`);
    } catch (error) {
      console.error("PDF import failed:", error);
      alert(`Failed to import PDF document: ${error.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Rich Text Editor
            </h2>
            <div className="flex items-center gap-2">
              {/* Import Options Dropdown */}
              <div className="relative group">
                <HeaderButton title="Import Documents">
                  <Upload size={16} />
                </HeaderButton>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={handleWordImportClick}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    <FileText size={14} />
                    Import Word Document (.docx)
                  </button>
                  <button
                    onClick={handlePDFImportClick}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    <FileType size={14} />
                    Import PDF Document (.pdf)
                  </button>
                  <button
                    onClick={onImportFromDocuments}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Folder size={14} />
                    Choose From Documents
                  </button>
                </div>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={wordFileInputRef}
                type="file"
                accept=".docx"
                onChange={handleWordImport}
                style={{ display: "none" }}
              />
              <input
                ref={pdfFileInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePDFImport}
                style={{ display: "none" }}
              />

              {/* Save Buttons */}
              <HeaderButton onClick={onSave} title="Save Document (Ctrl+S)">
                <Save size={16} />
              </HeaderButton>

              <HeaderButton onClick={onSaveAs} title="Save As New Document">
                <FolderOpen size={16} />
              </HeaderButton>

              {/* Export Options Dropdown */}
              <div className="relative group">
                <HeaderButton title="Export Options">
                  <Download size={16} />
                </HeaderButton>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={onExportPDF}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    <FileDown size={14} />
                    Export as PDF
                  </button>
                  <button
                    onClick={onExportDOCX}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText size={14} />
                    Export as DOCX
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Full-featured editor with enhanced font controls • Document:{" "}
            {documentTitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {editor?.storage.characterCount.characters() || 0}/
            {editor?.extensionManager.extensions.find(
              (ext) => ext.name === "characterCount"
            )?.options.limit || "∞"}{" "}
            chars
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {editor?.storage.characterCount.words() || 0} words
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
