import React, { useState } from 'react'
import NaNavbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function SuperintendentPage() {

  const [superintendents, setSuperintendents] = useState([
    {
      id: 1,
      fullName: 'Rajesh Kumar',
      username: 'rajesh_kumar',
      email: 'rajesh@example.com',
    },
    {
      id: 2,
      fullName: 'Priya Sharma',
      username: 'priya_sharma',
      email: 'priya@example.com',
    },
    {
      id: 3,
      fullName: 'Amit Das',
      username: 'amit_das',
      email: 'amit@example.com',
    },
  ])


  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  // ============================
  // GET ALL SUPERINTENDENTS
  // ============================
  const fetchSuperintendents = async () => {

    try {

      setLoading(true)

      const accessToken = localStorage.getItem('access_token')

      // console.log('Access Token:', accessToken)

      const response = await fetch(
        '/api/government/superintendents/',
        {
          method: 'GET',

          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      )


      const data = await response.json()

      console.log('Response Status:', response.status)
      console.log('Superintendents:', data)


      if (!response.ok) {

        toast.error(
          data.detail || 'Unable to fetch superintendents'
        )

        return
      }




      if (Array.isArray(data)) {

        setSuperintendents(data)

      } else if (data.results) {

        setSuperintendents(data.results)

      } else {

        setSuperintendents([])

      }


    } catch (error) {

      console.error(error)

      toast.error(
        'Something went wrong while fetching superintendents'
      )

    } finally {

      setLoading(false)

    }

  }


  // Fetch data when page loads
  useEffect(() => {

    fetchSuperintendents()

  }, [])



  // ============================
  // HANDLE FORM INPUT
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    const newSuperintendent = {
      id: Date.now(),
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
    }

    setSuperintendents((previous) => [
      ...previous,
      newSuperintendent,
    ])

    setFormData({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }


  const handleDelete = (id) => {

    setSuperintendents((previous) =>
      previous.filter(
        (superintendent) => superintendent.id !== id
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
              Manage Superintendents
            </h1>

            <p className="mt-1 text-gray-500">
              Add and manage superintendents
            </p>

          </div>


          {/* Add Superintendent */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Add New Superintendent
            </h2>


            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >

              {/* Full Name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Username */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Confirm Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Submit */}
              <div className="flex items-end">

                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Add Superintendent
                </button>

              </div>

            </form>

          </div>


          {/* Superintendent List */}
          <div>

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Superintendents
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {superintendents.length} superintendent
                  {superintendents.length !== 1 ? 's' : ''}
                </p>

              </div>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {superintendents.map((superintendent) => (

                <div
                  key={superintendent.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between">

                    {/* Top */}
                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-2 md:gap-4">

                        {/* Avatar */}
                        <div className="leading-4 p-4 md:p-5 rounded-full bg-green-100 text-lg font-semibold text-green-700">

                          {(
                            superintendent.full_name ||
                            superintendent.username ||
                            'S'
                          )
                            .charAt(0)
                            .toUpperCase()
                          }

                        </div>


                        <div>

                          <h3 className="text-sm md:text-lg truncate w-20 md:w-40 font-semibold text-gray-800">

                            {superintendent.full_name ||
                              superintendent.username
                            }

                          </h3>

                          <p className="text-xs md:text-sm text-gray-400">
                            @{superintendent.username}
                          </p>

                        </div>

                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
                        {superintendent.fullName.charAt(0).toUpperCase()}
                      </div>

                      {/* Activate / Deactivate */}
                      <button
                        onClick={() => handleStatusChange(superintendent)}
                        className={`rounded-lg px-3 py-2 text-xs md:text-sm font-medium transition ${superintendent.is_active
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                          }`}
                      >
                        {superintendent.is_active
                          ? 'Deactivate'
                          : 'Activate'
                        }
                      </button>

                    </div>


                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(superintendent.id)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                        <span className="text-xs md:text-sm text-gray-400">
                          Status
                        </span>

                        <span
                          className={`text-xs md:text-sm font-medium ${superintendent.is_active
                              ? 'text-green-600'
                              : 'text-red-500'
                            }`}
                        >
                          {superintendent.is_active
                            ? 'Active'
                            : 'Deactivated'
                          }
                        </span>

                    <div className="flex justify-between gap-4">

                        <span className="text-xs md:text-sm text-gray-400">
                          Employee Id
                        </span>

                        <span className="text-xs md:text-sm text-gray-700">
                          {superintendent.employee_id}
                        </span>

                      </div>
                      <div className="flex justify-between gap-4">

                        <span className="text-xs md:text-sm text-gray-400">
                          Email
                        </span>

                        <span className="text-xs md:text-sm text-gray-700 truncate w-30">
                          {superintendent.email}
                        </span>

                      </div>

                      <span className="text-sm text-gray-700">
                        {superintendent.email}
                      </span>

                    </div>

                  

                </div>

              ))}

            </div>


            {/* Empty State */}
            {superintendents.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                <h3 className="text-lg font-semibold text-gray-700">
                  No superintendents found
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Add a new superintendent using the form above.
                </p>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  )
}