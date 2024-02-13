import { ComponentProps } from "react";
import { Button, useTheme } from "@chakra-ui/react";
import { Link } from "gatsby";

export function CTALinkToPricing(props: ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Link to="/summary#pricing-plans" title="Pricing plans">
      <Button
        px={8}
        py={7}
        variant={"solid"}
        backgroundColor="brand.600"
        _hover={{
          backgroundColor: "brand.500",
        }}
        width={"full"}
        boxShadow={`inset 0 0 0 6px ${theme.colors.brand["800"]}, 0px 5px 15px 0px #00000030`}
        borderRadius={8}
        {...props}
      >
        Get My Insights
      </Button>
    </Link>
  );
}
