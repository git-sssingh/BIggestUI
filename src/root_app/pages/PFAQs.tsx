import React from "react";
import { CButton, CItalicText } from "../components";
import { Collapse, CollapseProps, Typography } from "antd";
import { scrollToSection } from "../utilities";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "What is Yaksha Prashna?",
    children: (
      <p>
        Yaksha Prashna is a platform that allows users to create teams, share
        articles, ask and answer questions, and earn points for their
        contributions.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I sign up for Yaksha Prashna?",
    children: (
      <p>
        To sign up for Yaksha Prashna, simply visit our website and click on the
        "Sign Up" button. Follow the on-screen instructions to create your
        account.
      </p>
    ),
  },
  {
    key: "3",
    label: "How do I create a team?",
    children: (
      <p>
        Once you've signed up, you can create a team by going to the "Teams"
        section and clicking on the "Create Team" button. Give your team a name
        and description.
      </p>
    ),
  },
  {
    key: "4",
    label: "Can I join other teams?",
    children: (
      <p>
        Yes, you can join other teams by searching for them or browsing the team
        directory and send request or add user in your own team.
      </p>
    ),
  },
  {
    key: "5",
    label: "How do I post an article?",
    children: (
      <p>
        To post an article, go to the "Articles" section and click on the
        "Create Article" button. Write your article and choose a relevant
        category.
      </p>
    ),
  },
  {
    key: "6",
    label: "Can I post articles anonymously?",
    children: <p>No, you must be logged in to post articles.</p>,
  },
  {
    key: "7",
    label: "How do I ask a question?",
    children: (
      <p>
        To ask a question, go to the "Questions" section and click on the "Ask a
        Question" button. Type your question and choose a relevant category.
      </p>
    ),
  },
  {
    key: "8",
    label: "Can I ask questions anonymously?",
    children: <p>No, you must be logged in to ask questions.</p>,
  },
  {
    key: "9",
    label: "How do I answer a question?",
    children: (
      <p>
        To answer a question, go to the "Questions" section and find the
        question you want to answer. Click on the "Answer" button and type your
        response.
      </p>
    ),
  },
  {
    key: "10",
    label: "Can I edit or delete my answer?",
    children: (
      <p>
        Yes, you can edit or delete your answer within a certain time frame.
      </p>
    ),
  },
  {
    key: "11",
    label: "How do I accept an answer?",
    children: (
      <p>
        If you're the person who asked the question, you can accept an answer by
        clicking on the "Accept" button next to the answer you like best.
      </p>
    ),
  },
  {
    key: "12",
    label: "How do I earn points?",
    children: (
      <p>
        You can earn points by creating teams, posting articles, asking and
        answering questions, and accepting answers.
      </p>
    ),
  },
  {
    key: "13",
    label: "What can I do with my points?",
    children: (
      <p>
        Points can be used for various rewards or benefits, such as discounts on
        products or services.
      </p>
    ),
  },
  {
    key: "14",
    label: "What should I do if I encounter a problem with the app?",
    children: (
      <p>
        If you encounter any issues, please contact our support team at [Email
        address] or [Phone number].
      </p>
    ),
  },
  {
    key: "15",
    label: "Is there a mobile app for Yaksha Prashna?",
    children: (
      <p>No, we have don't have a mobile app yet available for download.</p>
    ),
  },
];

const PFAQs = () => {
  return (
    <div
      id="faqs"
      className="relative min-h-100 min-w-100 faq-page-container d-flex flex-column align-items-center"
    >
      <Typography.Title level={1} className="text-center section-heading">
        We're here to answer all <br />
        your questions.
      </Typography.Title>

      <CItalicText
        className="w-100-per text-center"
        children={
          <React.Fragment>
            If you're new to Yaksha Prashna or looking to supercharge your
            current stack, this section will <br /> help you learn more about
            the platform and its features.
          </React.Fragment>
        }
      />

      <Collapse className="mt-4 w-75" accordion items={items} />

      <Typography.Text className="mt-4">
        Got any more questions?
      </Typography.Text>
      <CButton
        text="Get in touch"
        className="mt-2"
        type="default"
        onClick={() => scrollToSection("contactus")}
      />
    </div>
  );
};

export default PFAQs;
