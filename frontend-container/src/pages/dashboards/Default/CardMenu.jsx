import React, { useState } from 'react';

// Constants for repeated Tailwind CSS classes
const cardBaseStyle =
  'absolute top-10 bg-white text-white rounded-lg shadow-lg';
const listItemStyle = 'mb-2';

function CardMenu() {
  // State to toggle the menu visibility
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  return (
    <div className="relative w-300 h-400 bg-gray-800 text-white rounded-lg shadow-md">
      <div
        className={`${cardBaseStyle} left-2.5 cursor-pointer`}
        onClick={toggleMenu}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#6C63FF" />
          <path
            d="M12 7V17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 12H17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {isMenuVisible && (
        <div className={`${cardBaseStyle} left-10 bg-gray-900 w-200 p-2.5`}>
          <ul className="list-none p-0 m-0">
            {[
              'Filters (Season, Team, Week)',
              'Views (alternative data presentations)',
              'Export Data (PDF, CSV)',
              'Share Card',
              'Settings (theme, size)',
              'Discussion (forum/blog link)',
              'Rate Feature',
              'Duplicate',
              'Delete',
              'Lock Position (Pin/Unpin)',
            ].map((item) => (
              <li className={listItemStyle} key={item}>
                <button className="text-white no-underline">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CardMenu;
