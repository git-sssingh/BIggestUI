import { Typography } from "antd";
import React from "react";
import { CButton, CItalicText } from "../components";

const PTermsOfUse = () => {
  return (
    <div className="min-h-100 mt-8">
      <div className="privacy-policy-top-banner d-flex justify-content-center align-items-center flex-column relative h-50">
        <Typography.Title level={2} className="text-center color-white">
          Terms of Use
        </Typography.Title>
        <CButton
          text={"Updated September 29, 2024"}
          type="primary"
          className="bg-success color-white "
          style={{ borderRadius: 30 }}
        />
      </div>
      <div className="privacy-policy-description">
        <Typography.Title level={3}>Acceptance of Terms</Typography.Title>
        <Typography.Text>
          By accessing or using our website (yp.com), you agree to be bound by
          these Terms of Use. If you do not agree to these terms, please do not
          use our website.
        </Typography.Text>
        <Typography.Title level={3}>Website Use</Typography.Title>
        <Typography.Text>
          You may use our website for personal, non-commercial purposes. You
          agree not to:
        </Typography.Text>
        <ul>
          <li>
            Use our website in any way that violates applicable laws or
            regulations
          </li>
          <li>
            Use our website to transmit or distribute any harmful, illegal, or
            offensive content
          </li>
          <li>
            Attempt to gain unauthorized access to our website or its systems
          </li>
          <li>
            Use our website in a way that could damage, disable, overburden, or
            impair our website or its systems
          </li>
          <li>Create content for spam or malicious link.</li>
        </ul>
        <Typography.Title level={3}> Intellectual Property</Typography.Title>
        <Typography.Text>
          All content on our website, including text, images, logos, and
          trademarks that are used in website by us, is the property of Yaksha
          Prashna or its licensors and is protected by copyright and other
          intellectual property laws. You may not use, reproduce, modify, or
          distribute any content from our website without our prior written
          consent. The content you publish or ask question will be your
          responsibility while using text, image or any file that other hold
          copyrights of these.
        </Typography.Text>
        <Typography.Title level={3}>Limitation of Liability</Typography.Title>
        <Typography.Text>
          In no event shall Yaksha Praashna be liable for any damages, including
          but not limited to direct, indirect, incidental, special, or
          consequential damages, arising out of or in connection with your use
          of our website.
        </Typography.Text>
        <Typography.Title level={3}>Governing Law</Typography.Title>
        <Typography.Text>
          These Terms of Use shall be governed by and construed in accordance
          with the laws of [Jurisdiction]. Any dispute arising out of or in
          connection with these terms shall be submitted to the exclusive
          jurisdiction of the courts of [Pune Court].
        </Typography.Text>
        <Typography.Title level={3}>Changes to Terms</Typography.Title>
        <Typography.Text>
          We may update these Terms of Use from time to time. Any changes will
          be posted on this page. Your continued use of our website after such
          changes indicates your acceptance of the modified terms.
        </Typography.Text>
        <Typography.Title level={3}>Contact Information</Typography.Title>
        <Typography.Text>
          If you have any questions about these Terms of Use or our practices,
          please contact us at:
        </Typography.Text>
        <Typography.Title level={5}>Yaksha Prashna</Typography.Title>
        <CItalicText children={"Email: 0tB0B@example.com"} /> <br />
        <CItalicText children={"Phone: +91 9876543210"} />
      </div>
    </div>
  );
};

export default PTermsOfUse;
