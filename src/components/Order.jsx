import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Order.css";

gsap.registerPlugin(ScrollTrigger);

const orderItems = [
  {
    id: "arabic",
    image: "/assets/images/products/arabic-coffee.png",
    price: 4.5,
  },
  {
    id: "espresso",
    image: "/assets/images/products/espresso.png",
    price: 2.75,
  },
  {
    id: "latte",
    image: "/assets/images/products/latte.png",
    price: 3.5,
  },
  {
    id: "coldBrew",
    image: "/assets/images/products/cold-brew.png",
    price: 3.75,
  },
];

const extras = [
  { id: "extraShot", price: 0.75 },
  { id: "extraMilk", price: 0.5 },
  { id: "cardamom", price: 0.35 },
];

function Order({ t }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(orderItems[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".order-eyebrow", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".order-title", {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".order-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".order-card",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const itemTranslation =
    t.order.items[selectedItem.id];

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const extrasTotal = selectedExtras.reduce(
    (total, id) => {
      const extra = extras.find(
        (item) => item.id === id
      );

      return total + (extra?.price || 0);
    },
    0
  );

  const total =
    (selectedItem.price + extrasTotal) * quantity;

  const changeItem = (item) => {
    if (item.id === selectedItem.id) return;

    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setSelectedItem(item);

        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.05,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          }
        );
      },
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
  };

  return (
    <section
      ref={sectionRef}
      id="order"
      className="order-section"
    >
      <div className="order-header">
        <div>
          <p className="order-eyebrow">
            {t.order.eyebrow}
          </p>

          <h2 className="order-title">
            {t.order.title}
            <br />
            <span>{t.order.titleAccent}</span>
          </h2>
        </div>

        <p className="order-intro">
          {t.order.intro}
        </p>
      </div>

      <div className="order-card">
        <div className="order-visual">
          <img
            ref={imageRef}
            src={selectedItem.image}
            alt={itemTranslation.name}
            className="order-image"
          />

          <div className="order-image-overlay">
            <span>ROASTÉ / ORDER</span>
            <span>01</span>
          </div>
        </div>

        <div className="order-panel">
          {/* STEP 01 */}

          <div className="order-step">
            <span>01</span>
            <h3>{t.order.chooseDrink}</h3>
          </div>

          <div className="order-drinks">
            {orderItems.map((item) => {
              const translation =
                t.order.items[item.id];

              return (
                <button
                  key={item.id}
                  className={`order-drink ${
                    selectedItem.id === item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    changeItem(item)
                  }
                >
                  <span>
                    {translation.name}
                  </span>

                  <small>
                    {item.price.toFixed(2)} JD
                  </small>
                </button>
              );
            })}
          </div>

          {/* STEP 02 */}

          <div className="order-step">
            <span>02</span>
            <h3>{t.order.extrasTitle}</h3>
          </div>

          <div className="order-extras">
            {extras.map((extra) => {
              const translation =
                t.order.extras[extra.id];

              const selected =
                selectedExtras.includes(
                  extra.id
                );

              return (
                <button
                  key={extra.id}
                  className={`order-extra ${
                    selected ? "active" : ""
                  }`}
                  onClick={() =>
                    toggleExtra(extra.id)
                  }
                >
                  <span className="extra-check">
                    {selected ? "✓" : "+"}
                  </span>

                  <span>
                    {translation.name}
                  </span>

                  <small>
                    +{extra.price.toFixed(2)} JD
                  </small>
                </button>
              );
            })}
          </div>

          {/* STEP 03 */}

          <div className="order-step">
            <span>03</span>
            <h3>{t.order.quantityTitle}</h3>
          </div>

          <div className="quantity-control">
            <button
              onClick={decreaseQuantity}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>

          {/* SUMMARY */}

          <div className="order-summary">
            <div>
              <span>
                {t.order.total}
              </span>

              <strong>
                {total.toFixed(2)} JD
              </strong>
            </div>

            <button
              className="order-button"
              onClick={placeOrder}
            >
              {t.order.button}
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* ORDER CONFIRMATION */}

      {orderPlaced && (
        <div className="order-confirmation">
          <div className="confirmation-inner">
            <span className="confirmation-check">
              ✓
            </span>

            <p className="confirmation-eyebrow">
              {t.order.confirmationEyebrow}
            </p>

            <h3>
              {t.order.confirmationTitle}
            </h3>

            <p className="confirmation-text">
              {t.order.confirmationText}
            </p>

            <div className="confirmation-summary">
              <span>
                {itemTranslation.name}
              </span>

              <strong>
                {total.toFixed(2)} JD
              </strong>
            </div>

            <button
              className="confirmation-close"
              onClick={() =>
                setOrderPlaced(false)
              }
            >
              {t.order.continueButton}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Order;