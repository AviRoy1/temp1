import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);

const ProfileMenu = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [placement, setPlacement] = React.useState("right");

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={"pink"}
        width="12"
        height={"12"}
        rounded="full"
        zIndex={"overlay"}
        position={"fixed"}
        top="6"
        left="6">
        <RiMenu5Fill />
      </Button>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        colorScheme={"yellow"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" backgroundColor={"pink.400"}>
            Profile Pages
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={"4"} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/profile" title="Basic Info" />
              <LinkButton
                onClose={onClose}
                url="/profile/photos"
                title="Photos"
              />
              <LinkButton
                onClose={onClose}
                url="/profile/upgrade"
                title="Upgrade"
              />
              <HStack
                justifyContent={"space-evenly"}
                position="absolute"
                bottom={"2rem"}
                width="80%">
                <Link onClick={onClose} to="/">
                  <Button colorScheme={"pink"}>Log Out</Button>
                </Link>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileMenu;
