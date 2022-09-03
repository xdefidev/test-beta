import tokens from "../tokens";

export default function Card(props) {
  const token = tokens.map((item, index) => (
    <li className="coins" key={index}>
      <input
        type="radio"
        value={item.symbol}
        name="coin"
        id={item.symbol}
        onChange={props.handleToken}
      />
      <label htmlFor={item.symbol}>{item.name}</label>
    </li>
  ));

  return (
    <section className="main-card">
      <div className="coin-card">
        <ul>
          <h5>Choose token</h5>
          {token}
        </ul>
      </div>
      <div className="active-card">
        <div>
          <h2>Network</h2>
          {props.chainId === 1 ? (
            <ul>
              <li className="network">
                <input
                  type="radio"
                  id="56"
                  value="56"
                  name="network"
                  checked={props.network === "56"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="56">Binance Smart Chain</label>
              </li>
              <li className="network">
                <input
                  type="radio"
                  value="137"
                  id="137"
                  name="network"
                  checked={props.network === "137"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="137">Polygon</label>
              </li>
            </ul>
          ) : props.chainId === 56 ? (
            <ul>
              <li className="network">
                <input
                  type="radio"
                  value="1"
                  id="1"
                  name="network"
                  checked={props.network === "1"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="1">Ethereum</label>
              </li>
              <li className="network">
                <input
                  type="radio"
                  value="137"
                  id="137"
                  name="network"
                  checked={props.network === "137"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="137">Polygon</label>
              </li>
            </ul>
          ) : props.chainId === 137 ? (
            <ul>
              <li className="network">
                <input
                  type="radio"
                  value="1"
                  id="1"
                  name="network"
                  checked={props.network === "1"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="1">Ethereum</label>
              </li>
              <li className="network">
                <input
                  type="radio"
                  value="56"
                  id="56"
                  name="network"
                  checked={props.network === "56"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="56">Binance Smart Chain</label>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="network">
                <input
                  type="radio"
                  value="1"
                  id="1"
                  name="network"
                  checked={props.network === "1"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="1">Ethereum</label>
              </li>
              <li className="network">
                <input
                  type="radio"
                  value="56"
                  id="56"
                  name="network"
                  checked={props.network === "56"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="56">Binance Smart Chain</label>
              </li>
              <li className="network">
                <input
                  type="radio"
                  value="137"
                  id="137"
                  name="network"
                  checked={props.network === "137"}
                  onChange={props.handleNetwork}
                />
                <label htmlFor="137">Polygon</label>
              </li>
            </ul>
          )}
        </div>
        {props.connectWallet.status ? (
          <div className="form">
            {props.connectWallet.balance && (
              <small>balance: {props.connectWallet.balance} usdt</small>
            )}
            <small>....network: {props.chainId}</small>
            <input type="number" name="network" placeholder="amount" />
            <button>Checkout</button>
          </div>
        ) : (
          <div className="connect">
            <button onClick={props.handleConnect}> Connect wallet</button>
          </div>
        )}
      </div>
    </section>
  );
}
