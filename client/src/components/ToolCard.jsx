// src/components/ToolCard.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes to animate the border-color (as before)
const borderAnimation = keyframes`
  0%   { border-color: #7F00FF; }
  33%  { border-color: #0077FF; }
  66%  { border-color: #FF007F; }
  100% { border-color: #7F00FF; }
`;

// Card container with a dynamic animated border and rounded corners.
// The new hover effect gently lifts the card upward.
const CardContainer = styled.div`
  background: ${(props) => props.theme.cardBg};
  border: 2px solid;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 0 15px rgba(127, 0, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  animation: ${borderAnimation} 4s linear infinite;

  &:hover {
    transform: translateY(-8px); /* Lift upward */
    box-shadow: 0 10px 20px rgba(127, 0, 255, 0.4);
  }
`;

// Title with gradient text for the tool name
const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #7F00FF, #0077FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Row for category and pricing badge
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Category text styling
const CategoryText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.subTextColor};
`;

// Pricing badge styling (rounded badge)
const PricingBadge = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  background: ${(props) =>
    props.pricing === "Paid"
      ? props.theme.paidBadgeBg
      : props.theme.freemiumBadgeBg};
  color: ${(props) =>
    props.pricing === "Paid"
      ? props.theme.paidBadgeText
      : props.theme.freemiumBadgeText};
  box-shadow: ${(props) =>
    props.pricing === "Paid"
      ? "0 2px 6px rgba(255, 87, 34, 0.3)"
      : "0 2px 6px rgba(46, 204, 113, 0.3)"};
  letter-spacing: 0.5px;
`;

// Excerpt styling
const Excerpt = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textColor};
`;

// Visit tool link styling
const VisitLink = styled.a`
  font-size: 0.875rem;
  color: ${(props) => props.theme.linkColor};
  text-decoration: underline;
  &:hover {
    color: ${(props) => props.theme.linkHoverColor};
  }
`;

// Button group for action buttons
const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// HeartIcon styled component – indicates favorite state.
const HeartIcon = styled.span`
  font-size: 1.2em;
  color: ${(props) => (props.active ? "#ccc" : "#e53e3e")};
  margin-right: 0.5rem;
`;

// Favorite button styling
const FavoriteButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    props.active ? props.theme.favoritedBg : props.theme.favoriteBg};
  color: ${(props) =>
    props.active ? props.theme.favoritedText : props.theme.favoriteText};
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  &:hover {
    background: ${(props) =>
      props.active
        ? props.theme.favoritedHoverBg
        : props.theme.favoriteHoverBg};
  }
`;

// Remove button styling
const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  background: ${(props) => props.theme.removeBg};
  color: ${(props) => props.theme.removeText};
  &:hover {
    background: ${(props) => props.theme.removeHoverBg};
  }
`;

const ToolCard = ({ tool, onFavorite, isFavorite, onRemove }) => {
  const handleFavoriteClick = () => {
    onFavorite(tool.id);
  };

  return (
    <CardContainer>
      <div>
        <Title>{tool.name}</Title>
        <Row>
          <CategoryText>
            <strong>Category:</strong> {tool.category}
          </CategoryText>
          <PricingBadge pricing={tool.pricing}>{tool.pricing}</PricingBadge>
        </Row>
        <Excerpt>{tool.excerpt}</Excerpt>
        <VisitLink href={tool.url} target="_blank" rel="noreferrer">
          🔗 Visit Tool
        </VisitLink>
      </div>
      <ButtonGroup>
        {onFavorite && (
          <FavoriteButton onClick={handleFavoriteClick} active={isFavorite}>
            <HeartIcon active={isFavorite}>
              {isFavorite ? "🤍" : "❤️"}
            </HeartIcon>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </FavoriteButton>
        )}
        {onRemove && (
          <RemoveButton onClick={() => onRemove(tool.id)}>
            ❌ Remove
          </RemoveButton>
        )}
      </ButtonGroup>
    </CardContainer>
  );
};

export default ToolCard;