// import { Editor } from "novel";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useState } from "react";
import { contentContext } from "@/context/contentContext";
import { variableContext } from "@/context/variableContext";

export default function TinyEditor() {
  const { fileContent, setFileContent } = useContext(contentContext);
  const { setFocusedVariable } = useContext(variableContext);

  const handleChange = (e) => {
    setFileContent((prevState) => ({ ...prevState, content: e }));
  };

  const handleClick = (e) => {
    const str = e.target.innerText;
    const match = str.match(/{{(.*?)}}/);

    if (match) {
      const variableId = match[1];
      setFocusedVariable(variableId);
    } else {
      console.log("No match found in the text");
    }
  };

  return (
    <div className="mt-12 min-h-full">
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        init={{
          height: 645,
          content_style: `
          body {
            padding: 10px 55px;
            line-height: 1.5;
            text-align: justify;
          }
        `,
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Feb 10, 2025:
            "checklist",
            "mediaembed",
            "casechange",
            // "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "ai",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
            // "importword",
            // "exportword",
            // "exportpdf",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        // initialValue="Write..."
        value={fileContent.content}
        onEditorChange={handleChange}
        onClick={handleClick}
      />
    </div>
  );
}
