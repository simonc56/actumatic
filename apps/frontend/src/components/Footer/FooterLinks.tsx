import { ActionIcon, Container, Group, Text } from '@mantine/core';
import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandX,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ActumaticLogo from '../Logo/ActumaticLogo';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'A propos',
    links: [
      { label: 'FAQ', link: '/faq' },
      { label: 'Contact', link: '/contact' },
      { label: 'Mentions légales', link: '/legal' },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} className={classes.link} to={link.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <ActumaticLogo greyscale />
          <Text size="xs" c="dimmed" className={classes.description}>
            Aggrégateur d'actualités numériques et technologiques.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 simonc56. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandX size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandBluesky size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
