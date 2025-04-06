import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const FacultyAssignment = () => {
  const { localities, totalFaculty, addFacultyToLocality, removeFacultyFromLocality } = useContext(DataContext);
  const [localityName, setLocalityName] = useState('');
  const [addFaculty, setAddFaculty] = useState(0);

  const handleAssignFaculty = () => {
    if (addFaculty > 0 && addFaculty <= totalFaculty) {
      addFacultyToLocality(localityName, addFaculty);
      setLocalityName('');
      setAddFaculty(0);
    }
  };

  return (
    <section id="faculty" className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Faculty Assignment</h2>
      <table className="min-w-full border-collapse border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Locality</th>
            <th className="px-4 py-2 border">Persons</th>
            <th className="px-4 py-2 border">Inequality Index</th>
            <th className="px-4 py-2 border">Faculty Assigned</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localities.map((locality, index) => (
            <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="border px-4 py-2">{locality.name}</td>
              <td className="border px-4 py-2">{locality.persons}</td>
              <td className="border px-4 py-2">{locality.inequalityIndex}</td>
              <td className="border px-4 py-2">{locality.facultyAssigned}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => removeFacultyFromLocality(locality.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 mr-2 transition-colors duration-200"
                >
                  Remove All Faculty
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Assign Faculty</h3>
        <input
          type="text"
          placeholder="Locality Name"
          value={localityName}
          onChange={(e) => setLocalityName(e.target.value)}
          className="border p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="number"
          placeholder="Number of Faculty"
          value={addFaculty}
          onChange={(e) => setAddFaculty(Number(e.target.value))}
          className="border p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button 
          onClick={handleAssignFaculty} 
          disabled={addFaculty <= 0 || totalFaculty < addFaculty} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Faculty
        </button>
      </div>
      <p className="mt-4 text-gray-700">Total Faculty Remaining: {totalFaculty}</p>
    </section>
  );
};

export default FacultyAssignment;
