import { Container, Title } from '@mantine/core';
import classes from './FAQPage.module.css';

function FAQPage() {
  return (
    <Container size="md">
      <Title order={1}>FAQ (Foire Aux Questions)</Title>
      <div className={classes.section}>Général</div>
      <div className={classes.question}>
        Qu’est-ce que Actumatic et quel est son objectif ?
      </div>
      <p className={classes.answer}>
        Ce site vous permet de suivre en un seul endroit l’actualité tech et
        numérique grâce à une agrégation des flux RSS de différents sites
        spécialisés. Vous pouvez filtrer les articles par catégorie pour accéder
        rapidement aux sujets qui vous intéressent.
      </p>
      <div className={classes.question}>
        Comment puis-je accéder à un article complet ?
      </div>
      <p className={classes.answer}>
        Pour lire un article complet, cliquez sur le titre de l’article. Vous
        serez redirigé vers le site de l’auteur de l’article dans un nouvel
        onglet.
      </p>
      <div className={classes.question}>
        Pourquoi ce site plutôt qu’un lecteur de flux RSS classique ?
      </div>
      <p className={classes.answer}>
        Notre site simplifie l’expérience en affichant les articles de manière
        claire et organisée, sans avoir à gérer manuellement des abonnements RSS
        ou une interface complexe.
      </p>
      <div className={classes.question}>
        Est-ce que ce site écrit ses propres articles ?
      </div>
      <p className={classes.answer}>
        Non, nous ne produisons aucun contenu original. Nous regroupons et
        affichons les titres et liens des articles issus de différentes sources
        d’actualité tech.
      </p>
      <div className={classes.section}>Fonctionnalités et utilisation</div>
      <div className={classes.question}>
        Comment puis-je filtrer les articles ?
      </div>
      <p className={classes.answer}>
        Vous pouvez utiliser les filtres de catégories disponibles en haut de la
        page pour consulter les articles par catégorie (mobile, cybersécurité,
        domotique, etc.).
        <br />
        Il y a également la possibilité de filtrer par mot-clé en haut de page
        pour n'afficher que les articles contenant un mot spécifique.
      </p>
      <div className={classes.question}>
        Puis-je acéder directement à ma catégorie préférée à l'ouverture du site
        ?
      </div>
      <p className={classes.answer}>
        Oui, vous pouvez choisir une catégorie en haut à droite, cliquer dessus
        puis mettre en favoris (marque-page) la page obtenue. Ainsi, à chaque
        ouverture du site, vous serez directement redirigé vers votre catégorie
        préférée.
      </p>
      <div className={classes.question}>
        À quelle fréquence les listes d'articles sont-ils mis à jour ?
      </div>
      <p className={classes.answer}>
        Les flux RSS sont actualisés toutes les 20 minutes.
      </p>
      <div className={classes.question}>
        Puis-je proposer un site à ajouter dans les sources ?
      </div>
      <p className={classes.answer}>
        Oui ! Si vous pensez qu’un site mérite d’être inclus, vous pouvez nous
        contacter via la page de contact pour nous suggérer de l'ajouter à notre
        agrégateur.
      </p>
      <div className={classes.question}>
        J'ai une idée d'amélioration, comment la partager ?
      </div>
      <p className={classes.answer}>
        Si vous avez une idée d'amélioration du site, vous pouvez nous contacter
        via la page de contact pour nous la partager. Si vous constatez un bug,
        vous pouvez le signaler également.
      </p>
      <div className={classes.section}>Droits et contenu</div>
      <div className={classes.question}>
        Est-ce que ce site respecte les droits d’auteur ?
      </div>
      <p className={classes.answer}>
        Oui, nous affichons uniquement les titres des articles qui sont
        disponibles publiquement via les flux RSS des sites sources. Chaque
        article renvoie directement vers le site d’origine.
      </p>
      <div className={classes.question}>
        Je suis un éditeur et je ne veux pas que mon site apparaisse ici. Que
        faire ?
      </div>
      <p className={classes.answer}>
        Si vous souhaitez retirer votre site de notre agrégateur, veuillez nous
        contacter via la page de contact. Nous retirerons votre site de notre
        base de données.
      </p>
      <div className={classes.question}>
        Je suis un éditeur et je veux que mon site soit ajouté ici. Comment
        faire ?
      </div>
      <p className={classes.answer}>
        Si vous souhaitez que votre site soit ajouté à notre agrégateur,
        veuillez nous contacter via la page de contact. Nous évaluerons votre
        site et vous informerons de notre décision.
      </p>
      <div className={classes.section}>Confidentialité et sécurité</div>
      <div className={classes.question}>
        Est-ce que vous collectez des données personnelles ?
      </div>
      <p className={classes.answer}>
        Non, nous ne collectons aucune donnée personnelle. Et nous ne traquons
        pas votre navigation.
      </p>
    </Container>
  );
}

export default FAQPage;
