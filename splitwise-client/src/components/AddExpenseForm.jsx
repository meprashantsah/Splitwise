// // src/components/AddExpenseForm.jsx
// import React, { useState } from 'react';
// import { addExpenseToGroup } from '../api';

// const AddExpenseForm = () => {
//   const [groupId, setGroupId] = useState('');
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [paidBy, setPaidBy] = useState('');
//   const [splitType, setSplitType] = useState('equal');
//   const [splits, setSplits] = useState([{ user_id: '', percentage: '' }]);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');

//   const handleSplitChange = (index, field, value) => {
//     const updated = [...splits];
//     updated[index][field] = value;
//     setSplits(updated);
//   };

//   const addSplitField = () => {
//     setSplits([...splits, { user_id: '', percentage: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const expenseData = {
//       description,
//       amount: parseFloat(amount),
//       paid_by: parseInt(paidBy),
//       split_type: splitType,
//       splits: splits.map((s) => ({
//         user_id: parseInt(s.user_id),
//         percentage: splitType === 'percentage' ? parseFloat(s.percentage) : 0,
//       })),
//     };

//     try {
//       const data = await addExpenseToGroup(groupId, expenseData);
//       setResponse(data);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow mt-6">
//       <h2 className="text-xl font-bold mb-2">Add Expense to Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Group ID"
//           value={groupId}
//           onChange={(e) => setGroupId(e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="number"
//           placeholder="Paid by (User ID)"
//           value={paidBy}
//           onChange={(e) => setPaidBy(e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         <select
//           value={splitType}
//           onChange={(e) => setSplitType(e.target.value)}
//           className="border p-2 rounded w-full"
//         >
//           <option value="equal">Equal</option>
//           <option value="percentage">Percentage</option>
//         </select>

//         <div className="space-y-2">
//           <h4 className="font-semibold">Splits</h4>
//           {splits.map((split, index) => (
//             <div key={index} className="flex space-x-2">
//               <input
//                 type="number"
//                 placeholder="User ID"
//                 value={split.user_id}
//                 onChange={(e) => handleSplitChange(index, 'user_id', e.target.value)}
//                 className="border p-2 rounded w-1/2"
//               />
//               {splitType === 'percentage' && (
//                 <input
//                   type="number"
//                   placeholder="Percentage"
//                   value={split.percentage}
//                   onChange={(e) => handleSplitChange(index, 'percentage', e.target.value)}
//                   className="border p-2 rounded w-1/2"
//                 />
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSplitField}
//             className="text-blue-500 text-sm"
//           >
//             + Add another
//           </button>
//         </div>

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add Expense
//         </button>
//       </form>

//       {response && (
//         <div className="mt-4 p-2 border rounded bg-green-50">
//           <h3 className="font-semibold">Expense Added:</h3>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default AddExpenseForm;












// src/components/AddExpenseForm.jsx
import React, { useState } from 'react';
import { addExpenseToGroup } from '../api'; // Assuming this API call exists

