import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CoinPage from "./Components/CoinPage";
import CryptoTable from "./Components/CryptoTable";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import "./App.css";

function App() {
    const [dark, setDark] = useState(false);
    return (
        <div
            className="App"
            style={
                dark
                    ? {
                          backgroundColor: "#041C32",
                          color: "white",
                          transition: "backgroundColor 1s ease",
                      }
                    : {}
            }
        >
            <Button
                style={{
                    position: "absolute",
                    right: "60px",
                    top: "30px",
                }}
                variant="ghost"
                onClick={() => setDark(!dark)}
            >
                {dark ? <MoonIcon /> : <SunIcon color="#FFB72B" />}
            </Button>
            <Routes>
                <Route path="/" element={<CryptoTable />} />
                <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
        </div>
    );
}

export default App;
