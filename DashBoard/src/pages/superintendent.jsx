import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-hot-toast'

export default function SuperintendentPage() {

  // ============================
  // STATES
  // ============================
  const [superintendents, setSuperintendents] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    employeeId: '',
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

      if (!accessToken) {
        toast.error('You are not logged in')
        return
      }

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


      if (!response.ok) {

        console.error('Fetch Superintendents:', data)

        toast.error(
          data.detail || 'Unable to fetch superintendents'
        )

        return
      }


      // Support both normal array and paginated response
      if (Array.isArray(data)) {

        setSuperintendents(data)

      } else if (Array.isArray(data.results)) {

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


  // ============================
  // FETCH ON PAGE LOAD
  // ============================
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

      [name]:
        name === 'employeeId'
          ? value.toUpperCase()
          : value,

    }))

  }


  // ============================
  // CREATE SUPERINTENDENT
  // ============================
  const handleSubmit = async (e) => {

    e.preventDefault()


    // Validate employee ID
    const employeeIdPattern = /^SUP\d{3}$/


    if (!employeeIdPattern.test(formData.employeeId)) {

      toast.error(
        'Employee ID must be like SUP001, SUP002, SUP003'
      )

      return

    }


    // Validate password
    if (formData.password !== formData.confirmPassword) {

      toast.error('Passwords do not match')

      return

    }


    try {

      setSubmitting(true)


      const accessToken = localStorage.getItem(
        'access_token'
      )


      if (!accessToken) {

        toast.error('You are not logged in')

        return

      }


      const response = await fetch(
        '/api/government/superintendents/create/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },

          body: JSON.stringify({

            full_name: formData.fullName,

            username: formData.username,

            email: formData.email,

            employee_id: formData.employeeId,

            password: formData.password,

            confirm_password: formData.confirmPassword,

          }),
        }
      )


      const data = await response.json()

      console.log(
        'Create Superintendent:',
        data
      )


      if (!response.ok) {

        // Employee ID error
        if (data.employee_id) {

          toast.error(
            Array.isArray(data.employee_id)
              ? data.employee_id[0]
              : data.employee_id
          )

        }

        // Username error
        else if (data.username) {

          toast.error(
            Array.isArray(data.username)
              ? data.username[0]
              : data.username
          )

        }

        // Email error
        else if (data.email) {

          toast.error(
            Array.isArray(data.email)
              ? data.email[0]
              : data.email
          )

        }

        // Password error
        else if (data.password) {

          toast.error(
            Array.isArray(data.password)
              ? data.password[0]
              : data.password
          )

        }

        // Confirm password error
        else if (data.confirm_password) {

          toast.error(
            Array.isArray(data.confirm_password)
              ? data.confirm_password[0]
              : data.confirm_password
          )

        }

        // General error
        else {

          toast.error(
            data.detail ||
            'Unable to create superintendent'
          )

        }


        return

      }


      toast.success(
        'Superintendent created successfully'
      )


      // Clear form
      // IMPORTANT:
      // Do NOT write useState here.
      // Your previous code had this error.
      setFormData({

        fullName: '',
        username: '',
        email: '',
        employeeId: '',
        password: '',
        confirmPassword: '',

      })


      // Get updated list from backend
      await fetchSuperintendents()


    } catch (error) {

      console.error(error)

      toast.error(
        'Something went wrong while creating superintendent'
      )

    } finally {

      setSubmitting(false)

    }

  }


  // ============================
  // ACTIVATE / DEACTIVATE
  // ============================
  const handleStatusChange = async (superintendent) => {

    try {

      const accessToken = localStorage.getItem(
        'access_token'
      )


      const newStatus = !superintendent.is_active


      const response = await fetch(
        `/api/government/superintendents/${superintendent.id}/status/`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            is_active: newStatus,
          }),

        }
      )


      const data = await response.json()

      console.log(
        'Status Update:',
        data
      )


      if (!response.ok) {

        toast.error(
          data.detail ||
          'Unable to update superintendent status'
        )

        return

      }


      // Update UI immediately
      setSuperintendents((previous) =>

        previous.map((item) =>

          item.id === superintendent.id

            ? {
                ...item,
                is_active: newStatus,
              }

            : item

        )

      )


      toast.success(

        newStatus

          ? 'Superintendent activated successfully'

          : 'Superintendent deactivated successfully'

      )


    } catch (error) {

      console.error(error)

      toast.error(
        'Something went wrong while updating status'
      )

    }

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
        <main className="flex-1 p-4 md:p-8">


          {/* Header */}
          <div className="mb-8">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Manage Superintendents
            </h1>

            <p className="mt-1 text-gray-500">
              Add and manage superintendents
            </p>

          </div>


          {/* Add Superintendent Form */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">

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
                  autoComplete="username"
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
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Employee ID */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="SUP001"
                  maxLength={6}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Format: SUP001, SUP002, SUP003
                </p>

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
                  autoComplete="new-password"
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
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Submit */}
              <div className="md:col-span-2 flex justify-end">

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto rounded-lg bg-green-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {submitting
                    ? 'Adding...'
                    : 'Add Superintendent'
                  }

                </button>

              </div>


            </form>

          </div>


          {/* Superintendent List Header */}
          <div className="mb-5">

            <h2 className="text-xl font-semibold text-gray-800">
              Superintendents
            </h2>

            <p className="mt-1 text-sm text-gray-500">

              {superintendents.length} superintendent
              {superintendents.length !== 1 ? 's' : ''}

            </p>

          </div>


          {/* Loading */}
          {loading && (

            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

              <p className="text-sm text-gray-500">
                Loading superintendents...
              </p>

            </div>

          )}


          {/* Superintendent Cards */}
          {!loading && superintendents.length > 0 && (

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {superintendents.map((superintendent) => (

                <div
                  key={superintendent.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
                >


                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-3">


                    <div className="flex min-w-0 items-center gap-3 md:gap-4">


                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">

                        {(
                          superintendent.full_name ||
                          superintendent.username ||
                          'S'
                        )
                          .charAt(0)
                          .toUpperCase()
                        }

                      </div>


                      {/* Name */}
                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-semibold text-gray-800 md:text-lg">

                          {superintendent.full_name ||
                            superintendent.username}

                        </h3>

                        <p className="truncate text-xs text-gray-400 md:text-sm">

                          @{superintendent.username}

                        </p>

                      </div>


                    </div>


                    {/* Activate / Deactivate */}
                    <button
                      onClick={() =>
                        handleStatusChange(superintendent)
                      }
                      className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition md:text-sm ${
                        superintendent.is_active
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >

                      {superintendent.is_active
                        ? 'Deactivate'
                        : 'Activate'}

                    </button>


                  </div>


                  {/* Details */}
                  <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">


                    {/* Status */}
                    <div className="flex justify-between gap-4">

                      <span className="text-xs text-gray-400 md:text-sm">
                        Status
                      </span>

                      <span
                        className={`text-xs font-medium md:text-sm ${
                          superintendent.is_active
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}
                      >

                        {superintendent.is_active
                          ? 'Active'
                          : 'Deactivated'}

                      </span>

                    </div>


                    {/* Employee ID */}
                    <div className="flex justify-between gap-4">

                      <span className="text-xs text-gray-400 md:text-sm">
                        Employee ID
                      </span>

                      <span className="text-xs text-gray-700 md:text-sm">
                        {superintendent.employee_id || '-'}
                      </span>

                    </div>


                    {/* Email */}
                    <div className="flex justify-between gap-4">

                      <span className="text-xs text-gray-400 md:text-sm">
                        Email
                      </span>

                      <span className="max-w-[60%] truncate text-xs text-gray-700 md:text-sm">
                        {superintendent.email}
                      </span>

                    </div>


                  </div>


                </div>

              ))}

            </div>

          )}


          {/* Empty State */}
          {!loading && superintendents.length === 0 && (

            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

              <h3 className="text-lg font-semibold text-gray-700">
                No superintendents found
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Add a new superintendent using the form above.
              </p>

            </div>

          )}


        </main>

      </div>

    </div>

  )

}