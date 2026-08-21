import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider.jsx'


export default function HomePage() {

  const [
    authUser,
    setAuthUser,
    userRole
  ] = useAuth()


  
  const [issues, setIssues] = useState([])

  const [loading, setLoading] = useState(true)

  
  const [selectedIssue, setSelectedIssue] = useState(null)

  const [cleanupImage, setCleanupImage] = useState(null)

  const [submitting, setSubmitting] = useState(false)


  
  const fetchIssues = async () => {

    try {

      setLoading(true)


      const accessToken = localStorage.getItem(
        'access_token'
      )


      
      const apiUrl =
        userRole?.toLowerCase() === 'admin'
          ? '/api/government/admin/posts/'
          : '/api/government/posts/'


      const response = await fetch(
        apiUrl,
        {
          method: 'GET',

          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      )


      const data = await response.json()


      


      if (!response.ok) {

        toast.error(
          data.detail || 'Unable to fetch issues'
        )

        return
      }


      
      if (Array.isArray(data)) {

        setIssues(data)

      } else if (data.results) {

        setIssues(data.results)

      } else {

        setIssues([])

      }


    } catch (error) {

      console.error(
        'Fetch Issues Error:',
        error
      )

      toast.error(
        'Something went wrong while fetching issues'
      )

    } finally {

      setLoading(false)

    }

  }


  
  useEffect(() => {

    if (userRole) {

      fetchIssues()

    }

  }, [userRole])


  
  const openCleanupModal = (issue) => {

    setSelectedIssue(issue)

    setCleanupImage(null)

  }


 
  const closeCleanupModal = () => {

    if (submitting) {
      return
    }

    setSelectedIssue(null)

    setCleanupImage(null)

  }


  
  const handleSolve = async () => {

    if (!selectedIssue) {
      return
    }


    if (!cleanupImage) {

      toast.error(
        'Please select a cleanup image'
      )

      return

    }


    try {

      setSubmitting(true)


      const accessToken = localStorage.getItem(
        'access_token'
      )


      
      const formData = new FormData()



      formData.append('image', cleanupImage)


      const response = await fetch(
        `/api/government/posts/${selectedIssue.id}/cleanup/`,
        {
          method: 'POST',

          headers: {



            'Authorization': `Bearer ${accessToken}`,
          },

          body: formData,
        }
      )


      const data = await response.json()


      console.log(
        'Cleanup Response:',
        data
      )


      if (!response.ok) {

        toast.error(
          data.detail ||
          'Unable to mark this issue as solved'
        )

        return

      }


      toast.success(
        'Issue marked as solved successfully'
      )


      setSelectedIssue(null)

      setCleanupImage(null)


      
      await fetchIssues()


    } catch (error) {

      console.error(
        'Cleanup Error:',
        error
      )

      toast.error(
        'Something went wrong while submitting cleanup'
      )

    } finally {

      setSubmitting(false)

    }

  }


  
  const formatDate = (date) => {

    if (!date) {
      return 'Not available'
    }


    try {

      return new Date(date).toLocaleString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      )

    } catch {

      return date

    }

  }


  return (

    <div className="min-h-screen bg-[#F5F7F5]">


      {/* NAVBAR*/}

      <Navbar />


      {/* BODY*/}

      <div className="flex">


        <Sidebar />


        <main className="flex-1 p-4 md:p-8">


          {/* HEADER*/}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Issues
            </h1>

            <p className="mt-1 text-gray-500">
              View and manage reported waste issues
            </p>

          </div>


          {/*FILTERS*/}

          {/* <div className="mb-6 flex flex-wrap gap-3">


            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Issues
            </button>


            <button
              onClick={() => setFilter('unsolved')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'unsolved'
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Unsolved
            </button>


            <button
              onClick={() => setFilter('solved')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                filter === 'solved'
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Solved
            </button>


          </div> */}


          {/* LOADING*/}

          {loading && (

            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

              <p className="text-sm text-gray-500">
                Loading issues...
              </p>

            </div>

          )}


          {/* ISSUE CARDS*/}

          {!loading && issues.length > 0 && (

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


              {issues.map((issue) => {


                const isSolved =
                  issue.is_resolved ??
                  issue.solved ??
                  false


              const issueImage =
                  issue.image ||
                  issue.media?.[0]?.image ||
                  issue.post_media?.[0]?.image ||
                  null


                const garbageType =
                  issue.garbage_type ||
                  issue.waste_type ||
                  'Waste Issue'


                const garbageVolume =
                  issue.garbage_volume ||
                  issue.volume ||
                  'Not specified'


                return (

                  <div
                    key={issue.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >


                    {/* IMAGE */}

                    <div className="h-56 w-full overflow-hidden bg-gray-100">


                      {issueImage ? (

                        <img
                          src={issueImage}
                          alt={garbageType}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-sm text-gray-400">

                          No image available

                        </div>

                      )}


                    </div>


                    {/* CONTENT */}

                    <div className="p-6">


                      {/* TITLE + STATUS */}

                      <div className="mb-5 flex items-center justify-between gap-4">


                        <h2 className="text-xl font-semibold text-gray-800">

                          {garbageType}

                        </h2>


                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${isSolved
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                            }`}
                        >

                          {isSolved
                            ? 'Solved'
                            : 'Unsolved'}

                        </span>


                      </div>


                      {/* INFORMATION */}

                      <div className="space-y-4">


                        {/* LOCATION */}

                        <div>

                          <p className="text-xs font-medium text-gray-400">
                            Location
                          </p>

                          <p className="text-sm text-gray-700">

                            {issue.location ||
                              'Not available'}

                          </p>

                        </div>
                        <div>

                          <p className="text-xs font-medium text-gray-400">
                            Area
                          </p>

                          
                          <p className="text-sm text-gray-700">

                            {issue.area.id ||'Not available'}. {issue.area.name ||'Not available'}

                          </p>

                        </div>


                        {/* LATITUDE + LONGITUDE */}

                        <div className="grid grid-cols-2 gap-4">


                          <div>

                            <p className="text-xs font-medium text-gray-400">
                              Latitude
                            </p>

                            <p className="text-sm text-gray-700">

                              {issue.latitude ||
                                'Not available'}

                            </p>

                          </div>


                          <div>

                            <p className="text-xs font-medium text-gray-400">
                              Longitude
                            </p>

                            <p className="text-sm text-gray-700">

                              {issue.longitude ||
                                'Not available'}

                            </p>

                          </div>


                        </div>


                        {/* DATE + VOLUME */}

                        <div className="grid grid-cols-2 gap-4">


                          <div>

                            <p className="text-xs font-medium text-gray-400">
                              Posted At
                            </p>

                            <p className="text-sm text-gray-700">

                              {formatDate(
                                issue.posted_at ||
                                issue.created_at
                              )}

                            </p>

                          </div>


                          <div>

                            <p className="text-xs font-medium text-gray-400">
                              Garbage Volume
                            </p>

                            <p className="text-sm text-gray-700">

                              {issue.waste_volume}

                            </p>

                          </div>


                        </div>


                      </div>


                      {/*SOLVE BUTTON*/}

                      <div className="mt-6">


                        <button
                          onClick={() =>
                            openCleanupModal(issue)
                          }
                          disabled={isSolved}
                          className={`w-full rounded-lg py-3 text-sm font-medium transition ${isSolved
                              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                              : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >

                          {isSolved
                            ? 'Issue Solved'
                            : 'Make it Solved'}

                        </button>


                      </div>


                    </div>


                  </div>

                )

              })}


            </div>

          )}


          {/* EMPTY STATE*/}

          {!loading && issues.length === 0 && (

            <div className="flex min-h-75 items-center justify-center rounded-2xl border border-gray-200 bg-white">


              <div className="text-center">

                <h2 className="text-lg font-semibold text-gray-700">
                  No issues found
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  There are no issues for your
                </p>

              </div>


            </div>

          )}


        </main>


      </div>


      {/* CLEANUP MODAL*/}

      {selectedIssue && (

        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
          onClick={closeCleanupModal}
        >


          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >


            {/* MODAL HEADER */}

            <div className="mb-6">


              <h2 className="text-xl font-bold text-gray-800">
                Mark Issue as Solved
              </h2>


              <p className="mt-1 text-sm text-gray-500">

                Upload an image showing that the waste has
                been cleaned successfully.

              </p>


            </div>


            {/* SELECTED ISSUE */}

            <div className="mb-5 rounded-xl bg-green-50 p-4">


              <p className="text-xs font-medium text-gray-400">
                Selected Issue
              </p>


              <p className="mt-1 font-medium text-gray-800">

                {selectedIssue.location ||
                  `Issue #${selectedIssue.id}`}

              </p>


            </div>


            {/* IMAGE INPUT */}

            <div className="mb-6">


              <label className="mb-2 block text-sm font-medium text-gray-700">

                Cleanup Image

              </label>


              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0]

                  setCleanupImage(
                    file || null
                  )

                }}
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-green-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-green-700 hover:file:bg-green-200"
              />


              {cleanupImage && (

                <p className="mt-2 text-sm text-green-600">

                  Selected: {cleanupImage.name}

                </p>

              )}


            </div>


            {/* BUTTONS */}

            <div className="flex gap-3">


              <button
                type="button"
                onClick={closeCleanupModal}
                disabled={submitting}
                className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >

                Cancel

              </button>


              <button
                type="button"
                onClick={handleSolve}
                disabled={submitting || !cleanupImage}
                className="flex-1 rounded-lg bg-green-600 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {submitting
                  ? 'Submitting...'
                  : 'Confirm Solved'}

              </button>


            </div>


          </div>


        </div>

      )}


    </div>

  )

}