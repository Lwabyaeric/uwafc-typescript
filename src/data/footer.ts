export interface FooterNavigationLink {
  id: number;
  name: string;
  url: string;
}

export interface FooterNavigationGroup {
  id: number;
  group_name: string;
  group_items: FooterNavigationLink[];
}

export const footer: FooterNavigationGroup[] = [
  {
    id: 1,
    group_name: 'Club Portal',
    group_items: [
      {
        id: 1,
        name: 'About The Wildlife Stars Of Uganda',
        url: '#news'
      },
      {
        id: 2,
        name: 'Our History',
        url: '#results'
      },
      {
        id: 3,
        name: 'Wildlife Conservation',
        url: '#'
      },
      {
        id: 4,
        name: 'First Team Roster',
        url: '#'
      },
      {
        id: 5,
        name: 'Club Management',
        url: '#'
      }
    ]
  },
  {
    id: 2,
    group_name: 'Competitions',
    group_items: [
      {
        id: 1,
        name: 'FUFA Regional League',
        url: '#results'
      },
      {
        id: 2,
        name: 'FUFA Fourth Division',
        url: '#results'
      },
      {
        id: 3,
        name: 'Stanbic Uganda Cup',
        url: '#'
      }
    ]
  }
];
