import React, { useState, useEffect } from 'react'
import NaNavbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-hot-toast'

import userdp from '../assets/dp/user.png'

export default function UsersPage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)


    // ============================
    // GET ALL CITIZEN USERS
    // ============================
    const fetchUsers = async () => {

        try {

            setLoading(true)

            const accessToken = localStorage.getItem(
                'access_token'
            )


            const response = await fetch(
                '/api/auth/users/',
                {
                    method: 'GET',

                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            )


            const data = await response.json()

            // console.log('All Users:', data)

            if (!response.ok) {

                toast.error(
                    data.detail || 'Unable to fetch users'
                )

                return
            }

            const Users = data.filter(
                (user) => user.role?.toLowerCase() === 'citizen'
            )

            // console.log('user:', Users)




            setUsers(Users)


        } catch (error) {

            console.error('Fetch Users Error:', error)

            toast.error(
                'Something went wrong while fetching users'
            )

        } finally {

            setLoading(false)

        }

    }


    // Fetch users when page loads
    useEffect(() => {

        fetchUsers()

    }, [])


    // ============================
    // CONFIRM DELETE WITH TOAST
    // ============================
    const confirmDelete = (id) => {

        toast((t) => (

            <div className="flex flex-col gap-3">

                <div>

                    <p className="font-semibold text-gray-800">
                        Delete User?
                    </p>

                    <p className="text-sm text-gray-500">
                        Are you sure you want to delete this user?
                    </p>

                </div>


                <div className="flex justify-end gap-2">

                    {/* Cancel */}
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>


                    {/* Confirm Delete */}
                    <button
                        onClick={() => {

                            toast.dismiss(t.id)

                            handleDelete(id)

                        }}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>

        ), {
            duration: Infinity,
            position: 'top-center',
        })

    }
    // ============================
    // DELETE USER
    // ============================
    const handleDelete = async (id) => {

        try {

            setDeletingId(id)

            const accessToken = localStorage.getItem(
                'access_token'
            )


            const response = await fetch(
                `/api/auth/users/${id}/delete/`,
                {
                    method: 'DELETE',

                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            )


            // DELETE responses may be empty, so don't directly call
            // response.json() without checking.
            let data = {}

            const contentType = response.headers.get(
                'content-type'
            )

            if (
                contentType &&
                contentType.includes('application/json')
            ) {
                data = await response.json()
            }


            if (!response.ok) {

                toast.error(
                    data.detail || 'Unable to delete user'
                )

                return
            }


            // Remove user immediately from UI
            setUsers((previousUsers) =>
                previousUsers.filter(
                    (user) => user.id !== id
                )
            )


            toast.success(
                'User deleted successfully'
            )


        } catch (error) {

            console.error('Delete User Error:', error)

            toast.error(
                'Something went wrong while deleting user'
            )

        } finally {

            setDeletingId(null)

        }

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
                    <div className="mb-4 md:mb-8">

                        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                            Manage Users
                        </h1>

                        <p className="text-xs md:text-sm mt-1 text-gray-500">
                            View and manage registered citizens
                        </p>

                    </div>


                    {/* User List Header */}
                    <div className="mb-2 md:mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold text-gray-800">
                                Citizens
                            </h2>

                            <p className="mt-1 text-xs md: text-gray-500">
                                {users.length} user
                                {users.length !== 1 ? 's' : ''}
                            </p>

                        </div>

                    </div>


                    {/* Loading State */}
                    {loading && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                            <p className="text-sm text-gray-500">
                                Loading users...
                            </p>

                        </div>

                    )}


                    {/* User Cards */}
                    {!loading && users.length > 0 && (

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
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-green-100">

                                                <img
                                                    src={user.profile_photo || userdp}
                                                    alt={user.full_name || user.username || 'User'}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = userdp
                                                    }}
                                                />

                                            </div>


                                            <div>

                                                <h3 className="text-sm md:text-lg truncate w-20 md:w-40 font-semibold text-gray-800">

                                                    {user.full_name ||
                                                        user.username
                                                    }

                                                </h3>

                                                <p className="text-xs md:text-sm text-gray-400">
                                                    @{user.username}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Delete Button */}
                                        <button
                                            onClick={() =>
                                                confirmDelete(user.id)
                                            }
                                            disabled={
                                                deletingId === user.id
                                            }
                                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >

                                            {deletingId === user.id
                                                ? 'Deleting...'
                                                : 'Delete'
                                            }

                                        </button>

                                    </div>


                                    {/* User Details */}
                                    <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

                                        {/* Email */}
                                        <div className="flex justify-between gap-4">

                                            <span className="text-xs md:text-sm text-gray-400">
                                                Email
                                            </span>

                                            <span className="text-xs md:text-sm text-gray-700 truncate w-30">
                                                {user.email || 'Not provided'}
                                            </span>

                                        </div>


                                        {/* Role */}
                                        <div className="flex justify-between gap-4">

                                            <span className="text-xs md:text-sm text-gray-400">
                                                Role
                                            </span>

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                {user.role}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* Empty State */}
                    {!loading && users.length === 0 && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                            <h3 className="text-lg font-semibold text-gray-700">
                                No users found
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                There are currently no registered citizen users.
                            </p>

                        </div>

                    )}

                </main>

            </div>

        </div>

    )
}