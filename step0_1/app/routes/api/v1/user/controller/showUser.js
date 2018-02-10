module.exports = async (req, res, next) => {
  try {
    res.send('hello')
  } catch (e) {
    next()
  }
}
