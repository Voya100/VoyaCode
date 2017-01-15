export class Project{
  name: string;
  description: string;
  path: string;
  bannerUrl: string;
  iconUrl: string;
  onBanner: boolean;
}

export const projectList: Project[] = [
  {
    name: 'Hangman',
    description: 'Hangman mobile app for Android.',
    path: 'projects/hangman',
    bannerUrl: 'http://voyacode.com/images/hangman_banner.jpg',
    iconUrl: 'http://voyacode.com/projects/icons/hangman_icon.jpg',
    onBanner: true
  },{
    name: 'Snow Machine',
    description: 'Create all kinds of snow with Snow Machine!',
    path: 'projects/snow-machine',
    bannerUrl: 'http://voyacode.com/images/snow_machine_banner.jpg',
    iconUrl: 'http://voyacode.com/projects/icons/snow_machine_icon.jpg',
    onBanner: true
  },{
    name: 'Chess',
    description: 'Play a game of chess against a friend or a computer AI!',
    path: 'projects/chess',
    bannerUrl: 'http://voyacode.com/images/chess_banner.jpg',
    iconUrl: 'http://voyacode.com/projects/icons/chess_icon.jpg',
    onBanner: true
  },{
    name: 'Slay the Dragon!',
    description: 'Slay the dragon in the game "Slay the Dragon!"',
    path: 'projects/slay-the-dragon',
    bannerUrl: 'http://voyacode.com/images/slay_the_dragon_banner.jpg',
    iconUrl: 'http://voyacode.com/projects/icons/slay_the_dragon_icon.jpg',
    onBanner: true
  },{
    name: 'Rock, Paper, Scissors',
    description: 'Beat the computer in a very challenging game of Rock, Paper, Scissors.',
    path: 'projects/rock-paper-scissors',
    bannerUrl: 'http://voyacode.com/images/rock_paper_scissors_banner.jpg',
    iconUrl: 'http://voyacode.com/projects/icons/rock_paper_scissors_icon.jpg',
    onBanner: true
  },
];