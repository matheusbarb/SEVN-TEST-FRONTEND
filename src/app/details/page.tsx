"use client";

import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/details.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";


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
  }, []);

  const paragraphs = article.content.split("\n");

  return (
    <div>
      <Link href="/">
        <div className={styles.return}>
          <FaArrowLeft />
        </div>
      </Link>

      <p className={styles.title}> {news.title}</p>
      <p className={styles.content}> {news.content}</p>
      <p className={styles.subtitle}> {article.subtitle}</p>
      <p className={styles.data}> {article.data}</p>
      <div className={styles.container}>
        <h1 className={styles.text}>Publicidade</h1>
        </div>
        <div className={styles.articleContainer}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
    
      ))}
       </div>
    </div>
  );
};

export default Details;
