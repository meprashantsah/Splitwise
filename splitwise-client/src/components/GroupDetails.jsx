// // src/components/GroupDetails.jsx
// import React, { useState } from 'react';
// import { getGroup } from '../api';

// const GroupDetails = () => {
//   const [groupId, setGroupId] = useState('');
//   const [group, setGroup] = useState(null);
//   const [error, setError] = useState('');

//   const handleFetch = async () => {
//     try {
//       const data = await getGroup(groupId);
//       setGroup(data);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow mt-6">
//       <h2 className="text-xl font-bold mb-2">Get Group Details</h2>
//       <div className="space-y-4">
//         <input
//           type="number"
//           placeholder="Group ID"
//           value={groupId}
//           onChange={(e) => setGroupId(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <button onClick={handleFetch} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Fetch Group
//         </button>
//       </div>

//       {group && (
//         <div className="mt-4 p-2 border rounded bg-gray-50">
//           <h3 className="font-semibold">Group Info:</h3>
//           <pre>{JSON.stringify(group, null, 2)}</pre>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default GroupDetails;













// src/components/GroupDetails.jsx
import React, { useState } from 'react';
import { getGroup } from '../api'; // Assuming this API call exists

const GroupDetails = () => {
  const [groupId, setGroupId] = useState('');
  const [group, setGroup] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleFetch = async () => {
    setError(''); // Clear previous errors
    setGroup(null); // Clear previous group data
    setIsLoading(true); // Set loading state

    if (!groupId.trim()) {
      setError('Please enter a Group ID.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay for better UX demonstration
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await getGroup(parseInt(groupId.trim())); // Ensure ID is parsed as integer
      setGroup(data);
    } catch (err) {
      // Check if err.message exists, otherwise provide a generic error
      setError(err.message || 'An unexpected error occurred while fetching group details.');
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    // Main container styled as a card: white background, generous padding, rounded corners, subtle shadow
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        Get Group Details
      </h2>

      {/* Input and Button Container */}
      <div className="space-y-4">
        <div>
          <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-1">
            Group ID
          </label>
          <input
            type="number" // Use type="number" for numeric input
            id="groupId"
            placeholder="e.g., 123"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            // Enhanced input styling
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="Group ID"
          />
        </div>

        {/* Fetch Button */}
        <button
          onClick={handleFetch}
          disabled={isLoading} // Disable button while loading
          // Primary button styling
          className={`w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Fetching...' : 'Fetch Group'}
        </button>
      </div>

      {/* Group Details Display */}
      {group && (
        <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
          <h3 className="font-semibold text-lg mb-2">Group Information:</h3>
          <p className="text-sm">
            Group ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{group.id}</span>
          </p>
          <p className="text-sm">
            Group Name: <span className="font-medium">{group.name}</span>
          </p>
          <p className="text-sm">
            Members:{" "}
            <span className="font-medium">
              {group.users?.map((user) => user.name).join(', ')}
            </span>
          </p>

          {/* Optional: Total expenses display */}
          <p className="text-sm mt-2">
            Total Expenses: ₹{group.total_expenses}
          </p>

          {/* Optional: show full JSON for debug */}
          {/* <pre className="mt-2 text-xs bg-blue-100 p-2 rounded overflow-auto">
            {JSON.stringify(group, null, 2)}
          </pre> */}
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

export default GroupDetails;