import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InequalityStats = () => {
    const [localities, setLocalities] = useState([
        { name: 'Location A', inequalityIndex: 15, facultyAssigned: 8 },
        { name: 'Location B', inequalityIndex: 20, facultyAssigned: 13 },
        { name: 'Location C', inequalityIndex: 11, facultyAssigned: 5},
        { name: 'Location D', inequalityIndex: 8, facultyAssigned: 3 },
        { name: 'Location E', inequalityIndex: 10, facultyAssigned: 2 },
    ]);

    const [newLocality, setNewLocality] = useState({ name: '', inequalityIndex: 0, facultyAssigned: 0 });
    const [selectedIndex, setSelectedIndex] = useState(null); // Index of the selected locality for editing

    const handleAddLocality = () => {
        if (newLocality.name && newLocality.inequalityIndex > 0 && newLocality.facultyAssigned >= 0) {
            if (selectedIndex !== null) {
                // Update existing locality
                const updatedLocalities = localities.map((loc, index) =>
                    index === selectedIndex ? newLocality : loc
                );
                setLocalities(updatedLocalities);
                setSelectedIndex(null); // Reset selected index after update
            } else {
                // Add new locality
                setLocalities([...localities, newLocality]);
            }
            setNewLocality({ name: '', inequalityIndex: 0, facultyAssigned: 0 }); // Reset input fields
        } else {
            alert("Please enter valid locality details"); // Validation
        }
    };

    const handleBarClick = (elements) => {
        if (elements.length > 0) {
            const index = elements[0].index; // Get the index of the clicked bar
            const selectedLocality = localities[index];
            setSelectedIndex(index); // Set the selected index for editing
            setNewLocality({ ...selectedLocality }); // Populate input fields with selected locality data
        }
    };

    const labels = localities.map(loc => loc.name);
    const inequalityData = localities.map(loc => loc.inequalityIndex);
    const facultyData = localities.map(loc => loc.facultyAssigned);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Inequality Index',
                data: inequalityData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Faculty Assigned',
                data: facultyData,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Inequality Statistics by Locality',
            },
        },
        onClick: (event, elements) => handleBarClick(elements),
    };

    return (
        <section id="stats" className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Inequality Statistics</h2>
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-3/4 p-4 bg-white shadow-md rounded-lg" style={{ height: '400px', position: 'relative' }}>
                    <Bar data={chartData} options={options} />
                </div>
                <div className="mt-4 md:mt-0 md:w-1/4 md:ml-4">
                    <h3 className="text-lg font-semibold mb-2">{selectedIndex !== null ? 'Edit Locality' : 'Add New Locality'}</h3>
                    <label className="block mb-1 font-semibold">Locality Name</label>
                    <input
                        type="text"
                        placeholder="Enter locality name"
                        value={newLocality.name}
                        onChange={(e) => setNewLocality({ ...newLocality, name: e.target.value })}
                        className="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <label className="block mb-1 font-semibold">Inequality Index</label>
                    <input
                        type="number"
                        placeholder="Enter inequality index"
                        value={newLocality.inequalityIndex}
                        onChange={(e) => setNewLocality({ ...newLocality, inequalityIndex: parseFloat(e.target.value) })}
                        className="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <label className="block mb-1 font-semibold">Faculty Assigned</label>
                    <input
                        type="number"
                        placeholder="Enter number of faculty assigned"
                        value={newLocality.facultyAssigned}
                        onChange={(e) => setNewLocality({ ...newLocality, facultyAssigned: parseInt(e.target.value, 10) })}
                        className="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <button 
                        onClick={handleAddLocality} 
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {selectedIndex !== null ? 'Update Locality' : 'Add Locality'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InequalityStats;
