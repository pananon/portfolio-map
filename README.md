# Harimangal Pandey - Interactive Portfolio

A modern, interactive personal portfolio website showcasing Harimangal Pandey's professional journey, skills, and projects. Built with React, Tailwind CSS, and Framer Motion for smooth animations and interactions.

## 🌟 Features

### ✨ Interactive Elements
- **Interactive Map of India**: Visual journey through cities where Harimangal has worked
- **Smooth Animations**: Framer Motion powered animations throughout the site
- **Responsive Design**: Optimized for all devices and screen sizes
- **Scroll-based Animations**: Elements animate as they come into view

### 📱 Sections
- **Hero Section**: Professional introduction with contact information
- **Interactive Journey Map**: Visual representation of career progression across India
- **Experience Timeline**: Detailed work history with achievements
- **Education**: Academic background and qualifications
- **Skills & Certifications**: Technical skills, languages, and professional certifications
- **Projects**: Featured projects with interactive cards
- **Contact Form**: Functional contact form with validation

### 🎨 Design Features
- **Modern UI**: Clean, professional design with gradient backgrounds
- **Dark/Light Theme**: Adaptive color scheme
- **Hover Effects**: Interactive elements with smooth transitions
- **Typography**: Professional font hierarchy and spacing
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🚀 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify/Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd harimangal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Build for Production

```bash
npm run build
```

The build files will be created in the `dist` folder.

## 🚀 Deployment

### Option 1: Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 3: GitHub Pages

1. **Add GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 📝 Customization

### Updating Content

All content is stored in `src/data/portfolioData.js`. You can easily update:

- Personal information
- Work experience
- Education details
- Skills and certifications
- Projects
- Contact information

### Styling

- **Colors**: Update the color palette in `tailwind.config.js`
- **Fonts**: Modify font families in `src/index.css`
- **Animations**: Adjust animation parameters in component files

### Adding New Sections

1. Create a new component in `src/components/`
2. Add the component to `src/App.jsx`
3. Update navigation in `src/components/Navigation.jsx`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Hero.jsx
│   ├── Navigation.jsx
│   ├── InteractiveMap.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
├── data/               # Data configuration
│   └── portfolioData.js
├── App.jsx            # Main application
├── main.jsx           # Entry point
└── index.css          # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Live Demo

Visit the live portfolio: [https://harimangal-portfolio.netlify.app](https://harimangal-portfolio.netlify.app)

## 📞 Contact

- **Email**: harimangal.pandey@outlook.com
- **LinkedIn**: [Harimangal Pandey](https://www.linkedin.com/in/harimangalp/)
- **Personal Site**: [divinecoded-3d.netlify.app](https://divinecoded-3d.netlify.app)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Harimangal Pandey** 