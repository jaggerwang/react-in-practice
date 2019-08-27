import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class JWPDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="icon" type="image/png" sizes="200x200" href={`/static/img/${process.env.name}-200.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`/static/img/${process.env.name}-32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`/static/img/${process.env.name}-16.png`} />
          <link rel="shortcut icon" href={`/static/${process.env.name}.ico`} />
        </Head>

        {publicRuntimeConfig.enableBaiduTongji === 'true' ?
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?${process.env.baiduTongjiId}";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
              `
            }}
          /> :
          null}

        {publicRuntimeConfig.enableGoogleAnalytics === 'true' ?
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.gaTrackingId}`} /> :
          null}
        {publicRuntimeConfig.enableGoogleAnalytics === 'true' ?
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.gaTrackingId}');
              `
            }}
          /> :
          null}

        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    )
  }
}

export default JWPDocument
