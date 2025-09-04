import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse } from '@mui/material';
import ClickDetails from './ClickDetails';

const URLCard = ({ urlData }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">
          <a href={urlData.shortUrl} target="_blank" rel="noopener noreferrer">
            {urlData.shortUrl}
          </a>
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Original: {urlData.originalUrl}
        </Typography>
        <Typography variant="body2">Created: {new Date(urlData.createdAt).toLocaleString()}</Typography>
        <Typography variant="body2">Expires: {new Date(urlData.expiresAt).toLocaleString()}</Typography>
        <Typography variant="body2">Clicks: {urlData.clicks}</Typography>
        <Button size="small" onClick={handleToggle} sx={{ mt: 1 }}>
          {open ? 'Hide Details' : 'Show Details'}
        </Button>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ClickDetails clickLogs={urlData.clickLogs} />
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default URLCard;
