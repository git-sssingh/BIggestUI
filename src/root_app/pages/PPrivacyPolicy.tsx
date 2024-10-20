import { Card, Typography } from "antd";
import React from "react";
import { CButton, CItalicText } from "../components";

const PPrivacyPolicy = () => {
  return (
    <div className="min-h-100 mt-8">
      <div className="privacy-policy-top-banner d-flex justify-content-center align-items-center flex-column relative h-50">
        <Typography.Title level={2} className="text-center color-white">
          Privacy Policy
        </Typography.Title>
        <CButton
          text={"Updated September 29, 2024"}
          type="primary"
          className="bg-success color-white "
          style={{ borderRadius: 30 }}
        />
      </div>
      <div className="privacy-policy-description">
        <Typography.Title level={3}>Introduction</Typography.Title>
        <Typography.Text>
          This Privacy Policy outlines how Yaksha Prashna collects, uses, and
          protects the personal information of individuals who visit our website
          (YP.com). We are committed to safeguarding your privacy and complying
          with applicable data protection laws.
        </Typography.Text>
        <Typography.Title level={3}>Information Collection</Typography.Title>
        <Typography.Text>
          We may collect the following types of personal information:
        </Typography.Text>
        <ul>
          <li>
            <strong>Information you provide:</strong> This includes information
            you voluntarily submit, such as your name, email address, phone
            number, and any other information you choose to share.
          </li>
          <li>
            <strong>Automatically collected information: </strong> We may
            automatically collect certain information about your device and your
            interactions with our website, including your IP address, browser
            type, operating system, and referring website.
          </li>
        </ul>
        <Typography.Title level={3}>Information Usage</Typography.Title>
        <Typography.Text>
          We may use your personal information for the following purposes:
        </Typography.Text>
        <ul>
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>For marketing and promotional purposes</li>
          <li>To analyze website usage</li>
          <li>To comply with legal requirements</li>
        </ul>
        <Typography.Title level={3}>Information Sharing</Typography.Title>
        <Typography.Text>
          We may share your personal information with:
        </Typography.Text>
        <ul>
          <li>Law enforcement authorities if required by law</li>
        </ul>
        <Typography.Title level={3}>Data Security</Typography.Title>
        <Typography.Text>
          We implement reasonable security measures to protect your personal
          information from unauthorized access, disclosure, or misuse. However,
          no method of transmission over the internet or electronic storage is
          completely secure.
        </Typography.Text>
        <Typography.Title level={3}>User Rights</Typography.Title>
        <Typography.Text>
          You may have certain rights regarding your personal information,
          including:
        </Typography.Text>
        <ul>
          <li>
            <strong>Access</strong> to your personal information
          </li>
          <li>
            <strong>Rectification</strong> of inaccurate information
          </li>
          <li>
            <strong>Erasure</strong> of your personal information
          </li>
          <li>
            <strong>Restriction</strong> of processing your personal information
          </li>
          <li>
            <strong>Data portability</strong> of your personal information
          </li>
          <li>
            <strong>Object</strong> to processing your personal information
          </li>
        </ul>
        <Typography.Title level={3}>Cookies and Tracking</Typography.Title>
        <Typography.Text>
          We may use cookies and similar tracking technologies to collect
          information about your interactions with our website. You can manage
          your cookie preferences through your browser settings.
        </Typography.Text>
        <Typography.Title level={3}>Children's Privacy</Typography.Title>
        <Typography.Text>
          Our website is for knowledge sharing at any topics so not restricted
          to childer if they want to gain knowledge they can read articles
          shared with public.
        </Typography.Text>
        <Typography.Title level={3}>
          Changes to this Privacy Policy
        </Typography.Title>
        <Typography.Text>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </Typography.Text>
        <Typography.Title level={3}>Contact Information</Typography.Title>
        <Typography.Text>
          If you have any questions about this Privacy Policy or our practices,
          please contact us at:
        </Typography.Text>
        <Typography.Title level={5}>Yaksha Prashna</Typography.Title>
        <CItalicText children={"Email: 0tB0B@example.com"} /> <br />
        <CItalicText children={"Phone: +91 9876543210"} />
      </div>
    </div>
  );
};

export default PPrivacyPolicy;
