import { getCollection } from "astro:content";

export async function getNewsArticleStaticPaths() {
  const articles = await getCollection("articles");
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
}
