import Script from "next/script";
import type { PublicSiteConfig } from "@/features/public-api";
import { RECAPTCHA_SITE_KEY } from "../../lib/recaptcha";

interface ThirdPartyScriptsProps {
  config: PublicSiteConfig;
}

/**
 * Nhúng script bên thứ ba theo cấu hình website: GTM / GA4 / Meta Pixel, widget chat (Zalo OA, bên thứ ba), reCAPTCHA.
 * Không tự xây chatbot — chỉ nhúng widget.
 */
export default function ThirdPartyScripts({ config }: ThirdPartyScriptsProps) {
  const { tracking, chat } = config;
  const gaId = tracking.ga4Id;
  const gtmId = tracking.gtmId;
  const pixelId = tracking.metaPixelId;

  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${gtmId}';f.parentNode.insertBefore(j,f);`}
        </Script>
      )}
      {gaId && !gtmId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {chat.zalo.enabled && chat.zalo.oaId && (
        <>
          <div className="zalo-chat-widget" data-oaid={chat.zalo.oaId} data-welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup="0" data-width="" data-height="" />
          <Script src="https://sp.zalo.me/plugins/sdk.js" strategy="lazyOnload" />
        </>
      )}
      {chat.thirdParty.enabled && chat.thirdParty.scriptUrl && <Script src={chat.thirdParty.scriptUrl} strategy="lazyOnload" />}
      {RECAPTCHA_SITE_KEY && <Script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} strategy="lazyOnload" />}
    </>
  );
}
