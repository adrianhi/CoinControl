import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok', service: 'coincontrol-backend' });
});

app.listen(port, () => {
  console.log(`CoinControl API listening on port ${port}`);
});
