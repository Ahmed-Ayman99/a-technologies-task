import { useState } from "react";

import { DEMO_DATA, DEMO_DATA_ARABIC, PAGE_SIZE } from "../utils/constants";
import { useDirection } from "../context/DirectionContext";
import SalesContent from "./SalesContent";
import SalesFooter from "./SalesFooter";
import SalesHeader from "./SalesHeader";
import Pagination from "./Pagination";

const SalesSection = () => {
  const { direction } = useDirection();

  const [currentPage, setCurrentPage] = useState(1);
  const count = DEMO_DATA.length;
  const pagesCount = Math.ceil(count / PAGE_SIZE);

  const from = PAGE_SIZE * (currentPage - 1);
  const to = PAGE_SIZE * currentPage > count ? count : PAGE_SIZE * currentPage;
  const currentData =
    direction === "ltr"
      ? DEMO_DATA.slice(from, to)
      : DEMO_DATA_ARABIC.slice(from, to);

  const handleNext = () =>
    setCurrentPage((prev) => (prev === pagesCount ? prev : prev + 1));

  const handlePrev = () =>
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));

  const handlePage = (newPage) =>
    setCurrentPage((prev) => (prev > pagesCount ? prev : newPage));

  return (
    <section>
      <SalesHeader />
      <SalesContent data={currentData} />
      <SalesFooter count={count} from={from + 1} to={to}>
        <Pagination
          onClick={handlePage}
          onNext={handleNext}
          onPrev={handlePrev}
          pagesCount={pagesCount}
          currentPage={currentPage}
        />
      </SalesFooter>
    </section>
  );
};

export default SalesSection;
