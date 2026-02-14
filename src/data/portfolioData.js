export const portfolioData = {
  personal: {
    name: "Harimangal Pandey",
    title: "Senior Frontend and Full-Stack Engineer | React | Next.js | React Native | Angular | PWA",
    summary: "Senior Frontend and Full-Stack Engineer with 5.5+ years of experience building scalable, high-performance web and mobile applications using React, Next.js, modern JavaScript frameworks, and PWAs. Proven track record in migrating legacy systems, implementing SSR/SSG applications, optimizing performance, and delivering seamless API integrations. Strong focus on accessibility (WCAG), responsive UI systems, component-driven architecture, and mentoring engineers.",
    email: "harimangal.pandey@outlook.com",
    links: {
      linkedin: "https://www.linkedin.com/in/harimangalp/",
      personalSite: "https://mangalcore.com",
      codechef: "https://codechef.com/users/pandey01",
      github: "https://github.com/pananon"
    }
  },

  experience: [
    {
      id: 1,
      company: "Microsoft (TechM)",
      location: "Hyderabad",
      position: "Senior Software Engineer",
      duration: "Feb 2024 – Present",
      coordinates: [17.3850, 78.4867],
      achievements: [
        "Led migration of a large enterprise web platform from Angular to React, improving performance, maintainability, and UX.",
        "Built Progressive Web Apps (PWAs) and cross-platform mobile apps using React Native, achieving ~95% shared code reuse.",
        "Designed component-driven UI systems using Fluent UI and Microsoft’s Verge Control Library.",
        "Implemented Redux for large-scale state management across 15+ screens.",
        "Delivered SSR/SSG flows using Next.js, including routing, middleware, and performance optimization.",
        "Developed CI/CD pipelines using Azure DevOps YAML workflows.",
        "Ensured WCAG compliance using ARIA roles and semantic HTML."
      ],
      technologies: ["React.js", "Next.js", "React Native", "TypeScript", "Azure DevOps", "Fluent UI", "Redux", "PWA"]
    },
    {
      id: 2,
      company: "Kongsberg Digital",
      location: "Bengaluru",
      position: "Software Engineer",
      duration: "Jan 2022 – Feb 2024",
      coordinates: [12.9716, 77.5946],
      achievements: [
        "Built React Native and PWA applications using Redux, Context API, and Expo, improving performance by ~40%.",
        "Designed modular, component-driven frontend architecture for rapid feature development.",
        "Implemented native modules in Swift and Kotlin for biometrics, camera access, and push notifications.",
        "Profiled and optimized runtime performance using Flipper, reducing startup time.",
        "Integrated offline-first systems using AsyncStorage and background sync.",
        "Delivered Web3 wallet connections and smart-contract UI flows using Web3.js and ethers.js.",
        "Conducted code reviews and guided junior engineers on React Native best practices."
      ],
      technologies: ["React Native", "React.js", "Redux", "Web3.js", "ethers.js", "Swift", "Kotlin", "Offline-first"]
    },
    {
      id: 3,
      company: "Newgen Software",
      location: "Noida",
      position: "Software Engineer",
      duration: "Sep 2020 – Jan 2022",
      coordinates: [28.5355, 77.3910],
      achievements: [
        "Built responsive React and React Native applications, cutting load times by 30%.",
        "Developed RESTful APIs with NestJS and Node.js.",
        "Designed reusable UI components and hooks.",
        "Integrated GPS, camera, and native device APIs."
      ],
      technologies: ["React.js", "React Native", "NestJS", "Node.js", "TypeScript"]
    },
    {
      id: 4,
      company: "Toastmasters",
      location: "Bengaluru",
      position: "President",
      duration: "Jun 2023 – Oct 2023",
      coordinates: [12.9716, 77.5946],
      achievements: [
        "Served as President of Kongsberg Squadrun Toastmasters Club.",
        "Led the local chapter, organized speaking events, and mentored members.",
        "Hosted and anchored annual events on big stages."
      ],
      technologies: ["Leadership", "Public Speaking", "Event Management"]
    },
    {
      id: 5,
      company: "Google Developer Student Clubs",
      location: "Noida",
      position: "Member",
      duration: "Mar 2017 – Mar 2019",
      coordinates: [28.5355, 77.3910],
      achievements: [
        "Participated in Google's developer community initiatives.",
        "Organized hackathons and coding workshops.",
        "Learned and implemented Google technologies and APIs."
      ],
      technologies: ["Google APIs", "Android", "Community Building"]
    }
  ],

  projects: [
    {
      id: 1,
      name: "TatvaFit — Gym Management Platform",
      role: "Founder & Developer",
      url: "https://tatvafit.mangalcore.com",
      description: "Full-stack gym automation platform solving manual payment and attendance tracking.",
      achievements: [
        "Designed database schema, UI systems, authentication, and deployments end-to-end.",
        "Implemented real-time sync with Supabase.",
        "Piloted with 10+ gyms, reducing admin workload by ~80%.",
        "Drove 95% adoption in test cohorts."
      ],
      technologies: ["React", "Supabase", "PWA", "Real-time Sync"]
    },
    {
      id: 2,
      name: "Lakshya Run — Fitness Test Preparation App",
      role: "Founder & Developer",
      url: "https://lakshyarun.mangalcore.com",
      description: "Mobile app helping police-exam aspirants track and prepare for endurance tests.",
      achievements: [
        "Implemented run timers, progress dashboards, and analytics.",
        "Designed scalable React Native architecture for multiple programs."
      ],
      technologies: ["React Native", "Analytics", "Mobile Architecture"]
    },
    {
      id: 3,
      name: "RagXGen — RAG Tooling Platform",
      role: "Developer",
      url: "https://ragxgen.mangalcore.com",
      description: "Developed dashboards for Retrieval-Augmented Generation experimentation.",
      achievements: [
        "Built dataset ingestion UIs and prompt-testing workflows.",
        "Focused on performance-optimized UI architecture."
      ],
      technologies: ["RAG", "AI/ML Interfaces", "Performance Optimization"]
    },
    {
      id: 4,
      name: "@mangalcore/ui-utils",
      role: "Open Source Author",
      url: "https://mangalcore.com/projects/mangalcore-ui-utils",
      description: "Open-Source React UI Library published on npm.",
      achievements: [
        "Published reusable React utilities and hooks for SaaS dashboards and Next.js apps.",
        "Reached 400+ npm downloads within 2 weeks.",
        "Designed for accessibility, tree-shaking, and scalable codebases."
      ],
      technologies: ["React", "NPM", "Open Source", "TypeScript"]
    }
  ],

  education: [
    {
      institution: "JSS Academy of Technical Education",
      degree: "B.Tech — Computer Science and Engineering",
      duration: "2016–2020",
      location: "Noida",
      description: "Graduated with strong foundation in computer science fundamentals."
    }
  ],

  skills: {
    technical: [
      "React.js", "Next.js (SSR/SSG)", "React Native", "Angular", "Redux", "Zustand",
      "Node.js", "NestJS", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
      "Supabase", "PostgreSQL", "MongoDB", "Web3.js", "ethers.js",
      "Azure DevOps", "Git", "Webpack", "Vite", "Jest", "Cypress"
    ],
    languages: ["English", "Hindi"],
    certifications: [
      "Google Cloud — Generative AI Certification",
      "Microsoft AI Skills Fest",
      "Copenhagen Challenge"
    ]
  },

  awards: [
    "State Chess Champion",
    "Gold Medal - 100m Race",
    "President - Kongsberg Squadrun Toastmasters",
    "Core Member - Slum Swaraj Foundation (NGO)"
  ],

  mapData: {
    india: {
      coordinates: [20.5937, 78.9629],
      zoom: 4,
      cities: [
        {
          name: "Noida",
          coordinates: [28.5355, 77.3910],
          experiences: [3, 5]
        },
        {
          name: "Bengaluru",
          coordinates: [12.9716, 77.5946],
          experiences: [2, 4]
        },
        {
          name: "Hyderabad",
          coordinates: [17.3850, 78.4867],
          experiences: [1]
        }
      ]
    }
  }
};