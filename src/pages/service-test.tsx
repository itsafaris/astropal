import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Box, Button } from "@chakra-ui/react";

export const Head: HeadFC = () => <title>Astropal</title>;

import { getService } from "@services/zodiacService";

const ServiceTestPage: React.FC<PageProps> = () => {
  const service = getService({ mock: true });

  return (
    <Box>
      Hello
      <Button
        onClick={async () => {
          const res = await service.getDailyPhrase();
          console.log(res);
        }}
      >
        Daily phrase
      </Button>
      <Button
        onClick={async () => {
          const res = await service.getZodiacSignData("gemini");
          console.log(res);
        }}
      >
        Sign
      </Button>
      <Button
        onClick={async () => {
          const res = await service.getNumerologyData();
          console.log(res);
        }}
      >
        Numerology
      </Button>
    </Box>
  );
};

export default ServiceTestPage;
