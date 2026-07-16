import { Box, Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AddIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useProductStore } from "../store/product";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const products = useProductStore((state) => state.products);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const border = useColorModeValue("ink.100", "whiteAlpha.200");
	const bg = useColorModeValue("paper.50", "ink.900");
	const shadow = useColorModeValue("0 1px 0 rgba(16,20,35,0.06), 0 8px 24px -18px rgba(16,20,35,0.35)", "none");

	return (
		<Box
			as='nav'
			position='sticky'
			top={0}
			zIndex={10}
			bg={bg}
			borderBottom='1px solid'
			borderColor={border}
			boxShadow={scrolled ? shadow : "none"}
			backdropFilter='saturate(180%) blur(6px)'
			transition='box-shadow 0.2s ease'
		>
			<Container maxW={"1140px"} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<Link to={"/"}>
						<HStack spacing={2.5} align='center'>
							<Flex
								w={8}
								h={8}
								bg='ink.900'
								color='paper.50'
								align='center'
								justify='center'
								fontFamily='mono'
								fontWeight={600}
								fontSize='xs'
								_dark={{ bg: "paper.50", color: "ink.900" }}
							>
								PS
							</Flex>
							<Text
								fontFamily='heading'
								fontSize='lg'
								fontWeight={700}
								letterSpacing='-0.01em'
							>
								Product Store
							</Text>
							{products.length > 0 && (
								<Text
									fontFamily='mono'
									fontSize='xs'
									color='signal.500'
									border='1px solid'
									borderColor='signal.100'
									px={1.5}
									py={0.5}
									lineHeight={1}
								>
									{products.length}
								</Text>
							)}
						</HStack>
					</Link>

					<HStack spacing={3} alignItems={"center"}>
						<Link to={"/create"}>
							<Button
								size='sm'
								bg='signal.500'
								color='white'
								fontWeight={600}
								leftIcon={<AddIcon boxSize={2.5} />}
								_hover={{ bg: "signal.600" }}
								_active={{ bg: "signal.700" }}
							>
								New listing
							</Button>
						</Link>
						<Button
							size='sm'
							variant='outline'
							borderColor={border}
							onClick={toggleColorMode}
							px={2.5}
						>
							{colorMode === "light" ? <IoMoon /> : <LuSun size='16' />}
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};
export default Navbar;
