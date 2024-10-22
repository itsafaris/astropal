import {
  Container,
  ListItem,
  Stack,
  StackProps,
  TextProps,
  Text as TextRaw,
  UnorderedList,
} from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { Link as LinkRaw } from "gatsby";
import { APP_DATA } from "src/data";

function Headline(props: TextProps) {
  return <TextRaw textAlign={"left"} fontSize={"3xl"} fontWeight={"bold"} {...props} />;
}

function TitleXL(props: TextProps) {
  return <TextRaw textAlign={"left"} fontSize={"xl"} fontWeight={"bold"} {...props} />;
}

function TitleLG(props: TextProps) {
  return <TextRaw textAlign={"left"} fontSize={"lg"} fontWeight={"bold"} {...props} />;
}

function Section(props: StackProps) {
  return <Stack spacing={3} {...props} />;
}

function Text(props: TextProps) {
  return <TextRaw {...props} />;
}

function Link({ to, children }: { to: string } & React.PropsWithChildren) {
  return (
    <LinkRaw to={to}>
      <Text as="span" color="blue.300">
        {children}
      </Text>
    </LinkRaw>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Stack>
      <TopNavigation theme="dark" />

      <Container>
        <Stack spacing={8} my={10}>
          <Headline>Privacy Policy</Headline>

          <Text>
            {APP_DATA.productName} prioritizes the safeguarding of your personal information. This
            Privacy Policy outlines our practices concerning the collection, storage, utilization,
            and disclosure of data. This policy is applicable to our website{" "}
            {APP_DATA.website.title} (the “Website”), our web application {APP_DATA.webapp.title}{" "}
            (the “Webapp”), and our corporate operations collectively known as our services (the
            “Services”). By accessing our Services or providing us with your information, you
            consent to the practices described in this Privacy Policy.
          </Text>

          <Section>
            <TitleXL>1. Acceptance of Privacy Policy</TitleXL>

            <Text>
              This Privacy Policy replaces all previous declarations and notices regarding our
              privacy practices related to the Services. If you disagree with any part of this
              Privacy Policy, you should not access or use the Services.
            </Text>

            <Text>
              We reserve the right to amend this Privacy Policy periodically. If significant changes
              are made to this policy or the manner in which we handle, share, or collect Personal
              Information, we will notify you either by updating the “Last update Date” at the
              bottom of this policy, prominently posting an announcement on our Services, or sending
              a notification using the contact details you have provided us. By continuing to use
              the Services after such changes, you are bound by the updated Privacy Policy. We
              advise you to review this Privacy Policy regularly to stay informed about
              {APP_DATA.productName}’s current privacy practices.
            </Text>

            <Text>
              In addition, you acknowledge that this Privacy Policy is part of our Terms and
              Conditions at{" "}
              <Link to={`${APP_DATA.website.url}/terms-and-conditions`}>
                {APP_DATA.website.title}/terms-and-conditions
              </Link>
              , and by reference, it is included therein. By accessing or using our Services, you
              agree to comply with the Terms and Conditions. If you do not agree to our Terms and
              Conditions, please refrain from using our Service.
            </Text>
          </Section>

          <Section>
            <TitleXL>2. Information We Obtain from You</TitleXL>

            <Text>
              We collect information that you actively provide to us as well as information that is
              automatically gathered. Some of this information can identify you (“Personal
              Information”), while some remains anonymous (“Anonymous Information”). Anonymous
              Information may sometimes be linked or combined with Personal Information, in which
              case we will treat such combined information as Personal Information for the purposes
              of this Privacy Policy. Moreover, if Internet Protocol (“IP”) addresses or similar
              identifiers are deemed personally identifiable information by applicable law, we treat
              them as Personal Information in this policy.
            </Text>

            <TitleLG>Information You Provide</TitleLG>

            <Text>
              The information you provide may include your name, email address, birth date, birth
              time, place of birth, and login or account credentials. If you purchase our Services
              or products, you may provide payment details, though {APP_DATA.productName} uses
              third-party payment processors and does not store credit card information.
            </Text>

            <TitleLG>Device-Related Information</TitleLG>

            <Text>
              When you use our Services, we may automatically collect data associated with your
              device, such as your IP address, operating system and version, local time zone,
              activity timestamps, device type, manufacturer, screen size, and language settings.
            </Text>

            <Text>We utilize the following technologies to gather device information:</Text>

            <UnorderedList>
              <ListItem>
                <Text>
                  Cookies: Data files placed on your device, often containing an anonymous unique
                  identifier. Visit{" "}
                  <Link to={"http://www.allaboutcookies.org"}>http://www.allaboutcookies.org</Link>
                </Text>
              </ListItem>

              <ListItem>
                <Text>
                  Log Files: These track actions on our Site and collect data such as IP address,
                  browser type, Internet service provider, referring/exit pages, and time stamps.
                </Text>
              </ListItem>

              <ListItem>
                <Text>
                  Tags and Pixels: Electronic files used to track your browsing activities on our
                  Site.
                </Text>
              </ListItem>
            </UnorderedList>

            <TitleLG>Do Not Track (DNT)</TitleLG>

            <Text>
              Do Not Track (“DNT”) is a browser setting that allows you to express preferences
              regarding tracking by advertisers and other third parties. We employ technology to
              recognize and respect DNT preferences you set in your web browser.
            </Text>
          </Section>

          <Section>
            <TitleXL>3. Utilization of Information</TitleXL>

            <Text>
              Generally, the data collected is used to provide, maintain, and improve our Services.
              We may use both Anonymous and Personal Information as described in this Privacy Policy
              for research, commercial purposes, and operational improvements, including but not
              limited to:
            </Text>

            <UnorderedList>
              {[
                "Setting up user accounts and profiles.",
                "Responding to your inquiries.",
                "Delivering the Services and related notifications.",
                "Administering, maintaining, improving, and customizing the Services.",
                "Sending information about our Services.",
                "Collecting feedback and providing customer support.",
                "Sending transactional messages (e.g., account confirmation, password reset).",
                "Conducting surveys and audits.",
                "Providing information to advisors for compliance with legal, accounting, or security requirements.",
                "Fulfilling orders including processing payments, shipping, and providing invoices/confirmations.",
                "Verifying and responding to your requests concerning your personal data.",
                "Preventing and investigating fraud, hacking, or other misconduct related to our Services.",
                "Other purposes disclosed during the collection.",
              ].map((it, idx) => {
                return (
                  <ListItem key={idx}>
                    <Text>{it}</Text>
                  </ListItem>
                );
              })}
            </UnorderedList>

            <Text>
              Additionally, we may use your data for legal reasons, including protecting our
              business and addressing any illegal, unethical, or legally actionable activities.
            </Text>
          </Section>

          <Section>
            <TitleXL>4. Sharing of Information</TitleXL>

            {[
              "Our group of companies, including subsidiaries and the ultimate holding company with its subsidiaries, may have access to your personal data as reasonably required for the purposes outlined in this policy. This access may be for internal administrative tasks, as well as to provide or share IT, payment, marketing services, or data center operations within the group.",
              "We may share your personal data with our insurers and professional advisors when necessary for obtaining or maintaining insurance coverage, managing risks, seeking professional advice, or for the purpose of establishing, exercising, or defending legal claims in court or other legal proceedings.",
              "To ensure the security of your personal data and to comply with legal requirements, we may disclose your information to our anti-fraud, risk management, and compliance service providers.",
              "Your personal data may be shared with payment service providers to facilitate processing your payments, transferring funds, and addressing payment-related complaints and inquiries. The shared data with payment providers is limited to what is necessary for these purposes.",
              "In certain situations where specific services are provided, we may disclose your personal data to other service providers. This can include server providers, email service providers, data analysis or marketing services, call centers, customer satisfaction surveys, or market research entities. We ensure that these subcontractors implement appropriate organizational and technical measures to protect the security and privacy of your personal data.",
              "Moreover, your personal data may be disclosed if it is required to comply with legal obligations, protect your vital interests or those of another person, or for the establishment, exercise, or defense of legal claims.",
              `These entities may be located outside the European Union and European Economic Area. If your personal data is transferred to such entities, we will implement necessary measures as prescribed by relevant legal acts to ensure your privacy is adequately protected. This might include signing standard contractual clauses for data transfer. For more information about these safeguards, please contact us at ${APP_DATA.email}.`,
              "We have never and will not sell your Personal Information to third parties without your consent.",
            ].map((it, idx) => {
              return <Text key={idx}>{it}</Text>;
            })}

            <TitleLG>Information You Share</TitleLG>

            <Text>
              Any content you share, like your profile or DMs, can be saved or copied by users
              outside the webapp. As with general internet use, only share content you are
              comfortable with being distributed.
            </Text>
          </Section>

          <Section>
            <TitleXL>5. Behavioral Advertising</TitleXL>

            <Text>
              The Personal Information is used to deliver targeted advertisements or marketing
              communications of potential interest to you. To understand more, visit the Network
              Advertising Initiative:{" "}
              <Link
                to={`http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work`}
              >
                http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
              </Link>
              . You can opt out of targeted advertising via the links below:
            </Text>

            <UnorderedList>
              <ListItem>
                <Text>
                  Bing:{" "}
                  <Link
                    to={`https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads`}
                  >
                    https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
                  </Link>
                </Text>
              </ListItem>

              <ListItem>
                <Text>
                  Google:{" "}
                  <Link to={`https://www.google.com/settings/ads/anonymous`}>
                    https://www.google.com/settings/ads/anonymous
                  </Link>
                </Text>
              </ListItem>

              <ListItem>
                <Text>
                  Facebook:{" "}
                  <Link to={`https://www.facebook.com/settings/?tab=ads`}>
                    https://www.facebook.com/settings/?tab=ads
                  </Link>
                </Text>
              </ListItem>
            </UnorderedList>
          </Section>

          <Section>
            <TitleXL>6. Minors</TitleXL>

            <Text>
              The Site is not for individuals under 18 years of age. If you believe we have
              collected data from such individuals, please contact us at {APP_DATA.email}.
            </Text>
          </Section>

          <Section>
            <TitleXL>7. Links to External Websites</TitleXL>

            <Text>
              Our Services may direct you to other websites and applications beyond our control. We
              encourage you to review the Privacy Policies and Terms and Conditions of these
              third-party sites. This Privacy Policy only applies to our Services.
            </Text>
          </Section>

          <Section>
            <TitleXL>8. Storage, Security, and Data Retention</TitleXL>

            <TitleLG>Storage</TitleLG>

            <Text>
              Your Personal Information is usually stored on servers located in the United States.
              If you are situated in another jurisdiction, your data will be transferred to our U.S.
              servers, subject to local data protection laws.
            </Text>

            <TitleLG>Security</TitleLG>

            <Text>
              We have implemented various technical and organizational methods to protect your
              personal data against accidental or unlawful destruction, loss, alteration,
              unauthorized access, or disclosure. However, the security of data transmitted over the
              internet cannot be guaranteed.
            </Text>

            <TitleLG>Data Retention</TitleLG>

            <Text>
              Personal data is retained only as long as necessary for the intended purposes, such
              as:
            </Text>

            <UnorderedList>
              {[
                "Account data: Retained for up to 5 years post your last account update.",
                "Service data: Retained for up to 5 years post service completion.",
                "Messaging data: Retained up to 2 years post-consent or service completion unless consent is withdrawn earlier.",
                "Correspondence data: Retained for up to 6 months post-communication.",
              ].map((it, idx) => {
                return (
                  <ListItem key={idx}>
                    <Text>{it}</Text>
                  </ListItem>
                );
              })}
            </UnorderedList>

            <Text>
              In some cases, specific retention periods cannot be predetermined. For instance,
              device data is retained as long as required for processing.
            </Text>

            <Text>
              Notwithstanding, we may retain your personal data to comply with legal obligations or
              protect vital interests.
            </Text>
          </Section>

          <Section>
            <TitleXL>9. Your Choices and Rights</TitleXL>

            <Text>
              To update contact information/preferences, remove data, or inquire about this Privacy
              Policy, contact us at {APP_DATA.email}. Providing personal information is not
              obligatory, but refusing may limit our ability to respond to requests or offer certain
              Services. Opt-out of email comunicaciones by clicking unsubscribe links within
              messages. Control cookie settings via your browser's privacy settings; opting out of
              analytics cookies can also be done through{" "}
              <Link to={`https://tools.google.com/dlpage/gaoptout`}>
                https://tools.google.com/dlpage/gaoptout
              </Link>
            </Text>

            <Text>
              Depending on your jurisdiction, you may have rights regarding your data, including
              access, correction, deletion, objection, and restriction of processing. These rights
              are subject to exceptions and conditions under applicable laws. Verify your identity
              for these requests by contacting {APP_DATA.email}.
            </Text>

            <Text>
              EU residents have the right to access and request corrections or deletions of their
              personal data. To exercise this, contact {APP_DATA.email}. We process EU resident data
              as needed to fulfill contracts or for legitimate business interests, and your data may
              be transferred internationally, including to Canada and the United States.
            </Text>
          </Section>

          <Section>
            <TitleXL>10. Modifications to this Privacy Policy</TitleXL>

            <Text>
              We may revise this Privacy Policy periodically and notify you by updating the “Last
              updated Date” at the bottom, posting an announcement, or sending written communication
              before new policies take effect. Continued use of our Websites, Webapps, and Services
              following such notifications indicates your agreement to the revised policy. Regularly
              review this Privacy Policy to remain informed about {APP_DATA.productName}'s current
              practices.
            </Text>
          </Section>

          <Section>
            <TitleXL>11. Contact Information</TitleXL>

            <Text>
              Should you have any inquiries regarding this Privacy Policy, feel free to reach out to
              us at {APP_DATA.email}.
            </Text>
          </Section>

          <TitleXL>Last updated: October 10, 2024</TitleXL>
        </Stack>
      </Container>
    </Stack>
  );
}
