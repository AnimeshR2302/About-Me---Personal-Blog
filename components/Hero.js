import ApiHealth from "@/components/health/ApiHealth";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`section-inner ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="section-kicker">Software Developer Portfolio</p>
          <h1 className={styles.title}>
            Building web products that feel sharp, fast, and deliberate.
          </h1>
          <p className={styles.description}>
            I design and ship modern interfaces, resilient APIs, and developer
            workflows that hold up after launch, not just in screenshots.
          </p>

          <div className={styles.actions}>
            <a href="#projects" className={styles.primaryCta}>
              View projects
            </a>
            <a href="#contact" className={styles.secondaryCta}>
              Start a conversation
            </a>
          </div>

          <ApiHealth />
        </div>

        <aside className={`panel ${styles.highlight}`}>
          <p className={styles.highlightLabel}>Current focus</p>
          <ul className={styles.highlightList}>
            <li>Frontend systems with strong interaction design</li>
            <li>Backend services with clean runtime boundaries</li>
            <li>Production-ready delivery and deployment hygiene</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
