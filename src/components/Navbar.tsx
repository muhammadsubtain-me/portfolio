import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { FaCommentDots } from "react-icons/fa6";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

import ChatBox from "./ChatBox";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let links = document.querySelectorAll(".header ul a, .mobile-nav a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const href = element.getAttribute("data-href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.replace("#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
          // Close mobile menu on nav click
          setIsMobileMenuOpen(false);
        }
      });
    });
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "EDUCATION", href: "#education" },
    { label: "WORK", href: "#work" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className="header">
        <div className="header-left" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a href="/#" className="navbar-title" data-cursor="disable">
            HOME
          </a>
        </div>
        <ul>
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <a data-href={href} href={href}>
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#chat"
              onClick={(e) => {
                e.preventDefault();
                setIsChatOpen(true);
              }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FaCommentDots size={22} />
              <HoverLinks text="LET'S CHAT" />
            </a>
          </li>
        </ul>

        {/* Hamburger button — visible only on mobile */}
        <button
          className={`hamburger ${isMobileMenuOpen ? "hamburger--open" : ""}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile Side Panel Overlay ── */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "mobile-overlay--visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* ── Mobile Side Panel ── */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? "mobile-nav--open" : ""}`}>
        {/* Panel header */}
        <div className="mobile-nav__header">
          <a href="/#" className="navbar-title" data-cursor="disable" onClick={() => setIsMobileMenuOpen(false)}>
            HOME
          </a>
          <button
            className="mobile-nav__close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="mobile-nav__list">
          {navItems.map(({ label, href }, i) => (
            <li key={label} className="mobile-nav__item" style={{ animationDelay: `${i * 0.07}s` }}>
              <a
                data-href={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mobile-nav__item" style={{ animationDelay: `${navItems.length * 0.07}s` }}>
            <a
              href="#chat"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setIsChatOpen(true);
              }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FaCommentDots size={20} />
              LET'S CHAT
            </a>
          </li>
        </ul>
      </nav>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;