const AddExpenseForm = () => {
  const [groupId, setGroupId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [splits, setSplits] = useState([{ user_id: '', percentage: '' }]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  // Handles changes for individual split fields (user_id or percentage)
  const handleSplitChange = (index, field, value) => {
    const updated = [...splits];
    updated[index][field] = value;
    setSplits(updated);
  };

  // Adds a new empty split field
  const addSplitField = () => {
    setSplits([...splits, { user_id: '', percentage: '' }]);
  };

  // Removes a split field by index
  const removeSplitField = (indexToRemove) => {
    setSplits(splits.filter((_, index) => index !== indexToRemove));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setResponse(null); // Clear previous responses
    setIsLoading(true); // Set loading state

    // Basic client-side validation
    if (!groupId.trim() || !description.trim() || !amount || !paidBy) {
      setError('Please fill in all required fields (Group ID, Description, Amount, Paid By).');
      setIsLoading(false);
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      setIsLoading(false);
      return;
    }
    if (isNaN(parseInt(paidBy))) {
      setError('Paid By User ID must be a valid number.');
      setIsLoading(false);
      return;
    }

    // Validate splits
    let totalPercentage = 0;
    const validatedSplits = splits.map(s => {
      const userId = parseInt(s.user_id.trim());
      if (isNaN(userId)) {
        setError('All User IDs in splits must be valid numbers.');
        setIsLoading(false);
        return null;
      }
      let percentage = 0;
      if (splitType === 'percentage') {
        percentage = parseFloat(s.percentage.trim());
        if (isNaN(percentage) || percentage <= 0) {
          setError('All percentages must be positive numbers.');
          setIsLoading(false);
          return null;
        }
        totalPercentage += percentage;
      }
      return { user_id: userId, percentage: percentage };
    }).filter(s => s !== null); // Filter out any nulls from validation errors

    if (error) { // If any split validation failed, stop here
      return;
    }

    if (splitType === 'percentage' && totalPercentage !== 100) {
      setError(`Total percentage must be 100%. Currently: ${totalPercentage}%`);
      setIsLoading(false);
      return;
    }
    if (validatedSplits.length === 0) {
        setError('Please add at least one split.');
        setIsLoading(false);
        return;
    }

    // const expenseData = {
    //   description,
    //   amount: parseFloat(amount),
    //   paid_by: parseInt(paidBy),
    //   split_type: splitType,
    //   splits: validatedSplits,
    // };

    // try {
    //   // Simulate API call delay for better UX demonstration
    //   // await new Promise(resolve => setTimeout(resolve, 1000));
    //   const data = await addExpenseToGroup(parseInt(groupId.trim()), expenseData);
    //   setResponse(data);
    //   // Clear form fields on success
    //   setGroupId('');
    //   setDescription('');
    //   setAmount('');
    //   setPaidBy('');
    //   setSplitType('equal');
    //   setSplits([{ user_id: '', percentage: '' }]);
    // } catch (err) {
    //   setError(err.message || 'An unexpected error occurred while adding the expense.');
    // } finally {
    //   setIsLoading(false); // Clear loading state
    // }

    const expenseData = {
      description: description.trim(),
      amount: parseFloat(amount),
      paid_by: parseInt(paidBy),
      split_type: splitType,
      splits: splits.map(s => {
        const split = {
          user_id: parseInt(s.user_id),
        };
        if (splitType === "percentage") {
          split.percentage = parseFloat(s.percentage);
        }
        return split;
      }),
    };


    console.log('Sending expenseData:', expenseData);

    try {
      const data = await addExpenseToGroup(parseInt(groupId.trim()), expenseData);
      setResponse(data);
      // Clear form
      setGroupId('');
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSplitType('equal');
      setSplits([{ user_id: '', percentage: '' }]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while adding the expense.');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    // Main container styled as a card: white background, generous padding, rounded corners, subtle shadow
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        Add Expense to Group
      </h2>

      {/* Form Layout */}
      <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased space-y for more breathing room */}
        <div>
          <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-1">
            Group ID
          </label>
          <input
            type="number"
            id="groupId"
            placeholder="e.g., 123"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="Group ID"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="e.g., Dinner at ABC, Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="Expense Description"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="e.g., 50.75"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            step="0.01" // Allow decimal values for currency
            aria-label="Expense Amount"
          />
        </div>

        <div>
          <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-1">
            Paid By (User ID)
          </label>
          <input
            type="number"
            id="paidBy"
            placeholder="e.g., 101"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            aria-label="Paid By User ID"
          />
        </div>

        <div>
          <label htmlFor="splitType" className="block text-sm font-medium text-gray-700 mb-1">
            Split Type
          </label>
          <select
            id="splitType"
            value={splitType}
            onChange={(e) => {
              setSplitType(e.target.value);
              // Reset splits when changing type to avoid inconsistencies
              setSplits([{ user_id: '', percentage: '' }]);
            }}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 appearance-none pr-8" // appearance-none to allow custom arrow
            aria-label="Split Type"
          >
            <option value="equal">Equal</option>
            <option value="percentage">Percentage</option>
            {/* You might add 'exact' or 'shares' later if your API supports it */}
          </select>
          {/* Optional: Add a custom arrow icon for the select box if appearance-none is used */}
          {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div> */}
        </div>

        <div className="space-y-3 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="font-semibold text-gray-800 text-base">Users?</h4>
          {splits.map((split, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 items-center">
              <label htmlFor={`split-user-${index}`} className="sr-only">User ID for split {index + 1}</label>
              <input
                type="number"
                id={`split-user-${index}`}
                placeholder="User ID"
                value={split.user_id}
                onChange={(e) => handleSplitChange(index, 'user_id', e.target.value)}
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md bg-white text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                aria-label={`User ID for split ${index + 1}`}
              />
              {splitType === 'percentage' && (
                <>
                  <label htmlFor={`split-percentage-${index}`} className="sr-only">Percentage for split {index + 1}</label>
                  <input
                    type="number"
                    id={`split-percentage-${index}`}
                    placeholder="Percentage (%)"
                    value={split.percentage}
                    onChange={(e) => handleSplitChange(index, 'percentage', e.target.value)}
                    className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md bg-white text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    step="0.01"
                    aria-label={`Percentage for split ${index + 1}`}
                  />
                </>
              )}
              {splits.length > 1 && ( // Only show remove button if there's more than one split field
                <button
                  type="button"
                  onClick={() => removeSplitField(index)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full"
                  aria-label={`Remove split for user ${split.user_id}`}
                >
                  {/* Using a simple X icon or SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSplitField}
            className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-800
                       transition-colors duration-200 mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add another split
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          className={`w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Adding Expense...' : 'Add Expense'}
        </button>
      </form>

      {/* console.log("API response:", response);  */}

      {/* Response Message (Success) */}
      {response && (
        <div className="mt-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
          <h3 className="font-semibold text-lg mb-2">🎉 Expense Added Successfully!</h3>
          <p className="text-sm">Expense ID: <span className="font-mono bg-green-100 px-2 py-1 rounded">{response.expenseId}</span></p>
          <p className="text-sm">Description: <span className="font-medium">{response.description}</span></p>
          <p className="text-sm">Amount: <span className="font-medium">${response.amount.toFixed(2) ?? '0.00'}</span></p>
          <p className="text-sm">Paid By: <span className="font-medium">{response.paidBy}</span></p>
          {/* You might want to display split details here as well */}
          {/* <pre className="mt-2 text-xs bg-green-100 p-2 rounded overflow-auto">
            {JSON.stringify(response, null, 2)}
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

export default AddExpenseForm;