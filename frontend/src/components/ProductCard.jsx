import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

const defaultProductState = {
    name: "",
    price: "",
    image: "",
};

const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const ProductCard = ({ product, index = 0 }) => {
    const [updatedProduct, setUpdatedProduct] = useState(defaultProductState);

    useEffect(() => {
        setUpdatedProduct(product ?? defaultProductState);
    }, [product]);

    const border = useColorModeValue("ink.100", "whiteAlpha.200");
    const bg = useColorModeValue("paper.50", "ink.900");
    const muted = useColorModeValue("ink.500", "ink.300");
    const hoverShadow = useColorModeValue(
        "0 20px 32px -20px rgba(16,20,35,0.28)",
        "0 20px 32px -20px rgba(0,0,0,0.6)"
    );

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isOpen && product) {
            setUpdatedProduct(product);
        }
    }, [isOpen, product]);

    const handleClose = () => {
        onClose();
        setUpdatedProduct(product ?? defaultProductState);
    };

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Removed" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: "Updated",
            description: "Listing saved",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        handleClose();
    };

    if (!product) {
        return null;
    }

    return (
        <MotionBox
            layout
            variants={cardVariants}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ y: -4, boxShadow: hoverShadow }}
            border="1px solid"
            borderColor={border}
            bg={bg}
            position="relative"
            style={{ transition: "border-color 0.2s ease" }}
        >
            <Box position="relative" overflow="hidden" role="group">
                <Image
                    src={product.image ?? ""}
                    alt={product.name ?? "Product"}
                    h={48}
                    w="full"
                    objectFit="cover"
                    transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    _groupHover={{ transform: "scale(1.06)" }}
                />
                <Text
                    position="absolute"
                    top={2}
                    left={2}
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight={600}
                    px={2}
                    py={0.5}
                    bg="ink.900"
                    color="paper.50"
                >
                    {String(index + 1).padStart(2, "0")}
                </Text>
            </Box>

            <Box p={4}>
                <Heading as="h3" size="sm" fontFamily="heading" mb={3} noOfLines={1}>
                    {product.name}
                </Heading>

                <Flex align="center" mb={4}>
                    <Text fontSize="xs" color={muted} fontFamily="mono" letterSpacing="0.05em">
                        PRICE
                    </Text>
                    <Box flex={1} borderBottom="1px dotted" borderColor={border} mx={2} mt={3} />
                    <Text fontFamily="mono" fontWeight={600} fontSize="lg" color="tag.600">
                        ${product.price}
                    </Text>
                </Flex>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={onOpen}
                        size="sm"
                        variant="outline"
                        borderColor={border}
                        aria-label="Edit listing"
                        flex={1}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        size="sm"
                        variant="outline"
                        borderColor={border}
                        color="red.500"
                        _hover={{ bg: "red.50" }}
                        aria-label="Delete listing"
                        flex={1}
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />

                <ModalContent borderRadius={0}>
                    <ModalHeader fontFamily="heading">Update listing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                borderRadius={0}
                                value={updatedProduct.name || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                borderRadius={0}
                                value={updatedProduct.price ?? ""}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        price: e.target.value === "" ? "" : Number(e.target.value),
                                    })
                                }
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                borderRadius={0}
                                value={updatedProduct.image || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg="signal.500"
                            color="white"
                            borderRadius={0}
                            _hover={{ bg: "signal.600" }}
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Save changes
                        </Button>
                        <Button variant="ghost" borderRadius={0} onClick={handleClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </MotionBox>
    );
};
export default ProductCard;
