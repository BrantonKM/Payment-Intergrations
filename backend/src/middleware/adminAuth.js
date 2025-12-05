module.exports = function (req, res, next) {
  const token = req.headers['x-admin-token'];

  if (!token) {
    return res.status(403).json({ error: 'Admin token missing' });
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Invalid admin token' });
  }

  next();
};
