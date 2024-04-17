import { getPageStaticInfo } from "next/dist/build/analysis/get-page-static-info";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type TProps = {
  page: number;
  startPagination: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  hasPreviousTensPages: boolean;
  hasNextTensPages: boolean;
};
const Pagination = (props: TProps) => {
  const { page, pageCount, startPagination, hasPreviousPage, hasNextPage, hasPreviousTensPages, hasNextTensPages } =
    props;

  const [current, setCurrent] = useState(page);

  const countPages = Math.min(pageCount - startPagination + 1, 10);
  const pTemp = Array.from(Array(countPages).keys());
  const pages = pTemp.map((item) => item + startPagination);
  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${current}`);
  }, [current]);

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${hasPreviousTensPages ? "" : "disabled"}`}>
          <button className="page-link" aria-label="PreviousTen" onClick={() => setCurrent(current - 10)}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous ten</span>
          </button>
        </li>
        <li className={`page-item ${hasPreviousPage ? "" : "disabled"}`}>
          <button className="page-link " aria-label="Previous" onClick={() => setCurrent(current - 1)}>
            <span aria-hidden="true">&lsaquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {pages.map((item) => (
          <li className={`page-item ${item === current ? "active" : ""}`} key={item}>
            <button className="page-link" onClick={() => setCurrent(item)}>
              {item}
            </button>
          </li>
        ))}

        <li className={`page-item ${hasNextPage ? "" : "disabled"}`}>
          <button className="page-link" aria-label="Next" onClick={() => setCurrent(current + 1)}>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
        <li className={`page-item ${hasNextTensPages ? "" : "disabled"}`}>
          <button className="page-link" aria-label="NextTen" onClick={() => setCurrent(current + 10)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next ten</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
