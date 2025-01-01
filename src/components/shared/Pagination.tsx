import { pageSizeOptions } from "@/src/constant/others";
import { Pagination } from "antd";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
  page: number;
  showQuickJumper?: boolean;
  size?: "default" | "small";
  customPageSizeOptions?: number[];
  className?: string;
  showSizeChanger?: boolean;
};

const MyPagination = ({
  limit,
  page,
  setLimit,
  setPage,
  total,
  showQuickJumper = false,
  size = "default",
  customPageSizeOptions = pageSizeOptions,
  className,
  showSizeChanger = true,
}: TProps) => {
  const filteredPageSizeOptions = customPageSizeOptions.filter(
    (option) =>
      typeof option === "number" &&
      (option <= total ||
        Math.min(...customPageSizeOptions.filter((o) => o > total)) === option)
  );

  return (
    <div className={className}>
      <Pagination
        total={total}
        pageSizeOptions={filteredPageSizeOptions}
        showQuickJumper={showQuickJumper}
        onChange={(page, limit) => {
          setPage((prev) => (prev === page ? prev : page));
          setLimit((prev) => (prev === limit ? prev : limit));
        }}
        defaultPageSize={limit}
        defaultCurrent={page}
        showTotal={(total, range) => (
          <p>
            {range[0]}-{range[1]} of {total} items
          </p>
        )}
        size={size}
        showSizeChanger={showSizeChanger}
      />
    </div>
  );
};

export default MyPagination;
