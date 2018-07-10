# Voya Code

This is a repository for my website, https://voyacode.com, which I use for my personal projects. The website is implemented with Angular, and it uses AOT (Ahead-of-time) compilation. Styling is done with Sass (scss).

The website code uses Angular CLI project structure. Actual Angular code can be found in [src/](https://github.com/Voya100/VoyaCode/tree/master/src) directory. Website uses lazy loading, so each web page has their own module, which are in their own directories. All of my projects can be found in [src/app/projects/](https://github.com/Voya100/VoyaCode/tree/master/src/app/projects) directory.

[public/](https://github.com/Voya100/VoyaCode/tree/master/public) directory contains the actual website that is seen by the users. It includes some static assets (such as images) and the minified app build that Angular CLI produces. The compile result is included in the repository because this same repository is also used for deployment purposes.

The website also has a Node.js backend created with Nest framework, repository of which you can find [here](https://github.com/Voya100/VoyaCode-Server).

If you have any improvement suggestions (or suggestions for future coding projects), feel free to suggest. :)

- Voya
