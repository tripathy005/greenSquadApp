import React, { useState } from 'react'
import NaNavbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function UsersPage() {

    const [users, setUsers] = useState([
        {
            id: 1,
            fullName: 'Kunal Verma',
            username: 'kunal_verma',
            email: 'kunal@example.com',
        },
        {
            id: 2,
            fullName: 'Rahul Das',
            username: 'rahul_das',
            email: 'rahul@example.com',
        },
        {
            id: 3,
            fullName: 'Priya Sharma',
            username: 'priya_sharma',
            email: 'priya@example.com',
        },
        {
            id: 4,
            fullName: 'Amit Kumar',
            username: 'amit_kumar',
            email: 'amit@example.com',
        },
    ])


    const handleDelete = (id) => {

        setUsers((previousUsers) =>
            previousUsers.filter(
                (user) => user.id !== id
            )
        )

    }


    return (
        <div className="min-h-screen bg-[#F5F7F5]">

            {/* Navbar */}
            <NaNavbar />


            {/* Body */}
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />


                {/* Main Content */}
                <main className="flex-1 p-8">

                    {/* Header */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Manage Users
                        </h1>

                        <p className="mt-1 text-gray-500">
                            View and manage registered users
                        </p>

                    </div>


                    {/* User List Header */}
                    <div className="mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold text-gray-800">
                                Users
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {users.length} user
                                {users.length !== 1 ? 's' : ''}
                            </p>

                        </div>

                    </div>


                    {/* User Cards */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {users.map((user) => (

                            <div
                                key={user.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >

                                {/* Top Section */}
                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-4">

                                        {/* Avatar */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
                                            {user.fullName.charAt(0).toUpperCase()}
                                        </div>


                                        <div>

                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {user.fullName}
                                            </h3>

                                            <p className="text-sm text-gray-400">
                                                @{user.username}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>

                                </div>


                                {/* User Details */}
                                <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

                                    {/* Email */}
                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-gray-400">
                                            Email
                                        </span>

                                        <span className="text-sm text-gray-700">
                                            {user.email}
                                        </span>

                                    </div>


                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Empty State */}
                    {users.length === 0 && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                            <h3 className="text-lg font-semibold text-gray-700">
                                No users found
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                There are currently no registered users.
                            </p>

                        </div>

                    )}

                </main>

            </div>

        </div>
    )
}