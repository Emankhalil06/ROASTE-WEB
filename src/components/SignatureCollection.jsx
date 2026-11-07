import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SignatureCollection.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    number: "01",
    key: "arabic",
    image: "/assets/images/products/arabic-coffee.png",
  },
  {
    number: "02",
    key: "espresso",
    image: "/assets/images/products/espresso.png",
  },
  {
    number: "03",
    key: "latte",
    image: "/assets/images/products/latte.png",
  },
  {
    number: "04",
    key: "coldBrew",
    image: "/assets/images/products/cold-brew.png",
  },
];

function SignatureCollection({ t }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".collection-eyebrow", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".collection-title", {
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

      gsap.from(".collection-intro", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".product-card", {
        opacity: 0,
        y: 100,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".collection-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="collection-section"
    >
      <div className="collection-header">
        <div>
          <p className="collection-eyebrow">
            {t.collection.eyebrow}
          </p>

          <h2 className="collection-title">
            {t.collection.title}
            <br />
            <span>{t.collection.titleAccent}</span>
          </h2>
        </div>

        <div className="collection-intro">
          <p>{t.collection.intro}</p>
        </div>
      </div>

      <div className="collection-grid">
        {products.map((product) => {
          const translation =
            t.collection.products[product.key];

          return (
            <article
              className="product-card"
              key={product.number}
            >
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={translation.name}
                  className="product-image"
                />

                <div className="product-overlay">
                  <span>ROASTÉ</span>
                  <span>{product.number}</span>
                </div>
              </div>

              <div className="product-info">
                <div className="product-meta">
                  <span>{translation.subtitle}</span>
                  <span>{product.number}</span>
                </div>

                <h3>{translation.name}</h3>

                <p>{translation.description}</p>

                <div className="product-line">
                  <span>{t.collection.discover}</span>
                  <span>↗</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SignatureCollection;