import React from "react";
import { Box, Center, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const SubscriptionPopup = ({ onClose }) => {
  //   const history = useHistory();

  const handleSubscriptionClick = () => {
    // Redirect to subscription page
    // history.push("/subscription"); // Replace "/subscription" with the actual subscription route
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="999">
      <Center height="100%">
        <Flex direction="column" align="center">
          <Button
            colorScheme="teal"
            size="lg"
            fontSize="20px"
            fontWeight="bold"
            onClick={handleSubscriptionClick}
            _hover={{
              background: "teal.400",
              color: "white",
            }}
            _active={{
              background: "teal.500",
            }}
            transition="background 0.3s, color 0.3s"
            boxShadow="lg">
            Choose Your Subscription Plan
          </Button>
          <Button
            onClick={onClose}
            colorScheme="gray"
            variant="outline"
            size="md"
            mt={4}
            _hover={{
              background: "gray.200",
            }}
            _active={{
              background: "gray.300",
            }}
            transition="background 0.3s">
            Close
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default SubscriptionPopup;
