import React, { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CButton from "./CButton";
import CLabelElement from "./CLabelElement";
import CTagField from "./CTagField";
import CTextField from "./CTextField";
import EditorWrapper from "./EditorWrapper";

type CBlogFormWrapperProps<T> = {
  publishClickHandler: (data: T) => void;
};

const CBlogFormWrapper: React.FC<CBlogFormWrapperProps<any>> = ({
  publishClickHandler,
}): React.ReactElement => {
  const [steps, setSteps] = React.useState<number>(1);
  const [blogTitle, setBlogTitle] = React.useState<string>("");
  const [blogDescription, setBlogDescription] = React.useState<string>("");
  const [blogTags, setBlogTags] = React.useState<string[]>([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.data) {
      setBlogTitle(state?.data?.title);
      setBlogDescription(state?.data?.description);
      setBlogTags(state?.data?.tags);
    }
  }, [state]);

  return (
    <div className="m-1">
      {steps === 1 && (
        <React.Fragment>
          <div className="d-flex justify-content-right mb-1 align-items-center">
            <CButton
              disabled={blogDescription === "" || blogDescription.length < 150}
              type="primary"
              text="Next"
              onClick={() => {
                setSteps(2);
              }}
            />
          </div>
          <EditorWrapper
            initialValue={blogDescription || state?.data?.description}
            valueSetter={setBlogDescription}
            className="min-h-100"
          />
        </React.Fragment>
      )}

      {steps === 2 && (
        <React.Fragment>
          <React.Fragment>
            <CLabelElement
              heading="Choose a title for your story"
              subHeading="Summarize your story in signle line title."
              field={
                <CTextField
                  classes="mt-1"
                  size="large"
                  label={""}
                  fieldProps={{
                    textFieldProps: {
                      name: "title",
                      placeholder: "e.g. How to install node.js?",
                      type: "text",
                      defaultValue: blogTitle,
                      onBlur: (e) => setBlogTitle(e.target.value),
                    },
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input title of your story!",
                    },
                    {
                      min: 30,
                      message: "Title should be minimum of 30 characters",
                    },
                  ]}
                />
              }
            />
            <CLabelElement
              heading="Tags"
              subHeading="Add up to 7 tags to describe what your story is about."
              field={<CTagField tags={blogTags} setTags={setBlogTags} />}
            />
          </React.Fragment>
          <div className="d-flex align-items-center">
            <CButton
              type="default"
              text="Back"
              onClick={() => setSteps(1)}
              className="mt-2"
            />
            <CButton
              disabled={blogTitle === "" || blogTags?.length === 0}
              type="primary"
              text="Publish Story"
              onClick={() =>
                publishClickHandler({
                  title: blogTitle,
                  description: blogDescription,
                  tags: blogTags?.join(","),
                })
              }
              className="mt-2 ml-1"
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default memo(CBlogFormWrapper);
