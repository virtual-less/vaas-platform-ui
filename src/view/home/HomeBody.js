import React from "react";
import AppConfig from "../appConfig/index";
import HostConfig from "../hostConfig/index";
import ByPassConfig from "../byPassConfig/index";
import {
    Route,Routes
} from "react-router-dom";
export default function HomeBody() {
    
    return (
        <Routes>
            <Route path="/" element={<AppConfig />}></Route>
            <Route path="/appConfig" element={<AppConfig />}></Route>
            <Route path="/hostConfig" element={<HostConfig />}></Route>
            <Route path="/byPassConfig" element={<ByPassConfig />}></Route>
        </Routes>
    )
}