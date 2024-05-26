"use client";

import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/details.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Publi from "@/components/Publi";

interface News {
  title: string;
  content: string;
}

interface Article {
  subtitle: string;
  content: string;
  data: string;
}

const Details = () => {
  const [news, setNews] = useState<News>({ title: "", content: "" });
  const [article, setArticle] = useState<Article>({
    subtitle: "",
    content: "",
    data: "",
  });
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/news")
      .then((response) => {
        const firstItem = response.data[0];
        setNews({
          title: firstItem.title,
          content: firstItem.content,
        });
      })
      .catch((error) => {
        console.error("Erro ao obter notícias:", error);
      });

    axios
      .get("http://localhost:3001/article")
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter o artigo:", error);
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const paragraphs = article.content.split("\n");

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <div>
      <Link href="/">
        <div className={styles.return}>
          <FaArrowLeft />
        </div>
      </Link>
      <div>
        <p className={styles.title}>{news.title}</p>
        <p className={styles.content}>{news.content}</p>
        <p className={styles.subtitle}>{article.subtitle}</p>
        <p className={styles.data}>{article.data}</p>
      </div>
      <div>
        <Publi />
      </div>
      <div className={styles.articleContainer}>
        {paragraphs
          .slice(0, showMore || !isMobile ? paragraphs.length : 3)
          .map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
      </div>
      {isMobile && (
        <button className={styles.readMoreButton} onClick={toggleShowMore}>
          {showMore ? "Mostrar menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
};

export default Details;
