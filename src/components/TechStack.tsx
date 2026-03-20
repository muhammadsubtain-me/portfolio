import { useEffect, useState } from "react";
import "./styles/TechStack.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact, SiNextdotjs, SiJavascript, SiExpress,
  SiTailwindcss, SiHtml5, SiMongodb, SiPostgresql, SiGithub
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React.js",     percentage: 80, color: "#61dafb", icon: SiReact,       iconColor: "#61dafb" },
  { name: "Next.js",      percentage: 75, color: "#ffffff", icon: SiNextdotjs,   iconColor: "#ffffff" },
  { name: "JavaScript",   percentage: 80, color: "#f7df1e", icon: SiJavascript,  iconColor: "#f7df1e" },
  { name: "Express.js",   percentage: 70, color: "#ffffff", icon: SiExpress,     iconColor: "#ffffff" },
  { name: "Java",         percentage: 70, color: "#007396", icon: FaJava,        iconColor: "#007396" },
  { name: "Tailwind CSS", percentage: 80, color: "#38b2ac", icon: SiTailwindcss, iconColor: "#38b2ac" },
  { name: "HTML/CSS",     percentage: 85, color: "#e34f26", icon: SiHtml5,       iconColor: "#e34f26" },
  { name: "MongoDB",      percentage: 70, color: "#47A248", icon: SiMongodb,     iconColor: "#47A248" },
  { name: "PostgreSQL",   percentage: 65, color: "#4169E1", icon: SiPostgresql,  iconColor: "#4169E1" },
  { name: "Git/GitHub",   percentage: 75, color: "#F05032", icon: SiGithub,      iconColor: "#F05032" },
];

function getCircleSize() {
  if (typeof window === "undefined") return { svgSize: 150, radius: 65, iconSize: 36, strokeWidth: 10 };
  const w = window.innerWidth;
  // On mobile cards are roughly (50vw - 24px) wide — keep circle comfortably inside
  if (w <= 400) return { svgSize: 90,  radius: 38, iconSize: 20, strokeWidth: 7 };
  if (w <= 768) return { svgSize: 110, radius: 47, iconSize: 26, strokeWidth: 8 };
  return               { svgSize: 150, radius: 65, iconSize: 36, strokeWidth: 10 };
}

const TechStack = () => {
  const [circleSize, setCircleSize] = useState(getCircleSize);

  useEffect(() => {
    const onResize = () => setCircleSize(getCircleSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Kill any existing ScrollTrigger instances for this section first
    ScrollTrigger.getAll()
      .filter((t) => t.vars.trigger === ".skills-section")
      .forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // --- Card entrance ---
      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 85%",
            // Once fired, cards stay visible regardless of scroll position
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          // Safety net: if ScrollTrigger never fires, show after 2s
          onStart: () => {
            clearTimeout(fallbackTimer);
          },
        }
      );

      // --- Circular progress animation ---
      gsap.to(".circular-progress-circle", {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 85%",
          once: true,
        },
        strokeDashoffset: (_i, target) => {
          const percentage = Number(target.getAttribute("data-percentage"));
          const radius     = Number(target.getAttribute("data-radius"));
          const circumference = 2 * Math.PI * radius;
          return circumference - (percentage / 100) * circumference;
        },
        duration: 1.4,
        ease: "power2.out",
        stagger: 0.08,
      });
    });

    // Fallback: if ScrollTrigger never fires (e.g. section already in view on load,
    // or mobile scroll issues), make everything visible after 800ms
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".skill-card").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      document.querySelectorAll<SVGCircleElement>(".circular-progress-circle").forEach((circle) => {
        const percentage = Number(circle.getAttribute("data-percentage"));
        const radius     = Number(circle.getAttribute("data-radius"));
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.transition = "stroke-dashoffset 1.4s ease";
        circle.style.strokeDashoffset = String(offset);
      });
    }, 800);

    return () => {
      ctx.revert();
      clearTimeout(fallbackTimer);
    };
  }, [circleSize]); // re-run when circle dimensions change

  const { svgSize, radius, iconSize, strokeWidth } = circleSize;
  const center = svgSize / 2;

  return (
    <div className="skills-section section-container" id="skills">
      <h2>Technical <span>Skills</span></h2>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const circumference = 2 * Math.PI * radius;
          const IconComponent = skill.icon;

          return (
            <div className="skill-card" key={index}>
              <div
                className="skill-circle-container"
                style={{ width: svgSize, height: svgSize }}
              >
                <svg
                  className="skill-svg"
                  width={svgSize}
                  height={svgSize}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                >
                  <circle
                    className="circular-bg"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                  />
                  <circle
                    className="circular-progress-circle"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={skill.color}
                    data-percentage={skill.percentage}
                    data-radius={radius}
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: circumference,
                    }}
                  />
                </svg>

                <div className="skill-percentage">
                  <IconComponent size={iconSize} color={skill.iconColor} />
                  <span style={{ fontSize: svgSize <= 90 ? "11px" : "13px", marginTop: "5px" }}>
                    {skill.percentage}%
                  </span>
                </div>
              </div>

              <h3 className="skill-name">{skill.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;