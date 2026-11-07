import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete,
    });

    timeline
      .fromTo(
        logoRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      )
      .fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "center",
        },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(screenRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        delay: 0.7,
      });

    return () => timeline.kill();
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loading-screen">
      <div className="loading-content">
        <img
          ref={logoRef}
          src="/assets/logo/roaste-logo.png"
          alt="ROASTÉ"
          className="loading-logo"
        />

        <div ref={lineRef} className="loading-line" />

        <p ref={textRef} className="loading-text">
          Rooted in Jordan. Crafted for the world.
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;