import "./Footer.css";
import { IoLogoGithub } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <h2 className="contactus-txt">Contact Us</h2>
        <a
          href="https://github.com/bcjumpman/Music_Haze"
          target="_blank"
          rel="noreferrer"
          className="footer-link music-haze-git"
        >
          <IoLogoGithub className="github-logo" />
          Music Haze
        </a>
      </div>
      <div className="contacts-container">
        <div className="contacts">
          <a
            href="https://github.com/bcjumpman"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <IoLogoGithub className="github-logo" />
            Bcjumpman
          </a>
          <a
            href="https://www.linkedin.com/in/bcarmichael31/"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <BsLinkedin className="linkedin-logo" />
            Brian Carmichael
          </a>
        </div>
        <div className="contacts">
          <a
            href="https://github.com/BrandonKMoore"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <IoLogoGithub className="github-logo" />
            BrandonKMoore
          </a>
          <a
            href="https://linkedin.com/in/kiante-moore-779250101"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <BsLinkedin className="linkedin-logo" />
            Kiante Moore
          </a>
        </div>
        <div className="contacts">
          <a
            href="https://github.com/Six5pAdes"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <IoLogoGithub className="github-logo" />
            Six5pAdes
          </a>
          <a
            href="https://www.linkedin.com/in/austinhall-6spades/"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <BsLinkedin className="linkedin-logo" />
            Austin Hall
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
