import type { Metadata } from "next";
import Ribbon from "../../components/Ribbon";
import JsonLd from "../../components/JsonLd";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import { youtubeEmbedUrl, youtubeWatchUrl } from "../../lib/youtube";
import { pageMetadata, SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Videos",
  description:
    "Watch HomeSewa videos — expert cleaning tips, service walkthroughs, and behind-the-scenes looks at our professional home services in Nepal.",
  path: "/video",
});

const featuredVideoId = "DBCGoFwTy4E";

const videos = [
  {
    id: "tbXpYAApZok",
    title: "Uncover Expert Cleaning Secrets",
  },
  {
    id: "lDiqkZEu1rs",
    title: "Unlock Your Cleaning Motivation",
  },
  {
    id: "osFxHW-iAf8",
    title: "My Full Home Cleaning Routine",
  },
  {
    id: "aFnXFXJWjgc",
    title: "Home Cleaning Guide",
  },
  {
    id: "gLNbjA0x5qQ",
    title: "Deep Cleaning Hacks",
  },
  {
    id: "uQMWOc8Z2eM",
    title: "Whole House Clean",
  },
  {
    id: "hE_6O96wVmw",
    title: "How to Clean Everything",
  },
  {
    id: "M1O_MjMRkPg",
    title: "How to do laundry when you're depressed",
  },
  {
    id: "8OKyJZUn0UA",
    title: "21 Ways to Make Your Home Sparkle",
  },
];

const videoGalleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "HomeSewa Videos",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "VideoObject",
        name: "Featured HomeSewa Video",
        embedUrl: youtubeEmbedUrl(featuredVideoId),
        contentUrl: youtubeWatchUrl(featuredVideoId),
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    },
    ...videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 2,
      item: {
        "@type": "VideoObject",
        name: video.title,
        embedUrl: youtubeEmbedUrl(video.id),
        contentUrl: youtubeWatchUrl(video.id),
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    })),
  ],
};

function VideoPage() {
  return (
    <div className=" min-h-screen font-sans">
      <JsonLd data={videoGalleryJsonLd} />
      <Ribbon name="Videos" showfont={false} />

      <section className="max-w-7xl mx-auto  rounded-md px-4 sm:px-6 py-10 sm:py-12 md:py-10">
        <div className="text-center">
          <h2 className=" text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
            Featured HomeSewa Video
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-7xl aspect-video rounded-lg overflow-hidden shadow-2xl">
              <YouTubeEmbed
                videoId={featuredVideoId}
                title="Featured HomeSewa Video"
                autoPlay
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-14 px-4 sm:px-6 md:px-8">
        <h2 className="card2 text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-10">
          HomeSewa Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="text-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video w-full">
                <YouTubeEmbed
                  videoId={video.id}
                  title={video.title}
                  className="rounded-t-md"
                />
              </div>
              <p className="text-[#0D5D59] text-sm sm:text-base mt-3 px-2 pb-4 font-medium">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default VideoPage;
