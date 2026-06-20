'use client'


type RibbonProps = {
  name: string;
  showfont?: boolean;
};
const Ribbon:React.FC<RibbonProps> = ({name,showfont}) => {
  return (
    <div className='bg-teal-800 text-white'>
     <div className="max-w-7xl mx-auto flex justify-between items-center py-12 px-4 md:px-8 mb-8 w-full">
        <div className=" px-4 md:px-8">
          <h1 className="text-3xl sm:text-4xl">{name}</h1>
        </div>
        
      </div>
    </div>
  )
}

export default Ribbon