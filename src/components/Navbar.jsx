
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar({
  language,
  setLanguage,
  t,
  cartCount,
  onCartClick,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "en" ? "ar" : "en"
    );
  };

  const navItems = [
    {
      label: t.nav.story,
      target: "story",
    },
    {
      label: t.nav.craft,
      target: "process",
    },
    {
      label: t.nav.collection,
      target: "collection",
    },
    {
      label: t.nav.locations,
      target: "locations",
    },
    {
      label: t.nav.order,
      target: "order",
    },
  ];

  const scrollToSection = (target) => {
    const element =
      document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="navbar-inner">

        {/* LOGO */}

        <button
          className="navbar-logo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ROASTÉ
        </button>


        {/* NAVIGATION */}

        <div className="navbar-links">

          {navItems.map((item) => (
            <button
              key={item.target}
              className="navbar-link"
              onClick={() =>
                scrollToSection(
                  item.target
                )
              }
            >
              {item.label}
            </button>
          ))}

        </div>


        {/* RIGHT SIDE */}

        <div className="navbar-actions">

          {/* CART */}

          <button
  className="navbar-cart"
  onClick={onCartClick}
  aria-label="Open shopping bag"
>
  <span className="cart-label">
    {language === "ar" ? "السلة" : "BAG"}
  </span>

  <span className={`cart-count ${cartCount > 0 ? "has-items" : ""}`}>
    {String(cartCount).padStart(2, "0")}
  </span>
</button>


          {/* LANGUAGE */}

          <button
            className="language-button"
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
            {language === "en"
              ? "العربية"
              : "EN"}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
