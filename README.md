Here’s a **cleaned up and corrected version** of your `README.md` to reflect that your app **doesn't use Redux** or **user authentication**, and instead uses **local state and AsyncStorage** for tracking.

---

# AnimeHorizon 🌅

A modern anime discovery and tracking app built with React Native and Expo.

---

## 📱 Features

* **Anime Discovery**: Browse and discover new anime series and movies
* **Local Tracking**: Keep track of watched, watching, and plan-to-watch anime using your device
* **Detailed Information**: View anime details like descriptions, and episode info
* **Search & Filter**: Find anime by title, genre, year, and more
* **Offline Support**: Access your local library even without internet
* **Cross-Platform**: Runs on both iOS and Android via Expo

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* npm or yarn
* Expo CLI:

  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/N4chtF4ust/anihorizon-app.git
   cd anihorizon-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start development:

   ```bash
   npx expo start
   ```

4. Open the app:

   * Press `i` for iOS simulator
   * Press `a` for Android emulator
   * Scan QR code with Expo Go app

---

## 🛠️ Tech Stack

| Category         | Tech                                      |
| ---------------- | ----------------------------------------- |
| Framework        | React Native + Expo                       |
| Styling          | StyleSheet / Tailwind / Styled Components |
| Data Source      | [aniwatch-api](https://github.com/ghoshRitesh12/aniwatch-api)  |
| Local Storage    | AsyncStorage                              |

---

## 📦 Building for Production

```bash
npx expo build:android
npx expo build:ios
```

Or with EAS:

```bash
npx eas build --platform all
```

---

## 📸 Screenshots

*Add screenshots of your app UI here.*



---

## 👤 Author

* **N4cht** – [@N4chtF4ust](https://github.com/N4chtF4ust)

## 🙏 Acknowledgments

* Anime data provided by AniWatch API
* Icons from Expo Vector Icons
* Built with 💖 by the React Native & Expo community

---

**Happy anime watching! 🍿**


