import  express  from "express";
import "./config/data.js";
import  User  from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config()


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// GET : retourner tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST : ajouter un nouvel utilisateur
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body); // { name, email, age }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT : éditer un utilisateur par ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,         // ID utilisateur
      req.body,              // Données à mettre à jour
      { new: true }          // Retourner le doc mis à jour
    );
    if (!updatedUser) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE : supprimer un utilisateur par ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé", deletedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// demarrer le server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})

