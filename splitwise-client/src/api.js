// src/api.js
const BASE_URL = 'http://localhost:8000';

export const createGroup = async (name, userIds) => {
  const response = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, user_ids: userIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to create group');
  }

  return await response.json();
};

export const getGroup = async (groupId) => {
  const response = await fetch(`${BASE_URL}/groups/${groupId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch group');
  }
  return await response.json();
};


export const addExpenseToGroup = async (groupId, expenseData) => {
  const response = await fetch(`${BASE_URL}/groups/${groupId}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error('Failed to add expense');
  }

  return await response.json();
};


export const getGroupBalances = async (groupId) => {
  const response = await fetch(`${BASE_URL}/groups/${groupId}/balances`);
  if (!response.ok) throw new Error('Failed to fetch group balances');
  return await response.json();
};

export const getUserBalances = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/balances`);
  if (!response.ok) throw new Error('Failed to fetch user balances');
  return await response.json();
};
