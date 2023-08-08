import React from "react";
import { Box, Center, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai"; // Import the message icon
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const MatchPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxHeight: 855 });
  const handleSendMessage = () => {
    // Add your logic for sending a message here
    navigate("/message");
  };
  return (
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
          bg="white"
          borderRadius="md"
          p={6}
          boxShadow="md"
          style={{
            margin: "10px",
            height: isSmallScreen ? "60h" : "45vh",
            borderRadius: "10%",
          }}>
          <Text
            fontWeight="bold"
            color="teal.500"
            mb={4}
            style={{
              marginTop: "50px",
              fontSize: "40px",
            }}
            className="match_text">
            It's a Match!
          </Text>
          <div>
            <Image
              src="https://images5.alphacoders.com/460/thumbbig-460317.webp"
              alt="Matched User"
              borderRadius="full"
              height={100}
              width={100}
              mb={4}
              style={{
                borderRadius: "100%",
              }}
            />
            <label style={{ margin: "0 25px", fontSize: "30px" }}>
              <i class="bi bi-heart-fill"></i>
            </label>
            <Image
              src="https://nationaltoday.com/wp-content/uploads/2022/05/74-Robert-Pattinson.jpg"
              alt="Matched User"
              borderRadius="full"
              height={100}
              width={100}
              mb={4}
              style={{
                borderRadius: "100%",
              }}
            />
          </div>
          <Text
            textAlign="center"
            style={{
              margin: "20px 40px",
              marginTop: "30px",
              fontSize: "18px",
            }}>
            Congratulations, you and the other user like each other!
          </Text>
          <Box
            mt={4}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
            onClick={handleSendMessage}>
            <Text style={{ marginRight: "5px", cursor: "pointer" }}>
              Send Message
            </Text>
            <i class="bi bi-chat-dots"></i>
          </Box>
          <Text
            onClick={onClose}
            style={{ fontSize: "20px", cursor: "pointer" }}>
            X
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};
export default MatchPopup;
