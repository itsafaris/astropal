import { Container, Stack, StackProps, TextProps, Text as TextRaw } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { APP_DATA } from "src/data";

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

export default function ContactsPage() {
  return (
    <Stack>
      <Container>
        <TopNavigation />

        <Headline>Contact us</Headline>
        <Stack spacing={8} my={10}>
          <Section>
            <TitleXL>Customer support</TitleXL>

            <Text>
              If you need help with the order, product or payments.
              <br />
              We answer all of the emails within 24-72 hours (including weekends!)
            </Text>

            <a style={{ color: "#005eed" }} href={`mailto:${APP_DATA.email}`}>
              {APP_DATA.email}
            </a>
          </Section>

          <Section>
            <TitleXL> Partnerships</TitleXL>

            <Text>If you are a content creator or affiliate and would like to work with us:</Text>

            <a style={{ color: "#005eed" }} href={`mailto:${APP_DATA.email}`}>
              {APP_DATA.email}
            </a>
          </Section>
          <Section>
            <TitleXL>Feedback</TitleXL>

            <Text>If you want to share any feedback with us or just to say a good word:</Text>

            <a style={{ color: "#005eed" }} href={`mailto:${APP_DATA.email}`}>
              {APP_DATA.email}
            </a>
          </Section>
        </Stack>
      </Container>
    </Stack>
  );
}
