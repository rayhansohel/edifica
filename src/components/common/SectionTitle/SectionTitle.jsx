/* eslint-disable react/prop-types */

import { GoNorthStar } from 'react-icons/go';
import { TfiLayoutLineSolid } from "react-icons/tfi";

const SectionTitle = ({ title, subtitle, showIcon = true }) => {
  return (
    <div className="w-full text-center flex items-center flex-col">
      <h3 className="uppercase">{subtitle}</h3>
      <div className="flex items-center justify-center w-full gap-4 mt-2">
        {showIcon && <TfiLayoutLineSolid className="text-xl" />}
        {showIcon && <GoNorthStar className="text-xl" />}
        <h1 className="text-4xl uppercase text-accent">{title}</h1>
        {showIcon && <GoNorthStar className="text-xl" />}
        {showIcon && <TfiLayoutLineSolid className="text-xl" />}
      </div>
    </div>
  );
};

export default SectionTitle;
