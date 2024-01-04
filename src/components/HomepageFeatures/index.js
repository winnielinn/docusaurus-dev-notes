import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '關於我',
    image: 'img/profile.jpg',
    description: (
      <>
        <p>是位幸運地在軟體開發上找到興趣的後端小菜鳥。</p>
        <p>樂此不疲地在程式的世界中探索，被新知識追著跑，也被臭蟲追著咬。可以透過下面這篇文章更加了解我轉職的心路歷程：
          <a href="https://tw.alphacamp.co/blog/alumni-winnie-learn-programming">航運業 Winnie 啟航程式旅程：對現況不滿，所以勇敢轉職！</a>
        </p>
      </>
    ),
  },
  {
    title: '關於網站',
    image: 'img/website.png',
    description: (
      <>
        <p>“If I have seen further it is by standing on the shoulders of giants.”</p>
        <p>透過這些筆記來記錄自己在技術上的成長，藉此幫助自己學習和回顧，希望有天也能成為你各位眼中的巨人。</p>
        <p style={{ fontSize: '14px' }}>如果因技術進步或我自己的理解不夠全面，導致文章中有錯誤資訊或疏漏，請在文章下方留言告知我。我會儘快進行修正，以防止錯誤信息的進一步傳播。</p>
      </>
    ),
  },
];

function Feature({ image, title, description }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <div style={{ height: '200px', overflow: 'auto' }}>{description}</div>
      </div>
      <div className="text--center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img style={{
          maxHeight: '60%',
          maxWidth: '60%',
          margin: '3% 0 10% 0',
          padding: 0,
        }} src={image} alt="輔助說明照片"></img>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
