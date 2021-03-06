export class Project {
  name: string;
  description: string;
  path: string;
  bannerUrl: string;
  iconUrl: string;
  onBanner: boolean;
}

export const projectList: Project[] = [
  {
    name: 'Color picker',
    description: 'Try out different colors with this color picker!',
    path: 'projects/color-picker',
    bannerUrl: '/images/banners/color-picker-banner.jpg',
    iconUrl: '/images/icons/color-picker-icon.jpg',
    onBanner: true
  },
  {
    name: 'Hangman',
    description: 'Hangman mobile app for Android.',
    path: 'projects/hangman',
    bannerUrl: '/images/banners/hangman-banner.jpg',
    iconUrl: '/images/icons/hangman-icon.jpg',
    onBanner: true
  },
  {
    name: 'Snow Machine',
    description: 'Create all kinds of snow with Snow Machine!',
    path: 'projects/snow-machine',
    bannerUrl: '/images/banners/snow-machine-banner.jpg',
    iconUrl: '/images/icons/snow-machine-icon.jpg',
    onBanner: true
  },
  {
    name: 'Chess',
    description: 'Play a game of chess against a friend or a computer AI!',
    path: 'projects/chess',
    bannerUrl: '/images/banners/chess-banner.jpg',
    iconUrl: '/images/icons/chess-icon.jpg',
    onBanner: true
  },
  {
    name: 'Slay the Dragon!',
    description: 'Slay the dragon in the game "Slay the Dragon!"',
    path: 'projects/slay-the-dragon',
    bannerUrl: '/images/banners/slay-the-dragon-banner.jpg',
    iconUrl: '/images/icons/slay-the-dragon-icon.jpg',
    onBanner: true
  },
  {
    name: 'Rock, Paper, Scissors',
    description: 'Beat the computer in a very challenging game of Rock, Paper, Scissors.',
    path: 'projects/rock-paper-scissors',
    bannerUrl: '/images/banners/rock-paper-scissors-banner.jpg',
    iconUrl: '/images/icons/rock-paper-scissors-icon.jpg',
    onBanner: true
  }
];
