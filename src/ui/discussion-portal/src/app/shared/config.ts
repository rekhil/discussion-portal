export class Config {
  public static apiBaseUrl = 'https://xenon-anvil-310308.appspot.com/api/';
  public static menuItems = [
    {
      name: 'Discussions',
      link: ['/discussion-wrapper'],
    },
    {
      name: 'Users',
      link: ['/users-wrapper'],
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
