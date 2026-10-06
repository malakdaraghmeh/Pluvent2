import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import i18n from './i18n/i18n';
import About from './Pages/About/About';
import BillingPage from './Pages/billing/BillingPage';
import CompletedChangeRequestPage from './Pages/change-request-details/completed/CompletedChangeRequestPage';
import InProgressPage from './Pages/change-request-details/in-progress/InProgressPage';
import ChangeRequestReviewDetails from './Pages/change-request-details/ChangeRequestDetailsPage';
import PendingPaymentPage from './Pages/change-request-details/payment/PendingPaymentPage';
import WaitingUserInputPage from './Pages/change-request-details/waiting/WaitingUserInputPage';
import Contact from './Pages/Contact/Contact';
import DashboardPage from './Pages/dashboard/DashboardPage';
import FileAndDocumentPage from './Pages/file-and-document/FileAndDocumentPage';
import MessagesPage from './Pages/messages/MessagesPage';
import NotFound from './Pages/NotFound/NotFound';
import ChangeRequestDetailsPage from './Pages/projects/details/change-requests/ChangeRequestDetailsPage';
import CompletedProjectPage from './Pages/projects/details/completed/CompletedProjectPage';
import ProjectFileAndDocumentPage from './Pages/projects/details/files/ProjectFilesPage';
import ProjectDetailsPage from './Pages/projects/details/ProjectDetailsPage';
import ProjectPage from './Pages/projects/ProjectsPage';
import SupportTicketsPage from './Pages/support/SupportTicketsPage';
import CreateSupportInquiryPage from './Pages/support/create-support-inquiry/CreateSupportInquiryPage';
import TicketDetails from './Pages/support/TicketDetails/TicketDetailsPage';
import SupportPlans from './Pages/supportPlans/SupportPlans';
import UsersPage from './Pages/users/UsersPage';
import ProjectDetails from './Pages/projects/components/ProjectDetails';
import SelectProjectModal from './Pages/support/selectProject/SelectProject';
import { Layout } from 'lucide-react';


function LocaleWrapper() {
    const { locale } = useParams();

    useEffect(() => {
        if (!locale) return;

        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/projects/:id/completed" element={<CompletedProjectPage />} />
                <Route path="/projects/:id/files" element={<ProjectFileAndDocumentPage />} />

                <Route
                    path="/projects/:projectId/change-requests/:requestId"
                    element={<ChangeRequestDetailsPage />}
                />

                <Route
                    path="/projects/:projectId/change-requests/:requestId/payment"
                    element={<PendingPaymentPage />}
                />

                <Route
                    path="/projects/:projectId/change-requests/:requestId/completed"
                    element={<CompletedChangeRequestPage />}
                />

                <Route
                    path="/projects/:projectId/change-requests/:requestId/in-progress"
                    element={<InProgressPage />}
                />

                <Route
                    path="/projects/:projectId/change-requests/:requestId/waiting"
                    element={<WaitingUserInputPage />}
                />

                <Route path="/change-request-details" element={<ChangeRequestReviewDetails />} />
                <Route path="/messages" element={<MessagesPage />} />

                <Route path="/support" element={<SupportTicketsPage />} />
                <Route path="/support/create" element={<CreateSupportInquiryPage />} />
                <Route path="/support/:id" element={<TicketDetails />} />
                <Route path="/support-plans" element={<SupportPlans />} />

                <Route path="/file-and-document" element={<FileAndDocumentPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/prdet" element={<ProjectDetails project={projectDetailsData[0]} />} />
                <Route path="/support-plans" element={<SupportPlans />} />
                <Route path="/select-pro" element={<SelectProjectModal />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

const AppRoutes = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route path="/:locale/*" element={<LocaleWrapper />} />
        </Routes>
    );
};

export default AppRoutes;
