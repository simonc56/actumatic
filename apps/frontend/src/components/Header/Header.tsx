import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import ActumaticLogo from '../Logo/ActumaticLogo';
import classes from './Header.module.css';

const links = [
  {
    link: '#1',
    label: 'Catégories',
    links: [
      { link: '/category/numerique', label: 'Numérique' },
      { link: '/category/mobile', label: 'Mobile' },
      { link: '/category/pro', label: 'Pro' },
    ],
  },
  { link: '/filters', label: 'Filtres' },
  {
    link: '#2',
    label: 'Dates',
    links: [
      { link: '/', label: "Aujourd'hui" },
      { link: '/?date=yesterday', label: 'Hier' },
      { link: '/?date=all-time', label: 'Tout' },
    ],
  },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const sortedNews = useFetchSortedNews();
  const categoryLinks =
    sortedNews?.map((category) => ({
      label: category.name,
      link: `/category/${category.id}`,
    })) ?? [];
  categoryLinks.push({ label: 'Toutes', link: '/' });
  if (categoryLinks.length) links[0].links = categoryLinks;
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link
          to={item.link}
          style={{
            padding: 0,
            backgroundColor: 'transparent',
          }}
          className={classes.link}
        >
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="2xl">
        <div className={classes.inner}>
          <ActumaticLogo />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
