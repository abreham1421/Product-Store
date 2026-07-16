import {
    Box,
    Container,
    Divider,
    Flex,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    SimpleGrid,
    Skeleton,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuPackage, LuSearch } from "react-icons/lu";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const MotionSimpleGrid = motion(SimpleGrid);

const HomePage = () => {
    const { fetchProducts, products, isLoading } = useProductStore();
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const border = useColorModeValue("ink.100", "whiteAlpha.200");
    const muted = useColorModeValue("ink.500", "ink.300");
    const inputBg = useColorModeValue("paper.50", "ink.900");

    const visible = useMemo(() => {
        let list = products.filter((p) => (p.name ?? "").toLowerCase().includes(query.toLowerCase()));
        switch (sort) {
            case "price-asc":
                list = [...list].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                list = [...list].sort((a, b) => b.price - a.price);
                break;
            case "name":
                list = [...list].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
                break;
            default:
                list = [...list].sort(
                    (a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0)
                );
        }
        return list;
    }, [products, query, sort]);

    const stats = useMemo(() => {
        if (products.length === 0) return null;
        const prices = products.map((p) => Number(p.price) || 0);
        const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
        return {
            count: products.length,
            avg: avg.toFixed(2),
            max: Math.max(...prices).toFixed(2),
        };
    }, [products]);

    return (
        <Box>
            {/* Hero */}
            <Box borderBottom="1px solid" borderColor={border} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    inset={0}
                    opacity={0.6}
                    backgroundImage="radial-gradient(currentColor 1px, transparent 1px)"
                    backgroundSize="24px 24px"
                    color={border}
                    pointerEvents="none"
                />
                <Container maxW="container.xl" pt={{ base: 10, md: 16 }} pb={{ base: 8, md: 10 }} position="relative">
                    <VStack
                        align="flex-start"
                        spacing={4}
                        as={motion.div}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Text
                            fontFamily="mono"
                            fontSize="xs"
                            letterSpacing="0.14em"
                            textTransform="uppercase"
                            color="signal.500"
                            fontWeight={600}
                        >
                            Catalog
                        </Text>
                        <Text
                            as="h1"
                            fontFamily="heading"
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight={700}
                            letterSpacing="-0.02em"
                            lineHeight={1.05}
                            maxW="2xl"
                        >
                            Every item you carry, kept in one clean ledger.
                        </Text>
                        <Text color={muted} fontSize={{ base: "md", md: "lg" }} maxW="lg">
                            Browse what's in stock, update prices, and retire items the moment they sell out.
                        </Text>

                        {stats && (
                            <HStack spacing={{ base: 5, md: 8 }} pt={4} divider={<Box w="1px" h="8" bg={border} />}>
                                <VStack spacing={0} align="flex-start">
                                    <Text fontFamily="mono" fontSize="2xl" fontWeight={600}>
                                        {String(stats.count).padStart(2, "0")}
                                    </Text>
                                    <Text fontSize="xs" color={muted} letterSpacing="0.05em">
                                        IN STOCK
                                    </Text>
                                </VStack>
                                <VStack spacing={0} align="flex-start">
                                    <Text fontFamily="mono" fontSize="2xl" fontWeight={600}>
                                        ${stats.avg}
                                    </Text>
                                    <Text fontSize="xs" color={muted} letterSpacing="0.05em">
                                        AVG PRICE
                                    </Text>
                                </VStack>
                                <VStack spacing={0} align="flex-start">
                                    <Text fontFamily="mono" fontSize="2xl" fontWeight={600}>
                                        ${stats.max}
                                    </Text>
                                    <Text fontSize="xs" color={muted} letterSpacing="0.05em">
                                        TOP ITEM
                                    </Text>
                                </VStack>
                            </HStack>
                        )}
                    </VStack>
                </Container>
            </Box>

            <Container maxW="container.xl" py={{ base: 8, md: 10 }}>
                <Flex
                    justify="space-between"
                    align={{ base: "stretch", sm: "center" }}
                    direction={{ base: "column", sm: "row" }}
                    gap={3}
                    mb={6}
                >
                    <Text fontFamily="heading" fontSize="xl" fontWeight={600}>
                        Current stock
                    </Text>
                    <HStack spacing={3}>
                        <InputGroup size="sm" maxW="200px">
                            <InputLeftElement pointerEvents="none">
                                <Icon as={LuSearch} color={muted} boxSize={3.5} />
                            </InputLeftElement>
                            <Input
                                placeholder="Search"
                                borderRadius={0}
                                borderColor={border}
                                bg={inputBg}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </InputGroup>
                        <Select
                            size="sm"
                            maxW="150px"
                            borderRadius={0}
                            borderColor={border}
                            bg={inputBg}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price ↑</option>
                            <option value="price-desc">Price ↓</option>
                            <option value="name">Name A–Z</option>
                        </Select>
                    </HStack>
                </Flex>
                <Divider borderColor={border} mb={8} />

                {isLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {[...Array(3)].map((_, i) => (
                            <Box key={i} border="1px solid" borderColor={border}>
                                <Skeleton height="192px" />
                                <Box p={4}>
                                    <Skeleton height="16px" width="60%" mb={3} />
                                    <Skeleton height="14px" width="40%" />
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <MotionSimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={8}
                        w={"full"}
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                    >
                        <AnimatePresence mode="popLayout">
                            {visible.map((product, i) => (
                                <ProductCard key={product._id} product={product} index={i} />
                            ))}
                        </AnimatePresence>
                    </MotionSimpleGrid>
                )}

                {!isLoading && products.length === 0 && (
                    <VStack spacing={2} py={20} border="1px dashed" borderColor={border} textAlign="center">
                        <Icon as={LuPackage} boxSize={6} color={muted} />
                        <Text fontFamily="heading" fontSize="lg" fontWeight={600}>
                            The shelf is empty
                        </Text>
                        <Text color={muted} fontSize="sm">
                            Nothing's listed yet.{" "}
                            <Link to={"/create"}>
                                <Text as="span" color="signal.500" fontWeight={600} _hover={{ textDecoration: "underline" }}>
                                    Add your first product
                                </Text>
                            </Link>
                        </Text>
                    </VStack>
                )}

                {!isLoading && products.length > 0 && visible.length === 0 && (
                    <VStack spacing={2} py={20} border="1px dashed" borderColor={border} textAlign="center">
                        <Text fontFamily="heading" fontSize="lg" fontWeight={600}>
                            No matches
                        </Text>
                        <Text color={muted} fontSize="sm">
                            Nothing matches "{query}".
                        </Text>
                    </VStack>
                )}
            </Container>
        </Box>
    );
};
export default HomePage;
