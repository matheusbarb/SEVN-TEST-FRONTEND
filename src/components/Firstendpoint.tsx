"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/firstEndpoint.module.css";
import Link from "next/link";
import Publi from "./Publi";

interface Article {
  id: number;
  title: string;
  content: string;
  imagemUrl?: string;
}

const First = () => {
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
          <div className={styles.column}>
            <Publi />
            <div>
              <h2 className={styles.FirstTitle}>{news[0].title}</h2>
            </div>
            <div>
              <Link href="/details">
                <p className={styles.FirstContent}>{news[0].content}</p>
              </Link>
            </div>
          </div>
          <div className={styles.column}>
            {news[0].imagemUrl && (
              <div>
                <Image
                  className={styles.FirstImage}
                  src={news[0].imagemUrl}
                  width={280}
                  height={190}
                  alt={news[0].title}
                />
              </div>
            )}
            <div>
              <h2 className={styles.SecondTitle}>{news[1].title}</h2>
            </div>
            <div>
              <Link href="/details">
                <p className={styles.SecondContent}>{news[1].content}</p>
              </Link>
            </div>
          </div>
          <div className={styles.column}>
            {news[1].imagemUrl && (
              <div>
                <Image
                  className={styles.SecondImage}
                  src={news[1].imagemUrl}
                  width={280}
                  height={190}
                  alt={news[1].title}
                />
              </div>
            )}
            <div>
              <h2 className={styles.ThirdTitle}>{news[2].title}</h2>
            </div>
            <div>
              <Link href="/details">
                <p className={styles.ThirdContent}>{news[2].content}</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default First;
