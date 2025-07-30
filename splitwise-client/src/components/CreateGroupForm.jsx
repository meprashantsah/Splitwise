// // src/components/CreateGroupForm.jsx
// import React, { useState } from 'react';
// import { createGroup } from '../api';

// const CreateGroupForm = () => {
//   const [groupName, setGroupName] = useState('');
//   const [userIds, setUserIds] = useState('');
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const ids = userIds.split(',').map(id => parseInt(id.trim()));

//     try {
//       const data = await createGroup(groupName, ids);
//       setResponse(data);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-2">Create Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Group name"
//           value={groupName}
//           onChange={(e) => setGroupName(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="User IDs (comma separated)"
//           value={userIds}
//           onChange={(e) => setUserIds(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create Group
//         </button>
//       </form>

//       {response && (
//         <div className="mt-4 p-2 border rounded bg-green-50">
//           <h3 className="font-semibold">Group Created:</h3>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default CreateGroupForm;
















// src/components/CreateGroupForm.jsx
import React, { useState } from 'react';
import { createGroup } from '../api'; // Assuming this API call exists

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [userIds, setUserIds] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setResponse(null); // Clear previous responses
    setIsLoading(true); // Set loading state

    const ids = userIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)); // Filter out invalid numbers

    if (!groupName.trim()) {
      setError('Group name cannot be empty.');
      setIsLoading(false);
      return;
    }
    if (ids.length === 0) {
      setError('Please enter at least one valid user ID.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay for better UX demonstration
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await createGroup(groupName, ids);
      setResponse(data);
      setGroupName(''); // Clear form fields on success
      setUserIds('');
    } catch (err) {
      // Check if err.message exists, otherwise provide a generic error
      setError(err.message || 'An unexpected error occurred during group creation.');
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    // Main container styled as a card: white background, generous padding, rounded corners, subtle shadow
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        Create New Group
      </h2>

      {/* Form Layout */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            placeholder="e.g., Weekend Trip, Family Vacation"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            // Enhanced input styling: full width, padding, border, rounded, focus styles
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="Group Name"
          />
        </div>

        <div>
          <label htmlFor="userIds" className="block text-sm font-medium text-gray-700 mb-1">
            User IDs (comma separated)
          </label>
          <input
            type="text"
            id="userIds"
            placeholder="e.g., 101, 102, 103"
            value={userIds}
            onChange={(e) => setUserIds(e.target.value)}
            // Enhanced input styling
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="User IDs"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          // Primary button styling: blue background, white text, padding, rounded, shadow, hover/focus states
          className={`w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating Group...' : 'Create Group'}
        </button>
      </form>

      {/* Response Message (Success) */}
      {response && (
      <div className="mt-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
          <h3 className="font-semibold text-lg mb-2">Group Created Successfully!</h3>
          <p className="text-sm">
            Group ID: <span className="font-mono bg-green-100 px-2 py-1 rounded">{response.id}</span>
          </p>
          <p className="text-sm">
            Group Name: <span className="font-medium">{response.name}</span>
          </p>
          <p className="text-sm">
            Members:{" "}
            <span className="font-medium">
              {response.users?.map((user) => user.name).join(', ')}
            </span>
          </p>
        </div>
      )}


      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
          <h3 className="font-semibold text-lg mb-2">Oops! An Error Occurred:</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateGroupForm;