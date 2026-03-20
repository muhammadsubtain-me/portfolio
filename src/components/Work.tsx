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

  // Touch swipe refs
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Scrollbar thumb drag refs
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDraggingThumb = useRef(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);

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
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // ── Touch swipe on carousel ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? goToNext() : goToPrev();
    }
  };

  // ── Scrollbar thumb drag (pointer events — works for both touch and mouse) ──
  const handleThumbPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingThumb.current = true;
    dragStartX.current = e.clientX;
    dragStartIndex.current = currentIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleThumbPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingThumb.current || !trackRef.current) return;
      const trackWidth = trackRef.current.offsetWidth;
      const thumbWidth = trackWidth / projects.length;
      const dx = e.clientX - dragStartX.current;
      const indexDelta = Math.round(dx / thumbWidth);
      const newIndex = Math.max(
        0,
        Math.min(projects.length - 1, dragStartIndex.current + indexDelta)
      );
      if (newIndex !== currentIndex) goToSlide(newIndex);
    },
    [currentIndex, goToSlide]
  );

  const handleThumbPointerUp = () => {
    isDraggingThumb.current = false;
  };

  // Also allow tapping on the track (not thumb) to jump to that slide
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor((x / rect.width) * projects.length);
    goToSlide(Math.max(0, Math.min(projects.length - 1, index)));
  };

  const thumbPercent = 100 / projects.length;
  const thumbOffset = currentIndex * thumbPercent;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Desktop arrows — visible on screens > 600px, sit inside the wrapper */}
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
          <div
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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

            {/* ── Mobile scrollbar ── */}
            <div
              className="mobile-scrollbar-track"
              ref={trackRef}
              onClick={handleTrackClick}
            >
              <div
                className="mobile-scrollbar-thumb"
                ref={thumbRef}
                style={{
                  width: `${thumbPercent}%`,
                  left: `${thumbOffset}%`,
                }}
                onPointerDown={handleThumbPointerDown}
                onPointerMove={handleThumbPointerMove}
                onPointerUp={handleThumbPointerUp}
                onPointerCancel={handleThumbPointerUp}
              />
            </div>
          </div>

          {/* Desktop dots */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;