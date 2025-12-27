import { useState } from "react";

const Tab = ({
    tabs = [],
}) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="tab-component">
            <div className="tab-buttons">
                {tabs.map((tab, index) => (
                    <button
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab?.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default Tab;
