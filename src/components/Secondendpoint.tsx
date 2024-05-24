"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/secondEndpoint.module.css";
import Link from "next/link";

interface Article {
  id: number;
  content: string;
}

const Second = () => {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/news")
      .then((response) => response.json())
      .then((data: Article[]) => {
        setNews(data);
      })
      .catch((error) => console.error("Erro ao buscar notícias:", error));
  }, []);

  return (
    <div className={styles.container}>
      {news.length > 0 && (
        <>
          <div>
            <Link href="/details">
              <p className={styles.materia1}>
                {news[0].content.replace("nesta etapa", "")}
              </p>
              <p className={styles.materia2}>
                {news[0].content.replace("nesta etapa", "")}
              </p>
            </Link>
          </div>

          <div>
            <Link href="/details">
              <p className={styles.materia3}>
                {news[0].content.replace("nesta etapa", "")}
              </p>
              <p className={styles.materia4}>
                {news[0].content.replace("nesta etapa", "")}
              </p>
            </Link>
          </div>

          <div>
            <Link href="/details">
              <p className={styles.materia5}>{news[1].content}</p>
              <p className={styles.materia6}>{news[1].content}</p>
            </Link>
          </div>

          <div>
            <Link href="/details">
              <p className={styles.materia7}>
                {news[2].content.replace("hoje", "")}
              </p>
              <p className={styles.materia8}>
                {news[2].content.replace("hoje", "")}
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Second;
