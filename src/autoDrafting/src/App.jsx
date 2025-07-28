

// import TiptapEditor from "./components/tiptap-editor";

import TiptapEditor from "./components/tiptap-editor";
import EditorWithVariablesPage from "./components/tiptap-editor/EditorWithVariablesPage";
import DocxFromBase64 from "./Base64";
// import TiptapEditor from './components/Editor';
// import RichTextEditor from './components/RichTextEditor';
// import TiptapEditor from './components/Code';
// import TiptapStyleEditor from './components/TiptapStyleEditor';

function App() {
  return (
    <div className="container mx-auto p-4">
      
      <TiptapEditor />
      {/* <DocxFromBase64 /> */}
    </div>
  );
}

export default App;