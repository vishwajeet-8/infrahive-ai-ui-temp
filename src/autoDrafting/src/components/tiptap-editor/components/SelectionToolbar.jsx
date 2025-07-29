// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Check, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const toolbarRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         setIsVisible(false);
//         setSelectedText('');
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       // Only show toolbar if there's meaningful text selected (more than 3 characters)
//       if (text.trim().length > 3) {
//         setSelectedText(text);

//         // Calculate position
//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         // Position toolbar above the selection
//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60; // 60px above the selection

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     // Listen for selection changes
//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleSelectionUpdate);
//     editor.on('blur', () => {
//       // Delay hiding to allow clicking on toolbar
//       setTimeout(() => {
//         if (!toolbarRef.current?.matches(':hover')) {
//           setIsVisible(false);
//         }
//       }, 100);
//     });

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleSelectionUpdate);
//       editor.off('blur');
//     };
//   }, [editor]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     setIsProcessing(true);
//     setProcessType('summarize');

//     try {
//       // Simulate AI processing (replace with actual API call)
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Mock summarized text (replace with actual AI response)
//       const summarizedText = `Summary: ${selectedText.slice(0, 50)}...`;

//       // Replace selected text with summary
//       const { selection } = editor.state;
//       editor.chain()
//         .focus()
//         .deleteRange({ from: selection.from, to: selection.to })
//         .insertContent(summarizedText)
//         .run();

//       if (onSummarize) {
//         onSummarize(selectedText, summarizedText);
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//       setIsVisible(false);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     setIsProcessing(true);
//     setProcessType('improve');

//     try {
//       // Simulate AI processing (replace with actual API call)
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Mock improved text (replace with actual AI response)
//       const improvedText = `${selectedText} (enhanced with better clarity and flow)`;

//       // Replace selected text with improved version
//       const { selection } = editor.state;
//       editor.chain()
//         .focus()
//         .deleteRange({ from: selection.from, to: selection.to })
//         .insertContent(improvedText)
//         .run();

//       if (onImproveWriting) {
//         onImproveWriting(selectedText, improvedText);
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//       setIsVisible(false);
//     }
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     editor?.commands.focus();
//   };

//   if (!isVisible) return null;

//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100), // Center toolbar and ensure it's not off-screen
//         top: Math.max(10, position.y),
//       }}
//       onMouseLeave={() => {
//         // Hide toolbar when mouse leaves, unless processing
//         if (!isProcessing) {
//           setTimeout(() => {
//             if (!toolbarRef.current?.matches(':hover')) {
//               setIsVisible(false);
//             }
//           }, 500);
//         }
//       }}
//     >
//       {/* Summarize Button */}
//       <button
//         onClick={handleSummarize}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Summarize selected text"
//       >
//         {isProcessing && processType === 'summarize' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Summarizing...</span>
//           </>
//         ) : (
//           <>
//             <FileText className="w-4 h-4" />
//             <span>Summarize</span>
//           </>
//         )}
//       </button>

//       {/* Improve Writing Button */}
//       <button
//         onClick={handleImproveWriting}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Improve selected text"
//       >
//         {isProcessing && processType === 'improve' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Improving...</span>
//           </>
//         ) : (
//           <>
//             <Sparkles className="w-4 h-4" />
//             <span>Improve Writing</span>
//           </>
//         )}
//       </button>

//       {/* Separator */}
//       <div className="w-px h-6 bg-gray-200" />

//       {/* Close Button */}
//       <button
//         onClick={handleClose}
//         className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//         title="Close"
//       >
//         <X className="w-4 h-4" />
//       </button>

//       {/* Selection Info */}
//       <div className="text-xs text-gray-500 px-2 border-l border-gray-200">
//         {selectedText.length} chars selected
//       </div>
//     </div>
//   );
// };

// export default SelectionToolbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Copy, Replace, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryText, setSummaryText] = useState('');
//   const [error, setError] = useState('');
//   const toolbarRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         setIsVisible(false);
//         setSelectedText('');
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       // Only show toolbar if there's meaningful text selected (more than 3 characters)
//       if (text.trim().length > 3) {
//         setSelectedText(text);

//         // Calculate position
//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         // Position toolbar above the selection
//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60; // 60px above the selection

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     // Listen for selection changes
//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleSelectionUpdate);
//     editor.on('blur', () => {
//       // Delay hiding to allow clicking on toolbar
//       setTimeout(() => {
//         if (!toolbarRef.current?.matches(':hover')) {
//           setIsVisible(false);
//         }
//       }, 100);
//     });

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleSelectionUpdate);
//       editor.off('blur');
//     };
//   }, [editor]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     // Get API key from environment variables
//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add REACT_APP_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('summarize');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that creates concise, clear summaries. Keep summaries brief but informative, maintaining the key points of the original text.'
//             },
//             {
//               role: 'user',
//               content: `Please summarize the following text in a clear and concise way:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 150,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const summary = data.choices[0]?.message?.content?.trim();

//       if (summary) {
//         setSummaryText(summary);
//         setShowSummary(true);

