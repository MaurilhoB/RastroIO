import React, { useEffect } from 'react';

import { useSpring } from '@react-spring/web';

import { Container, CardTitle } from './styles';

import CardItem from './CardItem';

interface CardItemProp {
  title: string;
  code: string;
}

interface CardProps {
  title: string;
  items: CardItemProp[];
}

const Card: React.FC<CardProps> = ({ items, title }) => {
  const [{ scale }, set] = useSpring(() => ({
    scale: 0,
  }));

  useEffect(() => {
    set({ scale: 1 });
  }, [set]);

  return (
    <Container style={{ scale }}>
      <CardTitle>{title}</CardTitle>
      {items.map(item => (
        <CardItem key={item.code} code={item.code} title={item.title} />
      ))}
    </Container>
  );
};

export default Card;
