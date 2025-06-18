// src/components/ToolList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";
import { toast } from "react-toastify";
import CatSvg from "../images/simple-cat.svg";
import styled, { keyframes } from "styled-components";

// Keyframes for animated gradient (still defined here in case you need it elsewhere)
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Overall container for the page
const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
  font-family: "Poppins", sans-serif;
  background: ${(props) => props.theme.bodyBg};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.aside`
  flex: 1;
  max-width: 300px;
  background: ${(props) => props.theme.componentBg};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  flex: 3;
`;

// Section heading for Filters, Category, Pricing
const Heading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 1.25rem 0 0.75rem;
  color: ${(props) => props.theme.textColor};
  border-left: 4px solid #7F00FF;
  padding-left: 0.6rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  outline: none;
  margin-bottom: 1rem;
  &:focus {
    border-color: ${(props) => props.theme.linkColor};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FilterButton = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(props) => (props.selected ? "#fff" : props.theme.textColor)};
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #7F00FF, #0077FF)"
      : props.theme.buttonBg};
  box-shadow: ${(props) =>
    props.selected ? "0 0 10px rgba(127, 0, 255, 0.5)" : "none"};

  &:hover {
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #7F00FF, #0077FF)"
        : props.theme.hoverBg};
  }
`;

const ResetButton = styled(FilterButton)`
  background: ${(props) => props.theme.resetBg};
  color: white;
  margin-top: 1rem;
  &:hover {
    background: ${(props) => props.theme.resetHoverBg};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// New CardWrapper to enforce rounded borders around each card
const CardWrapper = styled.div`
  border-radius: 1.5rem; /* Rounded corners */
  overflow: hidden;     /* Clips children to the rounded corners */
`;

const NoResultsWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const NoResultsImage = styled.img`
  width: 16rem;
  margin-bottom: 1rem;
`;

const NoResultsHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.textColor};
`;

const NoResultsText = styled.p`
  color: ${(props) => props.theme.subTextColor};
`;

const ToolList = () => {
  const [allTools, setAllTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPricings, setSelectedPricings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [pricings, setPricings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  // Fetch tools and favorites from the API endpoints
  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/tools");
        setAllTools(res.data);
        setCategories([...new Set(res.data.map((tool) => tool.category))]);
        setPricings([...new Set(res.data.map((tool) => tool.pricing))]);
        setError("");
      } catch (err) {
        setError("Failed to load tools.");
        setAllTools([]);
      }
      setLoading(false);
    };

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/favorites");
        setFavorites(res.data.map((t) => t.id));
      } catch (err) {
        toast.error("Error loading favorites.");
      }
    };

    fetchTools();
    fetchFavorites();
  }, []);

  // Filtering logic based on filters and search query
  useEffect(() => {
    let filtered = allTools;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tool) =>
        selectedCategories.includes(tool.category)
      );
    }

    if (selectedPricings.length > 0) {
      filtered = filtered.filter((tool) =>
        selectedPricings.includes(tool.pricing)
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.excerpt.toLowerCase().includes(query)
      );
    }
    setFilteredTools(filtered);
  }, [allTools, selectedCategories, selectedPricings, searchQuery]);

  const toggleFilter = (value, filterArray, setFilterArray) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((v) => v !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPricings([]);
    setSearchQuery("");
  };

  const handleFavorite = async (toolId) => {
    const isAlreadyFavorite = favorites.includes(toolId);
    try {
      if (isAlreadyFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${toolId}`);
        toast.info("Removed from favorites");
        setFavorites((prev) => prev.filter((id) => id !== toolId));
      } else {
        await axios.post("http://localhost:5000/api/favorites", { toolId });
        toast.success("Added to favorites");
        setFavorites((prev) => [...prev, toolId]);
      }
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <Container>
      <FlexWrapper>
        <Sidebar>
          <Heading>Filters</Heading>
          <SearchInput
            type="text"
            value={searchQuery}
            placeholder="Search Tools..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Heading>Category</Heading>
          <List>
            {categories.map((cat) => (
              <ListItem key={cat}>
                <FilterButton
                  onClick={() =>
                    toggleFilter(cat, selectedCategories, setSelectedCategories)
                  }
                  selected={selectedCategories.includes(cat)}
                >
                  {cat}
                </FilterButton>
              </ListItem>
            ))}
          </List>
          <Heading>Pricing</Heading>
          <List>
            {pricings.map((price) => (
              <ListItem key={price}>
                <FilterButton
                  onClick={() =>
                    toggleFilter(
                      price,
                      selectedPricings,
                      setSelectedPricings
                    )
                  }
                  selected={selectedPricings.includes(price)}
                >
                  {price}
                </FilterButton>
              </ListItem>
            ))}
          </List>
          <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
        </Sidebar>
        <MainContent>
          {loading ? (
            <p style={{ textAlign: "center", color: "#718096" }}>
              Loading...
            </p>
          ) : filteredTools.length === 0 ? (
            <NoResultsWrapper>
              <NoResultsImage src={CatSvg} alt="No tools found" />
              <NoResultsHeading>Oops! 404 ERROR.</NoResultsHeading>
              <NoResultsText>
                No Tools found for the selected filters.
              </NoResultsText>
            </NoResultsWrapper>
          ) : (
            <Grid>
              {filteredTools.map((tool) => (
                <CardWrapper key={tool.id}>
                  <ToolCard
                    tool={tool}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.includes(tool.id)}
                  />
                </CardWrapper>
              ))}
            </Grid>
          )}
          {error && (
            <p style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
              {error}
            </p>
          )}
        </MainContent>
      </FlexWrapper>
    </Container>
  );
};

export default ToolList;