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

  return (
    <div>
      <Link href="/">
        <div className={styles.return}>
          <FaArrowLeft />
        </div>
      </Link>

      <p> {news.title}</p>
      <p> {news.content}</p>
      <p> {article.subtitle}</p>
      <p> {article.data}</p>

      <p> {article.content}</p>
    </div>
  );
};

export default Details;
