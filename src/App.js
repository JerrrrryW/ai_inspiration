import React, { useState } from 'react';
import './App.css';
import { findByLabelText } from '@testing-library/react';
import SketchArea from './SketchArea';
import { Switch } from 'antd';


// Header component with title and menu
function Header({ setIsUsingAI }) {

    const handleAIChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsUsingAI(checked? true: false);
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
function InspiringImageSpace({isUsingAI}) {
    const [inspiration, setInspiration] = useState(null);
    const [clickNum, setClickNum] = useState(0);
    const bed_result = {"0": ["b5", 0.7688095773109598], "1": ["b10", 0.743656043194022], "2": ["b4", 0.6954226659600219], "3": ["b7", 0.6710210431572388], "4": ["b2", 0.6692900813135675], "5": ["b9", 0.6580946298029587], "6": ["b6", 0.6492814622016309], "7": ["b8", 0.6455526851830728], "8": ["b3", 0.6257365283779174], "9": ["b1", 0.5567218408657304]};
    const sink_result = {"0": ["s7", 0.7403045832562276], "1": ["s1", 0.7341543551751099], "2": ["s5", 0.7212151131416332], "3": ["s15", 0.7201316101000446], "4": ["s6", 0.6751695726352835], "5": ["s13", 0.658372592080794], "6": ["s4", 0.6573548934366708], "7": ["s3", 0.6488019013302777], "8": ["s2", 0.6452137272740357], "9": ["s18", 0.6311226001635896], "10": ["s8", 0.6305292310196822], "11": ["s20", 0.6251741952663513], "12": ["s16", 0.607513229872999], "13": ["s9", 0.6059121528625007], "14": ["s14", 0.6029871103005775], "15": ["s19", 0.5900448473322247], "16": ["s12", 0.5892502888846755], "17": ["s11", 0.5868625332818082], "18": ["s10", 0.5788334521977037], "19": ["s17", 0.5337290811854636]};

    // Function to handle the inspire action
    const handleInspire = () => {
        console.log("Inspire me!"+clickNum);
        if (isUsingAI) { // if using AI, show the imgs on the top of bed_result
            // image name is like b1_1.png
            console.log("Using AI")
            const randomImage = bed_result[clickNum][0] + '_' + Math.floor(Math.random() * 5 + 1);
            console.log(randomImage);
            setInspiration(`./ai_inspiring_imgs/${randomImage}.png`);
            setClickNum((preNum) => (preNum + 1) % Object.keys(bed_result).length)
        } else { // if not using AI, use the random image from ./public/ai_inspring_imgs
            // image name is like b1_1.png
            const randomImage = 'b' + Math.floor(Math.random() * 10 + 1) + '_' + Math.floor(Math.random() * 5 + 1);
            console.log(randomImage);
            setInspiration(`./ai_inspiring_imgs/${randomImage}.png`);
        }
    };

    return (
        <div className="inspiring-image-space">
            {isUsingAI && <h2 style={{ color: 'pink' }}>You have inspired {clickNum} times by AI.</h2>}
            {!isUsingAI && <h2 style={{ color: 'pink' }}>Images will be randomly generated.</h2>}
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
