// pages/UsersPage.tsx
import React from "react";
import { useGetUsersQuery } from "../features/Register/registerAPI";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const UsersPage: React.FC = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true, // ✅ Ensures latest users are fetched
  }) as {
    data: User[] | undefined;
    error: unknown;
    isLoading: boolean;
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.address}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
