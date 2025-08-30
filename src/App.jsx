import React from "react";
import Overlay from "./components/Overlay";
import Context from "./contexts/Context";

function App() {
    return (
        <Context>
            <div className="container mx-auto px-4">
                <Overlay />
            </div>
        </Context>
    );
}

export default App;
