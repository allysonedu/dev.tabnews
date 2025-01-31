function status(request, response) {
  response.status(200).json({ chave: "Server is running" });
}

export default status;
