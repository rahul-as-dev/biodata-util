# Indian Marriage Biodata Maker Web App

A modern, customizable web application for creating, previewing, and downloading Indian marriage biodata documents. Built with React, Vite, and Tailwind CSS, this app helps users design beautiful biodata profiles for matrimonial purposes.

## Features

- 📝 **Create & Edit Biodata:** Add personal, family, and professional details with customizable sections and fields.
- 🎨 **Themes & Layouts:** Choose from multiple templates and color themes, including traditional Indian designs.
- 👀 **Live Preview:** Instantly see changes as you edit your biodata.
- 📸 **Photo Upload:** Add and crop profile photos.
- 📄 **Download as PDF:** Export your biodata in high-quality PDF format.
- 🖌️ **Custom Styles:** Personalize fonts, colors, and backgrounds.
- 🧩 **Drag & Drop Sections:** Reorder sections for a tailored layout.
- 🌗 **Light/Dark Mode:** Switch between light and dark themes for better readability.
- 🐳 **Docker Support:** Easily run the app in a containerized environment.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **PDF Generation:** @react-pdf/renderer, jsPDF, html2canvas
- **State Management:** React Context, Immer
- **Routing:** React Router
- **Icons:** Lucide React
- **Other:** Docker, ESLint

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/marriage-biodata-maker.git
cd marriage-biodata-maker

# Install dependencies
pnpm install # or npm install
```

### Development
```bash
pnpm dev # or npm run dev
```
App runs at `http://localhost:5173` by default.

### Production Build
```bash
pnpm build # or npm run build
```

### Docker
```bash
docker build -t biodata-maker .
docker run -p 8080:8080 biodata-maker
```

## Project Structure
```
biodata-util/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, backgrounds, layout templates
│   ├── components/        # React components (Preview, Forms, Layouts)
│   ├── contexts/          # Context providers (Biodata, Theme)
│   ├── pages/             # Main pages (Home, Create, About, Contact)
│   ├── utils/             # Utility functions (PDF, theme, etc.)
│   ├── App.jsx            # Main app component
│   └── index.jsx          # Entry point
├── Dockerfile             # Docker setup
├── package.json           # Project metadata & dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Contributing
Pull requests and suggestions are welcome! Please open an issue for major changes.

## License
MIT

## Acknowledgements
- Inspired by traditional Indian marriage biodata formats.
- Uses open-source libraries for UI, PDF, and icons.

## Features Waitlist
- Add color picker in Background page color
- Add text color option
- Add font size option
- Add heador icon options
- Expand the background theme catalouge
- Make home page visually richer