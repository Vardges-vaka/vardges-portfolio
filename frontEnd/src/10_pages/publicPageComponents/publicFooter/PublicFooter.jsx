import React, { useState, useEffect } from "react";
import {
  IconGlobal,
  ButtonGlobal,
} from "../../../01_components/components.index.js";
import "./styles/publicFooter.css";

const PublicFooter = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="publicFooter">
      <div className="publicFooter__container">
        {/* Main Footer Content */}
        <div className="publicFooter__main">
          {/* About Section */}
          <div className="publicFooter__section">
            <h3 className="publicFooter__sectionTitle">About</h3>
            <p className="publicFooter__sectionText">
              Full-stack developer passionate about creating innovative
              solutions and delivering exceptional user experiences.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="publicFooter__section">
            <h3 className="publicFooter__sectionTitle">Quick Links</h3>
            <ul className="publicFooter__links">
              <li>
                <a href="/about" className="publicFooter__link">
                  About
                </a>
              </li>
              <li>
                <a href="/work" className="publicFooter__link">
                  Work
                </a>
              </li>
              <li>
                <a href="/skills" className="publicFooter__link">
                  Skills
                </a>
              </li>
              <li>
                <a href="/contact" className="publicFooter__link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="publicFooter__section">
            <h3 className="publicFooter__sectionTitle">Connect</h3>
            <div className="publicFooter__social">
              <a
                href="https://github.com/vardges"
                target="_blank"
                rel="noopener noreferrer"
                className="publicFooter__socialLink"
                title="GitHub">
                <IconGlobal type="lucide" name="github" />
              </a>
              <a
                href="https://linkedin.com/in/vardges"
                target="_blank"
                rel="noopener noreferrer"
                className="publicFooter__socialLink"
                title="LinkedIn">
                <IconGlobal type="lucide" name="linkedin" />
              </a>
              <a
                href="https://twitter.com/vardges"
                target="_blank"
                rel="noopener noreferrer"
                className="publicFooter__socialLink"
                title="Twitter">
                <IconGlobal type="lucide" name="twitter" />
              </a>
              <a
                href="mailto:vardges@example.com"
                className="publicFooter__socialLink"
                title="Email">
                <IconGlobal type="lucide" name="mail" />
              </a>
              <a
                href="https://instagram.com/vardges"
                target="_blank"
                rel="noopener noreferrer"
                className="publicFooter__socialLink"
                title="Instagram">
                <IconGlobal type="lucide" name="instagram" />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="publicFooter__section">
            <h3 className="publicFooter__sectionTitle">Get In Touch</h3>
            <div className="publicFooter__contact">
              <div className="publicFooter__contactItem">
                <IconGlobal type="lucide" name="mail" />
                <span>vardges@example.com</span>
              </div>
              <div className="publicFooter__contactItem">
                <IconGlobal type="lucide" name="phone" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="publicFooter__contactItem">
                <IconGlobal type="lucide" name="map-pin" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="publicFooter__bottom">
          <div className="publicFooter__copyright">
            <p>&copy; 2024 Vardges. All rights reserved.</p>
          </div>
          <div className="publicFooter__bottomLinks">
            <a href="/privacy" className="publicFooter__bottomLink">
              Privacy Policy
            </a>
            <a href="/terms" className="publicFooter__bottomLink">
              Terms of Service
            </a>
            <a href="/sitemap" className="publicFooter__bottomLink">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <ButtonGlobal
          className="publicFooter__backToTop"
          onClick={scrollToTop}
          title="Back to top">
          <IconGlobal type="lucide" name="chevron-up" />
        </ButtonGlobal>
      )}
    </footer>
  );
};

export default PublicFooter;
