import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Locations.css";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    id: "amman",
    number: "01",
    city: "Amman",
    status: "COMING SOON",
    image: "/assets/images/locations/amman.png",
  },
  {
    id: "irbid",
    number: "02",
    city: "Irbid",
    status: "COMING SOON",
    image: "/assets/images/locations/irbid.png",
  },
  {
    id: "zarqa",
    number: "03",
    city: "Zarqa",
    status: "COMING SOON",
    image: "/assets/images/locations/zarqa.png",
  },
];

function Locations({ t }) {
  const sectionRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".locations-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".locations-intro", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".locations-content", {
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

  const currentLocation = locations[activeLocation];

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="locations-section"
    >
      <div className="locations-top">
        <div className="locations-heading">
          <p className="locations-eyebrow">
            {t.locations.eyebrow}
          </p>

          <h2>
            {t.locations.title}
            <br />
            <span>{t.locations.titleAccent}</span>
          </h2>
        </div>

        <div className="locations-intro">
          <p>{t.locations.intro}</p>
        </div>
      </div>

      <div className="locations-content">
        <div className="locations-list">
          {locations.map((location, index) => (
            <button
              key={location.id}
              className={`location-item ${
                activeLocation === index ? "active" : ""
              }`}
              onMouseEnter={() => setActiveLocation(index)}
              onClick={() => setActiveLocation(index)}
            >
              <span className="location-number">
                {location.number}
              </span>

              <span className="location-city">
                {t.locations.cities[location.id]}
              </span>

              <span className="location-status">
                {location.status}
              </span>

              <span className="location-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="location-display">
          <div className="location-image-wrapper">
            <img
              src={currentLocation.image}
              alt={t.locations.cities[currentLocation.id]}
              className="location-image"
            />

            <div className="location-image-overlay">
              <span>ROASTÉ / JORDAN</span>
              <span>{currentLocation.number}</span>
            </div>
          </div>

          <div className="location-info">
            <div>
              <span className="location-label">
                {t.locations.statusLabel}
              </span>

              <h3>
                {t.locations.cities[currentLocation.id]}
              </h3>

              <p>{t.locations.comingSoon}</p>
            </div>

            <span className="location-arrow-large">↗</span>
          </div>
        </div>
      </div>

      <div className="locations-bottom">
        <span>{t.locations.future}</span>

        <span>
          {String(activeLocation + 1).padStart(2, "0")} /{" "}
          {String(locations.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default Locations;