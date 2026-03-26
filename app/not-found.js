import Link from "next/link";
import styles from "@/styles/NotFound.module.css";

export const metadata = {
  title: "Page Not Found"
};

export default function NotFound() {
  return (
    <main className={styles.shell}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>404</p>
        <h1>That page does not exist.</h1>
        <p>
          The route may have changed, or the content has not been published yet.
        </p>
        <Link href="/" className={styles.link}>
          Return home
        </Link>
      </div>
    </main>
  );
}
