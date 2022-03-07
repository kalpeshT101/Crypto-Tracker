import React, { useEffect, useState } from "react";
import {
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CryptoTable = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        var options = {
            method: "GET",
            url: "https://coingecko.p.rapidapi.com/coins/markets",
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: "20",
                page: "1",
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
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    function changeHandler() {
        return data.filter(
            (coin) =>
                coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
            }}
        >
            <div style={{ width: "100%" }}>
                <h1
                    style={{
                        textAlign: "center",
                        paddingBottom: "15px",
                        fontSize: "2.5rem",
                    }}
                >
                    Crypto App
                </h1>
            </div>
            <div style={{ width: "50%" }}>
                <Input
                    size="lg"
                    style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    placeholder="Search crypto..."
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {loading ? (
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
            ) : (
                <div style={{ width: "80%", padding: "15px" }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Crypto Name</Th>
                                <Th>Current Market Price</Th>
                                <Th isNumeric>Price Change</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {changeHandler().map((coin) => (
                                <Tr
                                    key={coin.id}
                                    onClick={() =>
                                        navigate("/coins/" + `${coin.id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                    _hover={{
                                        bg: "teal.600",
                                        color: "white",
                                    }}
                                >
                                    <Td>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {
                                                <img
                                                    src={coin.image}
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                            }
                                            {coin.name}
                                        </div>
                                    </Td>
                                    <Td>
                                        $ {coin.current_price.toLocaleString()}
                                    </Td>
                                    <Td isNumeric>
                                        {coin.price_change_percentage_24h}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default CryptoTable;
