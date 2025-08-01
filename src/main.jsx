import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ContentProvider } from "./context/contentContext";
import { LegalSessionsProvider } from "./context/LegalSessionsContext";
import { ExtractionProvider } from "./context/ExtractionContext";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Render the App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ContentProvider>
        <LegalSessionsProvider>
          <ExtractionProvider>
            <App />
          </ExtractionProvider>
        </LegalSessionsProvider>
      </ContentProvider>
    </AuthProvider>
  </StrictMode>
);
