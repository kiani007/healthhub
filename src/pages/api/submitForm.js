export const handler = async function (req, res) {
  if (req.method === 'POST') {
    const formData = req.body
    // Handle form submission (e.g., store in database, send email, etc.)
    console.log('Form data:', formData)
    res.status(200).json({ message: 'Form submitted successfully!' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
