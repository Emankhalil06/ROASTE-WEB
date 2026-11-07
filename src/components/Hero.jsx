
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";

function Hero({ t }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        imageRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      )
      .fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=1.3"
      )
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4"
      );

    const handleScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(imageRef.current, {
        y: scrollY * 0.18,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timeline.kill();
    };
  }, []);

  return (
    <section ref={heroRef} id="top" className="hero">
      <div className="hero-image-wrapper">
        <img
          ref={imageRef}
          src="/assets/images/hero/hero-coffee.png"
          alt="ROASTÉ coffee"
          className="hero-image"
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <p ref={eyebrowRef} className="hero-eyebrow">
          {t.hero.eyebrow}
        </p>

        <h1 ref={titleRef}>
          {t.hero.title}
          <br />
          <span>{t.hero.titleAccent}</span>
        </h1>

        <p ref={descriptionRef} className="hero-description">
          {t.hero.description}
        </p>

        <a ref={buttonRef} href="#story" className="hero-button">
          {t.hero.cta}
          <span>↓</span>
        </a>
      </div>

      <div className="hero-scroll">
        <span>{t.common.explore}</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
