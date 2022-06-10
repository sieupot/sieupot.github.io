import { Footer } from './modules/footer.js';
import { InfoPanel } from './modules/infoPanel.js';
import { UserSettingsMenu } from './modules/userSettingsMenu.js';

// on page load
$(() => {
  // insert the menu into its place
  new UserSettingsMenu();

  // insert the InfoPanel dynamic content into its place
  (new InfoPanel()).render();
  
  // insert the footer at the end of the <body>
  new Footer();
});