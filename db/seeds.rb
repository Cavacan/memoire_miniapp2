user = User.create(email: "admin@example.com", password: "password")

Bubble.create([
  { title: 'First Memory', text: 'This is the first memory.', user_id: user.id},
  { title: 'Second Memory', text: 'This is the second memory.', user_id: user.id},
  { title: 'Third Memory', text: 'This is the third memory.', user_id: user.id}
])
