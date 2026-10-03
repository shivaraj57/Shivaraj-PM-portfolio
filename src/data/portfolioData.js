export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const heroSocials = [
  { label: 'Instagram', href: 'YOUR_INSTAGRAM_URL', icon: 'instagram' },
  { label: 'Facebook', href: 'YOUR_FACEBOOK_URL', icon: 'facebook' },
  { label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL', icon: 'linkedin' },
  { label: 'GitHub', href: 'YOUR_GITHUB_URL', icon: 'github' },
]

export const aboutHighlights = [
  'SOFTWARE DEVELOPMENT',
  'AI / MACHINE LEARNING',
  'EMBEDDED SYSTEMS',
  'ELECTRONICS & SIGNAL PROCESSING',
]

export const skillCategories = [
  {
    title: 'Programming',
    items: ['C++', 'Python', 'JavaScript', 'MATLAB', 'C'],
  },
  {
    title: 'Web Development',
    items: ['React', 'Vite', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'AI / ML',
    items: ['Machine Learning', 'KNN', 'Computer Vision', 'NumPy', 'Pandas', 'Scikit-learn'],
  },
  {
    title: 'Embedded / Electronics',
    items: ['Arduino', 'ESP32', 'AVR', '8051', 'Sensors', 'Microcontrollers'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'MATLAB', 'Keil', 'Vercel'],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Emotion-Based Music Recommendation System',
    category: 'AI/ML',
    tag: 'COMPLETED',
    status: 'COMPLETED',
    description:
      'An emotion-aware music recommendation system that uses facial expression recognition to identify a user\'s emotion and recommend suitable music.',
    problem:
      'People often struggle to choose music that matches their current mood, and static playlists rarely adapt to emotional context.',
    solution:
      'The project uses image-based emotion classification with a KNN model and recommends music based on detected facial expressions, making recommendations more responsive and personal.',
    techStack: ['MATLAB', 'KNN', 'Computer Vision', 'Machine Learning'],
    features: [
      'Image-based emotion classification',
      'KNN-powered recommendation logic',
      'Mood-aware music matching',
      'Practical human-centered AI workflow',
    ],
    github: '',
    liveDemo: '',
    accent: 'from-cyan-500/25 via-sky-500/10 to-blue-600/20',
    visual: 'emotion',
  },
  {
    id: 2,
    title: 'Email & SMS Spam Detector',
    category: 'AI/ML',
    tag: 'COMPLETED',
    status: 'COMPLETED',
    description:
      'A machine-learning application that classifies messages as spam or legitimate using natural language processing and supervised machine learning.',
    problem:
      'Spam messages can overwhelm users and reduce trust in digital communication channels.',
    solution:
      'The system analyzes message text with CountVectorizer and a Multinomial Naive Bayes classifier to quickly separate spam from valid communication.',
    techStack: ['Python', 'Streamlit', 'CountVectorizer', 'Multinomial Naive Bayes'],
    features: [
      'Text preprocessing and feature extraction',
      'Spam detection model training',
      'Streamlit dashboard interface',
      'Real-time classification workflow',
    ],
    github: '',
    liveDemo: '',
    accent: 'from-violet-500/20 via-indigo-500/10 to-cyan-500/15',
    visual: 'spam',
  },
  {
    id: 3,
    title: 'Multipurpose Agriculture Robot',
    category: 'EMBEDDED',
    tag: 'PROJECT',
    status: 'PROJECT',
    description:
      'An embedded agricultural automation project integrating sensors, a microcontroller, motor drivers, and GSM communication for smart agricultural applications.',
    problem:
      'Agricultural operations often require constant monitoring and manual intervention across various environmental conditions.',
    solution:
      'This robot combines AVR control, ultrasonic sensing, humidity monitoring, motor control, and GSM communication to support automation in farming tasks.',
    techStack: ['AVR', 'Ultrasonic Sensor', 'Humidity Sensors', 'GSM', 'L293D'],
    features: [
      'Sensor-driven environmental monitoring',
      'Motorized movement control',
      'Wireless GSM event alerts',
      'Embedded automation for agriculture',
    ],
    github: '',
    liveDemo: '',
    accent: 'from-emerald-500/20 via-teal-500/10 to-cyan-400/15',
    visual: 'agri',
  },
  {
    id: 4,
    title: 'Anonymous Chat Application',
    category: 'SOFTWARE',
    tag: 'UNDER DEVELOPMENT',
    status: 'UNDER DEVELOPMENT',
    description:
      'A real-time anonymous chat application currently under development, focused on creating a simple, modern, and privacy-focused communication experience.',
    problem:
      'Users often need a quick and private communication channel without exposing personal identity details.',
    solution:
      'The project is currently being developed to create a privacy-focused, responsive real-time interface with a simple and modern user experience.',
    techStack: ['React', 'JavaScript', 'Node.js', 'Real-Time Communication'],
    features: [],
    github: '',
    liveDemo: '',
    accent: 'from-amber-500/20 via-orange-500/10 to-rose-500/15',
    visual: 'chat',
  },
]

export const experienceItems = [
  {
    type: 'INTERNSHIP',
    title: 'Embedded Systems & Software Development Practice',
    detail:
      'Worked with practical electronics and software workflows, focusing on embedded concepts, prototyping, and technology-driven problem solving.',
  },
  {
    type: 'PROJECT EXPERIENCE',
    title: 'Independent Technical Projects',
    detail:
      'Built projects spanning AI/ML, embedded design, electronics, and web development to strengthen real-world engineering and software skills.',
  },
  {
    type: 'ACADEMIC EXPERIENCE',
    title: 'Electronics & Communication Engineering Student',
    detail:
      'Studied core areas including communication systems, signal processing, embedded systems, and applied engineering principles at SJCE, JSS Science and Technology University.',
  },
]

export const educationItems = [
  {
    year: '2012 – 2020',
    institution: 'GHPS CHAVADALLI',
    level: 'Primary School',
    detail:
      'The beginning of my educational journey. Built my basic academic foundation and completed my primary education.',
    icon: 'primary',
  },
  {
    year: '2020 – 2022',
    institution: 'GHS ANDALAGI',
    level: 'High School',
    detail:
      'A phase of academic growth and learning. Completed my high school education and strengthened my academic fundamentals.',
    icon: 'high',
  },
  {
    year: '2022 – 2025',
    institution: 'GPT MUNDGOD',
    level: 'Diploma',
    detail:
      'The beginning of my technical journey. Started learning engineering concepts and developing practical knowledge in electronics, programming, and technical subjects.',
    icon: 'diploma',
  },
  {
    year: '2025 – 2028',
    institution: 'SJCE / JSS Science and Technology University, Mysuru',
    degree: 'B.E. — Electronics & Communication Engineering',
    level: 'CURRENTLY PURSUING',
    detail:
      'Currently pursuing my B.E. in Electronics and Communication Engineering while exploring software development, AI/ML, embedded systems, electronics, and modern technologies.',
    status: 'CURRENTLY PURSUING',
    expected: '2028',
    icon: 'degree',
  },
]

export const resumeNote =
  'Resume PDF not included in this project yet. Add your actual resume file at /public/resume.pdf to enable the download link.'

export const contactMeta = {
  email: 'shivarajpm57@gmail.com',
  phone: '+91 8861958284',
}

export const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
