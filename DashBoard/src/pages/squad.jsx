import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import squads from '../assets/squads.json'

export default function SquadPage() {

    


    const handleDelete = (id) => {

        setSquads((previousSquads) =>
            previousSquads.filter(
                (squad) => squad.id !== id
            )
        )

    }


    return (
        <div className="min-h-screen bg-[#F5F7F5]">

            {/* Navbar */}
            <Navbar />


            {/* Body */}
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />


                {/* Main Content */}
                <main className="flex-1 p-8">

                    {/* Header */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Manage Squads
                        </h1>

                        <p className="mt-1 text-gray-500">
                            View and manage GreenSquad teams
                        </p>

                    </div>


                    {/* Squad List Header */}
                    <div className="mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold text-gray-800">
                                Squads
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {squads.length} squad
                                {squads.length !== 1 ? 's' : ''}
                            </p>

                        </div>

                    </div>


                    {/* Squad Cards */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {squads.squad.map((squad) => (

                            <div
                                key={squad.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >

                                {/* Squad Header */}
                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-4">

                                        {/* Squad DP */}
                                        <img
                                            src={squad.image}
                                            alt={squad.name}
                                            className="h-30 w-30 rounded-full object-cover border border-gray-200"
                                        />


                                        {/* Squad Name */}
                                        <div>

                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {squad.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {squad.members} Members
                                            </p>

                                        </div>

                                    </div>


                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(squad.id)}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>

                                </div>


                                {/* Squad Stats */}
                                <div className="mt-6 grid grid-cols-2 gap-4">

                                    <div className="rounded-lg bg-gray-50 p-4">

                                        <p className="text-sm text-gray-400">
                                            No. of Members
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-800">
                                            {squad.members}
                                        </p>

                                    </div>


                                    <div className="rounded-lg bg-gray-50 p-4">

                                        <p className="text-sm text-gray-400">
                                            Credit Points
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-green-600">
                                            {squad.credit_points}
                                        </p>

                                    </div>

                                </div>


                                {/* Description */}
                                <div className="mt-5 border-t border-gray-100 pt-5">

                                    <p className="mb-2 text-sm font-medium text-gray-400">
                                        Description
                                    </p>

                                    <p className="text-sm leading-6 text-gray-600">
                                        {squad.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Empty State */}
                    {squads.length === 0 && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                            <h3 className="text-lg font-semibold text-gray-700">
                                No squads found
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                There are currently no squads available.
                            </p>

                        </div>

                    )}

                </main>

            </div>

        </div>
    )
}