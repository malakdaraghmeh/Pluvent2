import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import i18n from './i18n/i18n';
import { useEffect } from 'react';
import Services from './Pages/Services/Services';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import MessagesPage from './Pages/messages/page';
import SupportTicketsPage from './Pages/support/SupportTicketsPage';
import ProjectPage from './Pages/projects/page';
import ProjectDetailsPage from './Pages/projects/[id]/page';
import FileAndDocumentPage from './Pages/file-and-document/page';
import DashboardPage from './Pages/dashboard/page';
import BillingPage from './Pages/billing/page';
import TicketDetails from './Pages/support/TicketDetails/page';
import ChangeRequestDetailsPage from './Pages/projects/[id]/change-requests/[requestId]/page';
import Layout from './components/Layout/Layout';
import UsersPage from './Pages/users/page';
import InvoiceModal from './Pages/InvoiceModal/invoiceModalPage';
import PaymentDetailsModal from './Pages/PaymentDetailsModal/paymentDetailsModal';

function LocaleWrapper() {
    const { locale } = useParams();

    useEffect(() => {
        if (locale) {
            i18n.changeLanguage(locale);

            if (locale === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
        }
    }, [locale]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/projects/:projectId/change-requests/:requestId"
                    element={<ChangeRequestDetailsPage />}
                />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/support" element={<SupportTicketsPage />} />
                <Route path="/support/:id" element={<TicketDetails />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/file-and-document" element={<FileAndDocumentPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/invoice" element={<InvoiceModal onClose={undefined} />} />
                <Route path="/paydet" element={<PaymentDetailsModal onClose={undefined} onContinue={undefined} onBack={undefined} />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

const AppRoutes = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return (
        <>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="/en" replace />} />

                    <Route path="/:locale/*" element={<LocaleWrapper />} />
                </Routes>
            </>
        </>
    );
};

export default AppRoutes;
