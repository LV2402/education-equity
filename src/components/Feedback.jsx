import React, { useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" });
  const [feedbackList, setFeedbackList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the submitted feedback to the feedback list
    setFeedbackList([...feedbackList, formData]);

    // Reset the form
    setFormData({ name: "", email: "", feedback: "" });
    setIsSubmitted(true);

    // Hide the submission message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Feedback Form</h2>

      {/* Feedback submission acknowledgment */}
      {isSubmitted && <p className="text-green-500">Thank you for your feedback!</p>}

      {/* Feedback form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Feedback</label>
          <textarea
            name="feedback"
            className="w-full p-2 border rounded"
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {/* Display feedback list */}
      {feedbackList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Feedback Received:</h3>
          <ul className="space-y-4">
            {feedbackList.map((feedback, index) => (
              <li key={index} className="p-4 border rounded bg-gray-50">
                <p className="font-bold">{feedback.name} ({feedback.email})</p>
                <p className="text-gray-700">{feedback.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feedback;
