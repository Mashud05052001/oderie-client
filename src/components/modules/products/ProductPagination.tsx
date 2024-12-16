"use client";

import { TMetaData } from "@/src/types";
import { Pagination } from "antd";
import { usePathname, useRouter } from "next/navigation";

type TProps = {
  meta: TMetaData;
};

export default function ProductPagination({ meta }: TProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Pagination
        total={meta?.total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={meta?.limit}
        defaultCurrent={meta?.page}
        showSizeChanger
        onChange={(page, limit) => {
          const queryParams = new URLSearchParams({
            ...(page && { page: page.toString() }),
            ...(limit && { limit: limit.toString() }),
          });
          const queryString = queryParams.toString();
          router.replace(queryString ? `?${queryString}` : pathname);
        }}
      />
    </div>
  );
}
