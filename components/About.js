import styles from "@/styles/About.module.css";

const strengths = [
  "Next.js and React application architecture",
  "Type-safe API contracts and runtime validation",
  "Responsive UI systems with intentional visual hierarchy",
  "Deployment-focused engineering and operational clarity"
];

export default function About() {
  return (
    <section id="about">
      <div className={`section-inner ${styles.grid}`}>
        <div>
          <p className="section-kicker">About</p>
          <h2 className="section-title">Engineering with product taste.</h2>
          <p className="section-copy">
            I work across frontend and backend systems with a bias toward clear
            interfaces, maintainable structure, and UI that feels authored
            rather than assembled. This portfolio is intentionally lightweight:
            it showcases real work, surfaces live status from the existing API,
            and stays deployable without unnecessary backend coupling.
          </p>
        </div>

        <div className={styles.cards}>
          {strengths.map((item, index) => (
            <article key={item} className={`panel ${styles.card}`}>
              <span className={styles.index}>0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
