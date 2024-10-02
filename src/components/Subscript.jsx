import React from 'react';

export default ({ value, decimals = 10, className }) => {
  // Convert the value to a string
  const strValue = Number(value).toFixed(decimals);

  // Check if the value is in the format $0.0000000X
  const match = strValue.match(/^0\.0*/);

  if (match) {
    // Extract the number of zeros
    const numberOfZeros = match[0].length - 2; // Subtract 3 for "$0."

    // Create a React component with "sub" notation
    return (
      <span className={`page-title ${className}`} >
        $0.0<sub style={{fontSize: ".5em"}}>{numberOfZeros}</sub>{strValue.slice(2 + numberOfZeros)}
      </span>
    );
  } else {
    // If the value doesn't match the expected format, return it as is
    return <span className="page-title" > ${strValue}</span>;
  }
}