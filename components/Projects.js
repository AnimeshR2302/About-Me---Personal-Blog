"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "@/styles/Projects.module.css";

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Projects() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    async function fetchRepos() {
      if (!username) {
        setStatus("missing-config");
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
          {
            headers: {
              Accept: "application/vnd.github+json"
            }
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub request failed with ${response.status}`);
        }

        const data = await response.json();
        const featured = data
          .filter((repo) => !repo.fork)
          .sort((left, right) => right.stargazers_count - left.stargazers_count)
          .slice(0, 6);

        if (!ignore) {
          setRepos(featured);
          setStatus(featured.length ? "ready" : "empty");
        }
      } catch (_error) {
        if (!ignore) {
          setStatus("error");
        }
      }
    }

    fetchRepos();

    return () => {
      ignore = true;
    };
  }, [username]);

  const body = useMemo(() => {
    if (status === "loading") {
      return <p className={styles.feedback}>Loading featured repositories...</p>;
    }

    if (status === "missing-config") {
      return (
        <p className={styles.feedback}>
          Set <code>NEXT_PUBLIC_GITHUB_USERNAME</code> to load projects from
          GitHub.
        </p>
      );
    }

    if (status === "error") {
      return (
        <p className={styles.feedback}>
          GitHub data is unavailable right now. The rest of the site remains
          fully usable.
        </p>
      );
    }

    if (status === "empty") {
      return (
        <p className={styles.feedback}>
          No public non-fork repositories were found for this account yet.
        </p>
      );
    }

    return (
      <div className={styles.grid}>
        {repos.map((repo) => (
          <article key={repo.id} className={`panel ${styles.card}`}>
            <div className={styles.cardTop}>
              <p className={styles.repoType}>Featured repository</p>
              <h3>{formatRepoName(repo.name)}</h3>
            </div>
            <p className={styles.description}>
              {repo.description || "No public description was provided."}
            </p>
            <div className={styles.meta}>
              <span>Stars {repo.stargazers_count}</span>
              <span>Forks {repo.forks_count}</span>
              {repo.language ? <span>{repo.language}</span> : null}
            </div>
            <div className={styles.links}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {repo.homepage ? (
                <a href={repo.homepage} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    );
  }, [repos, status]);

  return (
    <section id="projects">
      <div className="section-inner">
        <p className="section-kicker">Projects</p>
        <h2 className="section-title">Selected work from GitHub.</h2>
        <p className="section-copy">
          The project list is pulled directly from GitHub so the portfolio stays
          current without adding a custom content backend to this v1 build.
        </p>
        <div className={styles.content}>{body}</div>
      </div>
    </section>
  );
}
