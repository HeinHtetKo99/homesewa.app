import Script from "next/script";

const ONESIGNAL_APP_ID = "6088a935-58f5-4645-8290-80633f2bdbc5";

export function OneSignalInit() {
  return (
    <>
      <Script id="onesignal-init" strategy="beforeInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "${ONESIGNAL_APP_ID}",
              serviceWorkerPath: "OneSignalSDKWorker.js",
              serviceWorkerParam: { scope: "/" },
              promptOptions: {
                slidedown: {
                  prompts: [{
                    type: "push",
                    autoPrompt: true,
                    delay: { pageViews: 1, timeDelay: 2 },
                    text: {
                      actionMessage: "Get updates on home service offers and HomeSewa deals.",
                      acceptButton: "Subscribe",
                      cancelButton: "Later",
                    },
                  }],
                },
              },
              notifyButton: {
                enable: true,
                position: "bottom-right",
                offset: { bottom: "5.5rem", right: "12px", left: "0px" },
              },
            });

            if (OneSignal.Notifications.permissionNative === "default") {
              setTimeout(function() {
                OneSignal.Slidedown.promptPush({
                  force: true,
                  forceSlidedownOverNative: true,
                });
              }, 2500);
            }
          });
        `}
      </Script>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        defer
        strategy="afterInteractive"
      />
    </>
  );
}
