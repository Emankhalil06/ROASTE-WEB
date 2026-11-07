import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

function Footer({ t }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-brand", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".footer-content", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (target) => {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  return (
    <footer ref={footerRef} className="footer">

      <div className="footer-brand">
        <p className="footer-eyebrow">
          08 — ROASTÉ
        </p>

        <h2 className="footer-logo">
          ROAST<span>É</span>
        </h2>

        <p className="footer-statement">
          {t.footer.statement}
        </p>
      </div>

      <div className="footer-content">

        <div className="footer-column">
          <span className="footer-label">
            {t.footer.explore}
          </span>

          <div className="footer-links">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() =>
                  scrollToSection(item.target)
                }
              >
                {item.label}
                <span>↗</span>
              </button>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <span className="footer-label">
            {t.footer.visit}
          </span>

          <div className="footer-info">
            <p>{t.footer.city}</p>
            <p>{t.footer.hours}</p>
          </div>
        </div>

        <div className="footer-column">
          <span className="footer-label">
            {t.footer.connect}
          </span>

          <div className="footer-links">
            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Instagram <span>↗</span>
            </a>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Facebook <span>↗</span>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} ROASTÉ
        </span>

        <span>
          {t.footer.location}
        </span>

        <button
          className="back-to-top"
          onClick={scrollToTop}
        >
          {t.footer.backToTop}
          <span>↑</span>
        </button>

      </div>

    </footer>
  );
}

export default Footer;