import React from "react";

const AboutDevelopersSection = () => {
  // Define your team members' data
  const teamMembers = [
    {
      name: "Vignou",
      role: "Web Developer & UI/UX Designer",
      description:
        "Vignou is passionate about crafting intuitive and visually appealing user interfaces. He brings designs to life with clean code and a focus on user experience.",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1868527051348779008/HIeE6jqr_400x400.jpg", // Placeholder image URL
    },
    {
      name: "Pisetha",
      role: "Unity & AR Developer",
      description:
        "Pisetha specializes in creating immersive augmented reality experiences and interactive 3D applications using Unity. He loves pushing the boundaries of spatial computing.",
      imageUrl: "https://ibb.co/Zz9B582Y", // Placeholder image URL
    },
    {
      name: "Rattana",
      role: "Unity & AR Developer",
      description:
        "He is an expert in game development and AR prototyping. His focus is on performance optimization and integrating cutting-edge AR features into projects.",
      imageUrl: "https://ibb.co/Lzdr4S3V", // Placeholder image URL
    },
  ];

  return (
    <section className="py-12 font-inter relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background curve pattern */}
      <div
        className="absolute inset-0 -z-0 transform skew-y-[-3deg] origin-top-left
                   bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100
                   dark:from-gray-700 dark:via-gray-800 dark:to-gray-900
                   scale-110 transition-transform duration-500 ease-out"
        aria-hidden="true"
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {" "}
        {/* Content needs to be above the pattern */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl rounded-lg p-2">
            Meet Our Amazing Team
          </h2>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 rounded-lg p-2">
            The dedicated individuals behind our innovative projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center p-6"
            >
              <img
                className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg mb-6"
                src={member.imageUrl}
                alt={member.name}
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/150x150/6B7280/FFFFFF?text=${
                    member.name.split(" ")[0]
                  }`;
                }}
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
                {member.role}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-center flex-grow">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDevelopersSection;
