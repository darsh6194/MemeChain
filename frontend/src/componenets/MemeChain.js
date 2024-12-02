import React, { useState } from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  LinearProgress
} from '@mui/material';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  Send as SendIcon,
  BookmarkBorder as BookmarkIcon,
  ChatBubbleOutline as CommentIcon,
  CardGiftcard as GiftIcon
} from '@mui/icons-material';
import { keyframes, styled } from '@mui/system';

function MemeChain() {
  const [account, setAccount] = useState('');
  const [memes, setMemes] = useState([]);
  const [ipfsHash, setIpfsHash] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [balance, setBalance] = useState('0.00');

  // Enhanced glitch animation
  const enhancedGlitchAnimation = keyframes`
    0%, 100% { transform: translate(0,0) skew(0deg); }
    2%, 64% { transform: translate(3px,-2px) skew(5deg); }
    4%, 60% { transform: translate(-3px,2px) skew(-5deg); }
    62% { transform: translate(0,0) skew(0deg); }
    color: #4CAF50;
  `;

  // Hover and pulse effect for buttons
  const pulseEffect = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  // Dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1E1E1E'
      },
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#BB86FC',
      }
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    }
  });

  // Styled components
  const AnimatedTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    position: 'relative',
    animation: `${enhancedGlitchAnimation} 5s infinite`,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textShadow: '2px 2px 4px rgba(76, 175, 80, 0.5)'
  }));

  const AnimatedButton = styled(Button)(({ theme }) => ({
    animation: `${pulseEffect} 1.5s infinite`,
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 0 15px ${theme.palette.primary.main}`
    }
  }));

  const connectWallet = () => {
    const mockAccount = '0x' + Math.random().toString(36).substring(2, 12);
    setAccount(mockAccount);
  };

  const createMeme = () => {
    if (!ipfsHash) {
      alert("Please enter an IPFS hash");
      return;
    }

    const newMeme = {
      id: memes.length + 1,
      creator: account,
      ipfsHash: ipfsHash,
      likes: 0,
      liked: false,
      comments: [],
      timestamp: new Date().toISOString()
    };
    setMemes([newMeme, ...memes]);
    setIpfsHash('');
  };

  const handleLike = (memeId) => {
    setMemes(memes.map(meme =>
      meme.id === memeId
        ? { 
            ...meme, 
            likes: meme.liked ? meme.likes - 1 : meme.likes + 1, 
            liked: !meme.liked 
          }
        : meme
    ));
  };

  // Predefined meme templates with liked state
  const predefinedMemes = [
    { id: 1, creator: '0x123', ipfsHash: 'QmX...1', likes: 42, liked: false },
    { id: 2, creator: '0x234', ipfsHash: 'QmY...2', likes: 15, liked: false },
    { id: 3, creator: '0x345', ipfsHash: 'QmZ...3', likes: 88, liked: false },
    { id: 4, creator: '0x456', ipfsHash: 'QmW...4', likes: 23, liked: false },
    { id: 5, creator: '0x567', ipfsHash: 'QmV...5', likes: 56, liked: false },
  ];

  const calculateProgress = () => {
    // Return a fixed demo value of 65%
    return 65;
    
    // Original calculation commented out for reference
    // const memesScore = memes.length * 10;
    // const likesScore = memes.reduce((total, meme) => total + meme.likes, 0) * 5;
    // return Math.min((memesScore + likesScore), 100);
  };

  // Add these keyframes to your existing styled components section
  const shine = keyframes`
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  `;

  const progressAnimation = keyframes`
    from { background-position: 1rem 0; }
    to { background-position: 0 0; }
  `;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        bgcolor: 'rgba(50, 50, 50, 0.1)', 
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(to right, rgba(100,100,100,0.1), rgba(200,200,200,0.1))'
      }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: 240, 
              boxSizing: 'border-box', 
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              borderRight: '1px solid rgba(255,255,255,0.12)'
            },
          }}
        >
          <List>
            {[
              { text: 'Home', icon: <HomeIcon sx={{ color: '#4CAF50' }} /> },
              { text: 'Discover', icon: <ExploreIcon sx={{ color: '#BB86FC' }} /> },
              { text: 'Profile', icon: <PersonIcon sx={{ color: '#FF9800' }} /> },
              { text: 'Favorites', icon: <FavoriteIcon sx={{ color: '#F44336' }} /> }
            ].map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Container
          maxWidth="xs"
          sx={{
            bgcolor: 'transparent',
            minHeight: '100vh',
            padding: 0,
            marginLeft: '240px',
            position: 'relative',
            paddingBottom: '20px'
          }}
        >
          {/* Top Account Section */}
          {account && (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 650,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              {/* Account Display */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'rgba(50,50,50,0.5)',
                  borderRadius: 2,
                  padding: 1
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'primary.main',
                    marginRight: 1
                  }}
                >
                  {account.slice(2, 3).toUpperCase()}
                </Avatar>
                <Typography sx={{ color: 'white' }}>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </Typography>
              </Box>

              {/* Balance and Progress Section */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {/* Balance Box */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(50,50,50,0.5)',
                    borderRadius: 2,
                    padding: 1.5,
                    minWidth: 180
                  }}
                >
                  <CurrencyExchangeIcon 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      marginRight: 1,
                      color: '#4CAF50'
                    }} 
                  />
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                    {balance} ETH
                  </Typography>
                </Box>

                {/* Progress Box - Separate and repositioned */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 80,
                    right: 100,
                    bgcolor: 'rgba(50,50,50,0.5)',
                    borderRadius: 2,
                    padding: 2,
                    minWidth: 250,
                    zIndex: 1
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#4CAF50',
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                      fontWeight: 'bold'
                    }}
                  >
                    <span>Progress</span>
                    <span>{calculateProgress()}%</span>
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress()} 
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4CAF50',
                          borderRadius: 5,
                          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                          backgroundSize: '1rem 1rem',
                          animation: 'progress-animation 1s linear infinite'
                        }
                      }}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        animation: 'shine 2s infinite',
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#4CAF50',
                      fontSize: '0.8rem',
                      marginTop: 1.5,
                      display: 'block',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      textShadow: '0 0 8px rgba(76, 175, 80, 0.5)'
                    }}
                  >
                    Level {Math.floor(calculateProgress() / 20) + 1}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Glitch Title */}
          <AnimatedTypography variant="h2">
            MemeChain
          </AnimatedTypography>

          {!account ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="calc(100vh - 200px)"
            >
              <AnimatedButton
                variant="contained"
                size="large"
                onClick={connectWallet}
              >
                Connect Wallet
              </AnimatedButton>
            </Box>
          ) : (
            <Box>
              {/* Meme Creation Section */}
              <Box sx={{
                padding: 2,
                bgcolor: 'rgba(30,30,30,0.7)',
                borderBottom: 1,
                borderColor: 'divider'
              }}>
                <Box display="flex" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Enter IPFS Hash of Meme"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        backgroundColor: 'rgba(50,50,50,0.5)',
                        color: 'white'
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={createMeme}
                    sx={{ 
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    Post Meme
                  </Button>
                </Box>
              </Box>

              {/* Meme Feed */}
              {predefinedMemes.concat(memes).map((meme) => (
                <Card
                  key={meme.id}
                  sx={{
                    marginBottom: 2,
                    borderRadius: 2,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    bgcolor: 'rgba(30,30,30,0.8)',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  {/* Post Header */}
                  <CardHeader
                    avatar={
                      <Avatar sx={{ 
                        bgcolor: 'primary.main',
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}>
                        {meme.creator.slice(2, 3).toUpperCase()}
                      </Avatar>
                    }
                    title={
                      <Typography variant="subtitle2" fontWeight="bold" color="primary.light">
                        {meme.creator.slice(0, 6)}...{meme.creator.slice(-4)}
                      </Typography>
                    }
                  />

                  {/* Meme Image */}
                  <CardContent sx={{
                    padding: 0,
                    '&:last-child': { paddingBottom: 0 }
                  }}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(50,50,50,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '1/1'
                      }}
                    >
                      <img
                        src={meme.ipfsHash.startsWith('Qm')
                          ? `https://gateway.pinata.cloud/ipfs/${meme.ipfsHash}`
                          : meme.ipfsHash
                        }
                        alt="Meme"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.target.src = '/api/placeholder/400/400';
                          e.target.alt = 'Placeholder Meme';
                        }}
                      />
                    </Box>
                  </CardContent>

                  {/* Post Actions */}
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" gap={2}>
                        <IconButton
                          color={meme.liked ? 'error' : 'default'}
                          onClick={() => handleLike(meme.id)}
                        >
                          {meme.liked ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
                          <Typography 
                            variant="caption" 
                            ml={1} 
                            color={meme.liked ? 'error' : 'text.secondary'}
                          >
                            {meme.likes}
                          </Typography>
                        </IconButton>
                        <IconButton color="default">
                          <CommentIcon />
                        </IconButton>
                        <IconButton color="default">
                          <SendIcon />
                        </IconButton>
                        <IconButton color="default">
                          <GiftIcon sx={{ color: '#4CAF50' }} />
                        </IconButton>
                      </Box>
                      <IconButton color="default">
                        <BookmarkIcon />
                      </IconButton>
                    </Box>

                    {/* Likes */}
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold" 
                      color="primary.light"
                    >
                      {meme.likes} likes
                    </Typography>

                    {/* Timestamp */}
                    <Typography variant="caption" color="text.secondary">
                      {new Date(meme.timestamp).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default MemeChain;