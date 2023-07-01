<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]


<br />
<div align="center">
  <a href="https://github.com/unavailable500/volume-booster">
    <img src="images/icons/speaker-96.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Volume Booster</h3>

  <p align="center">
    An open source cross browser volume booster
    <br />
    <a href="https://github.com/unavailable500/volume-booster"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/unavailable500/volume-booster">View Demo</a>
    ·
    <a href="https://github.com/unavailable500/volume-booster/issues">Report Bug</a>
    ·
    <a href="https://github.com/unavailable500/volume-booster/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
[![Product Name Screen Shot][product-screenshot]](https://example.com)

An open source extension to boost your audio volume on every html video and audio. 
- [x] Cross browser so it works on Chromium based browsers and on Firefox
- [x] Works even if the video/audio is in an iframe on a different domain
 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![FluentUI][FluentUI]][FluentUI-url]
* [![Typescript][Typescript]][Typescript-url]
* [![webextension-polyfill][webextension-polyfill]][webextension-polyfill-url]
* [![Webpack][Webpack]][Webpack-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The extension is not published on any store so you have to install it manually.

### Prerequisites

Install [Node Js](https://nodejs.org/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/unavailable500/volume-booster.git
   ```
2. Install NPM packages
   ```sh
   cd volume-booster
   npm install
   ```
3. Build the project
   ```sh
   npm run build
   ```

#### Install the extension on Chrome

1. Go to [Chrome Extensions](chrome://extensions/)
2. Turn on "Developer Mode" on the top right corner and select "Load unpacked" on the top left corner.
3. Select the project directory
4. Enable the extension and restart Google Chrome.

#### Install the extension on Firefox
1. Type "about:debugging" in the address bar of your Firefox browser and press enter.
2. Click “This Firefox” on the left column.
3. Click the "Load Temporary Add-on…" button on the right column, then select the manifest.json from the project folder
4. To fully work on iframe go to "about:addons", select "Volume Booster Open Source", go on permission tab and select "Access your data for all websites". If you don't want to give that permission you may not work with all iframes

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/unavailable500/volume-booster.svg?style=for-the-badge
[license-url]: https://github.com/unavailable500/volume-booster/blob/master/LICENSE.txt
[product-screenshot]: images/screenshots/firefox-ui.png
[Typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[webextension-polyfill]: https://img.shields.io/badge/polyfill-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139
[webextension-polyfill-url]: https://github.com/mozilla/webextension-polyfill
[Webpack]: https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black
[Webpack-url]: https://webpack.js.org/
[FluentUI]: https://img.shields.io/badge/fluent%20UI-0078D4?style=for-the-badge&logo=microsoft&logoColor=white
[FluentUI-url]: https://developer.microsoft.com/en-us/fluentui#/

