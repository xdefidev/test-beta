export default function Navbar(props) {
  const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{3})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  return (
    <div className="navbar">
      <h2 className="logo">logo</h2>
      {props.address && (
        <p onClick={props.disconnect}>{truncateAddress(props.address)}</p>
      )}
    </div>
  );
}
