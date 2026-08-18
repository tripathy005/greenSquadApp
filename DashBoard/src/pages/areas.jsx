import React, { useEffect, useState } from 'react'
import NaNavbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-hot-toast'

export default function AreasPage() {

    const [areas, setAreas] = useState([])
    const [superintendents, setSuperintendents] = useState([])

    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [assigningId, setAssigningId] = useState(null)

    const [areaForm, setAreaForm] = useState({
        name: '',
        latitude: '',
        longitude: '',
    })

    const [selectedAreas, setSelectedAreas] = useState({})


    // ============================
    // GET ACCESS TOKEN
    // ============================
    const getHeaders = () => {

        const accessToken = localStorage.getItem(
            'access_token'
        )

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    }


    // ============================
    // GET ALL AREAS
    // ============================
    const fetchAreas = async () => {

        try {

            const response = await fetch(
                '/api/areas/',
                {
                    method: 'GET',
                    headers: getHeaders(),
                }
            )

            const data = await response.json()

            if (!response.ok) {

                throw new Error(
                    data.detail || 'Unable to fetch areas'
                )

            }

            const areaList = Array.isArray(data)
                ? data
                : data.results || []

            setAreas(areaList)

        } catch (error) {

            console.error('Fetch Areas Error:', error)

            toast.error(
                error.message || 'Unable to fetch areas'
            )

        }

    }


    // ============================
    // GET SUPERINTENDENTS
    // WITH ALLOCATED AREAS
    // ============================
    const fetchSuperintendents = async () => {

        try {

            const response = await fetch(
                '/api/government/superintendents/',
                {
                    method: 'GET',
                    headers: getHeaders(),
                }
            )

            const data = await response.json()

            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    'Unable to fetch superintendents'
                )

            }

            const superintendentList = Array.isArray(data)
                ? data
                : data.results || []

            setSuperintendents(superintendentList)

        } catch (error) {

            console.error(
                'Fetch Superintendents Error:',
                error
            )

            toast.error(
                error.message ||
                'Unable to fetch superintendents'
            )

        }

    }


    // ============================
    // INITIAL DATA LOAD
    // ============================
    const fetchPageData = async () => {

        try {

            setLoading(true)

            await Promise.all([
                fetchAreas(),
                fetchSuperintendents(),
            ])

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        fetchPageData()

    }, [])


    // ============================
    // AREA FORM CHANGE
    // ============================
    const handleAreaChange = (e) => {

        const { name, value } = e.target

        setAreaForm((previous) => ({
            ...previous,
            [name]: value,
        }))

    }


    // ============================
    // CREATE NEW AREA
    // ============================
    const handleCreateArea = async (e) => {

        e.preventDefault()

        try {

            setCreating(true)

            const response = await fetch(
                '/api/areas/create/',
                {
                    method: 'POST',
                    headers: getHeaders(),

                    body: JSON.stringify({
                        name: areaForm.name.trim(),
                        latitude: Number(areaForm.latitude),
                        longitude: Number(areaForm.longitude),
                    }),
                }
            )


            const data = await response.json()


            if (!response.ok) {

                if (data.name) {

                    toast.error(
                        Array.isArray(data.name)
                            ? data.name[0]
                            : data.name
                    )

                } else if (data.latitude) {

                    toast.error(
                        Array.isArray(data.latitude)
                            ? data.latitude[0]
                            : data.latitude
                    )

                } else if (data.longitude) {

                    toast.error(
                        Array.isArray(data.longitude)
                            ? data.longitude[0]
                            : data.longitude
                    )

                } else {

                    toast.error(
                        data.detail ||
                        'Unable to create area'
                    )

                }

                return

            }


            toast.success(
                'Area created successfully'
            )


            // Clear form
            setAreaForm({
                name: '',
                latitude: '',
                longitude: '',
            })


            // Fetch latest areas
            await fetchAreas()

        } catch (error) {

            console.error(
                'Create Area Error:',
                error
            )

            toast.error(
                'Something went wrong while creating area'
            )

        } finally {

            setCreating(false)

        }

    }


    // ============================
    // SELECT AREA FOR A
    // SUPERINTENDENT
    // ============================
    const handleAreaSelect = (
        superintendentId,
        areaId
    ) => {

        setSelectedAreas((previous) => ({
            ...previous,

            [superintendentId]: areaId,
        }))

    }


    // ============================
    // ASSIGN AREA TO
    // SUPERINTENDENT
    // ============================
    const handleAssignArea = async (superintendentId, areaId) => {

    if (!areaId) {
        toast.error('Please select an area')
        return
    }

    try {

        setAssigningId(superintendentId)

        const accessToken = localStorage.getItem('access_token')


        // Find the current superintendent
        const superintendent = superintendents.find(
            (item) => item.id === superintendentId
        )


        // Get all currently allocated area IDs
        const currentAreaIds =
            superintendent?.areas?.map(
                (area) => area.id
            ) || []


        // Add the newly selected area
        const updatedAreaIds = [
            ...currentAreaIds,
            Number(areaId),
        ]


        const response = await fetch(
            `/api/government/superintendents/${superintendentId}/areas/`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },

                body: JSON.stringify({
                    area_ids: updatedAreaIds,
                }),
            }
        )


        const data = await response.json()



        if (!response.ok) {

            console.error(
                'Area assignment failed:',
                data
            )

            toast.error(
                data.detail ||
                data.area_ids?.[0] ||
                'Unable to assign area'
            )

            return
        }


        toast.success(
            'Area assigned successfully'
        )


        // Clear selected area
        setSelectedAreas((previous) => {

            const updated = {
                ...previous
            }

            delete updated[superintendentId]

            return updated

        })


        // Fetch updated superintendent data
        await fetchSuperintendents()


    } catch (error) {

        console.error(
            'Area assignment error:',
            error
        )

        toast.error(
            'Something went wrong while assigning area'
        )

    } finally {

        setAssigningId(null)

    }

}


    return (

        <div className="min-h-screen bg-[#F5F7F5]">

            <NaNavbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-4 md:p-8">

                    {/* ========================
                        HEADER
                    ========================= */}
                    <div className="mb-6 md:mb-8">

                        <h1 className="text-xl font-bold text-gray-800 md:text-3xl">
                            Manage Areas
                        </h1>

                        <p className="mt-1 text-xs text-gray-500 md:text-sm">
                            Create areas and allocate them to superintendents
                        </p>

                    </div>


                    {/* ========================
                        CREATE AREA FORM
                    ========================= */}
                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">

                        <h2 className="mb-5 text-lg font-semibold text-gray-800 md:text-xl">
                            Add New Area
                        </h2>


                        <form
                            onSubmit={handleCreateArea}
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
                        >

                            {/* Area Name */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Area Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={areaForm.name}
                                    onChange={handleAreaChange}
                                    placeholder="Area Name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                            </div>


                            {/* Latitude */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Latitude
                                </label>

                                <input
                                    type="number"
                                    name="latitude"
                                    value={areaForm.latitude}
                                    onChange={handleAreaChange}
                                    placeholder="00.00000000"
                                    step="any"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                            </div>


                            {/* Longitude */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Longitude
                                </label>

                                <input
                                    type="number"
                                    name="longitude"
                                    value={areaForm.longitude}
                                    onChange={handleAreaChange}
                                    placeholder="00.00000000"
                                    step="any"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                            </div>


                            {/* Create Button */}
                            <div className="flex items-end">

                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {creating
                                        ? 'Adding...'
                                        : 'Add Area'
                                    }

                                </button>

                            </div>

                        </form>

                    </div>


                    {/* ========================
                        ALL ADDED AREAS
                    ========================= */}
                    <div className="mb-8">

                        <h2 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
                            Available Areas ({areas.length})
                        </h2>


                        {areas.length === 0 ? (

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
                                No areas have been added yet.
                            </div>

                        ) : (

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                                {areas.map((area) => (

                                    <div
                                        key={area.id}
                                        className="rounded-xl border border-gray-200 bg-white p-5"
                                    >

                                        <h3 className="font-semibold text-gray-800">
                                            {area.name}
                                        </h3>

                                        <div className="mt-3 space-y-1 text-sm text-gray-500">

                                            <p>
                                                Latitude: {area.latitude}
                                            </p>

                                            <p>
                                                Longitude: {area.longitude}
                                            </p>

                                            <p>
                                                Radius: {area.radius} m
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* ========================
                        SUPERINTENDENT AREAS
                    ========================= */}
                    <div>

                        <div className="mb-5">

                            <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                                Superintendent Area Allocation
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 md:text-sm">
                                Assign available areas to each superintendent
                            </p>

                        </div>


                        {/* Loading */}
                        {loading && (

                            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                                <p className="text-sm text-gray-500">
                                    Loading data...
                                </p>

                            </div>

                        )}


                        {/* Superintendent Cards */}
                        {!loading &&
                            superintendents.length > 0 && (

                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                                    {superintendents.map(
                                        (superintendent) => (

                                            <div
                                                key={superintendent.id}
                                                className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
                                            >

                                                {/* Name */}
                                                <div className="mb-5">

                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {superintendent.full_name ||
                                                            superintendent.username}
                                                    </h3>

                                                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">

                                                        <span>
                                                            @{superintendent.username}
                                                        </span>

                                                        {superintendent.employee_id && (

                                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                                                {superintendent.employee_id}
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>


                                                {/* Currently Allocated Areas */}
                                                <div className="border-t border-gray-100 pt-4">

                                                    <p className="mb-3 text-sm font-medium text-gray-700">
                                                        Allocated Areas
                                                    </p>


                                                    {superintendent.areas &&
                                                        superintendent.areas.length > 0 ? (

                                                        <div className="flex flex-wrap gap-2">

                                                            {superintendent.areas.map(
                                                                (area) => (

                                                                    <span
                                                                        key={area.id}
                                                                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                                                    >
                                                                        {area.name}
                                                                    </span>

                                                                )
                                                            )}

                                                        </div>

                                                    ) : (

                                                        <p className="text-sm text-gray-400">
                                                            No areas allocated
                                                        </p>

                                                    )}

                                                </div>


                                                {/* Assign New Area */}
                                                <div className="mt-5 border-t border-gray-100 pt-4">

                                                    <p className="mb-3 text-sm font-medium text-gray-700">
                                                        Assign New Area
                                                    </p>


                                                    <div className="flex flex-col gap-3 sm:flex-row">

                                                        <select
                                                            value={
                                                                selectedAreas[
                                                                superintendent.id
                                                                ] || ''
                                                            }
                                                            onChange={(e) =>
                                                                handleAreaSelect(
                                                                    superintendent.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                                        >

                                                            <option value="">
                                                                Select an area
                                                            </option>


                                                            {areas.map((area) => {

                                                                const alreadyAllocated =
                                                                    superintendent.areas?.some(
                                                                        (allocatedArea) =>
                                                                            allocatedArea.id ===
                                                                            area.id
                                                                    )

                                                                return (

                                                                    <option
                                                                        key={area.id}
                                                                        value={area.id}
                                                                        disabled={alreadyAllocated}
                                                                    >
                                                                        {area.name}
                                                                        {alreadyAllocated
                                                                            ? ' (Already allocated)'
                                                                            : ''
                                                                        }
                                                                    </option>

                                                                )

                                                            })}

                                                        </select>


                                                        <button
                                                            onClick={() =>
                                                                handleAssignArea(
                                                                    superintendent.id,
                                                                    selectedAreas[superintendent.id]
                                                                )
                                                            }
                                                            disabled={
                                                                assigningId === superintendent.id ||
                                                                !selectedAreas[superintendent.id]
                                                            }
                                                            className="rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {assigningId === superintendent.id
                                                                ? 'Assigning...'
                                                                : 'Assign'
                                                            }
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}


                        {/* Empty Superintendent State */}
                        {!loading &&
                            superintendents.length === 0 && (

                                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                                    <h3 className="font-semibold text-gray-700">
                                        No superintendents found
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Create a superintendent before allocating areas.
                                    </p>

                                </div>

                            )}

                    </div>

                </main>

            </div>

        </div>

    )
}