//         if (onSummarize) {
//           onSummarize(selectedText, summary);
//         }
//       } else {
//         throw new Error('No summary generated');
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       setError(error.message || 'Failed to summarize text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     setIsProcessing(true);
//     setProcessType('improve');

//     try {
//       // Simulate AI processing (replace with actual API call)
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Mock improved text (replace with actual AI response)
//       const improvedText = `${selectedText} (enhanced with better clarity and flow)`;

//       // Replace selected text with improved version
//       const { selection } = editor.state;
//       editor.chain()
//         .focus()
//         .deleteRange({ from: selection.from, to: selection.to })
//         .insertContent(improvedText)
//         .run();

//       if (onImproveWriting) {
//         onImproveWriting(selectedText, improvedText);
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//       setIsVisible(false);
//     }
//   };

//   const handleCopySummary = () => {
//     navigator.clipboard.writeText(summaryText);
//     // You could add a toast notification here
//   };

//   const handleReplaceSummary = () => {
//     if (!editor || !summaryText) return;

//     const { selection } = editor.state;
//     editor.chain()
//       .focus()
//       .deleteRange({ from: selection.from, to: selection.to })
//       .insertContent(summaryText)
//       .run();

//     setShowSummary(false);
//     setIsVisible(false);
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//     editor?.commands.focus();
//   };

//   if (!isVisible) return null;

//   // Show summary window
//   if (showSummary) {
//     return (
//       <div
//         ref={toolbarRef}
//         className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md animate-in fade-in-0 zoom-in-95 duration-200"
//         style={{
//           left: Math.max(10, position.x - 200), // Center toolbar and ensure it's not off-screen
//           top: Math.max(10, position.y),
//           maxHeight: '400px',
//         }}
//       >
//         {/* Summary Header */}
//         <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <FileText className="w-4 h-4 text-blue-600" />
//             <h3 className="font-medium text-gray-900">AI Summary</h3>
//           </div>
//           <button
//             onClick={handleClose}
//             className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//             title="Close"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Summary Content */}
//         <div className="mb-4">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
//             <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={handleCopySummary}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1"
//             title="Copy summary to clipboard"
//           >
//             <Copy className="w-4 h-4" />
//             Copy
//           </button>
//           <button
//             onClick={handleReplaceSummary}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex-1"
//             title="Replace original text with summary"
//           >
//             <Replace className="w-4 h-4" />
//             Replace Text
//           </button>
//         </div>

//         {/* Original Text Preview */}
//         <div className="mt-3 pt-3 border-t border-gray-100">
//           <p className="text-xs text-gray-500 mb-1">Original text ({selectedText.length} chars):</p>
//           <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
//             {selectedText.length > 100 ? selectedText.slice(0, 100) + '...' : selectedText}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Show main toolbar
//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100), // Center toolbar and ensure it's not off-screen
//         top: Math.max(10, position.y),
//       }}
//       onMouseLeave={() => {
//         // Hide toolbar when mouse leaves, unless processing
//         if (!isProcessing) {
//           setTimeout(() => {
//             if (!toolbarRef.current?.matches(':hover')) {
//               setIsVisible(false);
//             }
//           }, 500);
//         }
//       }}
//     >
//       {/* Error Message */}
//       {error && (
//         <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
//           <X className="w-4 h-4" />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Summarize Button */}
//       <button
//         onClick={handleSummarize}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Summarize selected text using AI"
//       >
//         {isProcessing && processType === 'summarize' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Summarizing...</span>
//           </>
//         ) : (
//           <>
//             <FileText className="w-4 h-4" />
//             <span>Summarize</span>
//           </>
//         )}
//       </button>

//       {/* Improve Writing Button */}
//       <button
//         onClick={handleImproveWriting}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Improve selected text"
//       >
//         {isProcessing && processType === 'improve' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Improving...</span>
//           </>
//         ) : (
//           <>
//             <Sparkles className="w-4 h-4" />
//             <span>Improve Writing</span>
//           </>
//         )}
//       </button>

//       {/* Separator */}
//       <div className="w-px h-6 bg-gray-200" />

//       {/* Close Button */}
//       <button
//         onClick={handleClose}
//         className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//         title="Close toolbar"
//       >
//         <X className="w-4 h-4" />
//       </button>

//       {/* Selection Info */}
//       <div className="text-xs text-gray-500 px-2 border-l border-gray-200">
//         {selectedText.length} chars selected
//       </div>
//     </div>
//   );
// };

// export default SelectionToolbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Copy, Replace, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryText, setSummaryText] = useState('');
//   const [error, setError] = useState('');
//   const toolbarRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         setIsVisible(false);
//         setSelectedText('');
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       // Only show toolbar if there's meaningful text selected (more than 3 characters)
//       if (text.trim().length > 3) {
//         setSelectedText(text);

//         // Calculate position
//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         // Position toolbar above the selection
//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60; // 60px above the selection

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     // Listen for selection changes
//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleSelectionUpdate);
//     editor.on('blur', () => {
//       // Delay hiding to allow clicking on toolbar
//       setTimeout(() => {
//         if (!toolbarRef.current?.matches(':hover')) {
//           setIsVisible(false);
//         }
//       }, 100);
//     });

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleSelectionUpdate);
//       editor.off('blur');
//     };
//   }, [editor]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     // Get API key from environment variables (Vite)
//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('summarize');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that creates concise, clear summaries. Keep summaries brief but informative, maintaining the key points of the original text.'
//             },
//             {
//               role: 'user',
//               content: `Please summarize the following text in a clear and concise way:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 150,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const summary = data.choices[0]?.message?.content?.trim();

