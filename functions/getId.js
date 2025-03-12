export default userId = (users) => {
  return Math.floor(Math.random() * users.body.length)
}