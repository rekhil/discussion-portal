export class Config {
  public static apiBaseUrl = 'https://polar-arbor-313208.appspot.com/api/';
  public static menuItems = [
    {
      name: 'Discussions',
      link: ['/discussions']
    },
    {
      name: 'Users',
      link: ['/users'],
      adminSpecific: true
    },
  ];
  public static tags = ['General', 'Technology', 'Science', 'History'];
  public static allTags = [
    'General',
    'Technology',
    'Science',
    'History',
    'Untagged',
  ];
}
