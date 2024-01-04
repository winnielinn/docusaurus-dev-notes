import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.banner}>
      <div className="container">
        <div className={styles.imgFramework}>
          <img
            src="img/home.gif"
            alt="Code Me Baby"
            style={{
              height: '50%',
              width: '50%',
              margin: 0,
              padding: 0,
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout >
  );
}
