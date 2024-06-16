'use client';

import Image from 'next/image';

const Header = () => {
   return (
      <div className="flex flex-row justify-start space-x-3">
         <div className="h-10">
            <Image alt="sun" width={40} height={20} src="/static/images/sun.png" />
         </div>
         <p className="text-[#444038] flex font-bold w-full text-4xl">
            Sunnyside Weather Forecasting
         </p>
      </div>
   );
};

export default Header;
