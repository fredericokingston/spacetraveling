import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Article {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  article: Article;
}

export default function Post({ article }: PostProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Título do Post | spacetraveling.</title>
      </Head>
      <Header />
      <img src="/images/image1.jpg" alt="banner" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <h1>Título do post</h1>
            <ul>
              <li>
                <FiCalendar />
                <span>12 mar 2021</span>
              </li>
              <li>
                <FiUser />
                <span>John Doe</span>
              </li>
              <li>
                <FiClock />
                <span>5 min</span>
              </li>
            </ul>
          </div>
          <article>
            <h2>Texto do conteúdo</h2>
            <p>
              Consectetur veniam mollit veniam dolor exercitation culpa laborum
              non. Dolor mollit veniam nisi ad aliqua magna aute nostrud aute
              pariatur. Commodo minim id ullamco consectetur labore mollit
              cupidatat anim nulla sint exercitation esse ut. Do aliqua magna
              laboris excepteur anim aliquip eiusmod sint Lorem. Nostrud
              reprehenderit officia fugiat ea reprehenderit veniam consectetur
              laboris ipsum sunt. Nulla labore ut commodo culpa et proident.
              Consequat tempor ipsum est qui cupidatat deserunt esse sit cillum
              cupidatat officia.
            </p>
            <h2>Dolor mollit veniam</h2>
            <p>
              Ea aliqua incididunt ex ut enim cillum. Tempor do qui elit aliquip
              ut duis quis ad aliqua nisi irure qui enim. Culpa Lorem excepteur
              amet irure quis mollit eiusmod veniam voluptate. Id exercitation
              do magna aliquip deserunt qui exercitation sint do irure laborum
              exercitation. Ex culpa nisi aliqua ex magna voluptate officia
              proident dolore consectetur labore culpa esse nulla. Quis irure
              Lorem sint sit consequat eiusmod cupidatat dolore. Voluptate duis
              quis id qui cupidatat anim qui reprehenderit aute irure sit ex
              irure eiusmod. Mollit sunt exercitation et non ullamco minim.
            </p>
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('post', String(slug), {});

  const article = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };
  return {
    props: {
      article,
    },
  };
};
