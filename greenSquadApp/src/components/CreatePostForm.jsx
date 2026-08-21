import React, { useState } from "react";
import toast from "react-hot-toast";
import addPost from "../assets/icon/addPost.png";
import Diamond from "../assets/icon/Diamond.png";
import { IoMdClose, IoMdSend, IoMdLocate, } from "react-icons/io";

const CreatePostForm = ({ isOpen, onClose }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [aiResult, setAiResult] = useState(null);

    const [action, setAction] = useState("");
    const [cleaningImage, setCleaningImage] = useState(null);
    const [cleaningImagePreview, setCleaningImagePreview] = useState(null);

    const [isLoading, setIsLoading] = useState(false)
    const [isLocationLoading, setIsLocationLoading] = useState(false)
    

    



    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setImageFile(file);

            setSelectedImage(URL.createObjectURL(file));

        }
    };


    const getLocation = async () => {
        try {

            const permission = await navigator.permissions.query({
                name: "geolocation",
            });

            // console.log(
            //     "Location permission:",
            //     permission.state
            // );

            if (permission.state === "denied") {

                toast.error(
                    "Location permission is denied. Please enable it in your browser settings."
                );

                return;
            }

            requestLocation();

        } catch (error) {

            console.error(
                "Permission check failed:",
                error
            );

            requestLocation();
        }
    };


    const requestLocation = () => {

        if (!navigator.geolocation) {

            toast.error(
                "Geolocation is not supported by your browser."
            );

            return;
        }
        setIsLocationLoading(true)

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                setLatitude(lat);
                setLongitude(lon);

                try {

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`
                    );

                    if (!response.ok) {
                        throw new Error(
                            "Failed to get address"
                        );
                    }

                    const data = await response.json();

                    setLocation(data.display_name);

                    toast.success(
                        "Location detected successfully."
                    );

                } catch (error) {

                console.error(error)

                toast.error(
                    "Location detected, but we couldn't find the address."
                )

            } finally {
                setIsLocationLoading(false)
            }
        },

            (error) => {

                console.error(
                    "Geolocation error:",
                    error
                );

                if (
                    error.code ===
                    error.PERMISSION_DENIED
                ) {

                    toast.error(
                        "Location permission denied. Please enable it in your browser settings."
                    );

                } else if (
                    error.code ===
                    error.POSITION_UNAVAILABLE
                ) {

                    toast.error(
                        "Your current location is unavailable."
                    );

                } else if (
                    error.code === error.TIMEOUT
                ) {

                    toast.error(
                        "Location request timed out."
                    );

                } else {

                    toast.error(
                        "Unable to get your location."
                    );
                }
            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    };



    const handleCleaningImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setCleaningImage(file);
            setCleaningImagePreview(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (e) => {

        e.preventDefault()

        const token = localStorage.getItem('access_token')

        if (!token) {
            toast.error('Please login first.')
            return
        }

        if (!imageFile) {
            toast.error('Please select a post image.')
            return
        }

        if (!description.trim()) {
            toast.error('Please enter a description.')
            return
        }

        if (!location.trim()) {
            toast.error('Please select a location.')
            return
        }

        if (!latitude || !longitude) {
            toast.error('Please detect your location.')
            return
        }

        if (!action) {
            toast.error('Please select Yes or No.')
            return
        }

        if (action === 'yes' && !cleaningImage) {
            toast.error('Please upload the cleaning photo.')
            return
        }

        try {
            setIsLoading(true)

            // Convert frontend action to backend action
            const backendAction = action === 'yes'
                ? 'self_resolve'
                : 'handover'


            //create post

            const postFormData = new FormData()

            postFormData.append('image', imageFile)
            postFormData.append('description', description)
            postFormData.append('location', location)
            postFormData.append('latitude', Number(latitude).toFixed(6))
            postFormData.append('longitude', Number(longitude).toFixed(6))
            postFormData.append('action', backendAction)


            const createResponse = await fetch(
                '/api/posts/create/',
                {
                    method: 'POST',

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                    body: postFormData,
                }
            )


            const createData = await createResponse.json()

            // console.log('Create post response:', createData)




            // make post failed



            if (!createResponse.ok) {

                console.error(
                    'Create post error:',
                    createData
                )

                if (createData.detail) {

                    toast.error(createData.detail)

                } else if (createData.action) {

                    toast.error(createData.action[0])

                } else if (createData.image) {

                    toast.error(createData.image[0])

                } else if (createData.description) {

                    toast.error(createData.description[0])

                } else if (createData.location) {

                    toast.error(createData.location[0])

                } else {

                    toast.error('Failed to create post.')

                }

                return
            }


            // if user selete no for handover

            if (action === 'no') {

                toast.success('Post created successfully!')

                onClose()
                setTimeout(() => {
                    window.location.reload()
                }, 1000)


                return
            }



            // if user selete yes for Self-resolve

            const postId = createData.id


            if (!postId) {

                console.error(
                    'Post ID missing from create response:',
                    createData
                )

                toast.error(
                    'Post created, but post ID was not returned.'
                )

                return
            }


            // upload cleaning image


            const resolveFormData = new FormData()

            resolveFormData.append('image', cleaningImage)


            const resolveResponse = await fetch(
                `/api/posts/${postId}/resolve/`,
                {
                    method: 'POST',

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                    body: resolveFormData,
                }
            )


            const resolveData = await resolveResponse.json()

            // console.log('Resolve response:', resolveData)


            // if form data not posted

            if (!resolveResponse.ok) {

                // console.error('Resolve error:',resolveData)

                if (resolveData.detail) {
                    toast.error(resolveData.detail)

                } else if (resolveData.cleaning_image) {

                    toast.error(
                        resolveData.cleaning_image[0]
                    )

                } else {

                    toast.error(
                        'Post was created, but cleaning could not be completed.'
                    )

                }

                return
            }




            // SUCCESS



            toast.success(
                'Post created and resolved successfully!'
            )

            onClose()
            setTimeout(() => {
                window.location.reload()
            }, 500)

        } catch (error) {

            // console.error('Create post error:', error)

            toast.error(
                error?.message || 'Unable to connect to the server.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            {isOpen && (
                <div className=" fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">

                    <div className=" relative max-h-[90vh] w-[92%] max-w-2xl overflow-hidden rounded-[25px] bg-white shadow-2xl ">




                        {/* Header */}

                        <div className=" flex items-center justify-between border-b border-gray-200 px-5 py-4 md:px-7">

                            <h2 className="text-xl font-extrabold text-[#249138] md:text-2xl">
                                Create a New Post
                            </h2>


                            <form>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#249138a3] hover:text-gray-100"
                                >
                                    <IoMdClose size={24} />
                                </button>



                            </form>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="max-h-[calc(90vh-70px)] p-5 md:p-7 
                            overflow-y-auto 
                            [&::-webkit-scrollbar]:w-2 
                            [&::-webkit-scrollbar-track]:my-1 
                            [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
                            [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-track]:rounded-full"
                        >

                            {/* IMAGE */}

                            <div>

                                <label className="mb-2 block text-sm font-bold text-gray-700 md:text-base">
                                    Post Image
                                </label>


                                <input
                                    type="file"
                                    id="postImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    required
                                />


                                <label
                                    htmlFor="postImage"
                                    className="relative flex h-52 w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-[#249138] bg-[#D9D9D944] transition hover:bg-[#D9D9D966] md:h-64"
                                >

                                    {selectedImage ? (

                                        <img
                                            src={selectedImage}
                                            alt="Selected post"
                                            className="h-full w-full object-cover"
                                        />

                                    ) : (

                                        <div className="flex flex-col items-center justify-center">

                                            <img
                                                src={addPost}
                                                alt="Add post"
                                                className="h-20 w-20 md:h-28 md:w-28"
                                            />

                                            <p className="mt-2 text-sm font-semibold text-[#249138]">
                                                Click to select an image
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                JPG, PNG or JPEG
                                            </p>

                                        </div>

                                    )}

                                </label>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="mt-5">

                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-bold text-gray-700 md:text-base"
                                    required
                                >
                                    Description
                                </label>


                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your activity..."
                                    rows="4"
                                    className="w-full resize-none rounded-[15px] bg-[#D9D9D944] p-3 text- outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#538E3C] md:text-base"
                                    required
                                />

                            </div>


                            {/* LOCATION */}

                            <div className="mt-5">

                                <label
                                    htmlFor="location"
                                    className="mb-2 block text-sm font-bold text-gray-700 md:text-base"
                                >
                                    Location
                                </label>


                                <div className="flex gap-2">

                                    <input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Select or enter location"
                                        className="w-full rounded-[15px] bg-[#D9D9D944] p-3 text-sm outline-none focus:ring-2 focus:ring-[#538E3C]"
                                        required
                                    />


                                    <button
                                        type="button"
                                        onClick={getLocation}
                                        className="flex min-w-12 items-center justify-center rounded-[15px] bg-[#538E3C] text-white transition hover:bg-[#467a32]"
                                        title="Use my location"
                                    >
                                        <IoMdLocate size={22} />
                                    </button>

                                </div>

                            </div>


                            {/* COORDINATES */}

                            {(latitude && longitude) && (

                                <div className="mt-3 rounded-[15px] bg-[#E6FFE1] p-3 text-sm">

                                    <p className="font-semibold text-[#249138]">
                                        Location detected
                                    </p>

                                    <p className="text-gray-600">
                                        Latitude: {latitude}
                                    </p>

                                    <p className="text-gray-600">
                                        Longitude: {longitude}
                                    </p>

                                </div>

                            )}

                            {/* ACTION */}

                            <div className="mt-5">

                                <p className="mb-3 text-sm font-bold text-gray-700 md:text-base">
                                    Action
                                </p>

                                <p className="mb-3 text-sm text-gray-600">
                                    Was the cleaning done by you?
                                </p>


                                {/* Radio buttons */}

                                <div className="flex gap-6">

                                    {/* YES */}

                                    <label className="flex cursor-pointer items-center gap-2">

                                        <input
                                            type="radio"
                                            name="action"
                                            value="yes"
                                            checked={action === "yes"}
                                            onChange={(e) => setAction(e.target.value)}
                                            className="h-5 w-5 accent-[#538E3C]"
                                        />

                                        <span className="text-sm font-semibold text-gray-700 md:text-base">
                                            Yes
                                        </span>

                                    </label>


                                    {/* NO */}

                                    <label className="flex cursor-pointer items-center gap-2">

                                        <input
                                            type="radio"
                                            name="action"
                                            value="no"
                                            checked={action === "no"}
                                            onChange={(e) => setAction(e.target.value)}
                                            className="h-5 w-5 accent-[#538E3C]"
                                        />

                                        <span className="text-sm font-semibold text-gray-700 md:text-base">
                                            No
                                        </span>

                                    </label>

                                </div>


                                {/* CLEANING IMAGE */}

                                {action === "yes" && (

                                    <div className="mt-4">

                                        <label className="mb-2 block text-sm font-bold text-gray-700 md:text-base">
                                            Upload Cleaning Photo
                                        </label>


                                        <input
                                            type="file"
                                            id="cleaningImage"
                                            accept="image/*"
                                            onChange={handleCleaningImageChange}
                                            required={action === "yes"}
                                            className="hidden"
                                        />


                                        <label
                                            htmlFor="cleaningImage"
                                            className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-[20px] border-2 border-dashed border-[#249138] bg-[#D9D9D944] transition hover:bg-[#D9D9D966] md:h-48"
                                        >

                                            {cleaningImagePreview ? (

                                                <img
                                                    src={cleaningImagePreview}
                                                    alt="Cleaning proof"
                                                    className="h-full w-full object-cover"
                                                />

                                            ) : (

                                                <div className="text-center">

                                                    <p className="text-sm font-semibold text-[#249138] md:text-base">
                                                        Click to upload cleaning photo
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        JPG, PNG or JPEG
                                                    </p>

                                                </div>

                                            )}

                                        </label>

                                    </div>

                                )}

                            </div>


                            {/* AI RESULT */}

                            {aiResult && (

                                <div className="mt-5 rounded-[15px] bg-[#E6FFE1] p-4">

                                    <h3 className="font-bold text-[#249138]">
                                        AI Analysis
                                    </h3>

                                    {/* AI generated information will appear here */}

                                </div>
                            )}


                            {/* SUBMIT */}

                            <div className="mt-6 flex justify-end">

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#538E3C] px-5 py-2.5 font-bold text-white transition hover:bg-[#467a32] md:px-7 md:py-3"
                                >

                                    Post

                                    <IoMdSend size={20} />

                                </button>

                            </div>

                        </form>

                        {/* loading interface */}

                        {isLoading && (

                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[30px] bg-white/90 backdrop-blur-sm">

                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#249138] border-t-transparent"></div>

                                <p className="mt-4 font-bold text-[#249138]">
                                    Processing your post...
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Please wait
                                </p>

                            </div>

                        )}
                        {isLocationLoading && (

                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[30px] bg-white/90 backdrop-blur-sm">

                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#249138] border-t-transparent"></div>

                                <p className="mt-4 font-bold text-[#249138]">
                                    Fetching your location...
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Please wait
                                </p>

                            </div>

                        )}

                    </div>
                </div>
            )
            }
        </>
    );
};

export default CreatePostForm;

