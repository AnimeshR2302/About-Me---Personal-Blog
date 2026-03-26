"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Github.module.css";

export default function Github() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    async function fetchProfile() {
      if (!username) {
        setStatus("missing-config");
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: "application/vnd.github+json"
          }
        });

        if (!response.ok) {
          throw new Error(`GitHub request failed with ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setProfile(data);
          setStatus("ready");
        }
      } catch (_error) {
        if (!ignore) {
          setStatus("error");
        }
      }
    }

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [username]);

  return (
    <section id="github">
      <div className={`section-inner ${styles.grid}`}>
        <div>
          <p className="section-kicker">GitHub Profile</p>
          <h2 className="section-title">Open work, visible process.</h2>
          <p className="section-copy">
            Public repositories, contribution patterns, and project links are
            surfaced here to keep the portfolio anchored in shipping work.
          </p>
        </div>

        <div className={`panel ${styles.card}`}>
          {status === "loading" ? <p>Loading GitHub profile...</p> : null}
          {status === "missing-config" ? (
            <p>GitHub profile is disabled until the username env var is set.</p>
          ) : null}
          {status === "error" ? (
            <p>GitHub profile data could not be loaded right now.</p>
          ) : null}
          {status === "ready" && profile ? (
            <>
              <img
                src={profile.avatar_url}
                alt={`${profile.name || profile.login} avatar`}
                className={styles.avatar}
              />
              <h3>{profile.name || profile.login}</h3>
              <p className={styles.bio}>
                {profile.bio || "Software developer building and shipping on the open web."}
              </p>
              <div className={styles.stats}>
                <span>Repos {profile.public_repos}</span>
                <span>Followers {profile.followers}</span>
                <span>Following {profile.following}</span>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                Visit GitHub profile
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
