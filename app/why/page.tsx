import type { Metadata } from 'next';
import Image from 'next/image';
import Ribbon from '../../components/Ribbon';
import { pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Why Choose HomeSewa',
  description:
    'Why thousands choose HomeSewa: verified professionals, transparent pricing, superfast booking, and reliable on-demand home services across Nepal.',
  path: '/why',
});

export default function WhyUs () {

    return (
        <div>
        
            {/* Header  */}
           <Ribbon name="Why Us" showfont={false}/>

           <div className="max-w-6xl mx-auto pt-8 mb-6 flex flex-col gap-20 items-center justify-center px-4 pb-7">

                {/* SECTION 1 */}
                <div className=" grid md:grid-cols-2 gap-10 place-items-center">
                    <div className="space-y-6 max-w-md ">
                    <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
                        100% Skilled & Certified Professionals
                    </h1>
                    <p className="">
                        At HomeSewa, we connect you with fully skilled and certified cleaning professionals you can trust. From home cleaning, office cleaning, carpet and sofa cleaning to deep sanitization and specialized services, every cleaner on our platform is carefully vetted to ensure expertise and reliability — no more wasted time searching for trustworthy help.
                    </p>
                    </div>

                    <Image height={600} width={800}
                    src="/why/1.jpg" 
                    alt="" 
                    className="w-full max-w-sm md:max-w-[450px] rounded-md object-cover"
                    />
                </div>

                {/* SECTION 2 */}
                <div className="  grid md:grid-cols-2 gap-10 place-items-center md:[direction:rtl]">
                    <div className="space-y-6 max-w-md text-left ">
                    <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
                        Genuine Chemicals to save your precious items
                    </h1>
                    <p className="  ">
                        We use genuine, high-quality cleaning chemicals and equipment to protect your valuable items and ensure spotless results. With a wide range of cleaning services and thousands of certified professionals, you have the flexibility to choose exactly what you need, whether it’s daily cleaning, deep cleaning, or specialized maintenance.
                    </p>
                    </div>

                    <Image height={600} width={800}
                    src="/why/2.jpg" 
                    alt="" 
                    className="w-full max-w-sm md:max-w-[450px] rounded-md object-cover"
                    />
                </div>

                {/* SECTION 3 */}
                <div className="  grid md:grid-cols-2 gap-10 place-items-center">
                    <div className="space-y-6 max-w-md ">
                    <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
                        Safely organised and managed services
                    </h1>
                    <p className=" ">
                        Our platform is designed to be safe, organized, and easy to use. Through our website or mobile app, you can quickly find, contact, and hire professionals from the comfort of your home — saving both time and effort.
                    </p>
                    </div>

                    <Image height={600} width={800}
                    src="/why/3.jpg" 
                    alt="" 
                    className="w-full max-w-sm md:max-w-[450px] rounded-md object-cover"
                    />
                </div>

                {/* SECTION 4 */}
                <div className=" grid md:grid-cols-2 gap-10 place-items-center md:[direction:rtl]">
                    <div className="space-y-6 max-w-md text-left ">
                    <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
                        Fully insured professionals 
                    </h1>
                    <p className=" ">
                        Since 2018, HomeSewa has grown steadily by listening to customer feedback and refining our services. Every professional you book through us is fully insured, giving you peace of mind and confidence with every cleaning appointment.
                    </p>
                    </div>

                    <Image height={600} width={800}
                    src="/why/4.jpg" 
                    alt="" 
                    className="w-full max-w-sm md:max-w-[450px] rounded-md object-cover"
                    />
                </div>

                </div>
        </div>
    );
}