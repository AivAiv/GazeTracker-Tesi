# Thesis: Website for image and Web page review with WebGazer

This project is the outcome of my thesis and consists of a website for reviewing images or web pages using **WebGazer**, a technology that utilizes a webcam to monitor the user's gaze on the screen. The platform allows conducting targeted tests to gather data on where users focus their attention.

## Main concepts

### Two types of users
1. **Creator**: Users who design and create tests by defining their content, such as images, web pages, and final questionnaires.
2. **Tester**: Users who perform the tests by observing various images, providing gaze tracking data.

### Test access
Tests can also be completed by users who are not registered as testers, thanks to:
  - A **direct link** to the test, provided by a creator.
  - A **nickname** for participant identification.
  - A **password**, also provided by the creator.

## Features
- **Gaze Tracking**: Using WebGazer to track and analyze eye movement.
- **Test Creation**: A dedicated panel for creators to configure custom tests.
- **Test Execution**: A simple and intuitive interface for testers, with real-time gaze data collection.
- **Secure Test Access**: Ability to share tests via password-protected links.
- **Results Analysis**: Export and visualization of collected data for reviewing and improving tested content.

## Technologies used
- **Frontend**: HTML, SCSS, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **WebGazer.js**: Library for gaze tracking

## How to use the project
1. Clone the repository:
   ```bash
   git clone https://github.com/AivAiv/GazeTracker-Tesi
2. Import the sample database using the provided file: `db/gazetrackerdb.sql`.
3. Start the website.