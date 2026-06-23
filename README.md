# PRITECH - React Native Technical Task

A simple, clean, and modern React Native mobile application that allows users to manage a small list of personal tasks. Built specifically for the PRITECH Technical Task evaluation.

## 🚀 What was implemented (Short Explanation)

This project was built using **React Native** and **Expo**. The focus was on delivering a clean UI/UX, robust state management, and clean code architecture.

**Key Features & Technical Details:**
* **Functional Components & Hooks:** Utilized `useState` for state management and `useEffect` for data fetching/loading.
* **Local Storage:** Integrated `@react-native-async-storage/async-storage` to persist tasks locally on the device.
* **Public API Integration:** Fetched random motivational quotes from `dummyjson.com/quotes/random` to enhance the user experience.
* **Routing & Navigation:** Implemented `expo-router` for seamless navigation between the main Task List and the Task Details screen (Modal presentation).
* **UI/UX Design:** Created a custom theme (Dark Green & Light Green accents) with Google's `Lato` font for a premium look. Handled empty states and added basic input validation.
* **Bonus Features Implemented:** Search tasks by title, Filter tasks by status, Local storage persistence, and Stack navigation.

## 🛠 Setup Instructions

To run this project locally on your machine, follow these steps:

**1. Clone the repository**
```bash
git clone [https://github.com/Klinti13/pritech-rn-task.git](https://github.com/Klinti13/pritech-rn-task.git)
cd react-native-technical-task

npm install
npx expo start

Press i to open in the iOS Simulator.
Press a to open in the Android Emulator.
Or scan the QR code with the Expo Go app on your physical device.
