# St Michael LLC Federal Opportunities Dashboard

## Overview

This is a comprehensive web-based dashboard designed for St Michael LLC to analyze federal subcontracting opportunities in the government contracting (GovCon) market. Developed and owned by Aliff Capital 2025. The application provides insights into market trends, contract vehicles, prime contractors, cost strategies, and strategic tools for navigating the federal procurement landscape. The dashboard features an integrated AI assistant to help users understand complex government contracting concepts and opportunities.

Updated with revised startup costs showing $11,000 monthly operating cost (previously $7,000) with enhanced administrative capabilities including 3 senior consultants and comprehensive administrative support team.

## Partnership Structure

The business operates through a three-partner structure:
- **St Michael LLC**: Main contractor responsible for proposal submission and contract performance
- **Republic Capital Access**: Provides capital for contract performance as loans, receiving percentage of profits for each capital injection
- **Aliff Capital**: Responsible for all business processes and operational expenses (bears the $11,000 monthly costs)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built as a Single Page Application (SPA) using vanilla JavaScript with a modern, responsive design approach:

- **UI Framework**: Pure HTML5 with Tailwind CSS for styling and responsive design
- **JavaScript Architecture**: Modular vanilla JavaScript with separate files for different concerns (app.js for main controller, charts.js for data visualization, chat.js for AI integration)
- **Design System**: Glassmorphism sidebar with St Michael LLC branding and smooth animations
- **Brand Identity**: Official St Michael LLC logo integration with brand colors (Navy Blue #0a3161, Crimson Red #b31942)
- **Data Visualization**: Chart.js library for interactive charts and market analytics
- **Icons**: Feather Icons for consistent iconography
- **Mobile-First Design**: Responsive layout with collapsible sidebar for mobile devices

### Backend Architecture
The system supports dual backend implementations for flexibility:

**Node.js/Express Backend (Primary)**:
- RESTful API using Express framework
- Static file serving for the SPA
- Health check endpoint for monitoring
- CORS enabled for cross-origin requests

**PHP Backend (Alternative)**:
- Standalone PHP script for environments without Node.js
- Same API functionality as Node.js version
- Configuration file for environment variables

### Data Management
- **Static Data Model**: All dashboard data (contract vehicles, prime contractors, market data) is hardcoded in JavaScript files for simplicity and fast loading
- **No Database Required**: Eliminates infrastructure complexity while maintaining full functionality
- **Structured Data Objects**: Well-organized JavaScript objects for market data, contract vehicles, prime contractors, and strategic toolkit information

### Navigation and State Management
- **Section-Based Navigation**: Single-page routing with hash-based navigation
- **Dynamic Content Loading**: JavaScript-driven content switching without page refreshes
- **Mobile-Responsive Menu**: Touch-friendly navigation for mobile devices
- **Search and Filter Capabilities**: Client-side filtering for contract vehicles and prime contractors

## External Dependencies

### Third-Party Services
- **OpenAI API**: Integrated for the AI chat assistant functionality, requiring an API key for operation
- **CDN Libraries**: 
  - Tailwind CSS for styling framework
  - Chart.js for data visualization
  - Feather Icons for iconography

### Development Dependencies
- **Node.js Runtime**: Required for the Express server implementation
- **npm Packages**:
  - express: Web server framework
  - cors: Cross-origin resource sharing middleware
  - openai: Official OpenAI API client library

### Infrastructure Requirements
- **Environment Variables**: OPENAI_API_KEY required for AI chat functionality
- **Static File Hosting**: Any web server capable of serving static files
- **No Database**: Application runs entirely on static data, eliminating database requirements
- **Cross-Platform Compatibility**: Supports both Node.js and PHP hosting environments