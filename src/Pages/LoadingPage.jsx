import Lottie from "react-lottie";
import TrailLoading from "../../public/TrailLoading.json"

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <div className="max-w-sm relative">
        <Lottie
          options={{
            animationData: TrailLoading,
            autoplay: true,
            loop: true,
          }}
          height={150} 
          width={150}
        ></Lottie>
      </div>
    </div>
  );
};

export default Loading;
