import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function HomePage() {

  const [issues, setIssues] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807',
      location: 'Bhubaneswar, Odisha',
      latitude: '20.2961',
      longitude: '85.8245',
      postedAt: '11 Aug 2026, 10:30 AM',
      garbageType: 'Plastic Waste',
      garbageVolume: 'Large',
      solved: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
      location: 'Cuttack, Odisha',
      latitude: '20.4625',
      longitude: '85.8830',
      postedAt: '11 Aug 2026, 09:15 AM',
      garbageType: 'Organic Waste',
      garbageVolume: 'Medium',
      solved: false,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41',
      location: 'Puri, Odisha',
      latitude: '19.8135',
      longitude: '85.8312',
      postedAt: '10 Aug 2026, 05:45 PM',
      garbageType: 'E-Waste',
      garbageVolume: 'Small',
      solved: true,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40',
      location: 'Rourkela, Odisha',
      latitude: '22.2604',
      longitude: '84.8536',
      postedAt: '10 Aug 2026, 02:20 PM',
      garbageType: 'Mixed Waste',
      garbageVolume: 'Large',
      solved: false,
    },
  ])


  const [filter, setFilter] = useState('all')


  const handleSolve = (id) => {

    setIssues((previousIssues) =>
      previousIssues.map((issue) =>
        issue.id === id
          ? { ...issue, solved: true }
          : issue
      )
    )

  }


  const filteredIssues = issues.filter((issue) => {

    if (filter === 'solved') {
      return issue.solved
    }

    if (filter === 'unsolved') {
      return !issue.solved
    }

    return true
  })


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
              Issues
            </h1>

            <p className="mt-1 text-gray-500">
              View and manage reported waste issues
            </p>

          </div>


          {/* Filters */}
          <div className="mb-6 flex gap-3">

            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Issues
            </button>


            <button
              onClick={() => setFilter('unsolved')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'unsolved'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Unsolved
            </button>


            <button
              onClick={() => setFilter('solved')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'solved'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Solved
            </button>

          </div>


          {/* Issues Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {filteredIssues.map((issue) => (

              <div
                key={issue.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                {/* Image */}
                <div className="h-56 w-full overflow-hidden">

                  <img
                    src={issue.image}
                    alt={issue.garbageType}
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* Card Content */}
                <div className="p-6">

                  {/* Garbage Type + Status */}
                  <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-xl font-semibold text-gray-800">
                      {issue.garbageType}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        issue.solved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {issue.solved ? 'Solved' : 'Unsolved'}
                    </span>

                  </div>


                  {/* Information */}
                  <div className="space-y-3">

                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Location
                      </p>

                      <p className="text-sm text-gray-700">
                        {issue.location}
                      </p>
                    </div>


                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Latitude
                        </p>

                        <p className="text-sm text-gray-700">
                          {issue.latitude}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Longitude
                        </p>

                        <p className="text-sm text-gray-700">
                          {issue.longitude}
                        </p>
                      </div>

                    </div>


                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Posted At
                        </p>

                        <p className="text-sm text-gray-700">
                          {issue.postedAt}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Garbage Volume
                        </p>

                        <p className="text-sm text-gray-700">
                          {issue.garbageVolume}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Solve Button */}
                  <div className="mt-6">

                    <button
                      onClick={() => handleSolve(issue.id)}
                      disabled={issue.solved}
                      className={`w-full rounded-lg py-3 text-sm font-medium transition ${
                        issue.solved
                          ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {issue.solved
                        ? 'Issue Solved'
                        : 'Make it Solved'}
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* No Issues */}
          {filteredIssues.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">

              <div className="text-center">

                <h2 className="text-lg font-semibold text-gray-700">
                  No issues found
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  There are no issues in this category.
                </p>

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  )
}