import React from 'react';

const EducationCenter = () => {
  return (
    <section id="centers" className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1598439590252-17bc9690a47e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Education Equity"
          className="w-full md:w-1/3 lg:w-1/4 rounded-lg shadow-md mb-6"
        />
      </div>
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">Community Education Centers</h2>
      <p className="text-2xl font-bold text-center text-gray-600 mb-8">
      Learn and grow, no cost to know.
</p>



      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold text-green-700">Goal 10: Reduced Inequality</h3>
          <h4 className="text-2xl font-semibold mt-2 text-green-600">Title: "Education Equity"</h4>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-red-700">Problem Statement:</h5>
          <p className="mt-3 text-gray-700">
            In many urban areas, low-income groups have limited access to quality education, leading to persistent economic inequality.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-red-700">Explanation:</h5>
          <p className="mt-3 text-gray-700">
            Low-income communities often lack access to high-quality educational resources, such as skilled teachers, technology, and extracurricular programs. This disparity creates a cycle where individuals from these communities are less likely to pursue higher education or acquire the skills needed for better-paying jobs, thus perpetuating economic inequality.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-red-700">Solution:</h5>
          <p className="mt-3 text-gray-700">
            Establish community-based education centers that offer free or low-cost tutoring, digital literacy programs, and vocational training. These centers would help equip individuals from low-income groups with the skills needed to improve their economic prospects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationCenter;
