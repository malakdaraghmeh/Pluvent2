import { useState } from 'react';
import UserManagementHeader from './components/UserManagementHeader';
import UserMetricsGrid from './components/UserMetricsGrid';
import UsersTable from './components/UsersTable';
import AddUserModal from './components/AddUserModal';
import { usersMetricsData } from './data/usersMetrics';
import { usersTableData } from './data/usersTable';
import type {
    AddUserFormData,
    UserTableItem,
} from '../../../utils/types/users.types';

export default function UsersPage() {
    const [users, setUsers] = useState<UserTableItem[]>(usersTableData);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<UserTableItem | null>(null);

    const handleAddUser = () => {
        setUserToEdit(null);
        setIsUserModalOpen(true);
    };

    const handleEditUser = (user: UserTableItem) => {
        setUserToEdit(user);
        setIsUserModalOpen(true);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(currentUsers =>
            currentUsers.filter(user => user.id !== userId),
        );
    };

    const handleSubmitUser = (data: AddUserFormData) => {
        if (userToEdit) {
            setUsers(currentUsers =>
                currentUsers.map(user =>
                    user.id === userToEdit.id
                        ? {
                              ...user,
                              name: data.fullName,
                              email: data.email,
                              role: data.role as UserTableItem['role'],
                          }
                        : user,
                ),
            );

            return;
        }

        const newUser: UserTableItem = {
            id: Date.now().toString(),
            name: data.fullName,
            email: data.email,
            role: data.role as UserTableItem['role'],
            status: 'Active',
        };

        setUsers(currentUsers => [...currentUsers, newUser]);
    };

    const handleCloseModal = () => {
        setIsUserModalOpen(false);
        setUserToEdit(null);
    };

    return (
        <main className="min-h-screen w-full pb-8">
            <div className="mx-auto flex w-full max-w-[1086px] flex-col gap-8 min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
                <UserManagementHeader onAddUser={handleAddUser} />

                <UserMetricsGrid metrics={usersMetricsData} />

                <UsersTable
                    users={users}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />

                <AddUserModal
                    isOpen={isUserModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitUser}
                    userToEdit={userToEdit}
                />
            </div>
        </main>
    );
}