import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Version Control System",
    category: "CLI Tools",
    tools: "C++, Git-like System, File Tracking",
    image: "images/version-control-system-git.png",
  },
  {
    title: "AI NAECO BLUE Interns Portal",
    category: "Full Stack Portal",
    tools: "React.js, Next.js, Firebase, Node.js",
    image: "images/Pasted image.png",
  },
  {
    title: "Personal Portfolio Website",
    category: "Web Development",
    tools: "React.js, Tailwind CSS, Responsive Design",
    image: "images/preview.png",
  },
  {
    title: "Street Fighter Game",
    category: "Game Development",
    tools: "Java, OOP",
    image: "images/street_fighter_primer.0.1488650459.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const progressPercent = ((currentIndex + 1) / projects.length) * 100;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Desktop arrows — hidden on mobile */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators — desktop only */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>

          {/* Mobile controls — prev/next buttons + progress bar */}
          <div className="mobile-controls">
            <button
              className="mobile-nav-btn"
              onClick={goToPrev}
              aria-label="Previous project"
              data-cursor="disable"
            >
              <MdArrowBack size={18} />
            </button>

            <div className="mobile-progress-wrap" ref={progressRef}>
              <div
                className="mobile-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="mobile-counter">
              {currentIndex + 1} / {projects.length}
            </span>

            <button
              className="mobile-nav-btn"
              onClick={goToNext}
              aria-label="Next project"
              data-cursor="disable"
            >
              <MdArrowForward size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;