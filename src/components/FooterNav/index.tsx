import Link from 'next/link';
import styles from './footer.module.scss';

interface FooterNavProps {
  navigation?: {
    previousPost: {
      uid: string;
      data: {
        title: string;
      };
    }[];
    nextPost: {
      uid: string;
      data: {
        title: string;
      };
    }[];
  };
}

export function FooterNav({ navigation }: FooterNavProps): JSX.Element {
  return (
    <div className={styles.container}>
      {navigation?.previousPost.length > 0 && (
        <div className={styles.previousPost}>
          <h4>{navigation.previousPost[0].data.title}</h4>
          <Link href={`/post/${navigation.previousPost[0].uid}`}>
            <a>Post anterior</a>
          </Link>
        </div>
      )}
      {navigation?.nextPost.length > 0 && (
        <div className={styles.nextPost}>
          <h4>{navigation.nextPost[0].data.title}</h4>
          <Link href={`/post/${navigation.nextPost[0].uid}`}>
            <a>Próximo post</a>
          </Link>
        </div>
      )}
    </div>
  );
}
