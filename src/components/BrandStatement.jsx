import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BrandStatement.css";

gsap.registerPlugin(ScrollTrigger);

function BrandStatement({ t }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-statement-eyebrow", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".brand-statement-line", {
        opacity: 0,
        y: 100,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".brand-statement-bottom", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="brand-statement"
    >
      <div className="brand-statement-inner">

        <p className="brand-statement-eyebrow">
          {t.brandStatement.eyebrow}
        </p>

        <div className="brand-statement-text">
          <div className="brand-statement-line">
            {t.brandStatement.line1}
          </div>

          <div className="brand-statement-line accent">
            {t.brandStatement.line2}
          </div>

          <div className="brand-statement-line">
            {t.brandStatement.line3}
          </div>
        </div>

        <div className="brand-statement-bottom">
          <p>
            {t.brandStatement.description}
          </p>

          <span className="brand-statement-mark">
            ROASTÉ
          </span>
        </div>

      </div>
    </section>
  );
}

export default BrandStatement;