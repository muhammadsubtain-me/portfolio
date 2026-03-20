import { useEffect } from "react";
import "./styles/TechStack.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiReact, SiNextdotjs, SiJavascript, SiNodedotjs, SiTailwindcss, SiHtml5, SiMongodb, SiPostgresql, SiGithub } from "react-icons/si";
import { FaJava } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React.js", percentage: 90, color: "#61dafb", icon: <SiReact size={36} color="#61dafb" /> },
  { name: "Next.js", percentage: 85, color: "#ffffff", icon: <SiNextdotjs size={36} color="#ffffff" /> },
  { name: "JavaScript", percentage: 90, color: "#f7df1e", icon: <SiJavascript size={36} color="#f7df1e" /> },
  { name: "Node.js", percentage: 80, color: "#339933", icon: <SiNodedotjs size={36} color="#339933" /> },
  { name: "Java", percentage: 80, color: "#007396", icon: <FaJava size={36} color="#007396" /> },
  { name: "Tailwind CSS", percentage: 90, color: "#38b2ac", icon: <SiTailwindcss size={36} color="#38b2ac" /> },
  { name: "HTML/CSS", percentage: 95, color: "#e34f26", icon: <SiHtml5 size={36} color="#e34f26" /> },
  { name: "MongoDB", percentage: 80, color: "#47A248", icon: <SiMongodb size={36} color="#47A248" /> },
  { name: "PostgreSQL", percentage: 75, color: "#4169E1", icon: <SiPostgresql size={36} color="#4169E1" /> },
  { name: "Git/GitHub", percentage: 85, color: "#F05032", icon: <SiGithub size={36} color="#F05032" /> }
];

const TechStack = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Animate stroke-dashoffset for circular progress
      gsap.to(".circular-progress-circle", {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
        strokeDashoffset: (_i, target) => {
          const value = target.getAttribute("data-percentage");
          const radius = 65;
          const circumference = 2 * Math.PI * radius;
          return circumference - (Number(value) / 100) * circumference;
        },
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="skills-section section-container" id="skills">
      <h2>Technical <span>Skills</span></h2>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const radius = 65;
          const circumference = 2 * Math.PI * radius;
          return (
            <div className="skill-card" key={index}>
              <div className="skill-circle-container">
                <svg className="skill-svg" width="150" height="150" viewBox="0 0 150 150">
                  <circle
                    className="circular-bg"
                    cx="75"
                    cy="75"
                    r={radius}
                    strokeWidth="10"
                  />
                  <circle
                    className="circular-progress-circle"
                    cx="75"
                    cy="75"
                    r={radius}
                    strokeWidth="10"
                    stroke={skill.color}
                    data-percentage={skill.percentage}
                    style={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                  />
                </svg>
                <div className="skill-percentage">
                  {skill.icon}
                  <span style={{ fontSize: "16px", marginTop: "8px" }}>{skill.percentage}%</span>
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
