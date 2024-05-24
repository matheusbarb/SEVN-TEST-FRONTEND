"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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
    <div>
      {news.length > 0 && (
        <>
          <h2>{news[0].title}</h2>
          <p>{news[0].content}</p>
          {news[0].imagemUrl && (
            <Image
              src={news[0].imagemUrl}
              width={400}
              height={400}
              alt={news[0].title}
            />
          )}
          <h2>{news[1].title}</h2>
          <p>{news[1].content}</p>
          {news[1].imagemUrl && (
            <Image
              src={news[1].imagemUrl}
              width={400}
              height={400}
              alt={news[1].title}
            />
          )}
          <h2>{news[2].title}</h2>
          <p>{news[2].content}</p>
        </>
      )}
    </div>
  );
};

export default First;
