import React from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePopup = ({ user, onClose }) => {
  const {
    name,
    age,
    gender,
    relationshipType,
    location,
    bio,
    profilePic,
    relationshipStatus,
    photos, // Array of photo URLs
  } = user;

  // Format the age, location, relationship type, and gender
  const formattedAge = `Age: ${age}`;
  const formattedLocation = `Location: ${location}, ${location}`;
  const formattedRelationshipType = `Relationship Type: ${relationshipType}`;
  const formattedGender = `Gender: ${gender}`;
  const formattedrelationshipStatus = `Relationship Status: ${relationshipStatus}`;
  const formattedAboutme = `About Me: ${bio}`;

  const popupBgColor = useColorModeValue("white", "gray.700");
  const popupHoverBgColor = useColorModeValue("primary", "secondary");

  // Animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -100 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const closeButtonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const profilePictureVariants = {
    hidden: { scale: 1 },
    hover: { scale: 1.2 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  const photoHoverVariants = {
    hover: { scale: 2.5 },
    initial: { scale: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={popupVariants}
        transition={{ duration: 0.3 }}>
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          zIndex="999">
          <Center height="100%">
            <Flex
              direction="column"
              align="center"
              bg={popupBgColor}
              borderRadius="md"
              p={6}
              boxShadow="md"
              maxW={{ base: "90%", md: "70%", lg: "60%" }} // Adjust the maximum width here
              w={{ base: "100%", md: "70%", lg: "60%" }} // Adjust the width here
              _hover={{
                boxShadow: "lg",
                bg: popupHoverBgColor,
              }}
              transition="box-shadow 0.3s ease-in-out">
              <motion.div
                whileHover="hover"
                initial="hidden"
                animate="visible"
                variants={profilePictureVariants}>
                <Image
                  src={profilePic}
                  alt="Matched User"
                  borderRadius="full"
                  boxSize="150px"
                  mb={4}
                />
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.3 }}>
                <Text fontSize="lg" fontWeight="bold" color="teal.500">
                  {name}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedAge}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedGender}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedRelationshipType}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedrelationshipStatus}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedAboutme}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {formattedLocation}
                </Text>
              </motion.div>
              <Box mt={4} width="100%">
                <Flex justify="center" flexWrap="wrap">
                  {photos.slice(0, 6).map((photoUrl, index) => (
                    <motion.div
                      key={index}
                      whileHover="hover"
                      initial="initial"
                      variants={photoHoverVariants}>
                      <Image
                        src={photoUrl}
                        alt={`Photo ${index + 1}`}
                        borderRadius="md"
                        boxSize="100px"
                        m={2}
                      />
                    </motion.div>
                  ))}
                </Flex>
              </Box>
              <Box mt={4}>
                <motion.button
                  onClick={onClose}
                  variants={closeButtonVariants}
                  whileHover="visible"
                  whileTap="visible"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  p={2}
                  borderRadius="md"
                  bg="teal.500"
                  color="white"
                  cursor="pointer"
                  transition={{ duration: 0.2 }}>
                  Close
                </motion.button>
              </Box>
            </Flex>
          </Center>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfilePopup;
