import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  PieChart,
  Sliders,
  MapPin,
  Users,
  Share,
  ArrowDownRight,
  Activity,
} from 'react-feather';

const pagesSection = [
  {
    href: '/dashboard',
    icon: Sliders,
    title: 'Dashboards',
    badge: 'Customize',
    children: [
      {
        href: '/dashboard/default',
        title: 'Default',
      },
      {
        href: '/dashboard/analytics',
        title: 'Preset NFL',
      },
      {
        href: '/dashboard/saas',
        title: 'Preset MLB',
      },
      {
        href: '/dashboard/social',
        title: 'Live Games',
      },
      {
        href: '/dashboard/crypto',
        title: 'My Teams',
      },
    ],
  },
  {
    href: '/pages',
    icon: Layout,
    title: 'Pages',
    children: [
      {
        href: '/pages/profile',
        title: 'My Profile',
      },
      {
        href: '/pages/settings',
        title: 'Settings',
      },
      {
        href: '/pages/clients',
        title: 'Analytics',
      },
      {
        href: '/pages/projects',
        title: 'Fantasy Draft',
      },
      {
        href: '/pages/invoice',
        title: 'Predictions',
      },
      {
        href: '/pages/pricing',
        title: 'Player Comparison',
      },
      {
        href: '/pages/tasks',
        title: 'About Us',
      },
      {
        href: '/pages/chat',
        title: 'Support',
        badge: 'New',
      },
      {
        href: '/pages/blank',
        title: 'Blank Page',
      },
    ],
  },
  {
    href: '/auth',
    icon: Users,
    title: 'Auth (not needed once a user is logged in)',
    children: [
      {
        href: '/auth/sign-in',
        title: 'Sign In',
      },
      {
        href: '/auth/sign-up',
        title: 'Sign Up',
      },
      {
        href: '/auth/reset-password',
        title: 'Reset Password',
      },
      {
        href: '/auth/404',
        title: '404 Page',
      },
      {
        href: '/auth/500',
        title: '500 Page',
      },
    ],
  },
  {
    href: '/docs/introduction',
    icon: BookOpen,
    title: 'Documentation (not needed once a user is logged in)',
  },
];

const componentsSection = [
  {
    href: '/ui',
    icon: Grid,
    title: 'Most Used Components',
    children: [
      {
        href: '/ui/alerts',
        title: 'Alerts',
      },
      {
        href: '/ui/buttons',
        title: 'Buttons',
      },
      {
        href: '/ui/cards',
        title: 'Cards',
      },
      {
        href: '/ui/carousel',
        title: 'Carousel',
      },
      {
        href: '/ui/embed-video',
        title: 'Embed Video',
      },
      {
        href: '/ui/general',
        title: 'General',
      },
      {
        href: '/ui/grid',
        title: 'Grid',
      },
      {
        href: '/ui/modals',
        title: 'Modals',
      },
      {
        href: '/ui/offcanvas',
        title: 'Offcanvas',
      },
      {
        href: '/ui/tabs',
        title: 'Tabs',
      },
      {
        href: '/ui/typography',
        title: 'Typography',
      },
    ],
  },
  {
    href: '/icons',
    icon: Heart,
    title: 'Favorite Components',
    children: [
      {
        href: '/icons/feather',
        title: 'Feather',
      },
      {
        href: '/icons/font-awesome',
        title: 'Font Awesome',
      },
    ],
  },
  {
    href: '/forms',
    icon: CheckSquare,
    title: 'Forms (not needed once logged in)',
    children: [
      {
        href: '/forms/layouts',
        title: 'Layouts',
      },
      {
        href: '/forms/basic-inputs',
        title: 'Basic Inputs',
      },
      {
        href: '/forms/input-groups',
        title: 'Input Groups',
      },
      {
        href: '/forms/floating-labels',
        title: 'Floating Labels',
      },
    ],
  },
  {
    href: '/tables',
    icon: List,
    title: 'Tables (not needed once logged in)',
  },
];

