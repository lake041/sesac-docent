import React, { useState } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="...">
                {/* 버튼 내용 */}
            </button>
            {isOpen && (
                <div className="...">
                    {/* 드롭다운 내용 */}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
