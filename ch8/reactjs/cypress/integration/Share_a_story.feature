Feature: Share a story

  Adrian wants to share some stories,
  so that more people can know about his stories

  Rule: Share a story with at least the title and content

    This allows people would see the title on their feed and the content of the story itself

    Scenario: Adrian shares a story
      Given Adrian has a story to share
      When he shares a story called "Hello" about "World"
      Then people can see a story called "Hello" about "World"
