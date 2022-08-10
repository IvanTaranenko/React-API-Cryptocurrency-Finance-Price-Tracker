//useState - это хук
// Хук — это специальная функция, которая позволяет «подцепиться» к возможностям React.
//Например, хук useState предоставляет функциональным компонентам доступ к состоянию React.
import React, {useState, useEffect} from "react";
import axios from "axios";
import Coin from "./Coin";

function App() {
    // Объявление новой переменной состояния «data»
    //const [data, setData] - текущее состояние
    //useState() - меняющие

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    useEffect(() => {
        axios.get(url).then(response => {
            setCoins(response.data)
        }).catch(error => alert('You have error'))
    }, []);


    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a currency</h1>
                <form action="">
                    <input type="text"
                           className="coin-input"
                           placeholder="Search"
                           onChange={handleChange}
                    />
                </form>
            </div>
            {filteredCoins.map(coin => {
                    return (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            price={coin.current_price}
                            symbol={coin.symbol}
                            marketcap={coin.total_volume}
                            volume={coin.market_cap}
                            image={coin.image}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    )
                }
            )}
        </div>
    );
}

export default App;
