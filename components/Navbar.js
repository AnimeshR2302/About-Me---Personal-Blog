"use client";

import { useState } from "react";
import styles from "@/styles/Navbar.module.css";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.brand} aria-label="Anix home">
          <span className={styles.brandMark}>A</span>
          <span>Anix</span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="site-nav-links"
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="site-nav-links"
          className={`${styles.links} ${open ? styles.linksOpen : ""}`}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
