import React from "react";
import {
  Show,
  IconButton,
  Text,
  Grid,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { StaticImage } from "gatsby-plugin-image";

export function Header() {
  return (
    <Grid gridTemplateColumns={"auto 1fr"} width={"full"} alignItems={"center"}>
      <StaticImage src={`../../images/intuvist-logo-black-h.png`} alt="Intuvist logo" height={35} />

      <Box ml="auto">
        <Show above="sm">
          <MenuFlat />
        </Show>

        <Show below="sm">
          <MenuHamburger />
        </Show>
      </Box>
    </Grid>
  );
}

const links: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Careers",
    path: "/careers",
  },
  {
    title: "About Us",
    path: "/about-us",
  },
];

function MenuFlat() {
  return (
    <Flex gap={4}>
      {links.map((it) => {
        return (
          <Link key={it.path} href={it.path}>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              {it.title}
            </Text>
          </Link>
        );
      })}
    </Flex>
  );
}

function MenuHamburger() {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />

      <MenuList>
        {links.map((it) => {
          return (
            <Link key={it.path} href={it.path}>
              <MenuItem value={it.path}>{it.title}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
