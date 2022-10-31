import React from "react";
import AppConfig from "../appConfig/index";
import HostConfig from "../hostConfig/index";
import {
    Route,Routes
} from "react-router-dom";
export default function HomeBody() {
    
    return (
        <Routes>
            <Route path="/" element={<AppConfig />}></Route>
            <Route path="/appConfig" element={<AppConfig />}></Route>
            <Route path="/hostConfig" element={<HostConfig />}></Route>
        </Routes>
    )
}