import { Divider, Skeleton } from "antd";
import React, { useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type CInfiniteScrollProps = {
  children: React.ReactNode;
  fetchData: (pageNumber: number) => void;
  data: any;
  hasMore: boolean;
};

const CInfiniteScroll: React.FC<CInfiniteScrollProps> = ({
  children,
  fetchData,
  data,
  hasMore,
}) => {
  const { loading } = useSelector((state: RootState) => state.loader);
  const [pageNumber, setPageNumber] = React.useState<number>(0);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setPageNumber(pageNumber + 1);
    fetchData(pageNumber + 1);
  };

  const showSkeleton = useMemo(
    () => hasMore && data.length > 0,
    [hasMore, data]
  );

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={showSkeleton}
      loader={<Skeleton paragraph={{ rows: 5 }} active />}
      endMessage={!hasMore && <Divider plain>No more data</Divider>}
    >
      {children}
    </InfiniteScroll>
  );
};

export default CInfiniteScroll;