//       if (summary) {
//         setSummaryText(summary);
//         setShowSummary(true);

//         if (onSummarize) {
//           onSummarize(selectedText, summary);
//         }
//       } else {
//         throw new Error('No summary generated');
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       setError(error.message || 'Failed to summarize text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     // Get API key from environment variables (Vite)
//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('improve');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a professional writing assistant that improves text clarity, flow, grammar, and readability while maintaining the original meaning and tone. Make the writing more engaging and polished.'
//             },
//             {
//               role: 'user',
//               content: `Please improve the following text for better clarity, flow, and readability:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 200,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const improvedText = data.choices[0]?.message?.content?.trim();

//       if (improvedText) {
//         // Replace selected text with improved version
//         const { selection } = editor.state;
//         editor.chain()
//           .focus()
//           .deleteRange({ from: selection.from, to: selection.to })
//           .insertContent(improvedText)
//           .run();

//         if (onImproveWriting) {
//           onImproveWriting(selectedText, improvedText);
//         }
//       } else {
//         throw new Error('No improved text generated');
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//       setError(error.message || 'Failed to improve text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//       setIsVisible(false);
//     }
//   };

//   const handleCopySummary = () => {
//     navigator.clipboard.writeText(summaryText);
//     // You could add a toast notification here
//   };

//   const handleReplaceSummary = () => {
//     if (!editor || !summaryText) return;

//     const { selection } = editor.state;
//     editor.chain()
//       .focus()
//       .deleteRange({ from: selection.from, to: selection.to })
//       .insertContent(summaryText)
//       .run();

//     setShowSummary(false);
//     setIsVisible(false);
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//     editor?.commands.focus();
//   };

//   if (!isVisible) return null;

//   // Show summary window
//   if (showSummary) {
//     return (
//       <div
//         ref={toolbarRef}
//         className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md animate-in fade-in-0 zoom-in-95 duration-200"
//         style={{
//           left: Math.max(10, position.x - 200), // Center toolbar and ensure it's not off-screen
//           top: Math.max(10, position.y),
//           maxHeight: '400px',
//         }}
//       >
//         {/* Summary Header */}
//         <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <FileText className="w-4 h-4 text-blue-600" />
//             <h3 className="font-medium text-gray-900">AI Summary</h3>
//           </div>
//           <button
//             onClick={handleClose}
//             className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//             title="Close"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Summary Content */}
//         <div className="mb-4">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
//             <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={handleCopySummary}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1"
//             title="Copy summary to clipboard"
//           >
//             <Copy className="w-4 h-4" />
//             Copy
//           </button>
//           <button
//             onClick={handleReplaceSummary}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex-1"
//             title="Replace original text with summary"
//           >
//             <Replace className="w-4 h-4" />
//             Replace Text
//           </button>
//         </div>

//         {/* Original Text Preview */}
//         <div className="mt-3 pt-3 border-t border-gray-100">
//           <p className="text-xs text-gray-500 mb-1">Original text ({selectedText.length} chars):</p>
//           <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
//             {selectedText.length > 100 ? selectedText.slice(0, 100) + '...' : selectedText}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Show main toolbar
//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100), // Center toolbar and ensure it's not off-screen
//         top: Math.max(10, position.y),
//       }}
//       onMouseLeave={() => {
//         // Hide toolbar when mouse leaves, unless processing
//         if (!isProcessing) {
//           setTimeout(() => {
//             if (!toolbarRef.current?.matches(':hover')) {
//               setIsVisible(false);
//             }
//           }, 500);
//         }
//       }}
//     >
//       {/* Error Message */}
//       {error && (
//         <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
//           <X className="w-4 h-4" />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Summarize Button */}
//       <button
//         onClick={handleSummarize}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Summarize selected text using AI"
//       >
//         {isProcessing && processType === 'summarize' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Summarizing...</span>
//           </>
//         ) : (
//           <>
//             <FileText className="w-4 h-4" />
//             <span>Summarize</span>
//           </>
//         )}
//       </button>

//       {/* Improve Writing Button */}
//       <button
//         onClick={handleImproveWriting}
//         disabled={isProcessing}
//         className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         title="Improve selected text"
//       >
//         {isProcessing && processType === 'improve' ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             <span>Improving...</span>
//           </>
//         ) : (
//           <>
//             <Sparkles className="w-4 h-4" />
//             <span>Improve Writing</span>
//           </>
//         )}
//       </button>

//       {/* Separator */}
//       <div className="w-px h-6 bg-gray-200" />

//       {/* Close Button */}
//       <button
//         onClick={handleClose}
//         className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//         title="Close toolbar"
//       >
//         <X className="w-4 h-4" />
//       </button>

//       {/* Selection Info */}
//       <div className="text-xs text-gray-500 px-2 border-l border-gray-200">
//         {selectedText.length} chars selected
//       </div>
//     </div>
//   );
// };

// export default SelectionToolbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Copy, Replace, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryText, setSummaryText] = useState('');
//   const [error, setError] = useState('');
//   const toolbarRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         setIsVisible(false);
//         setSelectedText('');
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       // Only show toolbar if there's meaningful text selected (more than 3 characters)
//       if (text.trim().length > 3) {
//         setSelectedText(text);

//         // Calculate position
//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         // Position toolbar above the selection
//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60; // 60px above the selection

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     // Listen for selection changes
//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleSelectionUpdate);
//     editor.on('blur', () => {
//       // Delay hiding to allow clicking on toolbar
//       setTimeout(() => {
//         if (!toolbarRef.current?.matches(':hover')) {
//           setIsVisible(false);
//         }
//       }, 100);
//     });

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleSelectionUpdate);
//       editor.off('blur');
//     };
//   }, [editor]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     // Get API key from environment variables (Vite)
//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('summarize');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that creates concise, clear summaries. Keep summaries brief but informative, maintaining the key points of the original text.'
//             },
//             {
//               role: 'user',
//               content: `Please summarize the following text in a clear and concise way:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 150,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const summary = data.choices[0]?.message?.content?.trim();

