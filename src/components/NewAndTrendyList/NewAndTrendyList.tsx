import React from 'react';

const NewAndTrendyList: React.FC = () => {
  const trendyItems = [
   { id: 1, title: "Finals & midterms", description: "Get ready for exams!", image: "/images/exams.png" },
    { id: 2, title: "Spring & summer", description: "Latest from Shirts!", image: "/images/thisisnospring.png" },
    { id: 3, title: "Camping time!", description: "Gear up for adventures!", image: "/images/camping.png" },
  ];

  return (
    <div className="relative">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-6 px-4">
          {trendyItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-80">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 rounded-lg object-cover"
              />
              <h3 className="text-lg font-bold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Fading effect to indicate scrollability */}
      <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default NewAndTrendyList;