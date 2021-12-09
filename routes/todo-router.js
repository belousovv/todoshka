const router = require("express").Router();
const authMiddleware = require("../middlewares/auth-middleware");
const pool = require("../db");

// create todo

router.post("/", authMiddleware, async (req, res) => {
  try {
    //1. destructuring description from req.body

    const { description, date } = req.body;

    //2. create todo

    const userId = req.user.id;
    const newTodo = await pool.query(
      "INSERT INTO todos (description, user_id, solved, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, userId, "false", date]
    );

    //3. return new todo

    res.json(newTodo.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// get all todos by date, return => {todo_id: number, solved: boolean, description: string, date: string}[]

router.get("/:date", authMiddleware, async (req, res) => {
  // destructuring req.params for date

  const { date } = req.params;

  try {
    const todos = await pool.query(
      "SELECT t.todo_id, t.solved, t.description, t.date FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 AND t.date = $2 ORDER BY t.date, t.todo_id",
      [req.user.id, date]
    );
    res.json(todos.rows);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// get count of old todos, return => {count: number}

router.get("/old/:date", authMiddleware, async (req, res) => {
  // destructuring date

  const { date } = req.params;

  try {
    const count = await pool.query(
      "SELECT count(u.user_id) FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 AND t.date < $2",
      [req.user.id, date]
    );
    res.json(count.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// get all completed or incompleted todos count, return => {count: number}

router.get("/statistics/count", authMiddleware, async (req, res) => {
  // destructuring solved (true or false) from req.query

  const solved = req.query.solved;

  try {
    const count = await pool.query(
      "SELECT count(t.todo_id) FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 AND t.solved = $2",
      [req.user.id, solved]
    );
    res.json(count.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// remove old todos, return => {code: 0}

router.delete("/old/:date", authMiddleware, async (req, res) => {
  // destructuring date from req.body

  const { date } = req.params;

  try {
    await pool.query("DELETE FROM todos WHERE user_id = $1 AND date < $2", [
      req.user.id,
      date,
    ]);
    res.json({ code: 0 });
  } catch (e) {
    return res.json({ code: 1, message: e.massage });
  }
});

// get todo by id, return => {todo_id: number, solved: boolean, description: string, date: string}

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT t.solved, t.description, t.date FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 AND t.todo_id = $2",
      [req.user.id, id]
    );
    res.json(todo.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// remove todo

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    // check if client try delete todo with not his id
    if (deletedTodo.rows.length === 0) {
      return res.json({ message: "no access to this todo" });
    }
    res.json(deletedTodo.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// change todo

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, solved } = req.body;
    const changedTodo = await pool.query(
      "UPDATE todos SET description = $1, solved = $2 WHERE todo_id = $3 AND user_id = $4 RETURNING *",
      [description, solved, id, req.user.id]
    );

    // check if client try change todo with not his id

    if (changedTodo.rows.length === 0) {
      return res.json({ message: "no access to this todo" });
    }
    res.json(changedTodo.rows[0]);
  } catch (e) {
    return res.json({ message: e.message });
  }
});

module.exports = router;
