# Frontend Setup Guide

## Folder Structure

```
frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── TokenComponent.js   # Token operations UI
│   │   ├── TokenComponent.css
│   │   ├── CounterComponent.js # Counter operations UI
│   │   └── CounterComponent.css
│   ├── services/
│   │   └── apiService.js       # API calls
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies
└── .env.example                # Environment template
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Frontend

### Development Server

```bash
npm start
```

Application opens at: `http://localhost:3000`

### Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Test

```bash
npm test
```

## Features

### Dashboard Layout

1. **Header**
   - Application title and description
   - API status indicator
   - Real-time health check

2. **Tab Navigation**
   - Switch between Token and Counter operations
   - Easy toggling between different features

3. **Token Component**
   - Get balance
   - View total supply
   - Transfer tokens
   - Mint tokens (owner)
   - Burn tokens

4. **Counter Component**
   - Display current counter value
   - Increment by 1
   - Decrement by 1
   - Set specific value
   - Increment by custom amount
   - Decrement by custom amount
   - Auto-refresh every 5 seconds

5. **Footer**
   - Project information
   - Network details

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Counter auto-refreshes
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during transactions
- **Status Indicators**: API connectivity status
- **Smooth Animations**: Fade and slide effects

## API Service

### Token Service (`apiService.js`)

```javascript
import { tokenService } from '../services/apiService';

// Get balance
const result = await tokenService.getBalance(address);

// Get total supply
const result = await tokenService.getTotalSupply();

// Transfer tokens
const result = await tokenService.transfer(toAddress, amount);

// Mint tokens
const result = await tokenService.mint(toAddress, amount);

// Burn tokens
const result = await tokenService.burn(amount);
```

### Counter Service (`apiService.js`)

```javascript
import { counterService } from '../services/apiService';

// Get value
const result = await counterService.getValue();

// Increment
const result = await counterService.increment();

// Decrement
const result = await counterService.decrement();

// Set value
const result = await counterService.setValue(newValue);

// Increment by amount
const result = await counterService.incrementBy(amount);

// Decrement by amount
const result = await counterService.decrementBy(amount);
```

## Component Structure

### App.js
- Main component
- Tab management
- API health check
- Routing between Token and Counter

### TokenComponent.js
- Token operations
- Balance queries
- Transfer/Mint/Burn functions
- User input validation

### CounterComponent.js
- Counter operations
- Auto-refresh logic
- Value updates
- Event emissions display

## Styling

### Color Scheme
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#4CAF50` (Green)
- Error: `#F44336` (Red)
- Background: Gradient (Purple to Dark Purple)

### Responsive Breakpoints
- Desktop: > 768px
- Mobile: < 768px

### CSS Features
- Flexbox layout
- CSS Grid for operations
- Smooth animations
- Gradient backgrounds
- Box shadows for depth
- Hover effects

## Configuration

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update to your backend URL.

## Building for Production

### 1. Build Optimization

```bash
npm run build
```

This creates:
- Minified JavaScript
- Optimized CSS
- Static assets in `build/` folder

### 2. Deployment

Deploy the `build/` folder to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting provider

### 3. Environment for Production

Update `.env` for production:

```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

## Performance Optimization

- React 18 with automatic batching
- Efficient state management
- Minimal re-renders
- Optimized API calls
- CSS animations with GPU acceleration

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### "Cannot reach backend"
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in `.env`

### "API_URL not defined"
- Create `.env` file
- Set `REACT_APP_API_URL` variable
- Restart development server

### "Blank page after build"
- Check build output for errors
- Verify static file paths
- Check browser console for errors

### "Styles not applied"
- Clear browser cache
- Rebuild project
- Check CSS file paths
- Verify CSS loader configuration

## Development Workflow

1. **Start Backend**: `npm run dev` in `/backend`
2. **Start Frontend**: `npm start` in `/frontend`
3. **Open Browser**: http://localhost:3000
4. **Make Changes**: Code updates hot-reload
5. **Test**: Check functionality
6. **Deploy**: Build and deploy

## Debugging

### Browser Developer Tools
- Open DevTools (F12 or Ctrl+Shift+I)
- Check Console for errors
- Network tab for API calls
- Application tab for storage

### React DevTools
- Install React DevTools extension
- Inspect component hierarchy
- Check props and state

### Network Requests
- Monitor API calls in Network tab
- Check request/response payloads
- Verify response status codes

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` with sensitive data
- Don't expose API keys in frontend code
- Validate all user input
- Use HTTPS in production
- Implement rate limiting on backend
- Keep dependencies updated

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure `.env`
3. ✅ Start development server
4. ✅ Test token operations
5. ✅ Test counter operations
6. ✅ Test responsiveness
7. ➡️ Deploy to production

## Performance Tips

- Use React DevTools Profiler to identify slow components
- Implement code splitting for large components
- Lazy load images and components
- Optimize API calls with caching
- Use production build for deployment

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators

## Support

For issues:
- Check browser console for errors
- Verify backend is running
- Check network requests
- Review component state
- Test in different browsers
