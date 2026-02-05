# Appalanche Client Project

This project serves as the frontend of the Appalanche system. This is my first attempt at a Vue application, and is a
tool I created for myself to help me keep track of my job applications and give me a single hub where I could easily 
send myself to various job boards. This connects (though only currently through Vite proxies) to the [Appalanche 
Modulith](https://github.com/andrziv/Appalanche-Modulith).

## Small Tour
The login page (and similarly, the signup page that isn't being shown), used to login to an existing account.
![Dark-theme Login page screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_login_dark.png "Login page screenshot with empty fields.")

The homepage to allow for quickly browsing your added applications. You can quickly search for applications via the 
search bar for position name, company name, or the application ID (if you set one). You can also search using the 
other fields with the drop-downs, or you can mix and combine with any of the aforementioned criteria.
![Dark-theme Home page screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_home_dark.png "Home page screenshot with example applications.")

If you click on an application you can open up the editing panel to change any of the attributes you previously set. 
You can also add a job description or your notes on the position. You also have access to all of the searching 
functionality the home page has, if you need to search while in editing mode.
![Dark-theme Editing panel screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_editing_dark.png "Editing panel screenshot on an example 'Junior Robotics Engineer' application at Stark Industries.")

The settings panel is where you can set various quality-of-life links that will be placed on the sub-navigation bar. 
Note how in the previous images there were no LinkedIn/GitHub links, but now they've been added via settings. 
In addition to personal links, you can add links to job boards that are accessible via the drop-down under the logo.
![Dark-theme Settings screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_settings_dark.png "Settings page screenshot with fields partially filled in and some example job sites.")

Clicking on the "Add Application" button will show the following modal, where you can fill the displayed fields and 
Pressing "Save" will create a new application that will quickly show up at the top of your home page listings (assuming you're on the first page).
![Dark-theme Application creation modal screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_addapp_dark.png "Screenshot of modal used for submitting a new application with fields unfilled.")

The entire website also has a light-mode in case that's preferrable. Here's an example of the home page but in light mode.
![Light-theme Home page screenshot](https://github.com/andrziv/Appalanche-Client/blob/main/readme_images/appalanche_home_light.png "Light-theme Home page screenshot with example applications.")

## Connecting to Server
Given that this project is still WIP, there's no clean artifact that you can use to run the system.

### Serving from Modulith
You could modify parts of this application and build it to produce the distributable files needed to serve a website 
from a non-Node server (like the Java Modulith that backs this frontend.

Follow these steps to get this to work:
1) Change the configuration files
   1) In `package.json`, replace the `build` run target to the following: `"build": "vite build"`
   2) In `tsconfig.app.json`:
      1) remove the configuration line with the following: `"emitDeclarationOnly": true`, 
      2) and replace it with `"outDir": "./dist/types"`
   3) In `tsconfig.node.json`: 
      1) remove the configuration line with the following: `"emitDeclarationOnly": true`
      2) and replace it with `"outDir": "./dist/types_node"`
   4) In `vite.config.ts`, add `base: '/',` to the top of the config definition (inside `defineConfig({...})`)
2) Run the new build target 
   1) in WebStorm you can just click the play button next to it in `package.json`
   2) in other IDEs, just run the following command from a terminal within the project directory: `npm run build`
3) Once the build succeeds, take the files inside the `/dist` directory within the project and paste them within the 
[Appalanche Modulith](https://github.com/andrziv/Appalanche-Modulith)'s `src/main/resources/static` directory. 
In case the `static` directory doesn't exist, just make it (`mkdir static`) under the resources directory.
4) Follow the steps to build the server from that repo's README.
      

### Vite Proxies
The way I currently develop the application, you don't need to do anything to get this to work other than having the modulith
container active and exposed at port 8081 (just follow the steps in the readme for that project).

## Future Goals
See the Modulith project's README section of the same name.