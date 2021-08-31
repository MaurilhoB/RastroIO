import React, { useEffect } from 'react';

import { useSpring } from '@react-spring/web';

import { Container, CardTitle } from './styles';

import CardItem from './CardItem';

interface CardItemProp {
  id: string;
  title: string;
  code: string;
  hasUpdate: boolean;
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
        <CardItem
          key={item.id}
          id={item.id}
          code={item.code}
          title={item.title}
          hasUpdate={item.hasUpdate}
        />
      ))}
    </Container>
  );
};

export default Card;
