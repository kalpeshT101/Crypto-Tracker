import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import CoinChart from "./Chart";

const CoinPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        var options = {
            method: "GET",
            url: `https://coingecko.p.rapidapi.com/coins/${id}`,
            params: {
                sparkline: "false",
                developer_data: "false",
                community_data: "true",
                market_data: "true",
                tickers: "true",
                localization: "true",
            },
            headers: {
                "x-rapidapi-host": "coingecko.p.rapidapi.com",
                "x-rapidapi-key":
                    "0e6e05e353msh5c3a41eedee3b3fp15997ajsnbf3830bc70c1",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setCoinData(response.data);
                setLoading(!loading);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    if (loading)
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "80vh",
                }}
            >
                <Spinner size="xl" />
            </div>
        );
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                padding: "50px",
            }}
        >
            <div
                style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img src={coinData.image.large} />
                <h1 style={{ fontWeight: "bold" }}>{coinData.name}</h1>
                <p style={{ fontSize: "14px" }}>
                    {ReactHtmlParser(coinData.description.en.split(". ")[0])}
                </p>
            </div>
            <div
                style={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <CoinChart coin={id} />
            </div>
        </div>
    );
};

export default CoinPage;
