import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Story.css";

gsap.registerPlugin(ScrollTrigger);

function Story({ t }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const secondImageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.15,
          y: 80,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        secondImageRef.current,
        {
          opacity: 0,
          x: 100,
          rotate: 2,
        },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secondImageRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.to(imageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(secondImageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="story-section">
      <div className="story-intro">
        <div>
          <p className="story-eyebrow">
            {t.story.eyebrow}
          </p>

          <h2 ref={titleRef}>
            {t.story.title}
            <br />
            <span>{t.story.titleAccent}</span>
          </h2>
        </div>

        <div ref={textRef} className="story-copy">
          <p>
            {t.story.paragraph1}
          </p>

          <p>
            {t.story.paragraph2}
          </p>

          <a href="#process" className="story-link">
            {t.story.cta}
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="story-visuals">
        <div
          ref={imageRef}
          className="story-image story-image-large"
        >
          <img
            src="/assets/images/story/story-coffee.png"
            alt="Coffee ritual"
          />
        </div>

        <div
          ref={secondImageRef}
          className="story-image story-image-small"
        >
          <img
            src="/assets/images/story/story-roasting.png"
            alt="Coffee roasting"
          />

          <span>{t.story.imageLabel}</span>
        </div>
      </div>
    </section>
  );
}

export default Story;