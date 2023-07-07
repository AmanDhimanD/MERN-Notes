// Create a new user
app.post('/users', (req, res) => {
    // Logic to create a new user
    res.send('User created');
  });
  
  // Read all users
  app.get('/users', (req, res) => {
    // Logic to fetch all users
    res.send('All users');
  });
  
  // Read a specific user
  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to fetch a specific user by ID
    res.send(`User ${userId}`);
  });
  
  // Update a user
  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to update a specific user by ID
    res.send(`User ${userId} updated`);
  });
  
  // Delete a user
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to delete a specific user by ID
    res.send(`User ${userId} deleted`);
  });
  