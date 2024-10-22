import {
  Container,
  ListItem,
  Stack,
  StackProps,
  TextProps,
  Text as TextRaw,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Link as LinkRaw } from "gatsby";
import { APP_DATA } from "src/data";
import { TopNavigation } from "@components/topnavigation";

function Headline(props: TextProps) {
  return <TextRaw textAlign={"left"} fontSize={"3xl"} fontWeight={"bold"} {...props} />;
}

function TitleXL(props: TextProps) {
  return <TextRaw textAlign={"left"} fontSize={"xl"} fontWeight={"bold"} {...props} />;
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

export default function TermsAndConditionsPage() {
  return (
    <Stack>
      <TopNavigation />

      <Container>
        <Stack spacing={8} my={10}>
          <Headline>Terms and Conditions</Headline>

          <Section>
            <TitleXL>1. Descriptions</TitleXL>

            <Text>
              These Terms of Use ("Terms") govern the use of {APP_DATA.productName}. Carefully read
              through them. By clicking the “Start now” button or accessing any
              screen/feature/button associated with these Terms and agreeing to them, you consent to
              comply with these Terms.
            </Text>

            <Text>
              If you disagree with any part of these Terms, do not use {APP_DATA.productName}.
            </Text>

            <Text>
              – THESE TERMS INCLUDE AN ARBITRATION AGREEMENT, REQUIRING INDIVIDUAL DISPUTE
              RESOLUTION THROUGH ARBITRATION, NOT IN COURT. THERE IS NO JUDGE OR JURY IN ARBITRATION
              AND REVIEW IS LIMITED. ARBITRATION IS THE ONLY DISPUTE RESOLUTION METHOD FOR ISSUES
              RELATED TO YOUR USE OF {APP_DATA.productName}, EXCEPT FOR SPECIFIC EXCEPTIONS DETAILED
              BELOW (YOU CAN OPT-OUT OF THE ARBITRATION AGREEMENT, INCLUDING CLASS ACTION WAIVERS,
              WITHIN 30 DAYS OF ACCEPTING THESE TERMS).
            </Text>

            <Text>
              – YOUR SUBSCRIPTION TO {APP_DATA.productName.toUpperCase()} WILL AUTOMATICALLY RENEW
              UNLESS YOU CANCEL, AS EXPLAINED FURTHER BELOW.
            </Text>

            <Stack>
              <Text>
                1.1. “Account” refers to the personal profile created by the Buyer during
                registration, storing the Buyer's information.
              </Text>
              <Text>
                1.2. “Additional Content” signifies extra digital content available for an
                additional fee to Buyers with a subscription. This content is accessible via the
                Website, Webapp, or sent to the Buyer's email.
              </Text>
              <Text>
                1.3. “Agreement” denotes the contract for the sale of Content/Additional
                Content/Services between the Buyer and Seller per these Terms. This Agreement does
                not establish any agency, partnership, joint venture, employee-employer or
                franchisor-franchisee relationship.
              </Text>
              <Text>
                1.4. “Buyer” refers to any individual or legal entity who uses the Website/Webapp
                and purchases Content/Additional Content/Services from the Seller. The Buyer can
                only be an individual or entity lawfully entitled to use the Website/Webapp and make
                purchases without additional consent.
              </Text>
              <Text>
                1.5. “Consumer” designates a Buyer who is an individual purchasing for non-business
                related purposes (personal use).
              </Text>
              <Text>
                1.6. “Content” means digital content made available to the Buyer under this
                Agreement upon purchasing a subscription. Content is accessible via the Webapp or
                can be emailed to the Buyer.
              </Text>
              <Text>
                1.7. “Webapp” is the website used by the Buyer for purchasing Content/Additional
                Content under these Terms (
                <Link to={APP_DATA.webapp.title}>{APP_DATA.webapp.url}</Link>
                ).
              </Text>
              <Text>
                1.8. “Order” indicates the Buyer's request to purchase Content/Additional
                Content/Services via the Website/Webapp or email.
              </Text>
              <Text>1.9. “Parties” refers to the Buyer and the Seller collectively.</Text>
              <Text>1.10. “Party” refers to either the Buyer or the Seller individually.</Text>
              <Text>
                1.11. “Services” are the services offered on the Website/Webapp or by email,
                purchasable for an additional fee by Buyers with a subscription to the Content.
              </Text>
              <Text>
                1.12. “Privacy Policy” is the privacy policy available at (
                <Link to={APP_DATA.website.title}>{APP_DATA.website.url}</Link>
                ).
              </Text>
              <Text>
                1.13.“Seller, the Company” refers to a company MB Vrm datalabs, registered under
                company code 307004972, with its principal office located at Ragainės str. 3-15,
                LT-92196 Klaipėda, Lithuania, contactable via email at {APP_DATA.email}. The
                Seller's information is recorded in the Register of Legal Entities.
              </Text>
              <Text>
                1.14. “Subscription” signifies a subscription to the Content for a period chosen by
                the Buyer under these Terms.
              </Text>
              <Text>
                1.15. “Terms” refers to the general terms and conditions for using the
                Website/Webapp and purchasing Content/Additional Content/Services.
              </Text>
              <Text>
                1.16. “Third Party” means any individual or entity not party to this Agreement.
              </Text>
              <Text>
                1.17. “Website” refers to the site located at (
                <Link to={APP_DATA.website.title}>{APP_DATA.website.url}</Link>
                ).
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>2. Website / Webapp</TitleXL>

            <Stack>
              <Text>
                2.1. These Terms apply when the Buyer visits the Website/Webapp and/or purchases
                Content/Additional Content/Services, and form a binding agreement between the Seller
                and the Buyer.
              </Text>
              <Text>
                2.2. By agreeing to these Terms, the Buyer confirms they have read and understood
                them and agree to abide by them when using the Website/Webapp and purchasing
                Content/Additional Content/Services.
              </Text>
              <Text>
                2.3. By purchasing Content/Additional Content/Services, the Buyer also acknowledges
                having read and understood the Privacy Policy.
              </Text>
              <Text>
                2.4. If the Buyer disagrees with these Terms, they should not use the Website/Webapp
                or purchase Content/Additional Content/Services.
              </Text>
              <Text>
                2.5. The Seller is not liable if the Buyer does not read these Terms entirely or
                partially, even when given the opportunity to do so.
              </Text>
              <Text>
                2.6. If a separate agreement between the Seller and Buyer exists, that agreement
                prevails concerning the purchase of Content/Additional Content/Services, and these
                Terms apply insofar as consistent with the separate agreement
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>3. Buyer account</TitleXL>

            <Stack>
              <Text>
                3.1. If Account creation is available, it can only be done via the Webapp, requiring
                the Buyer to enter their name, necessary order execution data, and a password.
              </Text>
              <Text>
                3.2. The Buyer is responsible for maintaining the security of the Account password,
                and all actions taken on the Account are assumed by the Seller to be those of the
                Buyer. The Seller is not liable for losses resulting from the Buyer’s failure to
                secure their Account.
              </Text>
              <Text>
                3.3. The Buyer must inform the Seller immediately of any unauthorized access to
                their Account.
              </Text>
              <Text>3.4. The Buyer can delete their Account at any time.</Text>
              <Text>
                3.5. An Account is automatically deleted if the Buyer has not logged in for 5 years
                from the last login.
              </Text>
              <Text>
                3.6. The Buyer does not own the Account, and the Seller can cancel, delete, or block
                it, and remove associated content at any time without notice if the Buyer breaches
                these Terms. The Buyer will be informed of such actions via the email address
                associated with the Account within a reasonable time.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>4. Finalization of The Agreement</TitleXL>

            <Stack>
              <Text>
                4.1. The Agreement is formed when the Buyer submits an Order and pays for it, and an
                Order Confirmation is sent by email.
              </Text>
              <Text>
                4.2. The Buyer must follow the payment procedures outlined in these Terms.
              </Text>
              <Text>
                4.3. The Buyer may receive informative messages necessary for order execution at
                their provided email or phone number.
              </Text>
              <Text>
                4.4. The Buyer must ensure the accuracy and completeness of order information. If
                registration details change, the Buyer must promptly update them. The Seller is not
                liable for damages from incorrect or incomplete data provided by the Buyer.
              </Text>
              <Text>
                4.5. By accepting these Terms, the Buyer agrees that the Seller may not approve or
                might cancel an Order, and refund the amount paid, under certain circumstances like
                technical errors or other objective reasons beyond the Seller’s control, and will
                inform the Buyer of such actions via email. If the Buyer disagrees with an altered
                delivery date, they may cancel the order and get a full refund.
              </Text>
              <Text>
                4.6. If the Buyer starts an Order but does not complete it and pay, the Agreement is
                not formed.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>5. Buyer's Rights and Obligations </TitleXL>

            <Stack>
              <Text>
                5.1. The Buyer can use the Website/Webapp and purchase Content/Additional
                Content/Services as per these Terms
              </Text>

              <Text>
                5.2. The Buyer can use the Content/Additional Content/Services according to these
                Terms
              </Text>

              <Text>5.3. The Buyer agrees to:</Text>

              <Text>
                5.3.1. use the Website/Webapp and make purchases lawfully and in good faith, in
                compliance with these Terms and applicable law
              </Text>

              <Text>5.3.2. avoid using the Website/Webapp for illegal or prohibited purposes</Text>

              <Text>5.3.3. avoid illegal use of the Content/Additional Content/Services</Text>

              <Text>
                5.3.4. respect the intellectual property rights of the Seller and Third Parties
              </Text>

              <Text>
                5.3.5. provide accurate information when purchasing Content/Additional
                Content/Services
              </Text>

              <Text>
                5.3.6. update Account data promptly if there are changes. The Seller is not liable
                for damages resulting from incorrect or outdated data
              </Text>

              <Text>
                5.3.7. keep Account login details confidential and inform the Seller if login
                details are lost
              </Text>

              <Text>5.3.8. not impersonate others or create fake Accounts</Text>

              <Text>
                5.3.9. pay for ordered Content/Additional Content/Services as per these Terms
              </Text>

              <Text>
                5.3.10. refrain from actions aimed at misappropriating information or affecting
                Website/Webapp operations
              </Text>

              <Text>5.3.11. avoid overloading the Website/Webapp</Text>

              <Text>
                5.3.12. avoid using devices, software, or methods that interfere with Website/Webapp
                operations
              </Text>

              <Text>5.3.13. not compromise the security of the Website/Webapp</Text>

              <Text>5.3.14. adhere to other obligations in these Terms and applicable laws</Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>6. Seller’s Rights and Obligations </TitleXL>

            <Stack>
              <Text>6.1. The Seller has the right to:</Text>

              <Text>
                6.1.1. block or cancel the Buyer’s Account without prior notice if the Buyer
                breaches obligations under Clause 5.3. The extent and duration of the breach will
                determine the action taken. The Buyer will be notified of such actions via the email
                on record within a reasonable time;
              </Text>

              <Text>
                6.1.2. terminate the Website/Webapp operations without prior notice, with prior
                Orders either fulfilled or refunded proportionately for the unused subscription
                period.
              </Text>

              <Text>6.2. The Seller agrees to:</Text>

              <Text>6.2.1. process Orders according to these Terms;</Text>

              <Text>
                6.2.2. enable Buyer access to purchased Content/Additional Content/Services as per
                these Terms;
              </Text>

              <Text>
                6.2.3. respect Buyer privacy and handle personal data per these Terms, the Privacy
                Policy, and applicable laws;
              </Text>

              <Text>
                6.2.4. comply with other obligations under these Terms and applicable laws.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>7. Content/Additional Content/Services</TitleXL>

            <Stack>
              <Text>
                7.1. Offers for Content/Additional Content/Services are valid as long as posted on
                the Website/Webapp unless specified otherwise. Offers via email are valid for the
                time mentioned in the email.
              </Text>

              <Text>
                7.2. The Seller can change subscription prices for Content anytime, notifying the
                Buyer via email or as per these Terms. If the Buyer disagrees with new prices, they
                can cancel the subscription before changes take effect by notifying the Seller via
                email at {APP_DATA.email}.
              </Text>

              <Text>
                7.3. Discounts on Content/Additional Content/Services may apply at the Seller’s
                discretion.
              </Text>

              <Text>
                7.4. Information about Content/Additional Content/Services, features, prices, and
                additional costs are available on the Website/Webapp or email offers.
              </Text>

              <Text>
                7.5. To access the Content, the Buyer needs an internet connection, an Account
                (unless optional), and payment of the indicated price.
              </Text>

              <Text>
                7.6. Content subscriptions are recurring. The subscription automatically renews for
                the same period unless canceled 24 hours before renewal. One-off payment access is
                also available.
              </Text>

              <Text>7.7. Subscription periods for Content include: 1 week.</Text>

              <Text>
                7.8. Upon subscription purchase, the Buyer receives login details for the Webapp to
                access Content for the subscription period.
              </Text>

              <Text>
                7.9. The Buyer can cancel their subscription anytime, but no later than 24 hours
                before automatic renewal, by emailing the Seller at {APP_DATA.email}.
              </Text>

              <Text>
                7.10. After cancellation, the Buyer can use the Content until the end of the paid
                subscription period.
              </Text>

              <Text>7.11. Refund procedure:</Text>

              <Text>
                - Contact the Seller within 10 calendar days of the initial Content purchase to
                request a refund.
              </Text>

              <Text>
                - {APP_DATA.productName} plans are non-refundable as digital intellectual property
                fully disclosed upon purchase.
              </Text>

              <Text>
                - The Seller's team will review the refund request within 4 calendar days and make a
                decision.
              </Text>

              <Text>- Approved refunds are processed within 14 calendar days.</Text>

              <Text>Refunds will not be made if:</Text>

              <Text>- The refund procedure is not followed.</Text>

              <Text>- The Buyer refuses necessary instructions or assistance.</Text>

              <Text>- The Buyer did not read the Terms before purchasing.</Text>

              <Text>- The Content was bought by mistake or based on incorrect assumptions.</Text>

              <Text>- The Buyer changes their mind for non-technical reasons.</Text>

              <Text>
                7.12. Refunds are paid to the bank account used for the subscription, not for
                expired, non-use, low-use, dislike, or other subjective reasons.
              </Text>

              <Text>
                7.13. Promotional prices apply if subscribing for the entire promotional period.
                Early cancellations incur a payment for the difference between regular and
                promotional prices.
              </Text>

              <Text>
                7.14. If Content does not meet quality standards, the Buyer can contact the Seller
                to rectify issues. The Seller will address faults unless disproportionately costly.
                The Buyer can request a price reduction or terminate the Agreement if defects cannot
                be fixed.
              </Text>

              <Text>
                7.15. One-off Content has a 2-year quality guarantee from submission. Continuous
                Content provision has a liability period for arising defects during the provision.
              </Text>

              <Text>
                7.16. By purchasing a Lifetime Subscription, the Buyer secures access to the Content
                for as long as the Seller remains in active operation. However, it's important to
                note that this doesn't assure unlimited or eternal access. The duration of access is
                directly tied to the Seller's continued business activities. Should the Seller
                decide to cease operations or make significant alterations to their service
                offerings, they are obligated to inform Lifetime Subscription holders about any
                resulting changes. This communication will be sent to the email address linked to
                the Buyer's account. This clause underscores that while a Lifetime Subscription
                offers extended access, it's still contingent on the Seller's ongoing business
                status and service provision.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>8. Payments for The Content/Services</TitleXL>

            <Stack>
              <Text>
                8.1. The applicable price is what's shown on the Website/Webapp or via email at the
                time of the order.
              </Text>

              <Text>
                8.2. Content/Additional Content/Services are priced in USD, including VAT and other
                taxes if applicable.
              </Text>

              <Text>8.3. Payment methods are specified during checkout.</Text>

              <Text>
                8.4. Paid-trials, Subscriptions and Lifetime Access require upfront payment and
                automatically renew until canceled 24 hours before the end of the period.
              </Text>

              <Text>
                8.5. If automatic renewal fails, a one-off discount might be applied. Subsequent
                renewals follow the standard procedure.
              </Text>

              <Text>
                8.6. By accepting these Terms, you agree to third-party service providers managing
                and storing payment information per PCI DSS standards. Modifying, updating, or
                removing payment information may affect service usage.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>9. Rights of Intellectual Property </TitleXL>

            <Stack>
              <Text>
                9.1. The Website/Webapp and its content (texts, graphics, images, logos, software,
                domains) are the intellectual property of the Seller or Third Parties, protected by
                Lithuanian and international copyright laws.
              </Text>

              <Text>
                9.2. Using the Website/Webapp and purchasing Content/Additional Content does not
                transfer intellectual property rights. The Buyer can only use the Seller's Content
                and/or purchased Content/Additional Content for personal and informational purposes.
                Publication, sale, reproduction, and modification without prior written consent are
                prohibited.
              </Text>

              <Text>
                9.3. Infringement of intellectual property rights requires indemnification for
                damages caused.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>10. Liability</TitleXL>

            <Stack>
              <Text>
                10.1. The Parties are liable for non-performance of their obligations per these
                Terms and applicable laws.
              </Text>

              <Text>
                10.2. The Seller's liability is limited to direct losses caused by improper
                performance. Consequential damages, reputational loss, profit/revenue loss claims
                are excluded unless mandated by law.
              </Text>

              <Text>
                10.3. The Seller is not liable if losses stem from the Buyer failing to read the
                Terms, Privacy Policy, or other provided information.
              </Text>

              <Text>
                10.4. Uninterrupted Website/Webapp operation is not guaranteed. The Seller isn't
                responsible for internet access provision.
              </Text>

              <Text>
                10.5. Expectations for Content/Additional Content/Services availability are not
                guaranteed.
              </Text>

              <Text>
                10.6. Non-liability for non-performance due to force majeure circumstances, as
                defined by law.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>11. Withdrawal from The Agreement</TitleXL>

            <Stack>
              <Text>
                11.1. Withdrawal: The Buyer can withdraw from the Agreement within 14 days without
                reason, unless provision of Content/Additional Content/Services has started with
                prior consent. Withdrawal period expires 14 days after Agreement conclusion. To
                withdraw, the Buyer must notify the Seller via email to {APP_DATA.email}. Sending
                notice before the 14-day period ends is sufficient.
              </Text>

              <Text>
                11.2. Consequences: If the Buyer withdraws and had not consented to provision during
                the withdrawal period, the Seller refunds payments within 14 days of receiving the
                withdrawal notice. If the Buyer consented to provision within the period, no
                withdrawal is allowed. However, the Agreement can be terminated as per Clause 7.8.
              </Text>

              <Text>
                11.3. Agreement and immediate execution waiver are acknowledged upon Content and/or
                Additional Content purchase confirmation by the Seller and receipt by the Buyer.
              </Text>

              <Text>
                11.4. The right of withdrawal applies to EU-resident Buyers deemed consumers under
                applicable law.
              </Text>

              <Text>
                11.5. Once a Buyer has purchased a Lifetime Access and has been granted access to
                the Content, they cannot exercise the right of withdrawal. This exclusion from the
                right of withdrawal applies specifically when the Buyer has explicitly acknowledged,
                at the time of purchase, that they understand and agree to the immediate provision
                of services associated with the Lifetime Access.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>12. Provision of Information</TitleXL>

            <Stack>
              <Text>
                12.1. Order-related notifications are sent to the Buyer's provided email or phone
                number. The Seller is not responsible if notifications aren't received due to
                connection issues, spam filtering, or incorrect Buyer data.
              </Text>

              <Text>
                12.2. Notifications, claims, or questions can be sent to the Seller using the
                contact information in Clause 1.13.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>13. Amendment of Terms</TitleXL>

            <Stack>
              <Text>
                13.1. The Seller may change these Terms anytime. Changes are effective upon
                Website/Webapp publication. The Buyer should cease using the Website/Webapp and not
                purchase Content/Additional Content/Services if they disagree with the new Terms.
              </Text>

              <Text>
                13.2. Current Terms are always available on the Website/Webapp. The Terms in effect
                at the order time apply to that order.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>14. Dispute Resolution and Applicable Law </TitleXL>

            <Stack>
              <Text>
                14.1. INFORMAL PROCESS FIRST. Our primary aim is to address and resolve issues
                amicably and efficiently. If you encounter any problems with the Company, we
                encourage a dialogue before taking any formal steps. Simply send us a brief note
                describing the issue, and we will do our best to resolve it together.
              </Text>

              <Text>
                14.2. ARBITRATION AGREEMENT. PLEASE READ THIS SECTION (THE “ARBITRATION AGREEMENT”)
                CAREFULLY, AS IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR ABILITY TO BRING CLAIMS
                TO COURT.
              </Text>

              <UnorderedList>
                <ListItem>
                  <Text>
                    Application of the Arbitration Agreement. Both you and the Company agree that
                    any disputes, claims, or controversies arising between you and the Company
                    regarding these Terms or your relationship with the Company as a user of the
                    Product (whether based on contract, tort, statute, fraud, misrepresentation, or
                    any other legal theory, and regardless of whether the claims arise during or
                    after the termination of these Terms) will be resolved through mandatory binding
                    individual arbitration, not through class actions or lawsuits. YOU AND THE
                    COMPANY THEREFORE WAIVE THE RIGHT TO LITIGATE DISPUTES IN COURT UNDER THESE
                    TERMS (EXCEPT FOR MATTERS THAT CAN BE BROUGHT TO SMALL CLAIMS COURT OR FOR
                    PROTECTING THE COMPANY'S INTELLECTUAL PROPERTY RIGHTS, OR IF YOU EXERCISE YOUR
                    30-DAY RIGHT TO OPT OUT OF THE ARBITRATION AGREEMENT AS OUTLINED BELOW). This
                    Arbitration Agreement shall remain in effect even after the termination of these
                    Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Exception - Small Claims Court. Notwithstanding our preference for arbitration,
                    either party retains the right to seek relief in small claims court for disputes
                    that fall within its jurisdiction.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Exception - Protecting Company's Intellectual Property. The Company reserves the
                    right to seek injunctive or other equitable relief from a court to stop the
                    infringement or misuse of its intellectual property.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Exception - 30-Day Opt-Out. You have the option to opt out of this Arbitration
                    Agreement (including the class action waiver) by sending written notice within
                    30 days of accepting these Terms. If you do not opt out within this period, you
                    agree to be bound by arbitration under these Terms.
                  </Text>
                </ListItem>

                <ListItem>
                  <Stack>
                    <Text>
                      Arbitration Procedure. Overview: Arbitration is a less formal process compared
                      to court proceedings. It involves a neutral arbitrator in place of a judge or
                      jury, has limited discovery, and reduced judicial review. The arbitrator can
                      grant the same relief as a court. The arbitrator is bound by this Arbitration
                      Agreement. All issues are decided by the arbitrator, including the scope and
                      enforceability of the Agreement. The arbitrator's decision is final and
                      binding, subject to limited judicial review or if the arbitrator grants
                      injunctive relief, which a court can review.
                    </Text>

                    <Text>
                      Rules: Any arbitration between you and the Company will be conducted under the
                      Consumer Arbitration Rules of the American Arbitration Association (“AAA”), as
                      modified by this Agreement. The AAA Rules and instructions for initiating
                      arbitration are available at www.adr.org or by calling 1-800-778-7879.
                    </Text>

                    <Text>
                      Initiating Arbitration: Either party can begin arbitration proceedings. If you
                      choose arbitration, you must first notify the Company in writing (“Notice”).
                      The Notice should describe the nature of the claim or dispute and the relief
                      sought. If no resolution is reached within 30 days of receiving the Notice,
                      either party may commence arbitration. Claims can be filed by mail, online, or
                      in person at AAA offices.
                    </Text>

                    <Text>
                      Fees: Arbitration requires filing fees. Each party is responsible for its own
                      legal fees unless otherwise stipulated by arbitration rules or law. The
                      arbitrator can decide on fee disputes.{" "}
                    </Text>

                    <Text>
                      Documents-Only Procedure, Videoconference: Disputes below $25,000 are
                      generally resolved through document submission unless a hearing is requested
                      by a party or deemed necessary by the arbitrator. Other hearings are typically
                      conducted via videoconference if possible; otherwise, the arbitrator will
                      determine the location.
                    </Text>

                    <Text>Language: The arbitration will be conducted in English.</Text>

                    <Text>
                      Decision: The arbitrator will issue a written decision outlining the findings
                      and conclusions. Settlement offers are not disclosed until after the
                      arbitrator’s final decision.
                    </Text>

                    <Text>
                      Timeline: The arbitrator must issue a decision within 30 days of closing the
                      hearing or, for document-only procedures, within 14 days after receiving final
                      statements and evidence.
                    </Text>
                  </Stack>
                </ListItem>

                <ListItem>
                  <Text>
                    No Class or Representative Proceedings; Class Action Waiver. YOU AND THE COMPANY
                    AGREE TO PURSUE CLAIMS ONLY IN YOUR INDIVIDUAL CAPACITY, NOT AS A CLASS MEMBER
                    OR PLAINTIFF IN ANY CLASS OR REPRESENTATIVE ACTION. The arbitrator cannot
                    consolidate claims or preside over class or representative proceedings. If this
                    provision is unenforceable, the entire arbitration provision shall be void.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Confidentiality. Information and documents related to arbitration are
                    confidential and can only be disclosed to necessary parties or as required by
                    law.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Interpretation and Enforcement of the Arbitration Agreement. If the agreement is
                    found invalid, disputes will be handled by a court in accordance with applicable
                    law.
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text>
                14.3. These Terms and the purchase of the Content/Additional Content/Services are
                governed by the laws of the Republic of Lithuania unless specified otherwise by
                applicable legislation.
              </Text>

              <Text>
                14.4. Any other disputes arising from these Terms or the purchase of
                Content/Additional Content/Services shall be resolved and referred to the competent
                courts of the Republic of Lithuania, unless otherwise stipulated by applicable
                legislation. Where the Buyer is not considered a consumer under applicable
                legislation, disputes shall initially be settled by the competent court in Vilnius.
              </Text>

              <Text>
                14.5. If the Buyer has a complaint, it can be submitted to the Seller using the
                contact details specified in these Terms. The Seller commits to responding to such
                claims within 14 (fourteen) calendar days from receiving the Buyer's request.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>15. Final Provisions</TitleXL>

            <Stack>
              <Text>
                15.1. Non-performance due to force majeure is exempt from liability, defined by law.
              </Text>

              <Text>
                15.2. The Seller can assign rights and obligations under these Terms without
                consumer consent, provided the assignment does not impact their position or
                guarantees.
              </Text>

              <Text>
                15.3. The Website/Webapp may have links to Third-Party sites. The Seller accepts no
                responsibility for Third-Party content. Using Third-Party content is at the Buyer's
                risk, with no guarantees or endorsements from the Seller.
              </Text>

              <Text>
                15.4. In the event that changes to the Seller's operational status impact the
                availability of the Lifetime Access, the Seller commits to informing the Buyer as
                soon as possible. This notification will include a description of the changes
                occurring and an explanation of how these changes affect the Lifetime Access. The
                Seller maintains the authority to decide, based on the specific situation, whether
                to offer compensatory measures or refunds. This decision will be made at the
                Seller's discretion and will take into account the particular circumstances leading
                to the discontinuation or significant alteration of the services provided under the
                Lifetime Access.
              </Text>
            </Stack>
          </Section>

          <Section>
            <TitleXL>16. Contact Information</TitleXL>

            <Text>
              Should you have any inquiries regarding these Terms or the Services, feel free to
              reach out to us at {APP_DATA.email}.
            </Text>
          </Section>

          <TitleXL>Last updated: October 10, 2024</TitleXL>
        </Stack>
      </Container>
    </Stack>
  );
}
