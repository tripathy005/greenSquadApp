import React from "react";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";


const makers = [
    {
        name: "Aditya Narayan",
        role: "Developer",
        email: "adityaexists2002@gmail.com",
        github: "aditya-username",
        linkedin: "aditya-username",
    },
    {
        name: "Satyaprakash",
        role: "Developer",
        email: "satyaprakashtripathy05@gmail.com",
        github: "satyaprakash-username",
        linkedin: "satyaprakash-username",
    },
    {
        name: "Soumendu",
        role: "Developer",
        email: "soumendumohanty6@gmail.com",
        github: "soumendu-username",
        linkedin: "soumendu-username",
    },
];

const AboutSection = () => {
    return (
        <section className="min-h-screen bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] px-4 py-8 md:px-8 lg:px-12">

            {/* About Application */}
            <div className="mx-auto w-full max-w-6xl rounded-[20px] md:rounded-[30px] bg-white p-5 shadow-lg md:p-10">

                <h1 className="text-center text-3xl font-extrabold text-[#249138] md:text-5xl">
                    About GreenSquad
                </h1>

                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#538E3C] md:mt-4" />

                <div className="mt-7 space-y-5 text-sm leading-6 text-gray-700 md:text-base md:leading-8">

                    <p>
                        <span className="font-bold text-[#249138]">
                            GreenSquad
                        </span>{" "}
                        is a community-driven platform designed to encourage
                        people to take meaningful steps towards a cleaner and
                        more sustainable environment.
                    </p>

                    <p>
                        We believe that environmental change does not always
                        require huge actions. Small habits, when adopted by
                        individuals and multiplied through a community, can
                        create a much bigger impact.
                    </p>

                    <p>
                        GreenSquad brings people together through squads,
                        shared activities, posts, and collective participation.
                        The idea is to make sustainability more engaging,
                        social, and achievable in everyday life.
                    </p>

                </div>

                {/* Vision */}
                <div className="mt-8 rounded-[15px] bg-[#D9D9D944] p-5 md:p-7">

                    <h2 className="text-xl font-extrabold text-[#249138] md:text-2xl">
                        Our Vision
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-700 md:text-base md:leading-7">
                        Our vision is to build a community where sustainable
                        living becomes a part of everyday life. We want to
                        connect people, encourage positive environmental
                        actions, and show that collective effort can turn
                        small habits into a meaningful impact.
                    </p>

                    <p className="mt-3 font-semibold text-[#249138]">
                        Small habits. Big impact. 🌱
                    </p>

                </div>

            </div>


            {/* Makers Section */}
            <div className="mx-auto mt-8 w-full max-w-6xl">

                <h2 className="text-center text-3xl font-extrabold text-[#249138] md:text-4xl">
                    Meet the Makers
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-gray-700 md:text-base">
                    The people behind GreenSquad, working together to turn an
                    idea into a platform for positive environmental change.
                </p>


                {/* Cards */}
                <div className="mt-7 flex flex-col gap-5 lg:flex-row">

                    {makers.map((maker, index) => (

                        <div
                            key={index}
                            className="w-full rounded-[20px] bg-white p-6 shadow-lg transition duration-300  hover:shadow-xl lg:flex-1"
                        >

                            {/* Profile */}
                            <div className="flex flex-col items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D9F2D3] text-2xl font-extrabold text-[#249138] md:h-24 md:w-24 md:text-3xl">
                                    {maker.name
                                        .split(" ")
                                        .map((word) => word[0])
                                        .join("")
                                        .slice(0, 2)}
                                </div>

                                <h3 className="mt-4 text-xl font-extrabold text-gray-800">
                                    {maker.name}
                                </h3>

                                <p className="mt-1 text-sm font-semibold text-[#249138]">
                                    {maker.role}
                                </p>

                            </div>


                            {/* Social Media */}
                            <div className="mt-6 flex justify-center gap-4">

                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9F2D3] text-[#249138] transition hover:bg-[#249138] hover:text-white"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={19} />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9F2D3] text-[#249138] transition hover:bg-[#249138] hover:text-white"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={19} />
                                </a>

                                <a
                                    href={`mailto:${maker.email}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9F2D3] text-[#249138] transition hover:bg-[#249138] hover:text-white"
                                    aria-label="Gmail"
                                >
                                    <BiLogoGmail size={19} />
                                </a>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default AboutSection;