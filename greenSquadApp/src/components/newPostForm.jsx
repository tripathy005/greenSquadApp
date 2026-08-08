import React, { useState } from "react";
import addPost from "../assets/icon/addPost.png";
import Diamond from "../assets/icon/Diamond.png";
import {
    IoMdClose,
    IoMdSend,
    IoMdLocate,
} from "react-icons/io";

const NewPostForm = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");
    const [showLocationHelp, setShowLocationHelp] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [aiResult, setAiResult] = useState(null);



    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setImageFile(file);

            setSelectedImage(
                URL.createObjectURL(file)
            );

        }
    };


    const getLocation = async () => {
        try {
            // Check current permission status
            const permission = await navigator.permissions.query({
                name: "geolocation",
            });

            console.log("Location permission:", permission.state);

            if (permission.state === "denied") {
                showLocationPermissionMessage();
                return;
            }

            // Permission is either "prompt" or "granted"
            requestLocation();

        } catch (error) {
            console.error("Permission check failed:", error);

            // Fallback
            requestLocation();
        }
    };

    const requestLocation = () => {

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

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
                        throw new Error("Failed to get address");
                    }

                    const data = await response.json();

                    setLocation(data.display_name);

                } catch (error) {

                    console.error(error);

                    alert(
                        "Location detected, but we couldn't find the address."
                    );
                }
            },

            (error) => {

                console.error("Geolocation error:", error);

                if (error.code === error.PERMISSION_DENIED) {
                    showLocationPermissionMessage();
                }

                else if (error.code === error.POSITION_UNAVAILABLE) {
                    alert("Your current location is unavailable.");
                }

                else if (error.code === error.TIMEOUT) {
                    alert("Location request timed out.");
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    };

    const showLocationPermissionMessage = () => {
        setShowLocationHelp(true);
    };

    {
        showLocationHelp && (

            <div className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-black/50
        p-5
    ">

                <div className="
            w-full
            max-w-md
            rounded-[25px]
            bg-white
            p-6
            shadow-2xl
        ">

                    <h2 className="
                text-xl
                font-extrabold
                text-[#249138]
            ">
                        Location Permission Required
                    </h2>

                    <p className="
                mt-3
                text-sm
                leading-6
                text-gray-700
            ">
                        GreenSquad needs your location to automatically
                        add the location of your activity to your post.
                    </p>

                    <div className="
                mt-4
                rounded-[15px]
                bg-[#E6FFE1]
                p-4
            ">

                        <p className="font-bold text-[#249138]">
                            How to allow location
                        </p>

                        <p className="mt-2 text-sm text-gray-700">
                            Open your browser's site permissions and
                            change Location from "Don't allow" to
                            "Allow".
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => setShowLocationHelp(false)}
                        className="
                    mt-5
                    w-full
                    rounded-xl
                    bg-[#538E3C]
                    py-3
                    font-bold
                    text-white
                    hover:bg-[#467a32]
                "
                    >
                        Okay
                    </button>

                </div>

            </div>

        )
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const postData = {
            image: imageFile,
            description: description,
            location: location,
            latitude: latitude,
            longitude: longitude,
        };

        console.log("Post data:", postData);

        /*
            Later this will be sent to Django:

            const formData = new FormData();

            formData.append("image", imageFile);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);

            axios.post("/api/posts/", formData);
        */
    };


    return (

        <dialog
            id="my_modal_3"
            className="
                fixed
                left-1/2
                top-1/2
                m-0
                -translate-x-1/2
                -translate-y-1/2
                w-[92%]
                max-w-2xl
                max-h-[90vh]
                rounded-[25px]
                border-none
                bg-white
                p-0
                shadow-2xl
                backdrop:bg-black/50
            "
        >

            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-5
                py-4
                md:px-7
            ">

                <h2 className="
                    text-xl
                    font-extrabold
                    text-[#249138]
                    md:text-2xl
                ">
                    Create a New Post
                </h2>


                <form method="dialog">

                    <button
                        type="submit"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-gray-500
                            transition
                            hover:bg-gray-100
                            hover:text-red-500
                        "
                    >
                        <IoMdClose size={24} />
                    </button>

                </form>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="max-h-[calc(90vh-70px)] overflow-y-auto p-5 md:p-7"
            >

                {/* IMAGE */}

                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-gray-700
                        md:text-base
                    ">
                        Post Image
                    </label>


                    <input
                        type="file"
                        id="postImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />


                    <label
                        htmlFor="postImage"
                        className="
                            relative
                            flex
                            h-52
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-[20px]
                            border-2
                            border-dashed
                            border-[#249138]
                            bg-[#D9D9D944]
                            transition
                            hover:bg-[#D9D9D966]
                            md:h-64
                        "
                    >

                        {selectedImage ? (

                            <img
                                src={selectedImage}
                                alt="Selected post"
                                className="h-full w-full object-cover"
                            />

                        ) : (

                            <div className="
                                flex
                                flex-col
                                items-center
                                justify-center
                            ">

                                <img
                                    src={addPost}
                                    alt="Add post"
                                    className="h-20 w-20 md:h-28 md:w-28"
                                />

                                <p className="
                                    mt-2
                                    text-sm
                                    font-semibold
                                    text-[#249138]
                                ">
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
                        className="
                            mb-2
                            block
                            text-sm
                            font-bold
                            text-gray-700
                            md:text-base
                        "
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
                        required
                        className="
                            w-full
                            resize-none
                            rounded-[15px]
                            bg-[#D9D9D944]
                            p-3
                            text-sm
                            outline-none
                            placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-[#538E3C]
                            md:text-base
                        "
                    />

                </div>


                {/* LOCATION */}

                <div className="mt-5">

                    <label
                        htmlFor="location"
                        className="
                            mb-2
                            block
                            text-sm
                            font-bold
                            text-gray-700
                            md:text-base
                        "
                    >
                        Location
                    </label>


                    <div className="flex gap-2">

                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                            placeholder="Select or enter location"
                            className="
                                w-full
                                rounded-[15px]
                                bg-[#D9D9D944]
                                p-3
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-[#538E3C]
                            "
                        />


                        <button
                            type="button"
                            onClick={getLocation}
                            className="
                                flex
                                min-w-12
                                items-center
                                justify-center
                                rounded-[15px]
                                bg-[#538E3C]
                                text-white
                                transition
                                hover:bg-[#467a32]
                            "
                            title="Use my location"
                        >
                            <IoMdLocate size={22} />
                        </button>

                    </div>

                </div>


                {/* COORDINATES */}

                {(latitude && longitude) && (

                    <div className="
                        mt-3
                        rounded-[15px]
                        bg-[#E6FFE1]
                        p-3
                        text-sm
                    ">

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


                {/* AI RESULT */}

                {aiResult && (

                    <div className="
                        mt-5
                        rounded-[15px]
                        bg-[#E6FFE1]
                        p-4
                    ">

                        <h3 className="
                            font-bold
                            text-[#249138]
                        ">
                            AI Analysis
                        </h3>

                        {/* AI generated information will appear here */}

                    </div>

                )}


                {/* SUBMIT */}

                <div className="mt-6 flex justify-end">

                    <button
                        type="submit"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-[12px]
                            bg-[#538E3C]
                            px-5
                            py-2.5
                            font-bold
                            text-white
                            transition
                            hover:bg-[#467a32]
                            md:px-7
                            md:py-3
                        "
                    >

                        Post

                        <IoMdSend size={20} />

                    </button>

                </div>

            </form>

        </dialog>
    );
};

export default NewPostForm;