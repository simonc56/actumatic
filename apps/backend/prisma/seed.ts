import * as readline from 'readline';
import { PrismaService } from '../src/app/infrastructure/persistence/prisma.service';

const prisma = new PrismaService();

// Création d'une interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction utilitaire pour poser une question et obtenir une réponse
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log(
    '\x1b[33m%s\x1b[0m',
    '⚠️  Attention: Vous êtes sur le point de réinitialiser la base de données.',
  );
  console.log('Cette action va:');
  console.log('1. Supprimer toutes les données existantes');
  console.log('2. Créer de nouvelles catégories');
  console.log('3. Ajouter des fournisseurs pour chaque catégorie');
  console.log("4. Insérer des articles d'exemple\n");

  const answer = await askQuestion(
    'Êtes-vous sûr de vouloir continuer ? (oui/non): ',
  );

  if (answer.toLowerCase() !== 'oui') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      '✔ Opération annulée. La base de données reste inchangée.',
    );
    rl.close();
    return;
  }

  try {
    // Nettoyage préalable de la base de données
    console.log('\n🗑️  Nettoyage de la base de données...');
    await prisma.news.deleteMany();
    await prisma.provider.deleteMany();
    await prisma.category.deleteMany();

    // Création des catégories
    const categories = [
      { name: 'Technologie' },
      { name: 'Sciences' },
      { name: 'International' },
    ];

    console.log('📁 Création des catégories...');
    const createdCategories = await Promise.all(
      categories.map((category) =>
        prisma.category.create({
          data: category,
        }),
      ),
    );

    // Création des fournisseurs pour chaque catégorie
    const providersData = [
      // Fournisseurs Technologie
      {
        name: 'TechCrunch',
        url: 'https://techcrunch.com',
        feedUrl: 'https://techcrunch.com/feed',
        feedType: 'RSS',
        categoryId: createdCategories[0].id,
      },
      {
        name: 'The Verge',
        url: 'https://www.theverge.com',
        feedUrl: 'https://www.theverge.com/rss/index.xml',
        feedType: 'RSS',
        categoryId: createdCategories[0].id,
      },
      // Fournisseurs Sciences
      {
        name: 'Science Daily',
        url: 'https://www.sciencedaily.com',
        feedUrl: 'https://www.sciencedaily.com/rss/all.xml',
        feedType: 'RSS',
        categoryId: createdCategories[1].id,
      },
      {
        name: 'Nature News',
        url: 'https://www.nature.com/news',
        feedUrl: 'https://www.nature.com/news.rss',
        feedType: 'RSS',
        categoryId: createdCategories[1].id,
      },
      // Fournisseurs International
      {
        name: 'Reuters',
        url: 'https://www.reuters.com',
        feedUrl: 'https://www.reuters.com/feed',
        feedType: 'RSS',
        categoryId: createdCategories[2].id,
      },
      {
        name: 'BBC News',
        url: 'https://www.bbc.com/news',
        feedUrl: 'https://feeds.bbci.co.uk/news/rss.xml',
        feedType: 'RSS',
        categoryId: createdCategories[2].id,
      },
    ];

    console.log('🔄 Création des fournisseurs...');
    const createdProviders = await Promise.all(
      providersData.map((provider) =>
        prisma.provider.create({
          data: provider,
        }),
      ),
    );

    // Ajout de quelques articles d'exemple
    const newsData = [
      {
        title: 'Dernières avancées en IA',
        url: 'https://techcrunch.com/2025/ai-advances',
        providerId: createdProviders[0].id,
      },
      {
        title: 'Découverte sur Mars',
        url: 'https://www.sciencedaily.com/2025/mars-discovery',
        providerId: createdProviders[2].id,
      },
      {
        title: 'Actualités internationales',
        url: 'https://www.reuters.com/2025/world-news',
        providerId: createdProviders[4].id,
      },
    ];

    console.log("📰 Création des articles d'exemple...");
    await Promise.all(
      newsData.map((news) =>
        prisma.news.create({
          data: news,
        }),
      ),
    );

    console.log(
      '\x1b[32m%s\x1b[0m',
      '✨ Base de données initialisée avec succès!',
    );
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', "❌ Erreur lors de l'initialisation:");
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
