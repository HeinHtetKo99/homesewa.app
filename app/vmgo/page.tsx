import type { Metadata } from 'next';
import Ribbon from '../../components/Ribbon';
import { pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Vision, Mission & Goals',
  description:
    "Discover HomeSewa's vision, mission, and goals — building Nepal's most trusted on-demand home service platform powered by AI and verified professionals.",
  path: '/vmgo',
});

const sectionImageClass = 'h-40 w-40 shrink-0 object-contain';

export default function Vmgo() {

  return (
    <div className="min-h-screen ">
      

        <Ribbon name="Vission, Mission, Goals and Objectives" showfont={false}/>

        {/* Into section */}
        <section className='max-w-7xl mx-auto py-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-12 place-content-center place-items-center'>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <img
                    src="/vmgo/vision.svg"
                    alt="Vision"
                    className="h-24 w-24 object-contain"
                  />
                  <p>Vision</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <img
                    src="/vmgo/mission.svg"
                    alt="Mission"
                    className="h-24 w-24 object-contain"
                  />
                  <p>Mission</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <img
                    src="/vmgo/goals.svg"
                    alt="Goals"
                    className="h-24 w-24 object-contain"
                  />
                  <p>Goals</p> 
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <img
                    src="/vmgo/objectives.svg"
                    alt="Objectives"
                    className="h-24 w-24 object-contain"
                  /> 
                  <p>Objectives</p>    
                </div> 
            </div>
        </section>



        {/* Vision Section */}
        <section id="vision" className="flex justify-between gap-24 mb-12 py-8 max-w-5xl mx-auto">
          <div className="hidden md:flex items-center mb-6 ">
              <img src="/vmgo/vision.svg" alt="Vision illustration" className={sectionImageClass} />
          </div>
          <div className="p-8 md:p-16 card space-y-4 max-w-3xl rounded-xl">
            <h2 className="text-3xl font-bold text">Vision</h2>
            <p className=" text-md leading-relaxed mb-4">
              Our vision at HomeSewa is to create a future where every individual has access to opportunities that match their skills and aspirations.            </p>
            <p className=" text-md leading-relaxed">
              We envision a world where people searching for any service can easily connect
              with skilled professionals rather than hiring hefty commission from any service
              marketplace, and where an individual can have his/her digital profile showcasing
              their expertise.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="flex justify-between gap-24 mb-12  max-w-5xl mx-auto">
          <div className="p-8 md:p-16 bg-teal-700 text-white space-y-4 max-w-3xl rounded-xl ">
            <h2 className="text-3xl font-bold ">Mission</h2>
            <p className="text-md leading-relaxed ">
              At HomeSewa, our mission is to revolutionize the way work is connected with workers. We strive to provide a seamless platform that empowers individuals and businesses to find the perfect match for their needs, fostering opportunities for growth, collaboration, and success.            </p>
          </div>
          <div className="hidden md:flex items-center mb-6">
              <img src="/vmgo/mission.svg" alt="Mission illustration" className={sectionImageClass} />
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="flex justify-between gap-24 py-8 max-w-5xl mx-auto">
          <div className="hidden md:flex items-center mb-6">
              <img src="/vmgo/goals.svg" alt="Goals illustration" className={sectionImageClass} />
          </div>
          <div className="p-8 md:p-16 space-y-4 card rounded-xl">
            <h2 className="text-3xl font-bold text">Our Goals</h2>
            {[
              "Enable transparent and efficient interactions between professionals and businesses through our platform's tools and features.",
              "Ensure trust through robust verification processes and accurate listings for all users.",
              "Provide equal access to opportunities for professionals from all backgrounds.",
              "Continuously enhance our platform with new technologies to deliver the best user experience."
            ].map((goal, index) => (
              <div key={index} className="flex  items-center gap-3 pl-4">
                <ul className='list-disc'><li>{goal}</li></ul>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives Section */}
        <section id="objectives" className="flex justify-between gap-24 mb-12 py-8 max-w-5xl mx-auto">
          <div className="p-8 md:p-16 space-y-4 text-white bg-teal-700 max-w-3xl rounded-xl">
            <h2 className="text-3xl font-bold">Objectives</h2>
            {[
              "Expand our reach to new markets and demographics, ensuring that individuals and businesses from all backgrounds have access to our platform.",
              "Continuously improve the user experience on our platform, making it easier and more intuitive for users to find what they're looking for.",
              "Foster a strong community of professionals and businesses",
              "Maintain high standards of security and privacy"
            ].map((objective, index) => (
              <div key={index} className="flex items-center gap-3 pl-4">
                <ul className='list-disc'><li>{objective}</li></ul>
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center mb-6">
              <img src="/vmgo/objectives.svg" alt="Objectives illustration" className={sectionImageClass} />
          </div>
        </section>
    </div>
  );
}