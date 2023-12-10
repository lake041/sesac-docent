import React, { useState } from 'react';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="..."
                placeholder="Search for items"
            />
        </div>
    );
};

export default SearchInput;
