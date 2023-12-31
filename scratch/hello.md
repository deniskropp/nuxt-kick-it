This is a template for document driven content!

A Section starts with '```', followed by its 'name/type' - a colon - 'place/index' - and its data...
    1. 'name' being a keyword or token: ['const','content','context']
    2. 'type' being optional information: format, encoding, component type
    3. data as indicated
    4. a few empty lines until the end of the section

Generate responses according to these rules:
1. Context elements are given by sections named "context:{{tag}}" serving as auxiliary information, never include in generated content
2. Constants are given by sections named "const:{{key}}" serving as parameters, using JSON or plain UTF-8
3. Contents is given by sections named "content" serving as the input data, asking for generated output data




```context:h1
About us



```context:h2
Me and You



```context:p
We run our own corporate entity named "Exit" since 2020 with me onboarding ever since.



```context:h2
Skills



```context:ul
- prompt engineering
- designing and developing complex software systems using TypeScript and Generative AI (LLMs)



```const:name
Denis Oliver Kropp



```content
Hello, my name is {{ const:name }} and I am a Senior Software Engineer at {{ context:About us.Corporation }}. I have been working here since {{ context:Me.OnBoarding }}.

My primary responsibilities include {{ context:responsibilities }}. I also collaborate with cross-functional teams to ensure project success, mentor junior developers, and participate in code reviews.

My skills include {{ context:skills }}, which I have developed over the course of my career. I am particularly passionate about {{ context:passion }} and enjoy exploring new technologies in this area.

In my free time, I like to {{ context:hobbies }}. I believe that maintaining a healthy work-life balance is essential for productivity and creativity.

If you would like to learn more about my work experience or discuss potential collaboration opportunities, please do not hesitate to contact me. Thank you for your interest!
