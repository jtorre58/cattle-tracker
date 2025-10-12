export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.status(200).send(`
window.ENV = {
  accessKeyId: '${process.env.accessKeyId}',
  secretAccessKey: '${process.env.secretAccessKey}'
};
  `);
}
