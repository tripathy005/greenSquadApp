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

                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
                        {superintendent.fullName.charAt(0).toUpperCase()}
                      </div>


                      <div>

                        <h3 className="text-lg font-semibold text-gray-800">
                          {superintendent.fullName}
                        </h3>

                        <p className="text-sm text-gray-400">
                          @{superintendent.username}
                        </p>

                      </div>

                    </div>


                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(superintendent.id)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>


                  {/* Details */}
                  <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-gray-400">
                        Email
                      </span>

                      <span className="text-sm text-gray-700">
                        {superintendent.email}
                      </span>

                    </div>

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