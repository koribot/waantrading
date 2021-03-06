import React, { useContext, useState } from "react";
import styles from "../styles/Navbar.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialUISwitch from "../../helpers/toggleSwitch";
import category from "../../helpers/category";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ThemeContext from "../../helpers/Contexts/Themecontext";
import CartModal from "../../helpers/modals/CartModal";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const Navbar = ({ mouse }) => {
  // states
  const { theme, toggleTheme, setModal } = useContext(ThemeContext);
  const [width, setWidth] = useState(38.400000000000006);
  const [openToggle, setOpenToggle] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [user, setUser] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const route = useNavigate();

  const handleclick = (e) => {
    const data = e.target.value;
    setWidth(data.length * 12.8);
  };

  const goto = (e) => {
    if (e === "sellnow") route("/Sell-now");
  };

  const handleChange = (e) => {
    const data = e.target.value;

    if (data === "Log in") route("/Log-in");
    if (data === "Sign up") route("/Sign-up");
  };

  const handleMouseOver = (e) => {
    const element = document.getElementsByClassName(
      `${styles.cartModal__container}`
    )[0];
    const position = element.getBoundingClientRect();
    // console.log("div X position", position.x);
    // console.log("Client X Position", e.clientX);
    if (mouse) {
      if (!mouseOver) {
        if (e.clientX < position.x - 9 || e.clientX > position.x + 9) {
          const cartContainer = document.getElementsByClassName(
            `${styles.cartModal__container}`
          )[0];
          cartContainer.style.border = "2px solid black";
          cartContainer.style.backgroundColor = "rgba(255, 254, 254, 0.171)";
          cartContainer.style.cursor = "pointer";
          mouse && setCartModal(true);
          setModal(true);
          const modalID = document.getElementById("modal");
          modalID.classList.add("modal");
          document.body.style.overflow = "hidden";
          setMouseOver(true);
        }
      }
    }
  };

  const handleMouseLeave = (e) => {
    const element = document.getElementsByClassName(
      `${styles.cartModal__container}`
    )[0];
    const position = element.getBoundingClientRect();

    if (mouseOver) {
      // if (e.clientX > position.x - 50) {
      const cartContainer = document.getElementsByClassName(
        `${styles.cartModal__container}`
      )[0];
      cartContainer.style.border = "none";
      cartContainer.style.backgroundColor = "transparent";

      setCartModal(false);
      setMouseOver(false);
      const modalID = document.getElementById("modal");
      modalID.classList.remove("modal");
      document.body.style.overflow = "auto";
      // }
    }
  };

  const handleCartClick = () => {
    route("/view-cart");
    const modalID = document.getElementById("modal");
    modalID.classList.remove("modal");
    document.body.style.overflow = "auto";
  };
  return (
    <>
      {/* THEME MODE */}
      <div className={`${styles.container} dark-div-bg`}>
        <div className={styles.toggleSwitchIconContainer}>
          <div className={styles.toggleSwitch}>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    className={styles.toggleSwitchIcon}
                    onChange={toggleTheme}
                    size="small"
                    checked={theme === "Dark"}
                  />
                }
                label={theme}
              />
            </FormGroup>
          </div>
        </div>

        <div className={styles.cart__container}>
          <div
            className={styles.cartModal__container}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <ShoppingCartOutlinedIcon
              className={styles.cart__icon}
              onClick={handleCartClick}
            />

            {cartModal && (
              <div className={styles.open}>
                <CartModal cartModal={cartModal} setCartModal={setCartModal} />
              </div>
            )}
            <p className="dark-text-color-black">0</p>
          </div>
        </div>
      </div>

      <div className={`${styles.navbar} dark-div-bg dark-div-shadow`}>
        {/* SEARCH BAR */}
        <div className={styles.navbar__container}>
          <div className={styles.navbar__list__container}>
            <div className={styles.logo__container}>
              <a href="/">
                <img
                  src={require("../../assests/logo2.png")}
                  className={styles.logo}
                  alt="logo"
                />
              </a>
            </div>

            <div
              className={`${styles.leftside} ${
                openToggle ? styles.openLeftSide : styles.leftside
              }`}
            >
              <div className={styles.searchBar__container}>
                <select
                  className={`${styles.searchByCategory} dark-select-bg`}
                  style={{ width: `${width}px` }}
                  onChange={handleclick}
                >
                  <option className="dark-text-color-white">All</option>
                  {category?.map((item) => {
                    return (
                      <option key={item.id} className="dark-text-color-white">
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className={styles.form}
                >
                  <input
                    className={`${styles.navbar__searchBar} dark-input-text-color-black`}
                    type="text"
                  />
                </form>

                <SearchOutlinedIcon
                  className={`${styles.searchIcon}  ${
                    theme === "Dark" ? styles.searchIconDarkMode : undefined
                  }`}
                />
              </div>

              {/* MENU LISTS */}
              <div className={styles.menu__list__container}>
                <div className={styles.navbar__list__item}>
                  <li onClick={() => goto("sellnow")}>Sell Now</li>
                </div>
                <div className={styles.navbar__list__item}>
                  {!user ? (
                    <AccountBoxIcon className={styles.profile__icon} />
                  ) : (
                    <img
                      src="https://www.upwork.com/profile-portraits/c1Ctq5rjd4g2xYYst_NCnEfSeoVFLhBo1NGhHltL88jV9TLgwji__QgE6v2Xw-Xyew"
                      alt="profile pic"
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        border: "2px solid black",
                        display: "flex",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <select
                    value=" "
                    className={styles.userOptions}
                    onChange={handleChange}
                    id="select__account"
                  >
                    <option hidden={true}></option>
                    <option>Log in</option>
                    <option>Sign up</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              onClick={() => setOpenToggle(!openToggle)}
              className={styles.menulist_icon}
              // id={theme === "Dark" ? "dark" : undefined}
            >
              {!openToggle ? (
                <MenuIcon className={styles.menulist_icon} />
              ) : (
                <CloseIcon className={styles.menulist_icon} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
