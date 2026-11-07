import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    key: "select",
    image: "/assets/images/process/process-select.png",
  },
  {
    number: "02",
    key: "roast",
    image: "/assets/images/process/process-roast.png",
  },
  {
    number: "03",
    key: "grind",
    image: "/assets/images/process/process-grind.png",
  },
  {
    number: "04",
    key: "brew",
    image: "/assets/images/process/process-brew.png",
  },
];

function Process({ t }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);

  // =========================================
  // GSAP + SCROLLTRIGGER
  // =========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -----------------------------------------
      // HEADING
      // -----------------------------------------

      gsap.from(".process-heading", {
        opacity: 0,
        y: 70,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // -----------------------------------------
      // INTRO
      // -----------------------------------------

      gsap.from(".process-intro", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // -----------------------------------------
      // STEP TRIGGERS
      // DESKTOP + MOBILE
      // -----------------------------------------

      if (window.innerWidth > 768) {
  processSteps.forEach((_, index) => {
    ScrollTrigger.create({
      trigger: `.process-step-${index}`,
      start: "top 55%",
      end: "bottom 55%",

      onEnter: () => {
        setActiveStep(index);
      },

      onEnterBack: () => {
        setActiveStep(index);
      },
    });
  });
}

      // -----------------------------------------
      // IMAGE PARALLAX
      // DESKTOP ONLY
      // -----------------------------------------

      if (window.innerWidth > 768) {
        gsap.fromTo(
          imageRef.current,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================================
// IMAGE TRANSITION
// =========================================


  const current = processSteps[activeStep];
  const currentTranslation = t.process.steps[current.key];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
    >
      {/* =====================================
          TOP
      ===================================== */}

      <div className="process-top">
        <div className="process-heading">
          <p className="process-eyebrow">
            {t.process.eyebrow}
          </p>

          <h2>
            {t.process.title}
            <br />
            <span>{t.process.titleAccent}</span>
          </h2>
        </div>

        <div className="process-intro">
          <p>{t.process.intro}</p>
        </div>
      </div>

      {/* =====================================
          EXPERIENCE
      ===================================== */}

      <div className="process-experience">

        {/* STEPS */}

        <div className="process-steps">
          {processSteps.map((step, index) => {
            const translation =
              t.process.steps[step.key];

            return (
              <div
  key={step.number}
  className={`process-step process-step-${index} ${
    activeStep === index ? "active" : ""
  }`}
  onMouseEnter={() => setActiveStep(index)}
>
                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-content">
                  <h3>
                    {translation.title}
                  </h3>

                  <p>
                    {translation.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* IMAGE */}

        <div className="process-visual">
          <div className="process-image-wrapper">
            <img
              ref={imageRef}
              src={current.image}
              alt={currentTranslation.title}
              className="process-image"
            />

            <div className="process-image-overlay">
              <span>
                ROASTÉ / CRAFT
              </span>

              <span>
                {current.number}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          PROGRESS
      ===================================== */}

      <div className="process-progress">
        <div className="process-progress-line">
          <div
            className="process-progress-fill"
            style={{
              width: `${
                ((activeStep + 1) /
                  processSteps.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="process-progress-label">
          <span>
            {currentTranslation.title}
          </span>

          <span>
            {String(activeStep + 1).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(processSteps.length).padStart(
              2,
              "0"
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Process;