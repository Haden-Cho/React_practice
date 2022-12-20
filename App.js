import { useEffect, useState } from "react";

function App() {
  const [budget, setBudget] = useState("");
  const onChange = (event) => {
    setBudget(event.target.value);
  };
  const [loading,setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((responce) => responce.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <hr />
      <div>
        <label htmlFor="budget" >Budget(USD): </label>
        <input id="budget" type="number" value={budget} onChange={onChange} placeholder="How much do you have?" />
      </div>
      <br />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD / You can buy {budget/coin.quotes.USD.price} {coin.name}({coin.symbol}) coins!
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default App;
