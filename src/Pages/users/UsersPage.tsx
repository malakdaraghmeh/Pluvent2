import { useState } from 'react';
import UserManagementHeader from './components/UserManagementHeader';
import UserMetricsGrid from './components/UserMetricsGrid';
import UsersTable from './components/UsersTable';
import AddUserModal from './components/AddUserModal';
import { usersMetricsData } from './data/usersMetrics';
import { usersTableData } from './data/usersTable';

export default function UsersPage() {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    return (
        <main className="min-h-screen w-full pb-8">
            <div className="mx-auto flex w-full max-w-[1086px] flex-col gap-8 min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
                <UserManagementHeader onAddUser={() => setIsAddUserOpen(true)} />

                <UserMetricsGrid metrics={usersMetricsData} />

                <UsersTable users={usersTableData} />

                <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
            </div>
        </main>
    );
}
