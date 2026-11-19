import { Container, Paper, Title } from '@mantine/core';
import classes from './ContactPage.module.css';

function ContactPage() {
  return (
    <Container size="md">
      <br />
      <Title order={1}>Contact</Title>
      <p>
        Nous sommes ravis que vous utilisiez notre plateforme pour suivre
        l’actualité tech en toute simplicité{' '}
        <span role="img" aria-label="visage souriant">
          😊
        </span>
      </p>
      <p>
        Si vous avez des questions, des suggestions ou des remarques, n’hésitez
        pas à nous contacter directement à l’adresse suivante :
      </p>
      <Paper w={300}>
        <span role="img" aria-label="courrier électronique">
          📧
        </span>{' '}
        <a className={classes.emailLink} href="mailto:actumatic@gmail.com">
          actumatic@gmail.com
        </a>
      </Paper>
      <p>Nous ferons de notre mieux pour vous répondre rapidement.</p>
    </Container>
  );
}

export default ContactPage;
