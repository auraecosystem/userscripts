require "mailtrap"

mail = Mailtrap::Mail.from_content(
  from:
    {
      email: "hello@demomailtrap.co",
      name: "Mailtrap Test",
    },
  to: [
    {
      email: "webapp4@outlook.com",
    }
  ],
  subject: "You are awesome!",
  text: "Congrats for sending test email with Mailtrap!",
  category: "Integration Test"
)

client = Mailtrap::Client.new(
  api_key: "<YOUR_API_TOKEN>",
)

response = client.send(mail)
puts response
