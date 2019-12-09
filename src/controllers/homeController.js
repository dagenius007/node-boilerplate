export const getHome = (req, res) => {
	console.log('Just things');
	res.status(200).json({ message: 'Hi hello' });
};
