import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";
const WelcomTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcom aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://os7soft.com">os7soft.com</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomTemplate;
