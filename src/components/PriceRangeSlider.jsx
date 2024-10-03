// import React, { useState } from 'react';

// const PriceRangeSlider = ({ min, max, onChange }) => {
//     const [priceRange, setPriceRange] = useState([min, max]);

//     const handleChange = (event) => {
//         const newRange = [event.target.value[0], event.target.value[1]];
//         setPriceRange(newRange);
//         onChange(newRange);
//     };

//     return (
//         <div className="price-range-slider">
//             <input
//                 type="range"
//                 min={min}
//                 max={max}
//                 value={priceRange[0]}
//                 onChange={(e) => handleChange({ target: { value: [e.target.value, priceRange[1]] } })}
//                 className="range-slider"
//             />
//             <input
//                 type="range"
//                 min={min}
//                 max={max}
//                 value={priceRange[1]}
//                 onChange={(e) => handleChange({ target: { value: [priceRange[0], e.target.value] } })}
//                 className="range-slider"
//             />
//             <div>
//                 Selected Price Range: ${priceRange[0]} - ${priceRange[1]}
//             </div>
//         </div>
//     );
// };

// export default PriceRangeSlider;
