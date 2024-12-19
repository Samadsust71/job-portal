import { easeInOut } from "motion";
import { motion } from "motion/react"

const Banner = () => {
  return (
    <section className="bg-base-200 p-6 md:p-12 my-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-start lg:px-20">
        {/* Left Content */}
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, ease:easeInOut }}
        >
          <div>
          <h1 className="text-4xl md:text-5xl font-bold text-base-content lg:w-[80%]">
            The <span className="text-PrimaryBlue">Easiest Way</span> <br />
            to Get Your New Job
          </h1>
          <p className="text-base lg:w-[80%] mt-6">
            Each month, more than 3 million job seekers turn to websites in
            their search for work, making over 140,000 applications every
            single day.
          </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-base-300 p-4 rounded-lg shadow-lg">
            <select defaultValue={"Industry"} className="select select-bordered flex-1">
              <option disabled >Industry</option>
              <option>Tech</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
            <select defaultValue={"Location"} className="select select-bordered flex-1">
              <option disabled>Location</option>
              <option>New York</option>
              <option>London</option>
              <option>Tokyo</option>
            </select>
            <button className="btn bg-PrimaryBlue text-white w-full md:w-auto">Search</button>
          </div>

          {/* Popular Searches */}
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Popular Searches:</span>{" "}
            <span className="text-PrimaryBlue">Designer</span>, Web, IOS,
            Developer, PHP, Senior, Engineer
          </div>
        </motion.div>

        {/* Right Image */}
        <div className="space-y-20">
        <motion.div
          className="relative flex justify-center"
        //   initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: [50,25,50] }}
          transition={{ duration: 5 ,repeat:Infinity, ease:easeInOut }}
        >
          <img
            src="https://jobbox-html-frontend.vercel.app/assets/imgs/page/homepage1/banner1.png"
            alt="Job Portal"
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>
        <motion.div
          className="relative flex justify-center"
        //   initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: [25,50,25] }}
          transition={{ duration: 5,repeat:Infinity,ease:easeInOut }}
        >
          <img
            src="https://jobbox-html-frontend.vercel.app/assets/imgs/page/homepage1/banner2.png"
            alt="Job Portal"
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
