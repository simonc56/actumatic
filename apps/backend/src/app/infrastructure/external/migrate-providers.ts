import { Logger } from '@nestjs/common';
import { PrismaService } from '../persistence/prisma.service';
import providersData from './france-tech-providers.json';

const prisma = new PrismaService();

interface FeedProvider {
  name: string;
  url: string;
  category: string;
  feedType: string;
  feedUrl: string;
}

// interface ProvidersFile {
//   feeds: FeedProvider[];
// }

async function populateDB() {
  try {
    // Lecture du fichier JSON
    Logger.log('📖 Lecture du fichier des providers...');
    // const filePath = path.join(__dirname, 'france-tech-providers.json');
    // const fileContent = await fs.readFile(filePath, 'utf-8');
    // const providersData: ProvidersFile = JSON.parse(fileContent);

    // Extraction des catégories uniques du fichier
    const uniqueCategories = [
      ...new Set(providersData.feeds.map((feed) => feed.category)),
    ];
    Logger.log(`📋 Catégories trouvées: ${uniqueCategories.join(', ')}`);

    // Récupération des catégories existantes
    const existingCategories = await prisma.category.findMany();
    const existingCategoryNames = new Set(
      existingCategories.map((cat) => cat.name),
    );

    // Création des nouvelles catégories
    const categoryCreationPromises = uniqueCategories
      .filter((categoryName) => !existingCategoryNames.has(categoryName))
      .map((categoryName) =>
        prisma.category.create({
          data: { name: categoryName },
        }),
      );

    if (categoryCreationPromises.length > 0) {
      Logger.log(
        `🆕 Création de ${categoryCreationPromises.length} nouvelle(s) catégorie(s)...`,
      );
      await Promise.all(categoryCreationPromises);
    } else {
      Logger.log('✓ Aucune nouvelle catégorie à créer');
    }

    // Récupération de toutes les catégories (incluant les nouvelles)
    const allCategories = await prisma.category.findMany();
    const categoryMap = new Map(allCategories.map((cat) => [cat.name, cat.id]));

    // Récupération des fournisseurs existants
    const existingProviders = await prisma.provider.findMany();
    const existingProviderUrls = new Set(
      existingProviders.map((provider) => provider.url),
    );

    // Création des nouveaux fournisseurs
    const providerCreationPromises = providersData.feeds
      .filter((feed) => !existingProviderUrls.has(feed.url))
      .map((feed) => {
        const categoryId = categoryMap.get(feed.category);
        if (!categoryId) {
          throw new Error(`Catégorie non trouvée pour: ${feed.name}`);
        }

        return prisma.provider.create({
          data: {
            name: feed.name,
            url: feed.url,
            feedUrl: feed.feedUrl,
            feedType: feed.feedType,
            categoryId: categoryId,
          },
        });
      });

    if (providerCreationPromises.length > 0) {
      Logger.log(
        `🔄 Création de ${providerCreationPromises.length} nouveau(x) fournisseur(s)...`,
      );
      const createdProviders = await Promise.all(providerCreationPromises);
      Logger.log('Fournisseurs créés:');
      createdProviders.forEach((provider) => {
        Logger.log(`- ${provider.name} (${provider.url})`);
      });
    } else {
      Logger.log('✓ Aucun nouveau fournisseur à créer');
    }

    Logger.log('\x1b[32m%s\x1b[0m', '✨ Migration terminée avec succès!');

    // Affichage du résumé
    const summary = await prisma.$transaction([
      prisma.category.count(),
      prisma.provider.count(),
    ]);

    Logger.log('\nÉtat actuel de la base de données:');
    Logger.log(`📁 Catégories: ${summary[0]}`);
    Logger.log(`🔗 Fournisseurs: ${summary[1]}`);
  } catch (error) {
    Logger.error('\x1b[31m%s\x1b[0m', '❌ Erreur lors de la migration:');
    Logger.error(error);
    // process.exit(1);
  }
}

export default async function main() {
  populateDB()
    .catch((e) => {
      Logger.error(e);
      // process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
