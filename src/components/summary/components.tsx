import { ComponentProps } from "react";
import { Button, useTheme } from "@chakra-ui/react";
import { Link } from "gatsby";

export function CTALinkToPricing(props: ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Link to="/pricing">
      <Button
        bg="orange.500"
        color="white"
        boxShadow={`0 0 0 6px ${theme.colors.orange["400"]}`}
        _hover={{
          backgroundColor: "orange.600",
        }}
        {...props}
      >
        Get my astrologer
      </Button>
    </Link>
  );
}
