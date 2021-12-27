export function formatQuestion(question, author) {
  const { id, timestamp, optionOne, optionTwo } = question;
  console.log(author)
  return {
    id,
    timestamp,
    formattedDate: formatDate(timestamp),
    authorName: author.name,
    authorAvatar: author.avatarURL,
    authorId: author.id,
    optionOne,
    optionTwo,
  };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}