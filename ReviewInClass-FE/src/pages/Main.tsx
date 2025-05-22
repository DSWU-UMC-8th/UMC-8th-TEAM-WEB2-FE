import Banner from "../components/common/Banner/Banner";

import { LECTURE } from "../data/banner";

const Main = () => {
  return (
    <div>
      <Banner lectures={LECTURE.slice(0, 4)} />
    </div>
  );
};

export default Main;