const pluginsSection = [
  {
    href: '/form-plugins',
    icon: CheckSquare,
    title: 'Form Plugins',
    children: [
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Advanced Inputs',
      },
      {
        href: '/form-plugins/formik',
        title: 'Formik',
        badge: 'New',
      },
      {
        href: '/form-plugins/editors',
        title: 'Editors',
      },
    ],
  },
  {
    href: '/advanced-tables',
    icon: List,
    title: 'Advanced Tables',
    children: [
      {
        href: '/advanced-tables/pagination',
        title: 'Pagination',
      },
      {
        href: '/advanced-tables/column-sorting',
        title: 'Column Sorting',
      },
      {
        href: '/advanced-tables/column-filtering',
        title: 'Column Filtering',
      },
      {
        href: '/advanced-tables/row-expanding',
        title: 'Row Expanding',
      },
      {
        href: '/advanced-tables/row-selection',
        title: 'Row Selection',
      },
    ],
  },
  {
    href: '/charts',
    icon: PieChart,
    title: 'Charts',
    badge: 'New',
    children: [
      {
        href: '/charts/chartjs',
        title: 'Chart.js',
      },
      {
        href: '/charts/apexcharts',
        title: 'ApexCharts',
        badge: 'New',
      },
    ],
  },
  {
    href: '/notifications',
    icon: Bell,
    title: 'Notifications',
  },
  {
    href: '/maps',
    icon: MapPin,
    title: 'Maps',
    children: [
      {
        href: '/maps/google-maps',
        title: 'Google Maps',
      },
      {
        href: '/maps/vector-maps',
        title: 'Vector Maps',
      },
    ],
  },
  {
    href: '/calendar',
    icon: Calendar,
    title: 'Calendar',
  },
  {
    href: '/404',
    icon: Share,
    title: 'Multi Level',
    children: [
      {
        href: '/404',
        title: 'Two Levels',
        children: [
          {
            href: '/404',
            title: 'Item 1',
          },
          {
            href: '/404',
            title: 'Item 2',
          },
        ],
      },
      {
        href: '/404',
        title: 'Three Levels',
        children: [
          {
            href: '/404',
            title: 'Item 1',
            children: [
              {
                href: '/404',
                title: 'Item 1',
              },
              {
                href: '/404',
                title: 'Item 2',
              },
            ],
          },
          {
            href: '/404',
            title: 'Item 2',
          },
        ],
      },
    ],
  },
];
const nflselection = [
  {
    href: '/advanced-tables',
    title: 'Scores',
    icon: Activity,
  },
  {
    href: '/advanced-tables',
    title: 'Standings',
    icon: Share,
  },
  {
    href: '/advanced-tables',
    icon: Calendar,
    title: 'Schedule',
    children: [
      {
        href: '/advanced-tables/pagination',
        title: 'Current Week',
        children: [
          {
            href: '/advanced-tables/pagination',
            title: 'Score Ticker',
          },
        ],
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Bye Weeks',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Team Schedule',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Venue Schedule',
      },
    ],
  },
  {
    href: '/form-plugins',
    icon: ArrowDownRight,
    title: 'NFL Stats',
    children: [
      {
        href: '/form-plugins/advanced-inputs',
        icon: ArrowDownRight,
        title: 'Team',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            icon: ArrowDownRight,
            title: 'Offense',
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Passing',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'QB Passer Rating - Success Rate, Yards per Attempt, Completion Rate',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB Passer Rating by Target Depth & Location',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'Team & QB Completion Percentage by Target Depth',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'QB Passer Rating & Success Rate by Home vs Away Splits',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'QB: Air Yardage, Yards After Catch & Average Yards to Sticks',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Charts',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Heatmaps',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Clusters',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Trends',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Splits',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Efficiency',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Explosiveness',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'QB: Passing Play Frequency',
                  },
                ],
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Rushing',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'Directional Rushing: Yards Per Carry & Success by Team & RB',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'Rushing Efficiency: Success Rate Over Average by Direction',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'RB Situational Rushing Yards Per Carry & Success Rates',
                  },
                ],
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Receiving',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'WR Receiving Efficiency: Success Rate Over Average by Direction',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'Receiving: Targets, Passer Rating & Directional Share',
                  },
                ],
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Efficiency',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'Situational Success Rate, Run & Pass, Ranked by Team',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'NFL Team Ranks: Offensive Efficiency',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL Offensive Team Ranks: Passing, Rushing & Explosive Plays',
                  },
                ],
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Explosive Plays',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'NFL Team Ranks: Explosive Plays on Offense',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'NFL Explosive Plays on Offense by Player',
                  },
                ],
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Play Frequency',
                children: [
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL Offensive Run & Pass Rate, Frequency by Team and Situation',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL Offensive Target Rate & Frequency by Position & Success Rate',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL Offensive Snap Rates: Shotgun vs Under Center by Run or Pass',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL Run & Pass by Frequency & Successful Plays Called by Situation',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title: 'NFL Run & Pass Offensive Pace of Play',
                  },
                  {
                    href: '/form-plugins/advanced-inputs',
                    title:
                      'NFL No Huddle Analysis: Yards Per Play & Success Rate',
                  },
                ],
              },
            ],
          },
          {
            href: '/form-plugins/formik',
            title: 'Defense',
            icon: ArrowDownRight,
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Defensive Pass Efficiency Allowed',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Directional Receiving Efficiency Allowed',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Directional Rushing Production Allowed',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Target Rate & Frequency by Position & Success Rate',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Run & Pass Rate, Frequency by Team and Situation',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Run & Pass Situational Success Rate, Ranked by Team',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Team Ranks: Passing, Rushing & Explosive Plays',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'No Huddle Analysis: Yards Per Play & Success Rate',
              },
            ],
          },
          {
            href: '/form-plugins/editors',
            icon: ArrowDownRight,
            title: 'Special Teams',
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: '2024 Returns',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Kicking',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Punting',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Returns',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Coverage',
              },
            ],
          },
          {
            href: '/form-plugins/editors',
            title: 'Personnel Groupings',
            icon: ArrowDownRight,
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Offense',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Defense',
              },
            ],
          },
          {
            href: '/form-plugins/editors',
            title: 'Weekly Analysis',
            icon: ArrowDownRight,
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Boxscores - Team Efficiency and Performance',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title: 'Offense and Defense Performance',
              },
            ],
          },
          {
            href: '/form-plugins/editors',
            title: 'Seasonal Analysis',
            icon: ArrowDownRight,
            children: [
              {
                href: '/form-plugins/advanced-inputs',
                title: 'QB Game Logs',
              },
              {
                href: '/form-plugins/advanced-inputs',
                title:
                  'Offensive Success Rate by Average Yards to Go & Field Position',
              },
            ],
          },
          {
            href: '/form-plugins/editors',
            title: 'Strength of Schedule',
          },
        ],
      },
      {
        href: '/form-plugins/advanced-inputs',
        icon: ArrowDownRight,
        title: 'Game',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Boxscore',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Play by Play',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Drive Summaries',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Logs',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Stats',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Trends',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Splits',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Efficiency',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Explosiveness',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Play Frequency',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game Snap Rates',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Game No Huddle Analysis',
          },
        ],
      },
      {
        href: '/form-plugins/formik',
        icon: ArrowDownRight,
        title: 'Player',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Stats',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Trends',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Splits',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Efficiency',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Explosiveness',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Play Frequency',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player Snap Rates',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Player No Huddle Analysis',
          },
        ],
      },
      {
        href: '/form-plugins/editors',
        icon: ArrowDownRight,
        title: 'Coach',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Coach Stats',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Coach Trends',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Coach Play Tendencies',
          },
        ],
      },
    ],
  },
  {
    href: '/form-plugins',
    icon: ArrowDownRight,
    title: 'NFL Draft',
    children: [
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Draft Prospects',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Draft Tracker',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Draft History',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Draft Grades',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Draft Tools',
      },
    ],
  },
  {
    href: '/form-plugins/editors',
    title: 'Contracts & Cap Space',
    icon: ArrowDownRight,
    children: [
      {
        href: '/form-plugins/advanced-inputs',
        title: 'NFL Teams',
        icon: ArrowDownRight,
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Active Contracts',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Salaries by Year',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Positional Spending',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: '2024 Salary Cap Table',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: '2024 Free Agents',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Transactions',
          },
        ],
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Cap Tracker',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Positional Spending',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Contracts',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Active Contracts',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Cumulative Cash',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Remaining Cash',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Dead Cap',
          },
        ],
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Top Salaries',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Leaderboard',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Cap Hits',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Total Cash',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Average Salaries',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Contracts',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Guaranteed Money',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Career Earnings',
          },
        ],
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Free Agents',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Extensions',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Tools',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'IR Tracker',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Fines & Suspensions',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Cap Management',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Draft Tracker',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Depth Chart Tools',
          },
        ],
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Best Values',
      },
      {
        href: '/form-plugins/advanced-inputs',
        title: 'Transactions',
        children: [
          {
            href: '/form-plugins/advanced-inputs',
            title: 'NFL Transactions',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Trade Tracker',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Expanded Transactions',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Recent Extensions',
          },
          {
            href: '/form-plugins/advanced-inputs',
            title: 'Restructures',
          },
        ],
      },
    ],
  },
  {
    href: '/advanced-tables',
    icon: ArrowDownRight,
    title: 'Betting',
    badge: 'New',
    children: [
      {
        href: '/advanced-tables/pagination',
        title: 'Games & Lines',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Props',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Parlays',
      },
    ],
  },
  {
    href: '/advanced-tables',
    icon: ArrowDownRight,
    title: 'Fantasy',
    children: [
      {
        href: '/advanced-tables/pagination',
        title: 'Leaders',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'My Teams',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Injuries',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Start Sit',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Trade Analyzer',
      },
    ],
  },
  {
    href: '/advanced-tables',
    icon: ArrowDownRight,
    title: 'News',
    children: [
      {
        href: '/advanced-tables/pagination',
        title: 'Injuries',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Social',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Articles',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Podcasts',
      },
      {
        href: '/advanced-tables/pagination',
        title: 'Videos',
      },
    ],
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
  {
    title: 'Tools & Components',
    pages: componentsSection,
  },
  {
    title: 'Plugins & Addons (not needed once a user is logged in)',
    pages: pluginsSection,
  },
  {
    title: 'NFL: Tools & Components',
    pages: nflselection,
  },
];

export default navItems;
