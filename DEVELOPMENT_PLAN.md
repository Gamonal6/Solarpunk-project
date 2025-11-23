# Solarpunk Recycling App - Development Plan

## Project Overview
A mobile app that allows users to submit videos of recycling actions, uses AI/ML to verify recyclable items and correct bin usage, and rewards users with dining points linked to student meal plans.

## Tech Stack
- **Frontend**: React Native (Expo)
- **Backend**: Python Flask
- **Database**: PostgreSQL
- **AI/ML**: TensorFlow/PyTorch for video analysis
- **Cloud Storage**: AWS S3 for video storage
- **Authentication**: JWT tokens

## Architecture
```
Frontend (React Native) ←→ Backend (Flask) ←→ Database (PostgreSQL)
                                      ↓
                              AI/ML Service ←→ Cloud Storage (S3)
```

## Core Features

### 1. User Authentication
- Login/Signup screens with brand-compliant design
- School selection for signup
- JWT-based authentication
- Social login options (Apple, Google, Facebook, X)

### 2. Video Submission
- Camera integration for video recording
- Video upload to cloud storage
- Progress indicators during upload

### 3. AI/ML Verification
- Object detection to identify recyclable items
- Bin detection to verify correct recycling bin
- Confidence scoring for verification

### 4. Points System
- Dining points calculation based on successful recycling
- Points balance display
- Integration with student meal plans

### 5. User Dashboard
- Recycling history
- Points balance
- Achievement system
- Leaderboards

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password_hash
- first_name
- last_name
- school_id (Foreign Key)
- points_balance
- created_at
- updated_at

### Schools Table
- id (Primary Key)
- name
- meal_plan_integration_config
- created_at

### Recycling Submissions Table
- id (Primary Key)
- user_id (Foreign Key)
- video_url
- verification_status (pending/approved/rejected)
- ai_confidence_score
- detected_objects
- bin_type_verified
- points_awarded
- submitted_at
- processed_at

## Development Phases

### Phase 1: Foundation (Week 1-2)
- [x] Project setup and structure
- [x] Brand theme implementation
- [x] Login/Signup screens
- [x] Basic authentication backend
- [x] Database schema setup

### Phase 2: Core Features (Week 3-4)
- [ ] Video recording and upload
- [ ] Basic AI/ML integration
- [ ] Points system backend
- [ ] User dashboard

### Phase 3: AI/ML Enhancement (Week 5-6)
- [ ] Advanced object detection
- [ ] Bin type verification
- [ ] Confidence scoring system
- [ ] Model training and optimization

### Phase 4: Polish & Testing (Week 7-8)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Testing and bug fixes
- [ ] Deployment preparation

## Brand Guidelines Implementation

### Color Palette
- Primary background: White (#FFFFFF)
- Primary ink: Soft Black (#303434)
- Secondary ink: Gray (#7E96A0)
- Borders/dividers: Silver (#CAD2D8)
- Accent outline: USF Gold (#CFC493)
- Brand emphasis: USF Green (#006747)
- Positive accents: Teal (#009374)
- Optional surfaces: Sand (#EDEBD1)

### Typography
- Title: 28dp, mixed weights (800/400)
- Field labels: 11dp, uppercase, Gray
- Input text: 16dp, Soft Black
- Placeholder: 16dp, Gray 70% opacity
- Helper text: 12dp
- Links: 14dp, USF Green

### Spacing & Layout
- Screen padding: 20dp
- Title spacing: 24dp
- Field spacing: 6dp label-to-field, 16dp field-to-label
- Block gaps: 20-24dp

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Schools
- GET /api/schools

### Submissions
- POST /api/submissions
- GET /api/submissions/user/:id
- GET /api/submissions/:id

### Points
- GET /api/points/balance/:userId
- POST /api/points/award

## Security Considerations
- JWT token expiration
- Video file validation
- Rate limiting on submissions
- Secure file upload handling
- Data encryption for sensitive information

## Deployment Strategy
- Frontend: Expo/EAS Build for app stores
- Backend: Docker containers on AWS/GCP
- Database: Managed PostgreSQL service
- AI/ML: GPU-enabled cloud instances
- CDN: For video content delivery
