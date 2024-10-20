import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogById, getBlogsByAuthor } from "../apis";
import { IBlogsByAuthor } from "../interfaces/blogs";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Dropdown, Grid, List } from "antd";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "../utilities/icons";
import { getTemplateImage, getHtmlContent, getTimeByAgo } from "../utilities";
import { PAGE_SIZE, ROUTES } from "../constants";
import DefaultThumbNailImage from "../assets/blog-default-image.png";
import {
  CBookmarkedCount,
  CDelete,
  CInfiniteScroll,
  CItalicText,
  CLikeDislikeBtn,
  CPopupConfirm,
  CTags,
} from ".";
import { useSelector } from "react-redux";
import { CPopupConfirmHandle } from "../types";

const CUserWrittenBlogs = () => {
  const { Id } = useSelector((state: RootState) => state.user);
  const controller = new AbortController();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [writtenBlogs, setWrittenBlogs] = React.useState<IBlogsByAuthor[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const screens = Grid.useBreakpoint();
  const navigate = useNavigate();

  const cpopupConfirmRef = useRef<CPopupConfirmHandle>(null);

  const fetchBlogsByAuthor = useCallback(
    (pageNumber: number) => {
      dispatch(start());
      getBlogsByAuthor(id as string, pageNumber, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200 && res?.data?.data) {
            res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
            if (pageNumber === 1) setWrittenBlogs(res?.data?.data);
            else setWrittenBlogs((prev) => [...prev, ...res?.data?.data]);
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.error ||
                  res?.statusText ||
                  "Something went wrong"
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const deleteBlogHandler = useCallback(
    (blogId: string) => {
      dispatch(start());
      deleteBlogById(blogId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlogsByAuthor(1);
            dispatch(success("Blog deleted successfully"));
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.error ||
                  res?.statusText ||
                  "Something went wrong! Please try again."
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const data = useMemo(() => {
    return writtenBlogs?.map((blog) => {
      return {
        id: blog.id,
        href: `#${ROUTES.blog}${blog.id}`,
        createdDate: blog.createdDate,
        title: blog.title,
        description: blog.description,
        content: blog.description,
        tags: blog.tags?.split(","),
        likes: blog.upvotes,
        dislikes: blog.downvotes,
        bookmarks: blog.bookmarks || "",
      };
    });
  }, [writtenBlogs]);

  useEffect(() => {
    return () => controller.abort();
  }, [id]);

  return (
    <CInfiniteScroll
      hasMore={hasMore}
      data={data}
      fetchData={fetchBlogsByAuthor}
    >
      <List
        className="user-posted-list"
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              (screens.md || screens.lg) && (
                <img
                  width={200}
                  height="70%"
                  alt="logo"
                  src={getTemplateImage(item?.content) || DefaultThumbNailImage}
                />
              )
            }
          >
            <List.Item.Meta
              title={
                <CItalicText
                  children={
                    <React.Fragment>
                      Posted {getTimeByAgo(item.createdDate)}
                    </React.Fragment>
                  }
                />
              }
              description={
                <h2>
                  <a
                    className="title-link font-20 font-weight-700"
                    href={item.href}
                  >
                    {item.title}
                  </a>
                </h2>
              }
            />
            <div className="text mb-1">{getHtmlContent(item.description)}</div>
            <div className="blog-tags-container mt-3 mb-2">
              <CTags tags={item?.tags || []} />
            </div>
            <div className="d-flex align-items-center mt-2">
              <CLikeDislikeBtn
                disabled={id === Id}
                likes={Number(item.likes)}
              />
              <CBookmarkedCount
                className="ml-1"
                count={Number(item.bookmarks)}
              />
              {id === Id && (
                <Dropdown
                  className="ml-1"
                  placement="bottomRight"
                  arrow
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Delete",
                        icon: (
                          <Trash2Icon height="16" className="color-danger" />
                        ),
                        onClick: () => cpopupConfirmRef.current?.open(true),
                      },
                      {
                        key: "2",
                        label: "Edit",
                        icon: <PencilIcon height="16" />,
                        onClick: () =>
                          navigate(ROUTES.updateBlog?.replace(":id", item.id), {
                            state: {
                              data: item,
                            },
                          }),
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <Button
                    style={{ borderStartEndRadius: 6, borderEndEndRadius: 6 }}
                    icon={<EllipsisIcon />}
                  />
                  <CPopupConfirm
                    ref={cpopupConfirmRef}
                    title="Delete"
                    description="Do you really want to delete?"
                    onConfirm={() => deleteBlogHandler(item.id)}
                  />
                </Dropdown>
              )}
            </div>
          </List.Item>
        )}
      />
    </CInfiniteScroll>
  );
};

export default CUserWrittenBlogs;
