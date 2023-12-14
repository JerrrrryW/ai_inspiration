import React, { useState } from 'react';
import './App.css';
import { findByLabelText } from '@testing-library/react';
import SketchArea from './SketchArea';
import { Switch } from 'antd';


// Header component with title and menu
function Header({ setIsUsingAI }) {

    const handleAIChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsUsingAI(checked);
    }

    return (
        <div className="header">
            <Switch checkedChildren="AI" unCheckedChildren="AI" defaultChecked style={{ marginRight: 10 }} onChange={handleAIChange} />
            <h1>Collaborative Ideation Partner</h1>
        </div>
    );
}

// DesignSpace component for sketching and task description
function DesignSpace() {
    return (
        <div className="design-space">
            <h2 style={{ color: 'purple' }}>Design a SINK for a disabled bathroom.</h2>
            <SketchArea />

        </div>
    );
}

// InspiringImageSpace component for inspirational images
function InspiringImageSpace(isUsingAI) {
    const [inspiration, setInspiration] = useState(null);

    // Function to handle the inspire action
    const handleInspire = () => {
        console.log("Inspire me!");
        if (isUsingAI) { // if using AI, show the imgs on the top of bed_result.json
            
        } else { // if not using AI, use the random image from ./public/ai_inspring_imgs
            // image name is like b1_1.png
            const randomImage = 'b' + Math.floor(Math.random() * 10 + 1) + '_' + Math.floor(Math.random() * 5 + 1);
            console.log(randomImage);
            setInspiration(`./ai_inspiring_imgs/${randomImage}.png`);
        }
    };

    return (
        <div className="inspiring-image-space">
            <h2 style={{ color: 'pink' }}>The inspiring object is: bubble tent !</h2>
            <button onClick={handleInspire}>Inspire me</button>
            {inspiration && <img src={inspiration} alt="Inspirational" />}
        </div>
    );
}

// Main App Component
function App() {
    const [isUsingAI, setIsUsingAI] = useState(false);
    

    return (
        <div className="app">
            <Header setIsUsingAI={setIsUsingAI} />
            <main>
                <DesignSpace />
                <InspiringImageSpace isUsingAI={isUsingAI} />
            </main>
        </div>
    );
}

export default App;
