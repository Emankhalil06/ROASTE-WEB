import { useState } from "react";
import translations from "./data/translations";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Process from "./components/Process";
import SignatureCollection from "./components/SignatureCollection";
import InteractiveMenu from "./components/InteractiveMenu";
import Locations from "./components/Locations";
import BrandStatement from "./components/BrandStatement";
import Order from "./components/Order";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[language];

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((product) => product.id === item.id);

      if (existing) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + amount),
              }
            : item
        )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const deliveryFee = cart.length > 0 ? 1.5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div
      className={`app ${language === "ar" ? "rtl" : "ltr"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <>
          <Navbar
            language={language}
            setLanguage={setLanguage}
            t={t}
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
          />

          <main>
            <Hero t={t} />
            <Story t={t} />
            <Process t={t} />
            <SignatureCollection t={t} />

            <InteractiveMenu
  t={t}
  addToCart={addToCart}
  language={language}
/>

            <Locations t={t} />
            <BrandStatement t={t} />

            <Order
              t={t}
              cart={cart}
              addToCart={addToCart}
              total={total}
            />

            <Footer t={t} />
          </main>

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            language={language}
          />
        </>
      )}
    </div>
  );
}

export default App;