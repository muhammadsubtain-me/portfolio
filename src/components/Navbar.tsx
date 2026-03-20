import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { FaCommentDots } from "react-icons/fa6";
import "./styles/Navbar.css";

// --- COMMENTED OUT TRIAL PLUGIN REGISTRATION ---
gsap.registerPlugin(ScrollTrigger); 
// export let smoother: any; // Commented out to prevent errors

import { useState } from "react";
import ChatBox from "./ChatBox";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  useEffect(() => {
    /* // --- COMMENTED OUT TRIAL SMOOTHER BLOCK ---
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);
    */

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        // Updated to use standard browser smooth scroll since Smoother is disabled
        const href = element.getAttribute("data-href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.replace("#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    /*
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
    */
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/#" className="navbar-title" data-cursor="disable">
            HOME
          </a>
        </div>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a href="#chat" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCommentDots size={22} />
              <HoverLinks text="LET'S CHAT" />
            </a>
          </li>
        </ul>
      </div>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;