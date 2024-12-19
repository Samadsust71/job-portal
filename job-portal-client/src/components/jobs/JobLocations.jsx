import React from "react";

const JobLocations = () => {
  const locations = [
    {
      label: "Hot",
      image: "https://i.natgeofe.com/k/c41b4f59-181c-4747-ad20-ef69987c8d59/eiffel-tower-night.jpg?wp=1&w=1084.125&h=1627.5",
      city: "Paris, France",
      vacancies: 5,
      companies: 120,
    },
    {
      label: "Trending",
      image: "https://www.visitlondon.com/-/media/images/london/visit/whats-on/special-events/new-years-eve-fireworks/new-years-eve-2-1920x582.jpg?rev=08686a3f828e4d9d944744d1bdd38f8e&mw=1920&hash=C02047BE3F9DA007CDE593EF543276D4",
      city: "London, England",
      vacancies: 7,
      companies: 68,
    },
    {
      label: "Hot",
      image: "https://nyc.eu/wp-content/uploads/2015/07/New_York_City-scaled.jpg",
      city: "New York, USA",
      vacancies: 9,
      companies: 80,
    },
    {
      label: "Trending",
      image: "https://i.natgeofe.com/n/1fee60b1-4bd7-449b-84aa-1ffd3a72b271/2XGHK2T_4x3.jpg",
      city: "Amsterdam, Holland",
      vacancies: 9,
      companies: 80,
    },
    {
      label: "Hot",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/74/c2/dc/caption.jpg?w=1400&h=1400&s=1",
      city: "Copenhagen, Denmark",
      vacancies: 9,
      companies: 80,
    },
    {
      label: "Trending",
      image: "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM2OTAzMDI1MzA1MDkz/alexanderplatz-berlin-germany.jpg",
      city: "Berlin, Germany",
      vacancies: 9,
      companies: 80,
    },
  ];

  return (
    <section className="bg-base-100 py-10 text-base-content">
      <div className="container mx-auto">
        {/* Title */}
       <div className="text-center">
       <h2 className="text-3xl font-bold">Jobs by Location</h2>
        <p className="mt-2">
          Find your favorite jobs and get the benefits of yourself
        </p>
       </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-base-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 border border-base-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={location.image}
                  alt={location.city}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="absolute top-3 left-3 bg-gray-200 text-PrimaryBlue text-sm px-3 py-1 rounded-full">
                  {location.label}
                </span>
              </div>
              {/* Details */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold  hover:text-PrimaryBlue">
                  {location.city}
                </h3>
                <div className="flex justify-between items-center">
                <p className="text-sm ">{location.vacancies} Vacancy</p>
                <p className="text-sm ">{location.companies} companies</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobLocations;
