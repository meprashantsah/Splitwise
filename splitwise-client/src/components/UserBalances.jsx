// // src/components/UserBalances.jsx
// import React, { useState } from 'react';
// import { getUserBalances } from '../api';

// const UserBalances = () => {
//   const [userId, setUserId] = useState('');
//   const [balances, setBalances] = useState([]);
//   const [error, setError] = useState('');

//   const handleFetch = async () => {
//     try {
//       const data = await getUserBalances(userId);
//       setBalances(data);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow mt-6">
//       <h2 className="text-xl font-bold mb-2">User Balances</h2>
//       <input
//         type="number"
//         placeholder="User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <button
//         onClick={handleFetch}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         View User Balances
//       </button>

//       {error && <p className="text-red-500">{error}</p>}
//       {balances.length > 0 && (
//         <ul className="space-y-2">
//           {balances.map((item) => (
//             <li key={item.id} className="p-2 bg-blue-50 rounded">
//               <p>
//                 <strong>{item.owed_by.name}</strong> owes <strong>{item.owed_to.name}</strong>{' '}
//                 ₹{item.amount.toFixed(2)} in Group #{item.group_id}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserBalances;












// src/components/UserBalances.jsx
import React, { useState } from 'react';
import { getUserBalances } from '../api'; // Assuming this API call exists

const UserBalances = () => {
  const [userId, setUserId] = useState('');
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleFetch = async () => {
    setError(''); // Clear previous errors
    setBalances([]); // Clear previous balances
    setIsLoading(true); // Set loading state

    if (!userId.trim()) {
      setError('Please enter a User ID.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay for better UX demonstration
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await getUserBalances(parseInt(userId.trim())); // Ensure ID is parsed as integer
      setBalances(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching user balances.');
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    // Main container styled as a card: white background, generous padding, rounded corners, subtle shadow
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        User Balances
      </h2>

      <div className="space-y-4 mb-6"> {/* Added spacing around input and button */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="number"
            id="userId"
            placeholder="e.g., 101"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            // Enhanced input styling
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="User ID"
          />
        </div>

        <button
          onClick={handleFetch}
          disabled={isLoading} // Disable button while loading
          // Primary button styling
          className={`w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Fetching Balances...' : 'View User Balances'}
        </button>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
          <h3 className="font-semibold text-lg mb-2">Oops! An Error Occurred:</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Balances List Display */}
      {balances.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Balance Overview:</h3>
          <ul className="space-y-3"> {/* Increased space between list items */}
            {balances.map((item) => (
              <li
                key={`${item.owed_by.id}-${item.owed_to.id}-${item.group_id}`} // More robust key
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <p className="text-base text-gray-800 flex-grow">
                  <span className="font-medium">{item.owed_by.name}</span> owes{' '}
                  <span className="font-medium">{item.owed_to.name}</span> in Group{' '}
                  <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-sm">#{item.group_id}</span>
                </p>
                <p className="text-lg font-bold sm:ml-4 mt-2 sm:mt-0">
                  {/* Conditionally color balance based on positive/negative amount */}
                  <span className={item.amount > 0 ? 'text-red-600' : 'text-green-600'}>
                    ₹{item.amount.toFixed(2)}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Message when no balances are found after fetch */}
      {!isLoading && !error && balances.length === 0 && userId.trim() && (
          <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
            <p className="font-medium">No outstanding balances found for User ID: <span className="font-mono">{userId}</span>. This user is settled!</p>
          </div>
      )}
    </div>
  );
};

export default UserBalances;