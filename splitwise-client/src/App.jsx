// // src/App.jsx
// import React from 'react';
// import { Routes, Route, NavLink } from 'react-router-dom';
// import CreateGroupForm from './components/CreateGroupForm';
// import GroupDetails from './components/GroupDetails';
// import AddExpenseForm from './components/AddExpenseForm';
// import GroupBalances from './components/GroupBalances';
// import UserBalances from './components/UserBalances';

// const App = () => {
//   return (
//     <div className="max-w-2xl mx-auto mt-4">
//       <nav className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-100 rounded shadow">
//         <NavLink to="/" className="text-blue-600 font-medium hover:underline">Create Group</NavLink>
//         <NavLink to="/group" className="text-blue-600 font-medium hover:underline">View Group</NavLink>
//         <NavLink to="/expense" className="text-blue-600 font-medium hover:underline">Add Expense</NavLink>
//         <NavLink to="/group-balances" className="text-blue-600 font-medium hover:underline">Group Balances</NavLink>
//         <NavLink to="/user-balances" className="text-blue-600 font-medium hover:underline">User Balances</NavLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<CreateGroupForm />} />
//         <Route path="/group" element={<GroupDetails />} />
//         <Route path="/expense" element={<AddExpenseForm />} />
//         <Route path="/group-balances" element={<GroupBalances />} />
//         <Route path="/user-balances" element={<UserBalances />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;








// src/App.jsx
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import CreateGroupForm from './components/CreateGroupForm';
import GroupDetails from './components/GroupDetails';
import AddExpenseForm from './components/AddExpenseForm';
import GroupBalances from './components/GroupBalances';
import UserBalances from './components/UserBalances';

const App = () => {
  return (
    // Outer container for the entire application, setting a neutral background and sans-serif font
    // This div stretches to fill the screen vertically and applies the overall background
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* Header section - it can span the full width if desired */}
      <header className="bg-white shadow-sm py-4">
        {/* Content within the header is constrained to the max-width for consistency */}
        <div className="max-w-4xl mx-auto px-4"> {/* Increased max-width slightly for the header content */}
          <h1 className="text-2xl font-bold text-gray-900">Splitwise</h1>
        </div>
      </header>

      {/* Main content area - This is where your components and navigation live.
          It now has a max-width to keep content readable and centered,
          while the parent div ensures the background fills the screen. */}
      <main className="max-w-4xl mx-auto px-4 py-8"> {/* Adjusted max-width and added padding */}

        {/* Navigation Bar - styled as modern tabs/pills */}
        <nav className="flex flex-wrap gap-2 mb-8 p-1 rounded-lg bg-gray-100 shadow-sm justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
               ${isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
               }`
            }
          >
            Create Group
          </NavLink>

          <NavLink
            to="/group"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
               ${isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
               }`
            }
          >
            View Group
          </NavLink>

          <NavLink
            to="/expense"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
               ${isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
               }`
            }
          >
            Add Expense
          </NavLink>

          <NavLink
            to="/group-balances"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
               ${isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
               }`
            }
          >
            Group Balances
          </NavLink>

          <NavLink
            to="/user-balances"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
               ${isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
               }`
            }
          >
            User Balances
          </NavLink>
        </nav>

        {/* Route definitions for different sections of the application */}
        <Routes>
          <Route path="/" element={<CreateGroupForm />} />
          <Route path="/group" element={<GroupDetails />} />
          <Route path="/expense" element={<AddExpenseForm />} />
          <Route path="/group-balances" element={<GroupBalances />} />
          <Route path="/user-balances" element={<UserBalances />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;