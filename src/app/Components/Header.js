import coins from "./tipper-image/coins.png";
import LogoutButton from "./LogoutButton";

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
        {LogoutButton()}
      </span>
    </header>
  );
};

export default Header;
