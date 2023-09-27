import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapboxMap from "./components/MapboxMap";
import "./styles/main.scss";

export default function App() {
    const [map, setMap] = useState();
    const [location, setLocation] = useState();

    return (
        <>
            <MapboxMap map={map} setMap={setMap} location={location} setLocation={setLocation} />
            <Sidebar map={map} location={location} setLocation={setLocation} />
        </>
    );
}
