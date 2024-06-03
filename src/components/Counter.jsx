// import { useState, useEffect } from "react";
// import assets from "../assets";

// // eslint-disable-next-line react/prop-types
// export const Counter = ({ initialCount = 1, onChange, productCounts }) => {
//   const [count, setCount] = useState(initialCount);

//   useEffect(() => {
//     setCount(productCounts || initialCount);
//   }, [productCounts, initialCount]);

//   const increment = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     onChange(newCount);
//   };

//   const decrement = () => {
//     const newCount = count > 0 ? count - 1 : 1;
//     setCount(newCount);
//     onChange(newCount);
//   };

//   return (
//     <div className="counter">
//       <button className="decrement" onClick={decrement}>
//         <img src={assets.minusIcon} alt="minus icon" />
//       </button>
//       <span className="count_number">{count}</span>
//       <button className="increment" onClick={increment}>
//         <img src={assets.plusIcon} alt="plus icon" />
//       </button>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import assets from "../assets";

// eslint-disable-next-line react/prop-types
export const Counter = ({ initialCount = 1, onChange, productCounts }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(productCounts || initialCount);
  }, [productCounts, initialCount]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    onChange(newCount);
  };

  return (
    <div className="counter">
      <button className="decrement" onClick={decrement}>
        <img src={assets.minusIcon} alt="minus icon" />
      </button>
      <span className="count_number">{count}</span>
      <button className="increment" onClick={increment}>
        <img src={assets.plusIcon} alt="plus icon" />
      </button>
    </div>
  );
};