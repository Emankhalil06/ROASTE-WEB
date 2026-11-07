
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./InteractiveMenu.css";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: "arabic",
    category: "coffee",
    image: "/assets/images/products/arabic-coffee.png",
    price: 4.5,
  },
  {
    id: "espresso",
    category: "coffee",
    image: "/assets/images/products/espresso.png",
    price: 2.75,
  },
  {
    id: "latte",
    category: "milk",
    image: "/assets/images/products/latte.png",
    price: 3.5,
  },
  {
    id: "coldBrew",
    category: "cold",
    image: "/assets/images/products/cold-brew.png",
    price: 3.75,
  },
];

function InteractiveMenu({ t, addToCart, language }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeItem, setActiveItem] = useState(0);

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  const currentItem =
    filteredItems.find(
      (item) => item.id === menuItems[activeItem]?.id
    ) || filteredItems[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-eyebrow", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".menu-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".menu-intro", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".menu-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const changeItem = (itemId) => {
    const index = menuItems.findIndex(
      (item) => item.id === itemId
    );

    if (index !== -1) {
      setActiveItem(index);
    }
  };

  const changeCategory = (category) => {
    setActiveCategory(category);

    const firstItem = menuItems.find(
      (item) =>
        category === "all" ||
        item.category === category
    );

    if (firstItem) {
      const index = menuItems.findIndex(
        (item) => item.id === firstItem.id
      );

      setActiveItem(index);
    }
  };

  useEffect(() => {
    if (!imageRef.current) return;

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
        ease: "power2.out",
      }
    );
  }, [activeItem, activeCategory]);

  if (!currentItem) return null;

  const currentTranslation =
    t.collectionMenu.products[currentItem.id];

  const categories = [
    {
      id: "all",
      label: t.collectionMenu.categories.all,
    },
    {
      id: "coffee",
      label: t.collectionMenu.categories.coffee,
    },
    {
      id: "milk",
      label: t.collectionMenu.categories.milk,
    },
    {
      id: "cold",
      label: t.collectionMenu.categories.cold,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="menu-section"
    >
      {/* HEADER */}
      <div className="menu-header">
        <div>
          <p className="menu-eyebrow">
            {t.collectionMenu.eyebrow}
          </p>

          <h2 className="menu-title">
            {t.collectionMenu.title}
            <br />

            <span>
              {t.collectionMenu.titleAccent}
            </span>
          </h2>
        </div>

        <div className="menu-intro">
          <p>
            {t.collectionMenu.intro}
          </p>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="menu-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`menu-category ${
              activeCategory === category.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              changeCategory(category.id)
            }
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="menu-content">

        {/* PRODUCT LIST */}
        <div className="menu-list">
          {filteredItems.map((item) => {
            const translation =
              t.collectionMenu.products[item.id];

            return (
              <button
                key={item.id}
                className={`menu-item ${
                  currentItem?.id === item.id
                    ? "active"
                    : ""
                }`}
                onMouseEnter={() =>
                  changeItem(item.id)
                }
                onClick={() =>
                  changeItem(item.id)
                }
              >
                <span className="menu-item-number">
                  {String(
                    menuItems.findIndex(
                      (product) =>
                        product.id === item.id
                    ) + 1
                  ).padStart(2, "0")}
                </span>

                <span className="menu-item-name">
                  {translation.name}
                </span>

                <span className="menu-item-price">
                  {translation.price}
                </span>

                <span className="menu-item-arrow">
                  ↗
                </span>
              </button>
            );
          })}
        </div>

        {/* FEATURED PRODUCT */}
        <div className="menu-feature">

          <div className="menu-image-wrapper">
            <img
              ref={imageRef}
              src={currentItem.image}
              alt={currentTranslation.name}
              className="menu-image"
            />

            <div className="menu-image-overlay">
              <span>
                ROASTÉ / MENU
              </span>

              <span>
                {String(
                  menuItems.findIndex(
                    (item) =>
                      item.id === currentItem.id
                  ) + 1
                ).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="menu-feature-info">

            <div>
              <span className="menu-feature-category">
                {currentTranslation.category}
              </span>

              <h3>
                {currentTranslation.name}
              </h3>

              <p className="menu-feature-subtitle">
                {currentTranslation.subtitle}
              </p>
            </div>

            <p className="menu-feature-description">
              {currentTranslation.description}
            </p>

          </div>

          {/* ADD TO CART */}
          <button
  className="menu-add-button"
  onClick={() =>
    addToCart({
      id: currentItem.id,
      name: currentTranslation.name,
      subtitle: currentTranslation.subtitle,
      price: currentItem.price,
      image: currentItem.image,
    })
  }
>
  {language === "ar" ? "أضف إلى السلة" : "ADD TO CART"}
</button>

        </div>
      </div>
    </section>
  );
}

export default InteractiveMenu;
