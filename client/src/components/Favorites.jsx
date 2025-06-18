// src/components/Favorites.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container for the page
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${(props) => props.theme.textColor};
`;

// Title for the page header
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

// BackButton styled as a Link to go back to home
const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => props.theme.hoverBg};
  }
`;

// Grid for displaying ToolCards
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

// Message for loader or empty state
const Message = styled.p`
  text-align: center;
  color: ${(props) => props.theme.subTextColor};
  font-style: italic;
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/favorites");
      setFavorites(res.data);
    } catch (err) {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${id}`);
      setFavorites((prev) => prev.filter((tool) => tool.id !== id));
      toast.info("Removed from favorites");
    } catch (err) {
      toast.error("Error removing favorite");
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <Container>
      <BackButton to="/">← Back to Home</BackButton>
      <Title>❤️ My Favorites</Title>
      {loading ? (
        <Message>Loading...</Message>
      ) : favorites.length === 0 ? (
        <Message>You have no favorites yet.</Message>
      ) : (
        <Grid>
          {favorites.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onRemove={removeFavorite}
              isFavorite={true}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;