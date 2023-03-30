import React, { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(true);
  const checkNextIndex = (currentIndex) => {
    setOpacity(true);
    if (currentIndex === images.length - 1) {
      return 0;
    }
    if (currentIndex >= 0) {
      return currentIndex + 1;
    }
  };
  const checkPrevIndex = (currentIndex) => {
    setOpacity(false);
    if (currentIndex === 0) {
      return images.length - 1;
    }
    if (currentIndex <= images.length - 1) {
      return currentIndex - 1;
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(checkNextIndex(currentIndex));
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex]);

  return (
    <div className="w-full  h-[20rem] relative my-4 rounded-md overflow-hidden">
      {images.map((image, index) => {
        // let position = "";
        // if (index === currentIndex) {
        //   position = "translate-x-0";
        // } else if (index < currentIndex || index === images.length - 1) {
        //   position = "translate-x--[100%]";
        // } else if (index > currentIndex) {
        //   position = "translate-x-[100%]";
        // }
        let position = `translate-x-[100%] ${
          opacity && "opacity-0"
        }`; /*next slide */

        if (index === currentIndex) {
          position = "translate-x-0 "; /*active slide */
        }
        if (
          index === currentIndex - 1 ||
          (currentIndex === 0 && index === images.length - 1)
        ) {
          position = `translate-x-[-100%] ${
            !opacity && "opacity-0"
          }`; /*prev slide */
        }
        return (
          <img
            className={`absolute  transition-transform duration-500  h-[100%] w-[100%] object-cover object-center ${position}`}
            src={image.url}
            alt=""
            key={index}
          />
        );
      })}
      <button
        className=" absolute top-0 bottom-0 left-1"
        onClick={() => setCurrentIndex(checkPrevIndex(currentIndex))}
        tabIndex={3}
      >
        <GrFormPrevious size="48px" />
      </button>
      <button
        className=" absolute top-0 bottom-0 right-1"
        onClick={() => setCurrentIndex(checkNextIndex(currentIndex))}
        tabIndex={4}
      >
        <GrFormNext size="48px" />
      </button>
    </div>
  );
};

export default Carousel;
