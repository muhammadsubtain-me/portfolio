// import { SplitText } from "gsap-trial/SplitText"; // COMMENTED OUT TRIAL
import gsap from "gsap";
// import { smoother } from "../Navbar"; // COMMENTED OUT SMOOTHER REFERENCE

export function initialFX() {
  document.body.style.overflowY = "auto";
  
  // smoother.paused(false); // COMMENTED OUT - Smoother is disabled

  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // --- REPLACED SplitText WITH SIMPLE FADE-IN ---
  // This targets the headers and info text directly
  const textTargets = [".landing-info h3", ".landing-intro h2", ".landing-intro h1", ".landing-h2-info", ".landing-h2-info-1", ".landing-h2-1", ".landing-h2-2"];

  gsap.fromTo(
    textTargets,
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.out",
      y: 0,
      stagger: 0.1, // This still makes them appear one after another!
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Note: LoopText functionality is tied heavily to SplitText chars.
  // For the first deploy, we will skip the character loops to ensure it builds.
}

/* // Commenting out the LoopText function as it requires SplitText characters to work
function LoopText(Text1: any, Text2: any) {
  // Logic removed for compatibility
}
*/