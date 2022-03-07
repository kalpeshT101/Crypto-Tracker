import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Spinner, Button } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import axios from "axios";

const CoinChart = ({ coin }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState(1);
    const buttons = ["1 Month", "3 Months", "6 Months", "1 Year"];

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
            )
            .then((res) => {
                setChartData(res.data.prices);
                setLoading(true);
            })
            .catch((err) => console.log(err));
    }, [days]);

    if (!loading | !chartData)
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
                width: "90%",
                height: "90%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Line
                data={{
                    labels: chartData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                                ? `${
                                      date.getHours() - 12
                                  }:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            data: chartData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in usd`,
                            borderColor: "#EEBC1D",
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,
                        },
                    },
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {buttons.map((btn, id) => (
                    <Button
                        key={id}
                        colorScheme="teal"
                        onClick={() => setDays(Number(btn[0]))}
                    >
                        {btn}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CoinChart;