//       if (summary) {
//         setSummaryText(summary);
//         setShowSummary(true);

//         if (onSummarize) {
//           onSummarize(selectedText, summary);
//         }
//       } else {
//         throw new Error('No summary generated');
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       setError(error.message || 'Failed to summarize text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     // Get API key from environment variables (Vite)
//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('improve');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a professional writing assistant that improves text clarity, flow, grammar, and readability while maintaining the original meaning and tone. Make the writing more engaging and polished.'
//             },
//             {
//               role: 'user',
//               content: `Please improve the following text for better clarity, flow, and readability:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 200,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const improvedText = data.choices[0]?.message?.content?.trim();

//       if (improvedText) {
//         // Replace selected text with improved version
//         const { selection } = editor.state;
//         editor.chain()
//           .focus()
//           .deleteRange({ from: selection.from, to: selection.to })
//           .insertContent(improvedText)
//           .run();

//         if (onImproveWriting) {
//           onImproveWriting(selectedText, improvedText);
//         }
//       } else {
//         throw new Error('No improved text generated');
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//       setError(error.message || 'Failed to improve text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//       setIsVisible(false);
//     }
//   };

//   const handleCopySummary = () => {
//     navigator.clipboard.writeText(summaryText);
//     // You could add a toast notification here
//   };

//   const handleReplaceSummary = () => {
//     if (!editor || !summaryText) return;

//     const { selection } = editor.state;
//     editor.chain()
//       .focus()
//       .deleteRange({ from: selection.from, to: selection.to })
//       .insertContent(summaryText)
//       .run();

//     setShowSummary(false);
//     setIsVisible(false);
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//     editor?.commands.focus();
//   };

//   const handleCloseSummary = () => {
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//   };

//   if (!isVisible) return null;

//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100),
//         top: Math.max(10, position.y),
//       }}
//       onMouseLeave={() => {
//         // Hide toolbar when mouse leaves, unless processing
//         if (!isProcessing) {
//           setTimeout(() => {
//             if (!toolbarRef.current?.matches(':hover')) {
//               setIsVisible(false);
//             }
//           }, 500);
//         }
//       }}
//     >
//       {/* Main Toolbar */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 mb-2">
//         {/* Summarize Button */}
//         <button
//           onClick={handleSummarize}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Summarize selected text using AI"
//         >
//           {isProcessing && processType === 'summarize' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Summarizing...</span>
//             </>
//           ) : (
//             <>
//               <FileText className="w-4 h-4" />
//               <span>Summarize</span>
//             </>
//           )}
//         </button>

//         {/* Improve Writing Button */}
//         <button
//           onClick={handleImproveWriting}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Improve selected text using AI"
//         >
//           {isProcessing && processType === 'improve' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Improving...</span>
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4" />
//               <span>Improve Writing</span>
//             </>
//           )}
//         </button>

//         {/* Separator */}
//         <div className="w-px h-6 bg-gray-200" />

//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//           title="Close toolbar"
//         >
//           <X className="w-4 h-4" />
//         </button>

//         {/* Selection Info */}
//         <div className="text-xs text-gray-500 px-2 border-l border-gray-200">
//           {selectedText.length} chars selected
//         </div>
//       </div>

//       {/* Error Message Below Buttons */}
//       {error && (
//         <div className="bg-white border w-[500px] border-red-200 rounded-lg shadow-lg p-3 mb-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
//             <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
//             <span className="leading-relaxed">{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Summary Display Below Toolbar */}
//       {showSummary && (
//         <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           {/* Summary Header */}
//           <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-blue-600" />
//               <h3 className="font-medium text-gray-900">AI Summary</h3>
//             </div>
//             <button
//               onClick={handleCloseSummary}
//               className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//               title="Close summary"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Summary Content */}
//           <div className="mb-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
//               <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={handleCopySummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1"
//               title="Copy summary to clipboard"
//             >
//               <Copy className="w-4 h-4" />
//               Copy
//             </button>
//             <button
//               onClick={handleReplaceSummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex-1"
//               title="Replace original text with summary"
//             >
//               <Replace className="w-4 h-4" />
//               Replace Text
//             </button>
//           </div>

//           {/* Original Text Preview */}
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-xs text-gray-500 mb-1">Original text ({selectedText.length} chars):</p>
//             <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
//               {selectedText.length > 100 ? selectedText.slice(0, 100) + '...' : selectedText}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectionToolbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Copy, Replace, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryText, setSummaryText] = useState('');
//   const [error, setError] = useState('');
//   const [isInteracting, setIsInteracting] = useState(false); // Track user interaction
//   const toolbarRef = useRef(null);
//   const hideTimeoutRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       if (isInteracting || isProcessing || showSummary) return;

//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         if (!isInteracting) {
//           setIsVisible(false);
//           setSelectedText('');
//         }
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       if (text.trim().length > 3) {
//         setSelectedText(text);

//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60;

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else if (!isInteracting) {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     const handleEditorBlur = () => {
//       hideTimeoutRef.current = setTimeout(() => {
//         if (!isInteracting && !isProcessing && !showSummary) {
//           setIsVisible(false);
//         }
//       }, 200);
//     };

//     const handleEditorFocus = () => {
//       if (hideTimeoutRef.current) {
//         clearTimeout(hideTimeoutRef.current);
//         hideTimeoutRef.current = null;
//       }
//       handleSelectionUpdate();
//     };

//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleEditorFocus);
//     editor.on('blur', handleEditorBlur);

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleEditorFocus);
//       editor.off('blur', handleEditorBlur);

//       if (hideTimeoutRef.current) {
//         clearTimeout(hideTimeoutRef.current);
//       }
//     };
//   }, [editor, isInteracting, isProcessing, showSummary]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('summarize');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that creates concise, clear summaries. Keep summaries brief but informative, maintaining the key points of the original text.'
//             },
//             {
//               role: 'user',
//               content: `Please summarize the following text in a clear and concise way:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 150,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const summary = data.choices[0]?.message?.content?.trim();

//       if (summary) {
//         setSummaryText(summary);
//         setShowSummary(true);

//         if (onSummarize) {
//           onSummarize(selectedText, summary);
//         }
//       } else {
//         throw new Error('No summary generated');
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       setError(error.message || 'Failed to summarize text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('improve');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a professional writing assistant that improves text clarity, flow, grammar, and readability while maintaining the original meaning and tone. Make the writing more engaging and polished.'
//             },
//             {
//               role: 'user',
//               content: `Please improve the following text for better clarity, flow, and readability:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 200,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const improvedText = data.choices[0]?.message?.content?.trim();

//       if (improvedText) {
//         const { selection } = editor.state;
//         editor.chain()
//           .focus()
//           .deleteRange({ from: selection.from, to: selection.to })
//           .insertContent(improvedText)
//           .run();

//         if (onImproveWriting) {
//           onImproveWriting(selectedText, improvedText);
//         }
//       } else {
//         throw new Error('No improved text generated');
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//       setError(error.message || 'Failed to improve text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleCopySummary = () => {
//     navigator.clipboard.writeText(summaryText);
//   };

//   const handleReplaceSummary = () => {
//     if (!editor || !summaryText) return;

//     const { selection } = editor.state;
//     editor.chain()
//       .focus()
//       .deleteRange({ from: selection.from, to: selection.to })
//       .insertContent(summaryText)
//       .run();

//     setShowSummary(false);
//     setIsVisible(false);
//     setIsInteracting(false);
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//     setIsInteracting(false);
//     editor?.commands.focus();
//   };

//   const handleCloseSummary = () => {
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//   };

//   const handleToolbarMouseEnter = () => {
//     setIsInteracting(true);
//     if (hideTimeoutRef.current) {
//       clearTimeout(hideTimeoutRef.current);
//       hideTimeoutRef.current = null;
//     }
//   };

//   const handleToolbarMouseLeave = () => {
//     setIsInteracting(false);
//     if (!isProcessing && !showSummary) {
//       hideTimeoutRef.current = setTimeout(() => {
//         if (!isInteracting) {
//           setIsVisible(false);
//         }
//       }, 300);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100),
//         top: Math.max(10, position.y),
//       }}
//       onMouseEnter={handleToolbarMouseEnter}
//       onMouseLeave={handleToolbarMouseLeave}
//     >
//       <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 mb-2">
//         <button
//           onClick={handleSummarize}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Summarize selected text using AI"
//         >
//           {isProcessing && processType === 'summarize' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Summarizing...</span>
//             </>
//           ) : (
//             <>
//               <FileText className="w-4 h-4" />
//               <span>Summarize</span>
//             </>
//           )}
//         </button>

//         <button
//           onClick={handleImproveWriting}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Improve selected text using AI"
//         >
//           {isProcessing && processType === 'improve' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Improving...</span>
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4" />
//               <span>Improve Writing</span>
//             </>
//           )}
//         </button>

//         <div className="w-px h-6 bg-gray-200" />

//         <button
//           onClick={handleClose}
//           className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//           title="Close toolbar"
//         >
//           <X className="w-4 h-4" />
//         </button>

//         <div className="text-xs text-gray-500 px-2 border-l border-gray-200">
//           {selectedText.length} chars selected
//         </div>
//       </div>

//       {error && (
//         <div className="bg-white border w-[500px] border-red-200 rounded-lg shadow-lg p-3 mb-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
//             <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
//             <span className="leading-relaxed">{error}</span>
//           </div>
//         </div>
//       )}

//       {showSummary && (
//         <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-blue-600" />
//               <h3 className="font-medium text-gray-900">AI Summary</h3>
//             </div>
//             <button
//               onClick={handleCloseSummary}
//               className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//               title="Close summary"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           <div className="mb-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
//               <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={handleCopySummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1"
//               title="Copy summary to clipboard"
//             >
//               <Copy className="w-4 h-4" />
//               Copy
//             </button>
//             <button
//               onClick={handleReplaceSummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex-1"
//               title="Replace original text with summary"
//             >
//               <Replace className="w-4 h-4" />
//               Replace Text
//             </button>
//           </div>

//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-xs text-gray-500 mb-1">Original text ({selectedText.length} chars):</p>
//             <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
//               {selectedText.length > 100 ? selectedText.slice(0, 100) + '...' : selectedText}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectionToolbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { Sparkles, FileText, X, Copy, Replace, Loader2 } from 'lucide-react';

// const SelectionToolbar = ({ editor, onSummarize, onImproveWriting }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processType, setProcessType] = useState(null); // 'summarize' or 'improve'
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryText, setSummaryText] = useState('');
//   const [error, setError] = useState('');
//   const [isInteracting, setIsInteracting] = useState(false); // Track user interaction
//   const [hasSelectedText, setHasSelectedText] = useState(false); // Track if text was selected
//   const toolbarRef = useRef(null);
//   const hideTimeoutRef = useRef(null);

//   useEffect(() => {
//     if (!editor) return;

//     const handleSelectionUpdate = () => {
//       if (isInteracting || isProcessing || showSummary) return;

//       const { selection } = editor.state;
//       const { from, to, empty } = selection;

//       if (empty) {
//         // Only hide if we never had text selected, or if user explicitly closed
//         if (!hasSelectedText && !isInteracting) {
//           setIsVisible(false);
//           setSelectedText('');
//         }
//         return;
//       }

//       const text = editor.state.doc.textBetween(from, to, ' ');

//       if (text.trim().length > 3) {
//         setSelectedText(text);
//         setHasSelectedText(true); // Mark that we have selected text

//         const { view } = editor;
//         const start = view.coordsAtPos(from);
//         const end = view.coordsAtPos(to);

//         const x = (start.left + end.left) / 2;
//         const y = start.top - 60;

//         setPosition({ x, y });
//         setIsVisible(true);
//       } else if (!hasSelectedText && !isInteracting) {
//         setIsVisible(false);
//         setSelectedText('');
//       }
//     };

//     const handleEditorBlur = () => {
//       hideTimeoutRef.current = setTimeout(() => {
//         // Only hide if no text was ever selected and not interacting
//         if (!isInteracting && !isProcessing && !showSummary && !hasSelectedText) {
//           setIsVisible(false);
//         }
//       }, 200);
//     };

//     const handleEditorFocus = () => {
//       if (hideTimeoutRef.current) {
//         clearTimeout(hideTimeoutRef.current);
//         hideTimeoutRef.current = null;
//       }
//       handleSelectionUpdate();
//     };

//     editor.on('selectionUpdate', handleSelectionUpdate);
//     editor.on('focus', handleEditorFocus);
//     editor.on('blur', handleEditorBlur);

//     return () => {
//       editor.off('selectionUpdate', handleSelectionUpdate);
//       editor.off('focus', handleEditorFocus);
//       editor.off('blur', handleEditorBlur);

//       if (hideTimeoutRef.current) {
//         clearTimeout(hideTimeoutRef.current);
//       }
//     };
//   }, [editor, isInteracting, isProcessing, showSummary, hasSelectedText]);

//   const handleSummarize = async () => {
//     if (!selectedText.trim() || !editor) return;

//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('summarize');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that creates concise, clear summaries. Keep summaries brief but informative, maintaining the key points of the original text.'
//             },
//             {
//               role: 'user',
//               content: `Please summarize the following text in a clear and concise way:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 150,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const summary = data.choices[0]?.message?.content?.trim();

//       if (summary) {
//         setSummaryText(summary);
//         setShowSummary(true);

//         if (onSummarize) {
//           onSummarize(selectedText, summary);
//         }
//       } else {
//         throw new Error('No summary generated');
//       }

//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       setError(error.message || 'Failed to summarize text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleImproveWriting = async () => {
//     if (!selectedText.trim() || !editor) return;

//     const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     if (!openAiApiKey) {
//       setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
//       return;
//     }

//     setIsProcessing(true);
//     setProcessType('improve');
//     setError('');

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${openAiApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a professional writing assistant that improves text clarity, flow, grammar, and readability while maintaining the original meaning and tone. Make the writing more engaging and polished.'
//             },
//             {
//               role: 'user',
//               content: `Please improve the following text for better clarity, flow, and readability:\n\n${selectedText}`
//             }
//           ],
//           max_tokens: 200,
//           temperature: 0.3,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const improvedText = data.choices[0]?.message?.content?.trim();

//       if (improvedText) {
//         const { selection } = editor.state;
//         editor.chain()
//           .focus()
//           .deleteRange({ from: selection.from, to: selection.to })
//           .insertContent(improvedText)
//           .run();

//         if (onImproveWriting) {
//           onImproveWriting(selectedText, improvedText);
//         }
//       } else {
//         throw new Error('No improved text generated');
//       }

//     } catch (error) {
//       console.error('Error improving text:', error);
//       setError(error.message || 'Failed to improve text. Please try again.');
//     } finally {
//       setIsProcessing(false);
//       setProcessType(null);
//     }
//   };

//   const handleCopySummary = () => {
//     navigator.clipboard.writeText(summaryText);
//   };

//   const handleReplaceSummary = () => {
//     if (!editor || !summaryText) return;

//     const { selection } = editor.state;
//     editor.chain()
//       .focus()
//       .deleteRange({ from: selection.from, to: selection.to })
//       .insertContent(summaryText)
//       .run();

//     setShowSummary(false);
//     setIsVisible(false);
//     setIsInteracting(false);
//     setHasSelectedText(false); // Reset the flag
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//     setIsInteracting(false);
//     setHasSelectedText(false); // Reset the flag
//     editor?.commands.focus();
//   };

//   const handleCloseSummary = () => {
//     setShowSummary(false);
//     setSummaryText('');
//     setError('');
//   };

//   const handleToolbarMouseEnter = () => {
//     setIsInteracting(true);
//     if (hideTimeoutRef.current) {
//       clearTimeout(hideTimeoutRef.current);
//       hideTimeoutRef.current = null;
//     }
//   };

//   const handleToolbarMouseLeave = () => {
//     setIsInteracting(false);
//     // Only hide if no text was selected and not processing/showing summary
//     if (!isProcessing && !showSummary && !hasSelectedText) {
//       hideTimeoutRef.current = setTimeout(() => {
//         if (!isInteracting && !hasSelectedText) {
//           setIsVisible(false);
//         }
//       }, 300);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div
//       ref={toolbarRef}
//       className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{
//         left: Math.max(10, position.x - 100),
//         top: Math.max(10, position.y),
//       }}
//       onMouseEnter={handleToolbarMouseEnter}
//       onMouseLeave={handleToolbarMouseLeave}
//     >
//       <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2 mb-2">
//         <button
//           onClick={handleSummarize}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Summarize selected text using AI"
//         >
//           {isProcessing && processType === 'summarize' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Summarizing...</span>
//             </>
//           ) : (
//             <>
//               <FileText className="w-4 h-4" />
//               <span>Summarize</span>
//             </>
//           )}
//         </button>

//         <button
//           onClick={handleImproveWriting}
//           disabled={isProcessing}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Improve selected text using AI"
//         >
//           {isProcessing && processType === 'improve' ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Improving...</span>
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4" />
//               <span>Improve Writing</span>
//             </>
//           )}
//         </button>

//         <div className="w-px h-6 bg-gray-200" />

//         <button
//           onClick={handleClose}
//           className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//           title="Close toolbar"
//         >
//           <X className="w-4 h-4" />
//         </button>

//       </div>

//       {error && (
//         <div className="bg-white border w-[500px] border-red-200 rounded-lg shadow-lg p-3 mb-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
//             <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
//             <span className="leading-relaxed">{error}</span>
//           </div>
//         </div>
//       )}

//       {showSummary && (
//         <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
//           <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-blue-600" />
//               <h3 className="font-medium text-gray-900">AI Summary</h3>
//             </div>
//             <button
//               onClick={handleCloseSummary}
//               className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//               title="Close summary"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           <div className="mb-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
//               <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={handleCopySummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1"
//               title="Copy summary to clipboard"
//             >
//               <Copy className="w-4 h-4" />
//               Copy
//             </button>
//             <button
//               onClick={handleReplaceSummary}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex-1"
//               title="Replace original text with summary"
//             >
//               <Replace className="w-4 h-4" />
//               Replace Text
//             </button>
//           </div>

//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-xs text-gray-500 mb-1">Original text ({selectedText.length} chars):</p>
//             <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
//               {selectedText.length > 100 ? selectedText.slice(0, 100) + '...' : selectedText}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectionToolbar;

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Replace, Loader2, Edit3, Send } from "lucide-react";

const SelectionToolbar = ({ editor, onRefine }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasSelectedText, setHasSelectedText] = useState(false);
  const [usage, setUsage] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const toolbarRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Configuration for the refine endpoint
  const REFINE_ENDPOINT = `${import.meta.env.VITE_PY_LEGAL_API}/async-refine`;
  const USE_STREAMING = true;

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      if (isInteracting || isProcessing || showResult) return;

      const { selection } = editor.state;
      const { from, to, empty } = selection;

      if (empty) {
        if (!hasSelectedText && !isInteracting) {
          setIsVisible(false);
          setSelectedText("");
        }
        return;
      }

      const text = editor.state.doc.textBetween(from, to, " ");

      if (text.trim().length > 3) {
        setSelectedText(text);
        setHasSelectedText(true);

        const { view } = editor;
        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);

        const x = (start.left + end.left) / 2;
        const y = start.top - 60;

        setPosition({ x, y });
        setIsVisible(true);
      } else if (!hasSelectedText && !isInteracting) {
        setIsVisible(false);
        setSelectedText("");
      }
    };

    const handleEditorBlur = () => {
      hideTimeoutRef.current = setTimeout(() => {
        if (
          !isInteracting &&
          !isProcessing &&
          !showResult &&
          !hasSelectedText
        ) {
          setIsVisible(false);
        }
      }, 200);
    };

    const handleEditorFocus = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      handleSelectionUpdate();
    };

    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("focus", handleEditorFocus);
    editor.on("blur", handleEditorBlur);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("focus", handleEditorFocus);
      editor.off("blur", handleEditorBlur);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [editor, isInteracting, isProcessing, showResult, hasSelectedText]);

  // Handle streaming response with real-time updates
  const handleStreamingResponse = async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let content = "";
    let usage = null;

    // Show result card immediately when streaming starts
    setShowResult(true);
    setResultText("");

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.content) {
              content = data.content;
              // Update the result text in real-time
              setResultText(content);
            }

            if (data.usage) {
              usage = data.usage;
              setUsage(usage);
            }
          } catch (e) {
            console.warn("Invalid JSON in stream:", line);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return { content, usage };
  };

  // Generic function to call the refine endpoint
  const callRefineEndpoint = async (
    userPrompt,
    content,
    isStreaming = USE_STREAMING
  ) => {
    const endpoint = isStreaming
      ? `${import.meta.env.VITE_PY_LEGAL_API}/async-refine`
      : `${import.meta.env.VITE_PY_LEGAL_API}/refine`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_prompt: userPrompt,
        content: content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    if (isStreaming) {
      return handleStreamingResponse(response);
    } else {
      return await response.json();
    }
  };

  const handleRefine = async () => {
    if (!selectedText.trim() || !editor || !customPrompt.trim()) return;

    setIsProcessing(true);
    setError("");
    setResultText("");
    setUsage(null);

    try {
      const result = await callRefineEndpoint(customPrompt, selectedText);

      // For non-streaming, we still need to set the result
      if (!USE_STREAMING && result.content && result.content.trim()) {
        setResultText(result.content.trim());
        setUsage(result.usage);
        setShowResult(true);
      }

      if (onRefine) {
        onRefine(
          selectedText,
          result.content?.trim() || resultText,
          customPrompt
        );
      }
    } catch (error) {
      console.error("Error refining text:", error);
      setError(error.message || "Failed to refine text. Please try again.");
      setShowResult(false); // Hide result on error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(resultText);
  };

  const handleReplaceResult = () => {
    if (!editor || !resultText) return;

    const { selection } = editor.state;
    editor
      .chain()
      .focus()
      .deleteRange({ from: selection.from, to: selection.to })
      .insertContent(resultText)
      .run();

    setShowResult(false);
    setIsVisible(false);
    setIsInteracting(false);
    setHasSelectedText(false);
    setCustomPrompt("");
  };

  const handleClose = () => {
    setIsVisible(false);
    setShowResult(false);
    setResultText("");
    setError("");
    setUsage(null);
    setIsInteracting(false);
    setHasSelectedText(false);
    setCustomPrompt("");
    editor?.commands.focus();
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setResultText("");
    setError("");
    setUsage(null);
  };

  const handleToolbarMouseEnter = () => {
    setIsInteracting(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleToolbarMouseLeave = () => {
    setIsInteracting(false);
    if (!isProcessing && !showResult && !hasSelectedText) {
      hideTimeoutRef.current = setTimeout(() => {
        if (!isInteracting && !hasSelectedText) {
          setIsVisible(false);
        }
      }, 300);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        left: Math.max(10, position.x - 200),
        top: Math.max(10, position.y),
      }}
      onMouseEnter={handleToolbarMouseEnter}
      onMouseLeave={handleToolbarMouseLeave}
    >
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-xl p-4 transition-all duration-300 ${
          showResult ? "w-[800px]" : "w-96"
        }`}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium text-gray-900">Refine Text</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Close toolbar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`flex gap-4 ${showResult ? "" : "max-w-96"}`}>
          {/* Prompt Input Card */}
          <div className={`${showResult ? "flex-1" : "w-full"}`}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your prompt:
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Make this text more formal and professional, translate to Spanish, add more details..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                disabled={isProcessing}
              />
            </div>

            <div className="mb-4">
              <button
                onClick={handleRefine}
                disabled={isProcessing || !customPrompt.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md transition-colors"
                title="Refine selected text with custom prompt"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Refining...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Refine</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">
                Selected text ({selectedText.length} chars):
              </p>
              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
                {selectedText.length > 100
                  ? selectedText.slice(0, 100) + "..."
                  : selectedText}
              </p>
            </div>
          </div>

          {/* Arrow (only show when result is visible) */}
          {showResult && (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Result Card (only show when result is available) */}
          {showResult && (
            <div className="flex-1 animate-in slide-in-from-right-4 duration-300">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Refined Result
                  </h4>
                  <button
                    onClick={handleCloseResult}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Close result"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  ({resultText.length} characters)
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 h-32 overflow-y-auto mb-4">
                {isProcessing && !resultText ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating response...</span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {resultText}
                    {isProcessing && (
                      <span
                        className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1"
                        title="Streaming..."
                      ></span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleCopyResult}
                  disabled={isProcessing || !resultText.trim()}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Copy result to clipboard"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
                <button
                  onClick={handleReplaceResult}
                  disabled={isProcessing || !resultText.trim()}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Replace original text with result"
                >
                  <Replace className="w-3 h-3" />
                  Replace
                </button>
              </div>

              {usage && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Tokens: {usage.input_tokens} in, {usage.output_tokens} out
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-white border border-red-200 rounded-lg shadow-lg p-3 mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionToolbar;
