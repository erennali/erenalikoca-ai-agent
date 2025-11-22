export interface Project {
  title: string;
  titleTr: string;
  techStack: string[];
  description: string;
  descriptionTr: string;
  githubUrl?: string;
  liveUrl?: string;
  highlight: string;
  highlightTr: string;
  year: string;
}

export interface Experience {
  company: string;
  position: string;
  positionTr: string;
  period: string;
  responsibilities: string[];
  responsibilitiesTr: string[];
}

export interface Education {
  institution: string;
  institutionTr: string;
  degree: string;
  degreeTr: string;
  period: string;
  highlights: string[];
  highlightsTr: string[];
}

export interface Certification {
  name: string;
  nameTr: string;
  issuer: string;
  year: string;
}

export const PORTFOLIO_CONTEXT = {
  profile: {
    name: "Eren Ali Koca",
    title: "iOS Developer & Computer Engineer",
    titleTr: "iOS Geliştirici & Bilgisayar Mühendisi",
    location: "Istanbul, Turkey",
    about: `Computer Engineer with hands-on experience in software development and mobile application projects.
    Proficient in Swift, Flutter, and C#, with a strong interest in building scalable and user-friendly applications.
    Published mobile applications on the App Store. Experienced in Agile methodologies, particularly Scrum,
    and a strong team player committed to collaborative software development. Actively developing technical and
    problem-solving skills to specialize in mobile development and contribute to innovative software solutions.`,
    aboutTr: `Yazılım geliştirme ve mobil uygulama projelerinde uygulamalı deneyime sahip Bilgisayar Mühendisi.
    Swift, Flutter ve C# konusunda yetkin, ölçeklenebilir ve kullanıcı dostu uygulamalar geliştirme konusunda güçlü ilgiye sahip.
    App Store'da yayınlanmış mobil uygulamaları var. Agile metodolojilerinde, özellikle Scrum'da deneyimli,
    işbirlikçi yazılım geliştirmeye bağlı güçlü bir takım oyuncusu. Mobil geliştirme alanında uzmanlaşmak ve
    yenilikçi yazılım çözümlerine katkıda bulunmak için teknik ve problem çözme becerilerini aktif olarak geliştiriyor.`,
    contact: {
      email: "eren_ali_koca@hotmail.com",
      phone: "+90 505 091 09 00",
      linkedin: "https://www.linkedin.com/in/erenalikoca",
      github: "https://github.com/erennali",
      portfolio: "https://erenalikoca.com",
      medium: "https://erenali.medium.com",
    },
  },

  skills: {
    languages: ["Swift", "C#", "Dart", "Python", "Java"],
    frameworks: [
      "ASP.NET Core",
      "Entity Framework",
      "LINQ",
      "Flutter",
      "SwiftUI",
      "UIKit",
      "OneSignal",
      "SnapKit",
      "RevenueCat",
      "Git",
      "GitHub",
      "Docker",
    ],
    architectures: ["MVVM", "VIPER", "MVC", "MVVM-C", "Onion Architecture", "Clean Architecture"],
    databases: ["SQL Server", "PostgreSQL", "Firebase", "MSSQL"],
    tools: ["Agile", "Scrum", "Jira", "Asana", "Trello", "Notion"],
    concepts: [
      "SOLID Principles",
      "Object-Oriented Programming (OOP)",
      "Clean Code",
      "RESTful APIs",
      "CQRS",
      "MediatR",
      "RabbitMQ",
      "SignalR",
      "Async Programming",
      "Design Patterns",
    ],
  },

  experiences: [
    {
      company: "TABY",
      position: "Software Developer",
      positionTr: "Yazılım Geliştirici",
      period: "Aug 2025 - Present",
      responsibilities: [
        "Developing mobile applications with React Native, adhering to SOLID principles, OOP, and Clean Code standards",
        "Integrating with .NET backend services built using Onion Architecture, CQRS, and MediatR patterns",
        "Working directly with PostgreSQL database for data management",
        "Collaborating with cross-functional teams in Agile/Scrum environment",
      ],
      responsibilitiesTr: [
        "SOLID prensipleri, OOP ve Clean Code standartlarına uygun React Native ile mobil uygulama geliştirme",
        "Onion Architecture, CQRS ve MediatR pattern'leri kullanılarak oluşturulmuş .NET backend servisleriyle entegrasyon",
        "Veri yönetimi için doğrudan PostgreSQL veritabanı ile çalışma",
        "Agile/Scrum ortamında çapraz fonksiyonel ekiplerle işbirliği",
      ],
    },
    {
      company: "TABY",
      position: "Intern",
      positionTr: "Stajyer",
      period: "July 2025 - Aug 2025",
      responsibilities: [
        "Contributed to React Native mobile application development",
        "Implemented SOLID principles and Clean Code standards",
        "Gained practical experience with .NET backend services and PostgreSQL",
      ],
      responsibilitiesTr: [
        "React Native mobil uygulama geliştirmeye katkıda bulunma",
        "SOLID prensipleri ve Clean Code standartlarının uygulanması",
        ".NET backend servisleri ve PostgreSQL ile pratik deneyim kazanma",
      ],
    },
    {
      company: "RISE Technology",
      position: "Intern",
      positionTr: "Stajyer",
      period: "Aug 2025 - Sep 2025",
      responsibilities: [
        "Developed full-stack web application using React and .NET Core Web API",
        "Followed Clean Architecture principles with Entity Framework Core",
        "Worked with Dockerized SQL Server database",
      ],
      responsibilitiesTr: [
        "React ve .NET Core Web API kullanarak full-stack web uygulaması geliştirme",
        "Entity Framework Core ile Clean Architecture prensiplerini takip etme",
        "Docker'da SQL Server veritabanı ile çalışma",
      ],
    },
    {
      company: "Turkcell Gençlere Yatırım Geleceğe Yazılım 4.5 Bootcamp",
      position: "Swift Bootcamp Participant",
      positionTr: "Swift Bootcamp Katılımcısı",
      period: "Aug 2025 - Present",
      responsibilities: [
        "Completed intensive Swift Bootcamp developing proficiency in UIKit and SwiftUI",
        "Applied iOS architectural patterns: MVVM, VIPER, MVC, and MVVM-C",
        "Completed three scored projects and one final App Store-ready application",
      ],
      responsibilitiesTr: [
        "UIKit ve SwiftUI'da yetkinlik geliştiren yoğun Swift Bootcamp'i tamamlama",
        "iOS mimari pattern'lerini uygulama: MVVM, VIPER, MVC ve MVVM-C",
        "Üç puanlı proje ve bir final App Store'a hazır uygulama tamamlama",
      ],
    },
    {
      company: "QuantumCode Technology",
      position: "iOS Developer (Freelance)",
      positionTr: "iOS Geliştirici (Freelance)",
      period: "Jun 2025 - Present",
      responsibilities: [
        "Developed native iOS applications using UIKit and MVVM architectural pattern",
        "Leveraged SnapKit for programmatic UI and Auto Layout implementation",
        "Ensured modern, testable, and maintainable codebase",
      ],
      responsibilitiesTr: [
        "UIKit ve MVVM mimari pattern'i kullanarak native iOS uygulamaları geliştirme",
        "Programatik UI ve Auto Layout implementasyonu için SnapKit kullanma",
        "Modern, test edilebilir ve sürdürülebilir kod tabanı sağlama",
      ],
    },
  ],

  projects: [
    {
      title: "Dietitian Web App",
      titleTr: "Diyetisyen Web Uygulaması",
      techStack: [
        "ASP.NET Core",
        "Onion Architecture",
        "MediatR",
        "CQRS",
        "RabbitMQ",
        "SignalR",
        "SOLID/OOP",
      ],
      description:
        "Built a Dietitian web app with ASP.NET Core using Onion Architecture and Design Patterns, adhering to SOLID/OOP principles. Leveraged MediatR, CQRS, RabbitMQ for async messaging, and SignalR for real-time updates, ensuring scalable and maintainable code.",
      descriptionTr:
        "SOLID/OOP prensipleri adhering ederek Onion Architecture ve Design Patterns kullanarak ASP.NET Core ile bir Diyetisyen web uygulaması oluşturdum. Ölçeklenebilir ve sürdürülebilir kod sağlamak için MediatR, CQRS, async mesajlaşma için RabbitMQ ve gerçek zamanlı güncellemeler için SignalR kullandım.",
      highlight:
        "The most challenging part was implementing async messaging with RabbitMQ while maintaining SOLID principles across all layers of the Onion Architecture. Solved it by creating a clean abstraction layer for message handlers.",
      highlightTr:
        "En zorlu kısım, Onion Architecture'ın tüm katmanlarında SOLID prensiplerini korurken RabbitMQ ile async mesajlaşma uygulamaktı. Mesaj işleyicileri için temiz bir abstraction katmanı oluşturarak çözdüm.",
      year: "2025",
    },
    {
      title: "Alzheimer Support App",
      titleTr: "Alzheimer Destek Uygulaması",
      techStack: ["Flutter", "AI/ML", "Firebase", "TÜBİTAK 2209-A Funded"],
      description:
        "Developed a TÜBİTAK 2209-A funded Alzheimer's support app using Flutter, featuring AI-powered memory comparison algorithms and personalized rehabilitation interfaces for enhanced user recall.",
      descriptionTr:
        "Flutter kullanarak TÜBİTAK 2209-A destekli bir Alzheimer destek uygulaması geliştirdim. Yapay zeka destekli hafıza karşılaştırma algoritmaları ve gelişmiş kullanıcı hatırlama için kişiselleştirilmiş rehabilitasyon arayüzleri içeriyor.",
      highlight:
        "Implementing AI-powered memory comparison algorithms that could accurately assess cognitive decline while being privacy-focused was the biggest challenge. We used local ML models to keep user data secure.",
      highlightTr:
        "Gizlilik odaklı olurken bilişsel düşüşü doğru bir şekilde değerlendirebilen yapay zeka destekli hafıza karşılaştırma algoritmalarını uygulamak en büyük zorluktu. Kullanıcı verilerini güvende tutmak için yerel ML modelleri kullandık.",
      year: "2025",
    },
    {
      title: "News App",
      titleTr: "Haber Uygulaması",
      techStack: ["Swift", "UIKit", "RESTful API", "Async/Await"],
      description:
        "Built a Swift UIKit News App with RESTful API integration, dynamic UI components, and async networking, showcasing iOS architecture and API best practices.",
      descriptionTr:
        "RESTful API entegrasyonu, dinamik UI bileşenleri ve async networking ile Swift UIKit Haber Uygulaması oluşturdum. iOS mimarisi ve API en iyi uygulamalarını sergiliyor.",
      highlight:
        "Managing async data fetching with proper error handling and implementing smooth scrolling with image caching was challenging. Used NSCache and async/await patterns to solve performance issues.",
      highlightTr:
        "Uygun hata işleme ile async veri getirmeyi yönetmek ve görüntü önbellekleme ile yumuşak kaydırma uygulamak zordu. Performans sorunlarını çözmek için NSCache ve async/await pattern'lerini kullandım.",
      year: "2025",
    },
    {
      title: "AI Podcaster App",
      titleTr: "AI Podcast Uygulaması",
      techStack: [
        "Swift",
        "UIKit",
        "MVVM",
        "Google AI Studio",
        "RevenueCat",
        "Apple TTS",
      ],
      description:
        "Developed an AI-powered podcast app with Swift UIKit (MVVM), integrating Google AI Studio for conversational features, RevenueCat for in-app purchasing, and Apple's native TTS for high-quality narration.",
      descriptionTr:
        "Swift UIKit (MVVM) ile AI destekli bir podcast uygulaması geliştirdim. Konuşma özellikleri için Google AI Studio, uygulama içi satın alma için RevenueCat ve yüksek kaliteli anlatım için Apple'ın native TTS'sini entegre ettim.",
      highlight:
        "Integrating Google AI Studio with RevenueCat's paywall system while maintaining smooth UX was complex. Implemented a smart caching system to reduce API calls and costs.",
      highlightTr:
        "Google AI Studio'yu RevenueCat'in paywall sistemiyle yumuşak UX'i korurken entegre etmek karmaşıktı. API çağrılarını ve maliyetleri azaltmak için akıllı bir önbellekleme sistemi uyguladım.",
      year: "2025",
    },
    {
      title: "ToDo App AI (App Store Published)",
      titleTr: "ToDo App AI (App Store'da Yayınlandı)",
      techStack: [
        "Swift",
        "SwiftUI",
        "OpenAI API",
        "OneSignal",
        "Firebase",
      ],
      description:
        "Published a Swift-based To-Do app on App Store with OpenAI API for smart task automation, OneSignal for push notifications, and Firebase backend for real-time sync and authentication.",
      descriptionTr:
        "Akıllı görev otomasyonu için OpenAI API, push bildirimleri için OneSignal ve gerçek zamanlı senkronizasyon ve kimlik doğrulama için Firebase backend ile Swift tabanlı bir To-Do uygulamasını App Store'da yayınladım.",
      githubUrl: "https://github.com/erenali/todo-app-ai",
      liveUrl: "https://apps.apple.com/app/todo-ai",
      highlight:
        "Publishing on App Store and implementing AI-powered task suggestions while keeping costs low was the main challenge. Used smart prompt engineering to reduce token usage by 60%.",
      highlightTr:
        "App Store'da yayınlama ve maliyetleri düşük tutarken AI destekli görev önerileri uygulamak ana zorluktu. Token kullanımını %60 azaltmak için akıllı prompt mühendisliği kullandım.",
      year: "2024",
    },
  ],

  education: [
    {
      institution: "Isparta University of Applied Sciences",
      institutionTr: "Isparta Uygulamalı Bilimler Üniversitesi",
      degree: "B.Sc. Computer Engineering",
      degreeTr: "Bilgisayar Mühendisliği Lisans",
      period: "Sep 2022 - Jun 2026",
      highlights: [
        "Focused on mobile development and software engineering",
        "Active participant in coding bootcamps and tech communities",
        "Completed TÜBİTAK 2209-A funded research project",
      ],
      highlightsTr: [
        "Mobil geliştirme ve yazılım mühendisliği odaklı",
        "Kodlama bootcamp'leri ve teknoloji topluluklarında aktif katılımcı",
        "TÜBİTAK 2209-A destekli araştırma projesini tamamladı",
      ],
    },
  ],

  certifications: [
    {
      name: "White Hat Hacker (C.E.H)",
      nameTr: "Beyaz Şapkalı Hacker (C.E.H)",
      issuer: "Isparta University",
      year: "2023",
    },
    {
      name: "White Hat Hacker and Basic Linux",
      nameTr: "Beyaz Şapkalı Hacker ve Temel Linux",
      issuer: "Cyrops / Siber Vatan",
      year: "2023",
    },
    {
      name: "Version Controls: Git and GitHub",
      nameTr: "Versiyon Kontrolü: Git ve GitHub",
      issuer: "BTK Academy",
      year: "2024",
    },
    {
      name: "Artificial Intelligence 101",
      nameTr: "Yapay Zeka 101",
      issuer: "Techcareer.net",
      year: "2025",
    },
  ],

  personality: {
    tone: "Professional yet approachable - I love tech and problem-solving!",
    toneTr:
      "Profesyonel ama samimi - Teknolojiyi ve problem çözmeyi seviyorum!",
    hobbies: [
      "Building innovative mobile apps",
      "Exploring new iOS frameworks and features",
      "Contributing to open-source projects",
      "Learning about AI/ML integration in mobile apps",
      "Participating in tech bootcamps and hackathons",
    ],
    hobbiesTr: [
      "Yenilikçi mobil uygulamalar geliştirmek",
      "Yeni iOS framework'leri ve özellikleri keşfetmek",
      "Açık kaynak projelere katkıda bulunmak",
      "Mobil uygulamalarda AI/ML entegrasyonu hakkında öğrenmek",
      "Teknoloji bootcamp'leri ve hackathon'lara katılmak",
    ],
    preferredStack:
      "iOS Native (Swift/SwiftUI) for mobile, ASP.NET Core for backend",
    preferredStackTr:
      "Mobil için iOS Native (Swift/SwiftUI), backend için ASP.NET Core",
    workStyle:
      "I believe in writing clean, maintainable code following SOLID principles. I thrive in Agile teams and love discussing architecture patterns and best practices. Always eager to learn new technologies and share knowledge with teammates.",
    workStyleTr:
      "SOLID prensiplerini takip eden temiz, sürdürülebilir kod yazmaya inanıyorum. Agile ekiplerde gelişiyor ve mimari pattern'ler ve en iyi uygulamaları tartışmayı seviyorum. Her zaman yeni teknolojiler öğrenmeye ve takım arkadaşlarıyla bilgi paylaşmaya istekliyim.",
    currentlyLearning: [
      "Advanced SwiftUI animations and transitions",
      "AI/ML integration in iOS apps (Core ML, Vision)",
      "System design and scalable architecture patterns",
      "React Native for cross-platform development",
    ],
    currentlyLearningTr: [
      "Gelişmiş SwiftUI animasyonları ve geçişleri",
      "iOS uygulamalarında AI/ML entegrasyonu (Core ML, Vision)",
      "Sistem tasarımı ve ölçeklenebilir mimari pattern'leri",
      "Cross-platform geliştirme için React Native",
    ],
    careerGoals:
      "Become a senior iOS developer working on products that impact millions of users. Long-term, I want to lead a mobile development team, contribute to open-source iOS projects, and mentor junior developers. I'm particularly interested in combining AI/ML with mobile development to create innovative user experiences.",
    careerGoalsTr:
      "Milyonlarca kullanıcıyı etkileyen ürünler üzerinde çalışan kıdemli bir iOS geliştiricisi olmak. Uzun vadede, bir mobil geliştirme ekibine liderlik etmek, açık kaynak iOS projelerine katkıda bulunmak ve junior geliştiricilere mentorluk yapmak istiyorum. Özellikle yenilikçi kullanıcı deneyimleri oluşturmak için AI/ML'yi mobil geliştirme ile birleştirmekle ilgileniyorum.",
  },

  availability: {
    status: "Open to opportunities",
    statusTr: "Fırsatlara açık",
    preferences: [
      "iOS Developer positions (Mid-level or Senior)",
      "Full-stack roles involving React Native + .NET",
      "Innovative startups working on AI/ML products",
      "Remote or hybrid work in Istanbul",
    ],
    preferencesTr: [
      "iOS Geliştirici pozisyonları (Mid-level veya Senior)",
      "React Native + .NET içeren Full-stack roller",
      "AI/ML ürünleri üzerinde çalışan yenilikçi startuplar",
      "İstanbul'da uzaktan veya hibrit çalışma",
    ],
  },

  languages: {
    english: "Professional working proficiency",
    turkish: "Native speaker",
  },
};
