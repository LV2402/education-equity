// src/context/DataContext.js
import React, { createContext, useState } from 'react';
import { data as initialData } from '../data/data';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [localities, setLocalities] = useState(initialData.localities);
  const [totalFaculty, setTotalFaculty] = useState(initialData.totalFaculty);

  const addFacultyToLocality = (name, addFaculty) => {
    setLocalities(prevLocalities => {
      const localityIndex = prevLocalities.findIndex(loc => loc.name === name);
      const updatedLocalities = [...prevLocalities];

      if (localityIndex !== -1) {
        updatedLocalities[localityIndex].facultyAssigned += addFaculty;
        updatedLocalities[localityIndex].inequalityIndex = Math.max(
          0,
          updatedLocalities[localityIndex].inequalityIndex - addFaculty
        );
      } else {
        updatedLocalities.push({
          name,
          persons: 100,
          inequalityIndex: 50,
          facultyAssigned: addFaculty,
        });
      }

      return updatedLocalities;
    });

    setTotalFaculty(prevTotal => prevTotal - addFaculty);
  };

  const removeFacultyFromLocality = name => {
    setLocalities(prevLocalities => {
      const localityIndex = prevLocalities.findIndex(loc => loc.name === name);
      if (localityIndex !== -1) {
        const updatedLocalities = [...prevLocalities];
        const removedFaculty = updatedLocalities[localityIndex].facultyAssigned;

        updatedLocalities[localityIndex].facultyAssigned = 0;
        updatedLocalities[localityIndex].inequalityIndex += removedFaculty;

        setTotalFaculty(prevTotal => prevTotal + removedFaculty);
        return updatedLocalities;
      }
      return prevLocalities;
    });
  };

  return (
    <DataContext.Provider
      value={{
        localities,
        totalFaculty,
        addFacultyToLocality,
        removeFacultyFromLocality,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
