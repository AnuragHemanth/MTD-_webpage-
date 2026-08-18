const authController = {
  login: async (req, res) => {
    res.status(200).json({ message: 'Login endpoint scaffolded' });
  },
  register: async (req, res) => {
    res.status(200).json({ message: 'Register endpoint scaffolded' });
  },
  logout: async (req, res) => {
    res.status(200).json({ message: 'Logout endpoint scaffolded' });
  }
};

module.exports = authController;
