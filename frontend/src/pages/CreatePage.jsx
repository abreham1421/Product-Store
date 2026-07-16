import { Box, Button, Container, Image, Text, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";

const MotionBox = motion(Box);

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [imageValid, setImageValid] = useState(true);
	const toast = useToast();
	const navigate = useNavigate();

	const { createProduct } = useProductStore();
	const border = useColorModeValue("ink.100", "whiteAlpha.200");
	const muted = useColorModeValue("ink.500", "ink.300");

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Listed",
				description: message,
				status: "success",
				isClosable: true,
			});
			navigate("/");
		}
		setNewProduct({ name: "", price: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"} py={{ base: 10, md: 14 }}>
			<VStack
				align='flex-start'
				spacing={1}
				mb={8}
				as={motion.div}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
			>
				<Text
					fontFamily='mono'
					fontSize='xs'
					letterSpacing='0.14em'
					textTransform='uppercase'
					color='signal.500'
					fontWeight={600}
				>
					New entry
				</Text>
				<Text fontFamily='heading' fontSize={{ base: "2xl", md: "3xl" }} fontWeight={700} letterSpacing='-0.01em'>
					Add a product
				</Text>
				<Text color={muted} fontSize='sm'>
					It'll appear at the top of your catalog once saved.
				</Text>
			</VStack>

			<MotionBox
				w={"full"}
				border='1px solid'
				borderColor={border}
				p={6}
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
			>
				<VStack spacing={4} align='stretch'>
					<Box>
						<Text fontSize='xs' fontFamily='mono' color={muted} mb={1.5} letterSpacing='0.05em'>
							NAME
						</Text>
						<Input
							placeholder='e.g. Wireless Earbuds'
							name='name'
							borderRadius={0}
							borderColor={border}
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
					</Box>

					<Box>
						<Text fontSize='xs' fontFamily='mono' color={muted} mb={1.5} letterSpacing='0.05em'>
							PRICE (USD)
						</Text>
						<Input
							placeholder='0.00'
							name='price'
							type='number'
							borderRadius={0}
							borderColor={border}
							fontFamily='mono'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
					</Box>

					<Box>
						<Text fontSize='xs' fontFamily='mono' color={muted} mb={1.5} letterSpacing='0.05em'>
							IMAGE URL
						</Text>
						<Input
							placeholder='https://...'
							name='image'
							borderRadius={0}
							borderColor={border}
							value={newProduct.image}
							onChange={(e) => {
								setNewProduct({ ...newProduct, image: e.target.value });
								setImageValid(true);
							}}
						/>
						{newProduct.image && (
							<Box mt={3} border='1px solid' borderColor={border} h='160px' overflow='hidden' bg='blackAlpha.50'>
								{imageValid ? (
									<Image
										src={newProduct.image}
										alt='Preview'
										w='full'
										h='full'
										objectFit='cover'
										onError={() => setImageValid(false)}
									/>
								) : (
									<VStack h='full' justify='center' spacing={0.5}>
										<Text fontSize='xs' color={muted} fontFamily='mono'>
											COULDN'T LOAD IMAGE
										</Text>
									</VStack>
								)}
							</Box>
						)}
					</Box>

					<Button
						bg='signal.500'
						color='white'
						borderRadius={0}
						fontWeight={600}
						_hover={{ bg: "signal.600" }}
						_active={{ bg: "signal.700" }}
						onClick={handleAddProduct}
						w='full'
						mt={2}
					>
						Save to catalog
					</Button>
				</VStack>
			</MotionBox>
		</Container>
	);
};
export default CreatePage;
