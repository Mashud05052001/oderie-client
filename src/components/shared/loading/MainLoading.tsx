import { HashLoader } from "react-spinners";

const MainLoading = () => {
  return (
    <div className="flex justify-center pt-20 opacity-70">
      <HashLoader size={100} color="#002140" speedMultiplier={0.8} />
    </div>
  );
};

export default MainLoading;
