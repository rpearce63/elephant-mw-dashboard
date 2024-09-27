import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LinearProgressWithLabel(props) {
  return (
    <Box>
      {props.limiter}%
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
      <Box sx={{ width: '100%', mr: 1 }}>
        
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 5 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
      </Box>
  );
}