const express = require('express');
const router = express.Router();
const db = require('../db');

// สร้างคิวใหม่
router.post('/new', async (req, res) => {
  try {
    const { service_channel } = req.body;
    // หาคิวล่าสุดของวันนี้
    const [latest] = await db.query(
      'SELECT queue_number FROM queue WHERE queue_date = CURDATE() ORDER BY queue_number DESC LIMIT 1'
    );
    const nextQueue = latest.length ? latest[0].queue_number + 1 : 1;
    await db.query(
      'INSERT INTO queue (queue_number, service_channel, status, queue_date) VALUES (?, ?, "waiting", CURDATE())',
      [nextQueue, service_channel]
    );
    res.json({ queue_number: nextQueue });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// เรียกคิว
router.post('/call', async (req, res) => {
  try {
    const { queue_number, service_channel } = req.body;
    await db.query('UPDATE queue SET status="called", called_at=NOW(), service_channel=? WHERE queue_number=?', [service_channel, queue_number]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// เรียกคิวถัดไปอัตโนมัติ
router.post('/next', async (req, res) => {
  try {
    const { service_channel } = req.body;
    // หา waiting queue ที่ queue_number ต่ำสุด
    const [rows] = await db.query('SELECT * FROM queue WHERE status="waiting" ORDER BY queue_number ASC LIMIT 1');
    if (!rows.length) {
      return res.status(404).json({ success: false, message: "ไม่พบคิวรอเรียก" });
    }
    const nextQueue = rows[0].queue_number;
    await db.query(
      'UPDATE queue SET status="called", called_at=NOW(), service_channel=? WHERE queue_number=?',
      [service_channel, nextQueue]
    );
    res.json({ success: true, queue_number: nextQueue });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ดึงคิวที่ถูกเรียกล่าสุด
router.get('/current', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM queue WHERE status="called" AND queue_date = CURDATE() ORDER BY called_at DESC LIMIT 1'
  );
  res.json({ currentQueue: rows[0] || null });
});

// ดึง 3 คิวก่อนหน้า
router.get('/previous', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM queue WHERE status="called" AND queue_date = CURDATE() ORDER BY called_at DESC LIMIT 4'
  );
  res.json({ previousQueues: rows.slice(1, 4) }); // ข้ามตัวล่าสุด
});

router.get('/waiting/count', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM queue WHERE status="waiting" AND queue_date = CURDATE()'
    );
    res.json({ count: rows[0].count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;