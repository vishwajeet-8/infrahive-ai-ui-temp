import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import DraftChat from "./AutoDraft/DraftChat";
import KnowledgeCards from "./components/Integration";
import { knowledgeData } from "./lib/utils";
import OnecleChat from "./components/OnecleChat";
import RbiChat from "./components/RbiChat";
import Extract from "./extract/Extract";
import ChatInterface from "./components/ResearchChat";
import HighCourtDashboard from "./LegalResearch/HighCourtDashboard";
import News from "./news/News";
import LegalAiResearch from "./LegalAIResearch/LegalAiResearch";
import LegalDocumentIntelligence from "./LegalDocumentIntelligence/components/Index";
import Extractions from "./extract/pages/Extractions";
import Documents from "./DocumentHub/Documents";
import SessionCards from "./components/SessionCards";
import { DummyDataView } from "./components/DummyDataView";
import AcceptInvite from "./invite/AcceptInvite";
import SendInvite from "./invite/SendInvite";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import ReqForgotPassword from "./components/ReqForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TeamInvitations from "./components/userSettings/TeamInvitations";
import Profile from "./components/userSettings/Profile";
import Workspace from "./workspaces/Workspace";
import TiptapEditor from "./autoDrafting/src/components/tiptap-editor";
import ExtractedData from "./extract/pages/ExtractedData";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/request-forgot-password"
          element={<ReqForgotPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route
          path="/workspaces/:workspaceId"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="Extractions" element={<Extractions />} />
          <Route path="ExtractChat" element={<Extract />} />
          <Route path="ResearchChat" element={<ChatInterface />} />
          <Route path="AutoDraftChat" element={<TiptapEditor />} />
          <Route
            path="integrations"
            element={<KnowledgeCards data={knowledgeData} />}
          />
          <Route path="oneclechat" element={<OnecleChat />} />
          <Route path="newshub" element={<News />} />
          <Route path="legal-ai-research" element={<LegalAiResearch />} />
          <Route path="legalresearch" element={<HighCourtDashboard />} />
          <Route path="integration/rbi-chat" element={<RbiChat />} />
          <Route
            path="legal-document-intelligence/:sessionId"
            element={<LegalDocumentIntelligence />}
          />
          <Route path="Documents" element={<Documents />} />
          <Route path="extracted/:id" element={<ExtractedData />} />
          <Route path="Recent-conversation" element={<SessionCards />} />
          <Route path="Dummy-Data" element={<DummyDataView />} />
          <Route path="send-invite" element={<SendInvite />} />
          <Route path="settings" element={<TeamInvitations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="workspace" element={<Workspace />} />
          {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
