import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaUserTie, FaHouseUser } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { PiUserSoundLight } from "react-icons/pi";
import { SiLibreofficewriter } from "react-icons/si";


const JobCategories = () => {
  const categories = [
    { icon: <FaComputer />, name: "Management" },
    { icon: <PiUserSoundLight />, name: "Marketing & Sale" },
    { icon: <FaHouseUser />, name: "Finance" },
    { icon: <FaUserTie />, name: "Human Resource" },
    { icon: <AiFillProduct />, name: "Retail & Products" },
    { icon: <SiLibreofficewriter />, name: "Content Writer" },
  ];

  return (
    <section className="py-10 text-base-content">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold">Jobs of the day</h2>
        <p className="text-gray-500 mt-2">
          Search and connect with the right candidates faster.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-3 border border-neutral-400 hover:border-PrimaryBlue rounded-lg hover:text-PrimaryBlue transition-all duration-300 cursor-pointer"
            >
              <span className="text-lg text-PrimaryBlue">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
