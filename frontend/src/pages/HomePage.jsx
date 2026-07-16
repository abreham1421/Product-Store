import { Box, Container, Divider, HStack, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const border = useColorModeValue("ink.100", "whiteAlpha.200");
	const muted = useColorModeValue("ink.500", "ink.300");

	return (
		<Box>
			{/* Hero */}
			<Box borderBottom='1px solid' borderColor={border}>
				<Container maxW='container.xl' pt={{ base: 10, md: 16 }} pb={{ base: 8, md: 10 }}>
					<VStack align='flex-start' spacing={4}>
						<Text
							fontFamily='mono'
							fontSize='xs'
							letterSpacing='0.14em'
							textTransform='uppercase'
							color='signal.500'
							fontWeight={600}
						>
							Catalog
						</Text>
						<Text
							as='h1'
							fontFamily='heading'
							fontSize={{ base: "3xl", md: "5xl" }}
							fontWeight={700}
							letterSpacing='-0.02em'
							lineHeight={1.05}
							maxW='2xl'
						>
							Every item you carry, kept in one clean ledger.
						</Text>
						<Text color={muted} fontSize={{ base: "md", md: "lg" }} maxW='lg'>
							Browse what's in stock, update prices, and retire items the moment they sell out.
						</Text>
					</VStack>
				</Container>
			</Box>

			<Container maxW='container.xl' py={{ base: 8, md: 10 }}>
				<HStack justify='space-between' mb={6} align='baseline'>
					<Text fontFamily='heading' fontSize='xl' fontWeight={600}>
						Current stock
					</Text>
					<Text fontFamily='mono' fontSize='sm' color={muted}>
						{String(products.length).padStart(2, "0")} item{products.length === 1 ? "" : "s"}
					</Text>
				</HStack>
				<Divider borderColor={border} mb={8} />

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={8}
					w={"full"}
				>
					{products.map((product, i) => (
						<ProductCard key={product._id} product={product} index={i} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<VStack
						spacing={2}
						py={20}
						border='1px dashed'
						borderColor={border}
						textAlign='center'
					>
						<Text fontFamily='heading' fontSize='lg' fontWeight={600}>
							The shelf is empty
						</Text>
						<Text color={muted} fontSize='sm'>
							Nothing's listed yet.{" "}
							<Link to={"/create"}>
								<Text as='span' color='signal.500' fontWeight={600} _hover={{ textDecoration: "underline" }}>
									Add your first product
								</Text>
							</Link>
						</Text>
					</VStack>
				)}
			</Container>
		</Box>
	);
};
export default HomePage;
