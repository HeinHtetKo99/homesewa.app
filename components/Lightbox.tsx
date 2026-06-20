'use client'
import Image from 'next/image';
import { useEffect, useCallback } from 'react';

type LightboxItem = {
  img: string;
  label?: string | number; // optional, can be count, title, etc.
};

type LightboxProps = {
  data: LightboxItem[];
  lightbox: boolean;
  index: number | null;
  setLightbox: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const Lightbox: React.FC<LightboxProps> = ({ data, setLightbox, lightbox, setIndex, index }) => {

  const closeLightbox = useCallback(() => {
    setLightbox(false);
  }, [setLightbox]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    setIndex(index === 0 ? data.length - 1 : index - 1);
  }, [data.length, index, setIndex]);

  const goNext = useCallback(() => {
    if (index === null) return;
    setIndex((index + 1) % data.length);
  }, [data.length, index, setIndex]);

  useEffect(() => {
    if (lightbox) {
      document.body.classList.remove('showScroll');
      document.body.classList.add('hideScroll');
    } else {
      document.body.classList.remove('hideScroll');
      document.body.classList.add('showScroll');
    }

    return () => {
      document.body.classList.remove('hideScroll');
      document.body.classList.add('showScroll');
    };
  }, [lightbox]);

  // If lightbox is closed or index is null, render nothing
  if (!lightbox || index === null) return null;

  return (
    <>
      <button onClick={goPrev} className='fixed left-5 top-[44%] z-50 text-white text-7xl cursor-pointer'>‹</button>
      <div className="fixed top-0 left-0 right-0 h-screen bg-black z-40 flex flex-col items-center justify-center">
        <button onClick={closeLightbox} className='absolute top-3 right-5 text-5xl rounded-full w-10 h-10 text-white cursor-pointer'>×</button>
        <h1 className='text-white z-40 pb-8'>{index + 1}/{data.length}</h1>
        <Image
          width={600}
          height={800}
          src={data[index].img} // now guaranteed string
          alt={`Image ${index + 1}`}
          className="max-w-[75%] max-h-[75%] rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
        />
      </div>
      <button onClick={goNext} className='fixed right-5 top-[44%] z-50 text-white text-7xl cursor-pointer'>›</button>
    </>
  );
};

export default Lightbox;
