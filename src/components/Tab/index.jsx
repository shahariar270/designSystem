import { useState } from "react";

const Tab = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["Home", "Profile", "Settings"];

    return (
        <>
            <div >
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 0 && <p>This is Home content</p>}
                {activeTab === 1 && <p>This is Profile content</p>}
                {activeTab === 2 && <p>This is Settings content</p>}
            </div>
        </>
    );
};

export default Tab;
