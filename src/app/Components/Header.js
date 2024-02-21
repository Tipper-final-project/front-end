import coins from "./tipper-image/coins.png";

const Header = () => {
  return (
    <header>
      <span className="tipper">
        <h1>
          Tipper{" "}
          <img
            className="tipper-image"
            src={coins.src}
            alt="logo image"
            height={28}
            width={18}
          />
        </h1>
      </span>
    </header>
  );
};

export default Header;
