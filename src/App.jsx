import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";
import BotApi from "./pages/Bot";
import RealTimeTranscriptions from "./components/StartingFeatures/RealTimeTranscriptions";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/StartingFeatures/ProtectedRoute";
import ForgetPassword from "./SmallComponents/ForgetPassword";
import { EmailAuthCredential } from "firebase/auth";
import EmailVerification from "./SmallComponents/EmailVerification";
import Pricing from "./pages/Other/Pricing";
import Success from "../src/SmallComponents/PaymentSuccess/Success"
import Cancel from "../src/SmallComponents/Cancel"
import PlanDetails from "./components/pricing/PlanDetails";
import PreAudioTranscriptions from "./pages/Other/PreAudioTranscriptions";
import UserProfilePage from "./pages/Other/UserProfilePage";
import UserSecurity from "./components/SideComponents/UserSecurity";
import UserPaymentInfo from "./components/SideComponents/UserPaymentInfo"
import ViewTranscriptions from "./components/PreAudio/ViewTranscriptions";
import SyncAiPage from "./pages/Other/SyncAiPage";
import ViewSyncFiles from "./components/SyncAI/ViewSyncFiles";
import TranscriptSuccess from "./SmallComponents/PaymentSuccess/TranscriptSuccess";
import CreditSuccess from "./SmallComponents/PaymentSuccess/CreditSuccess";
import LiveTranscriptSuccess from "./SmallComponents/PaymentSuccess/LiveTranscriptSuccess";
import SdSucess from "./SmallComponents/PaymentSuccess/SdSucess"
import CaseNoteSuccess from "./SmallComponents/PaymentSuccess//CaseNoteSuccess"



// New Frontend Changes Imports
import Main from './pages/main/Main'
import Think from './pages/what-we-think'
import TranscriptSummarization from './pages/transcript-summarisation-analysis'
import RealTranscript from './pages/real-time-transcript'
import TranscriptSyncVideo from './pages/transcript-sync-video'
import PredictiveCase from './pages/predictive-case-analytics'
import AutomatedLegalResearch from './pages/automated-legal-reasearch'
import DocumentReviewPage from './pages/document-review-analysis'
import EDiscoveryPage from './pages/e-discovery-solutions'
import LegalRiskAssessmentPage from './pages/legal-risk-assesment'
import VirtualLegalAssistancePage from './pages/virtual-legal-assesment'
import JurySelectionSentimentAnalysisPage from './pages/sentiment-analysis-for-jury-selection'
import FraudDetectionPage from './pages/fraud-detection-prevention'
import IntellectualPropertyMonitoringPage from './pages/intellectual-property-monitoring'
import ComplianceAutomationPage from './pages/compliance-automation'
import LegalProcessAutomationPage from './pages/legal-process-automation'
import LitigationStrategyOptimizationPage from './pages/litigation-strategy-optimization'
import DataDrivenLegalInsightsPage from './pages/data-driven-legal-insights'
import ExpertWitnessMatchingPage from './pages/expert-witness-matching'
import PredictiveModelingPage from './pages/predictive-modeling-for-case-outcomes'
import AIPoweredWritingPage from './pages/ai-powered-brief-memo-writing'
import ClientCommunicationAutomationPage from './pages/client-communication-automation'
import LitigationCostManagementPage from './pages/litigation-cost-management'
import AiBasedSettlementAnalysisPage from './pages/ai-based-settlement-analysis'
import ContractAnalysisManagementPage from './pages/contract-analysis-management'
import Aboutus from './pages/about-us'
import ContactForm from './pages/contact-us'
import PreferenceCenter from './pages/prefrence/Preference'
import PrivacyStatement from './pages/privacy-statement'
import TermsAndConditions from './pages/terms-condition'
import Header from './components/layout/header/Header'

import Notecase from "./pages/lawyers-advice/CaseNote";
import PreAudioSuccess from "./SmallComponents/PaymentSuccess/PreAudioSuccess";
import SummriazationDeposition from "./pages/SummriazationDeposition/SummriazationDeposition";
import ViewSummaryDeposition from "./components/SummriazationDepostion/ViewSummaryDeposition";
import VirtualTranscript from "./components/RealTimeTranscript/virtualTranscript/VirtualTranscript";
import ZoomDocumentation from "./pages/documentation/ZoomDocumentation";


