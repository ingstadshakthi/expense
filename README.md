# Expensa - Expense Management Application

A modern, full-stack expense tracking application built with Next.js, TypeScript, MongoDB, and NextAuth. Xpensa provides users with a comprehensive solution for managing their expenses with an intuitive interface and robust features.

**Live Application:** [https://expensa.in](https://expensa.in)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Authentication Setup](#authentication-setup)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [User Workflows](#user-workflows)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)

## Features

### Core Features
- **Expense Management**: Create, read, update, and delete expenses with detailed information
- **Monthly Dashboard**: View expenses organized by month and year
- **Expense Filtering**: Filter expenses by type and payment method
- **Pagination**: Navigate through large expense datasets efficiently
- **Expense Types Management**: Create and manage custom expense categories with color coding
- **Payment Methods Management**: Define and manage custom payment types
- **User Profiles**: Manage user account settings and expense/payment configurations

### UI/UX Features
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark Mode Support**: Theme toggle between light and dark modes
- **Premium Design**: Luxury aesthetic with sharp edges and premium color schemes
- **Keyboard Accessibility**: Full keyboard navigation support for accessibility compliance
- **Progressive Web App (PWA)**: Installable app with offline capabilities
- **Real-time Feedback**: Toast notifications for all user actions

### Technical Features
- **Server-Side Authentication**: Secure authentication using NextAuth.js
- **Type Safety**: Full TypeScript support for robust development
- **Server Components**: Leverages Next.js App Router and Server Components for performance
- **Database Optimization**: MongoDB with proper indexing and query optimization
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Middleware Protection**: Protected routes with authentication middleware

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library built with Radix UI primitives
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner (Toast notifications)
- **Form Handling**: React Hook Form patterns

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js with OAuth2
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Next.js built-in caching and revalidation

### DevOps & Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Build Tool**: Next.js (built-in)
- **PWA**: Workbox for service worker management

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth.js configuration
│   │   └── user/            # User-related endpoints
│   ├── dashboard/           # Dashboard page
│   ├── expenses/            # Expense pages (year/month routes)
│   ├── login/               # Authentication page
│   ├── profile/             # User profile pages
│   │   ├── expense/         # Expense management
│   │   ├── payment/         # Payment management
│   │   └── actions.ts       # Server actions
│   └── layout.tsx           # Root layout
├── components/               # React components
│   ├── layout/              # Layout components (header, nav)
│   ├── page/                # Page-specific components
│   ├── providers/           # Context providers
│   ├── semantics/           # Semantic HTML components
│   ├── ui/                  # UI component library
│   └── utils/               # Utility components
├── controllers/              # Business logic layer
│   ├── expense/             # Expense operations
│   ├── profile/             # Profile operations
│   └── user.ts              # User utilities
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and helpers
│   ├── auth.ts              # Authentication utilities
│   ├── db.ts                # Database initialization
│   ├── expense.ts           # Expense helpers
│   ├── logger.ts            # Logging utilities
│   └── utils.ts             # General utilities
├── models/                   # MongoDB schemas
│   ├── Expense.ts
│   ├── ExpenseType.ts
│   ├── PaymentMethod.ts
│   └── User.ts
└── types/                    # TypeScript type definitions

public/                        # Static assets
└── icons/                    # Light/dark mode icons
```

## Installation & Setup

### Prerequisites
- Node.js 18+ or higher
- npm or yarn package manager
- MongoDB instance (local or Atlas)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/xpensa.git
cd xpensa
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xpensa?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# OAuth Provider (Example: Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application
NODE_ENV=development
```

### Generate NextAuth Secret
```bash
openssl rand -base64 32
```

## Database Setup

### MongoDB Connection
1. Create a MongoDB Atlas account at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a new cluster
3. Get your connection string
4. Add to `.env.local` as `MONGODB_URI`

### Database Initialization
The application automatically initializes the database on first run. Collections created:
- `users` - User accounts and profiles
- `expenses` - User expense records
- `expensetypes` - Custom expense categories
- `paymentmethods` - Payment type definitions

### Indexes
The following indexes are automatically created for optimization:
- Expenses: userId, date compound index
- ExpenseTypes: userId index
- PaymentMethods: userId index

## Authentication Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://expensa.in/api/auth/callback/google` (production)
6. Copy Client ID and Secret to `.env.local`

### Other OAuth Providers
The application supports GitHub, Discord, and other providers via NextAuth.js. Configure in `src/lib/auth.ts`.

## Running the Application

### Development Mode
```bash
npm run dev
```
Application runs on [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## API Routes

### Authentication
- **POST** `/api/auth/signin` - Sign in with credentials
- **GET** `/api/auth/signout` - Sign out user
- **GET** `/api/auth/callback/:provider` - OAuth callback

### User
- **GET** `/api/user` - Get current user profile
- **POST** `/api/user` - Update user profile

### Expenses
- **GET** `/api/expenses` - List user expenses (with pagination)
- **POST** `/api/expenses` - Create new expense
- **PUT** `/api/expenses/:id` - Update expense
- **DELETE** `/api/expenses/:id` - Delete expense

### Expense Types
- **GET** `/api/expense-types` - List expense types
- **POST** `/api/expense-types` - Create expense type
- **PUT** `/api/expense-types/:id` - Update expense type
- **DELETE** `/api/expense-types/:id` - Delete expense type

### Payment Types
- **GET** `/api/payment-types` - List payment methods
- **POST** `/api/payment-types` - Create payment method
- **PUT** `/api/payment-types/:id` - Update payment method
- **DELETE** `/api/payment-types/:id` - Delete payment method

## User Workflows

### 1. Authentication Flow
```
Landing Page → Sign In (OAuth) → Dashboard
```

### 2. Creating an Expense
```
Dashboard/Expenses Page 
  → Click "Add Expense" 
  → Fill Form (Name, Amount, Type, Payment Method, Date)
  → Submit 
  → Expense Added to Monthly View
```

### 3. Managing Expense Types
```
Profile → Expense Management
  → Create/Edit/Delete Custom Expense Types
  → Assign Colors to Categories
  → Types Appear in Expense Form
```

### 4. Viewing Expenses
```
Dashboard → Navigate Month/Year
  → Filter by Expense Type
  → Filter by Payment Method
  → View Paginated Results
```

### 5. Editing an Expense
```
Expenses Table → Click Edit Icon
  → ExpenseFormDialog Opens with Pre-filled Data
  → Update Fields
  → Submit
  → Expense Updated
```

### 6. Deleting an Expense
```
Expenses Table → Click Delete Icon
  → Confirmation Dialog Appears
  → Confirm Deletion
  → Expense Removed
```

## Development Guidelines

### Code Structure
- **Controllers**: Handle business logic and database operations
- **Services**: Provide data transformation and filtering
- **Components**: Focus on UI rendering, minimal logic
- **Hooks**: Custom React hooks for state management
- **Utils**: Pure functions for common operations

### Best Practices
1. **Use Server Components**: Default to server components unless state is needed
2. **Type Safety**: Always define TypeScript types for props and responses
3. **Error Handling**: Use try-catch blocks and proper error logging
4. **Accessibility**: Include ARIA labels, keyboard navigation, focus states
5. **Performance**: Implement pagination, lazy loading, and code splitting
6. **Security**: Validate server-side, protect sensitive operations with auth checks

### Creating New Features

#### Adding a New Expense Field
1. Update MongoDB schema in `src/models/Expense.ts`
2. Update `ExpenseData` type in `src/types/expense.ts`
3. Update `ExpenseDTO` interface in `src/controllers/expense/service.ts`
4. Update expense form in `src/components/utils/expense-form.tsx`
5. Update table display in `src/app/expenses/[year]/[month]/expenseContent.tsx`

#### Adding a New API Route
1. Create file in `src/app/api/[resource]/route.ts`
2. Implement GET, POST, PUT, DELETE methods as needed
3. Add authentication check at the beginning
4. Return proper HTTP status codes
5. Handle errors gracefully

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Trigger redeploy

### Production Checklist
- [ ] Set `NEXTAUTH_SECRET` to a strong random value
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Configure OAuth redirect URIs for production domain
- [ ] Enable HTTPS
- [ ] Set up MongoDB backups
- [ ] Configure custom domain
- [ ] Enable analytics and monitoring
- [ ] Set up error logging (Sentry, etc.)

### Build Optimization
- Images are optimized with Next.js Image component
- Code splitting is automatic with App Router
- CSS is optimized with Tailwind PurgeCSS
- Fonts are self-hosted to avoid external requests

## Performance Optimizations

- **Image Optimization**: Uses Next.js Image component
- **Code Splitting**: Automatic with App Router
- **Server-Side Rendering**: Default for better performance
- **Caching**: Leverages Next.js built-in caching
- **PWA**: Workbox service worker for offline support
- **Database**: Proper indexing and query optimization

## Security Features

- **CSRF Protection**: Automatic with Next.js
- **XSS Prevention**: React's built-in escaping
- **SQL Injection**: MongoDB prevents via schema validation
- **Authentication**: NextAuth.js with secure sessions
- **Authorization**: Server-side route protection
- **Environment Variables**: Secrets not exposed to client

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env.local`
- Check IP allowlist in MongoDB Atlas
- Ensure network connectivity

### NextAuth Issues
- Verify `NEXTAUTH_SECRET` is set
- Check OAuth credentials are correct
- Ensure redirect URIs match exactly

### Build Errors
```bash
npm run build
# Check error output
npm run lint
# Fix linting issues
```

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Authentication with [NextAuth.js](https://next-auth.js.org)
- Database powered by [MongoDB](https://www.mongodb.com)

---

**Application URL**: [https://expensa.in](https://expensa.in)

