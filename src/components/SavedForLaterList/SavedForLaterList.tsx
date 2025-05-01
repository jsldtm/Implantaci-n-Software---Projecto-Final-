import React from 'react';
import arrowRight from 'public/images/arrow-right.svg';

const savedItems = [
  { name: 'Advanced Scientific Calculator', image: '/images/calculator.png' },
  { name: 'Themed Tumbler', image: '/images/tumbler.png' },
  { name: 'Glasses?', image: '/images/glasses.png' },
  { name: 'Mini Desk Lamp', image: '/images/lamp.png' },
  { name: 'Wireless Desk Charging', image: '/images/wireless-charger.png' },
  
  // Continue adding more items as needed
  { name: 'One Hundred Years of Solitude book illustrated', image: '/images/cienaniosdesoledad.png' },
  { name: 'Canvas Tote Bag', image: '/images/totebag.png' },
  { name: 'Paper Over Board Ring Binders', image: '/images/pinkbinder.png' },
  
];

const SavedForLaterList = () => {
    return (
      <div className = "py-4">
        {/* Static heading */}
        <h2 className = "text-lg font-semibold text-gray-800 mb-4">Saved for later...</h2>
        
        {/* Scrollable container for items */}
        <div className = "scrollable-container">
          {savedItems.map((item) => (
            <div key = {item.name} className = "saved-for-later-item">
              <img
                src = {item.image}
                alt = {item.name || "Product image"} // Fallback alt text
              />
              <span className = "text-sm text-center text-gray-700">
                {item.name || "Unnamed Product"} {/* Fallback name */}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default SavedForLaterList;