function App() {


  return (
    <>

      <UserAuthContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* New Frontend pages >>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/" element={<Main />} />

            <Route
              path="/what-we-think"
              element={<Think />}
            />

            <Route
              path="/transcript-summarisation-analysis"
              element={<TranscriptSummarization />}
            />
            <Route
              path="/real-time-transcript"
              element={<RealTranscript />}
            />
            <Route
              path="/transcript-synchronization-with-video"
              element={<TranscriptSyncVideo />}
            />

            <Route
              path="/predictive-case-analytics"
              element={<PredictiveCase />}
            />
            <Route
              path="/automated-legal-research"
              element={<AutomatedLegalResearch />}
            />
            <Route
              path="/document-review-analysis"
              element={<DocumentReviewPage />}
            />
            <Route
              path="/e-discovery-solutions"
              element={<EDiscoveryPage />}
            />
            <Route
              path="/legal-risk-assessment"
              element={<LegalRiskAssessmentPage />}
            />
            <Route
              path="/virtual-legal-assessment"
              element={<VirtualLegalAssistancePage />}
            />
            <Route
              path="/sentiment-analysis-for-jury-selection"
              element={<JurySelectionSentimentAnalysisPage />}
            />
            <Route
              path="/fraud-detection-prevention"
              element={<FraudDetectionPage />}
            />
            <Route
              path="/intellectual-property-monitoring"
              element={<IntellectualPropertyMonitoringPage />}
            />
            <Route
              path="/compliance-automation"
              element={<ComplianceAutomationPage />}
            />
            <Route
              path="/legal-process-automation"
              element={<LegalProcessAutomationPage />}
            />
            <Route
              path="/litigation-strategy-optimization"
              element={<LitigationStrategyOptimizationPage />}
            />
            <Route
              path="/data-driven-legal-insights"
              element={<DataDrivenLegalInsightsPage />}
            />
            <Route
              path="/expert-witness-matching"
              element={<ExpertWitnessMatchingPage />}
            />
            <Route
              path="/predictive-modeling-for-case-outcomes"
              element={<PredictiveModelingPage />}
            />
            <Route
              path="/ai-powered-brief-memo-writing"
              element={<AIPoweredWritingPage />}
            />
            <Route
              path="/client-communication-automation"
              element={<ClientCommunicationAutomationPage />}
            />
            <Route
              path="/litigation-cost-management"
              element={<LitigationCostManagementPage />}
            />
            <Route
              path="/ai-based-settlement-analysis"
              element={<AiBasedSettlementAnalysisPage />}
            />
            <Route
              path="/contract-analysis-management"
              element={<ContractAnalysisManagementPage />}
            />
            <Route
              path="/about-us"
              element={<Aboutus />}
            />
            <Route
              path="/contact-us"
              element={<ContactForm />}
            />
            <Route
              path="/preference"
              element={<PreferenceCenter />}
            />
            <Route
              path="/privacy"
              element={<PrivacyStatement />}
            />
            <Route
              path="/term"
              element={<TermsAndConditions />}
            />


            {/* Old Application >>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <Route exact path="/home" element={

              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>

            } />
            <Route exact path="/transcription" element={

              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }

            />
            <Route exact path="/realtimetranscriptions" element={

              <ProtectedRoute>
                <RealTimeTranscriptions />
              </ProtectedRoute>
            }

            />
            <Route exact path="/virtual-transcript" element={

              <ProtectedRoute>
                <VirtualTranscript />
              </ProtectedRoute>
            }

            />
            <Route exact path="/botapi" element={

              <ProtectedRoute>
                <BotApi />
              </ProtectedRoute>

            } />


            <Route exact path="/pricing" element={

              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>}

            />

            <Route exact path="/plandetails" element={

              <ProtectedRoute>
                <PlanDetails />
              </ProtectedRoute>}

            />
            <Route exact path="/pre-audio-transcriptions" element={

              <ProtectedRoute>
                <PreAudioTranscriptions />
              </ProtectedRoute>}

            />
            <Route exact path="/user-profile" element={

              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>}

            />
            <Route exact path="/user-security-setting" element={

              <ProtectedRoute>
                <UserSecurity />
              </ProtectedRoute>}

            />
            <Route exact path="/user-payment-info" element={

              <ProtectedRoute>
                <UserPaymentInfo />
              </ProtectedRoute>}

            />


            <Route exact path="/pre-audio-transcriptions/view/:id" element={

              <ProtectedRoute>
                <ViewTranscriptions />
              </ProtectedRoute>}

            />


            <Route exact path="/resyncingAi" element={

              <ProtectedRoute>
                <SyncAiPage />
              </ProtectedRoute>}

            />

            <Route exact path="/resyncingAi/view-sync-file/:id" element={

              <ProtectedRoute>
                <ViewSyncFiles />
              </ProtectedRoute>}

            />

            <Route exact path="/note-case" element={

              <ProtectedRoute>
                <Notecase />
              </ProtectedRoute>}

            />
            <Route exact path="/summarization-deposition" element={

              <ProtectedRoute>
                <SummriazationDeposition />
              </ProtectedRoute>}

            />

            <Route exact path="/view-summarization-deposition/:id" element={

              <ProtectedRoute>
                <ViewSummaryDeposition />
              </ProtectedRoute>}

            />






            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgetPassword" element={<ForgetPassword />} />
            <Route exact path="/emailverification" element={<EmailVerification />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/transcript-payment-success" element={<TranscriptSuccess />} />
            <Route exact path="/credit-payment-success" element={<CreditSuccess />} />
            <Route exact path="/live-transcript-payment-success" element={<LiveTranscriptSuccess />} />
            <Route exact path="/transcript-payment-success-preaudio" element={<PreAudioSuccess />} />
            <Route exact path="/transcript-payment-success-sd" element={<SdSucess />} />
            <Route exact path="/live-transcript-payment-success-casenote" element={<CaseNoteSuccess />} />
            <Route exact path="/cancel" element={<Cancel />} />
            <Route exact path="/user-guide-to-add/remove-app-from-zoom-account" element={<ZoomDocumentation />} />
            

          </Routes>
        </BrowserRouter>
        <div> <Toaster /></div>



      </UserAuthContextProvider>
    </>
  );
}

export default App;
