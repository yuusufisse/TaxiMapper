// pointManager.js

// Array to store points
const points = [];

// Function to add a new point to the points array
export const addPoint = (point) => {
  points.push(point);
};

// Function to retrieve all points
export const getPoints = () => points;

// Function to set the points array with new points
export const setPoints = (newPoints) => {
  // Clear the existing points array
  points.length = 0;

  // Push the new points into the cleared array
  points.push(...newPoints);
};
