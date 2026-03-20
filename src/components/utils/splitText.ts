import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother"; // COMMENTED OUT TRIAL
// import { SplitText } from "gsap-trial/SplitText"; // COMMENTED OUT TRIAL

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  // split?: any; // Changed from SplitText to any
}

// Register only the free ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  // --- REPLACEMENT FOR PARAGRAPHS ---
  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    
    // Kill existing animations to prevent overlaps
    if (para.anim) {
      para.anim.kill();
    }

    // Instead of splitting words, we fade in the whole paragraph smoothly
    para.anim = gsap.fromTo(
      para,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  // --- REPLACEMENT FOR TITLES ---
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.kill();
    }

    // Instead of splitting characters, we do a professional "Slide & Fade"
    title.anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 40, rotate: 2 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  // Removed the refresh event listener that calls setSplitText 
  // to prevent infinite loops now that SplitText isn't resetting.
}