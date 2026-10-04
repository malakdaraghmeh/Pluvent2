import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

//import Layout from './Components/Layout/Layout';
import i18n from './i18n/i18n';
import About from './Pages/About/About';
import BillingPage from './Pages/billing/page';
import CompletedChangeRequestPage from './Pages/change-request-details/completed/page';
import InProgressPage from './Pages/change-request-details/in-progress/page';
import ChangeRequestReviewDetails from './Pages/change-request-details/page';
import PendingPaymentPage from './Pages/change-request-details/payment/page';
import WaitingUserInputPage from './Pages/change-request-details/waiting/page';
import Contact from './Pages/Contact/Contact';
import DashboardPage from './Pages/dashboard/page';
import FileAndDocumentPage from './Pages/file-and-document/page';
import MessagesPage from './Pages/messages/page';
import NotFound from './Pages/NotFound/NotFound';
import ProjectDetails from './Pages/projectDetails/ProjectDetails';
import ChangeRequestDetailsPage from './Pages/projects/[id]/change-requests/[requestId]/page';
import ProjectFileAndDocumentPage from './Pages/projects/[id]/files/page';
import ProjectDetailsPage from './Pages/projects/[id]/page';
import ProjectPage from './Pages/projects/page';
import Services from './Pages/Services/Services';
import SupportTicketsPage from './Pages/support/SupportTicketsPage';
import TicketDetails from './Pages/support/TicketDetails/page';
import UsersPage from './Pages/users/page';
import SupportPlans from './Pages/supportPlans/SupportPlans';
import InvoiceModal from './Pages/InvoiceModal/invoiceModalPage';
import Layout from './components/Layout/Layout';

function LocaleWrapper() {
    const { locale } = useParams();

    useEffect(() => {
        if (!locale) return;

        i18n.changeLanguage(locale);
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }, [locale]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />

                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/projects/:id/files" element={<ProjectFileAndDocumentPage />} />

                <Route
                    path="/projects/:projectId/change-requests/:requestId/payment"
                    element={<PendingPaymentPage />}
                />
                <Route
                    path="/projects/:projectId/change-requests/:requestId"
                    element={<ChangeRequestDetailsPage />}
                />
                <Route path="/change-request-details" element={<ChangeRequestReviewDetails />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/support" element={<SupportTicketsPage />} />
                <Route path="/support/:id" element={<TicketDetails />} />
                <Route path="/file-and-document" element={<FileAndDocumentPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/invoice"    element={ <InvoiceModal   isOpen={true} onClose={() => {}}/> } />

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
                <Route path="/support/:id" element={<TicketDetails />} />
                <Route path="/file-and-document" element={<FileAndDocumentPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/prdet" element={<ProjectDetails />} />
                <Route path="/support-plans" element={<SupportPlans />} />

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
