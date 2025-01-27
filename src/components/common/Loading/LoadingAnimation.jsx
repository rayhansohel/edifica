import Lottie from 'lottie-react';
import loadingAnimation from "../../../assets/animations/Loading.json";

const LoadingAnimation = () => {
    return (
        <div className="container mx-auto w-full">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
          <Lottie animationData={loadingAnimation} className="w-20" />
        </div>
      </div>
    );
};

export default LoadingAnimation;