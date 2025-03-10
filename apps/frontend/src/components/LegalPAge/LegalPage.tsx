import { Container, Title } from '@mantine/core';
import classes from './LegalPage.module.css';

function LegalPage() {
  return (
    <Container size="md">
      <br />
      <Title order={1}>Mentions légales</Title>
      <div className={classes.section}>Hébergement</div>
      <p>
        <strong>Nom de l'hébergeur:</strong> DigitalOcean
      </p>
      <p>
        <strong>Adresse:</strong> 101 Avenue of the Americas, 10th Floor, New
        York, NY 10013
      </p>
      <div className={classes.section}>Propriété intellectuelle</div>
      <p>
        Le contenu du site (textes, images, logos, etc.) est protégé par le
        droit d’auteur et ne peut être reproduit sans autorisation.
      </p>
      <div className={classes.section}>Responsabilité</div>
      <p>
        Le site agrège et affiche des flux RSS provenant de sources externes.
        Nous ne sommes pas responsables des informations publiées par ces
        sources et nous ne garantissons ni leur exactitude ni leur
        actualisation.
      </p>
    </Container>
  );
}

export default LegalPage;
